'use strict';

/**
 * TUNTAS — Vercel bridge
 * ---------------------------------------------------------------------------
 * Satu serverless function untuk Google Drive, Google Docs, Google Calendar,
 * dan penerusan laporan kinerja. Tidak memakai Apps Script.
 *
 * Environment variables yang dipakai:
 *   TUNTAS_SECRET
 *   GOOGLE_SERVICE_ACCOUNT_EMAIL
 *   GOOGLE_PRIVATE_KEY              (PEM, boleh memakai \n)
 *   GOOGLE_PRIVATE_KEY_BASE64       (alternatif)
 *   GOOGLE_DRIVE_FOLDER_ID
 *   GOOGLE_CALENDAR_ID
 *   TUNTAS_OWNER_EMAIL              (opsional)
 *   TUNTAS_TIMEZONE                 (opsional, default Asia/Makassar)
 *   TUNTAS_ALLOWED_ORIGIN           (opsional, default *)
 *   TUNTAS_FOLDER_NAME              (opsional)
 *   TUNTAS_REPORT_FOLDER_NAME       (opsional)
 *   TUNTAS_DATA_FILE_NAME           (opsional)
 *
 * Deploy sebagai proyek Vercel dengan folder ini sebagai root. Endpoint:
 *   https://nama-proyek.vercel.app/api/bridge
 */

const crypto = require('crypto');

const FOLDER_MIME = 'application/vnd.google-apps.folder';
const DOC_MIME = 'application/vnd.google-apps.document';
const MAX_DATA_BYTES = 4000000;
const MAX_BODY_BYTES = 4500000;
const TOKEN_ENDPOINT = 'https://oauth2.googleapis.com/token';
const DRIVE_API = 'https://www.googleapis.com/drive/v3';
const DRIVE_UPLOAD_API = 'https://www.googleapis.com/upload/drive/v3';
const DOCS_API = 'https://docs.googleapis.com/v1';
const CALENDAR_API = 'https://www.googleapis.com/calendar/v3';
const GOOGLE_SCOPES = [
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/documents',
  'https://www.googleapis.com/auth/calendar'
];

const STATUS_LABELS = {
  backlog: 'Backlog',
  not_started: 'Belum dimulai',
  in_progress: 'Sedang dikerjakan',
  pending: 'Tertunda',
  done: 'Selesai',
  cancelled: 'Dibatalkan'
};
const PRIORITY_LABELS = {
  urgent: 'Mendesak',
  high: 'Tinggi',
  medium: 'Sedang',
  low: 'Rendah'
};
const RECURRENCE_LABELS = {
  weekly: 'Mingguan',
  monthly: 'Bulanan',
  quarterly: 'Triwulan',
  semester: 'Semester',
  yearly: 'Tahunan'
};

const OWNER_EMAIL = clean(process.env.TUNTAS_OWNER_EMAIL, 320);

const API = {
  folderName: clean(process.env.TUNTAS_FOLDER_NAME, 160) || 'TUNTAS — Ruang Kerja',
  reportFolderName: clean(process.env.TUNTAS_REPORT_FOLDER_NAME, 160) || 'TUNTAS — Laporan Kinerja',
  dataFileName: clean(process.env.TUNTAS_DATA_FILE_NAME, 160) || 'tuntas-data.json',
  timezone: validTimeZone(process.env.TUNTAS_TIMEZONE) || 'Asia/Makassar',
  calendarId: clean(process.env.GOOGLE_CALENDAR_ID, 300) || OWNER_EMAIL || 'primary',
  rootFolderId: clean(process.env.GOOGLE_DRIVE_FOLDER_ID, 300),
  ownerEmail: OWNER_EMAIL
};

let tokenCache = null;
let rootFolderCache = null;
let reportFolderCache = null;

/* ------------------------------------------------------------------ */
/* Handler                                                             */
/* ------------------------------------------------------------------ */

module.exports = async function handler(req, res) {
  setCors(req, res);

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method === 'GET') {
    sendHtml(res, statusPageHtml());
    return;
  }

  if (req.method !== 'POST') {
    sendJson(res, 405, {
      source: 'tuntas-bridge',
      ok: false,
      error: 'Gunakan POST untuk mengirim permintaan.'
    });
    return;
  }

  let request = null;
  try {
    const length = Number(req.headers && req.headers['content-length'] || 0);
    if (length > MAX_BODY_BYTES) throw new Error('Permintaan terlalu besar untuk Vercel (batas ±4,5 MB).');

    request = await readRequestBody(req);
    if (!request) throw new Error('Isi permintaan kosong.');

    const expectedSecret = String(process.env.TUNTAS_SECRET || '');
    if (!expectedSecret) {
      throw new Error('TUNTAS_SECRET belum diatur di environment Vercel.');
    }
    if (!safeEqual(String(request.secret || ''), expectedSecret)) {
      sendJson(res, 401, {
        source: 'tuntas-bridge',
        ok: false,
        requestId: requestIdOf(request),
        error: 'Token bridge salah. Samakan TUNTAS_SECRET di Vercel dengan token di TUNTAS.'
      });
      return;
    }

    const action = String(request.action || '');
    let result;
    switch (action) {
      case 'ping':
        result = await ping();
        break;
      case 'saveData':
        result = await saveData(request.data);
        break;
      case 'loadData':
        result = await loadData();
        break;
      case 'submitReport':
        result = await submitReport(request);
        break;
      case 'syncCalendar':
        result = await syncCalendar(request);
        break;
      default:
        throw new Error('Aksi tidak dikenal: ' + (action || '(kosong)'));
    }

    sendJson(res, 200, {
      source: 'tuntas-bridge',
      ok: true,
      requestId: requestIdOf(request),
      result: result
    });
  } catch (err) {
    sendJson(res, 400, {
      source: 'tuntas-bridge',
      ok: false,
      requestId: requestIdOf(request),
      error: err && err.message ? err.message : String(err)
    });
  }
};

/* ------------------------------------------------------------------ */
/* Aksi                                                               */
/* ------------------------------------------------------------------ */

async function ping() {
  await getAccessToken();
  const calendar = await getCalendarInfo();
  const folder = await getRootFolder();
  const dataFile = await getDataFile();

  return {
    ok: true,
    email: API.ownerEmail || clean(process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL, 320) || '',
    time: new Date().toISOString(),
    timezone: API.timezone,
    calendarId: API.calendarId,
    calendarName: clean(calendar.summary, 200),
    folderName: clean(folder.name, 200),
    folderUrl: clean(folder.webViewLink, 1000),
    dataFile: dataFile ? 'ada' : 'belum ada'
  };
}

async function saveData(data) {
  if (!data || typeof data !== 'object') throw new Error('Data kosong.');
  const json = JSON.stringify(data);
  const bytes = Buffer.byteLength(json, 'utf8');
  if (bytes > MAX_DATA_BYTES) {
    throw new Error('Data terlalu besar untuk Vercel (±4 MB). Ekspor JSON secara lokal atau gunakan sinkron file.');
  }

  const folder = await getRootFolder();
  const existing = await findDriveItem(API.dataFileName, 'application/json', folder.id);

  if (existing) {
    const updated = await googleFetch(
      DRIVE_UPLOAD_API + '/files/' + encodeURIComponent(existing.id) +
        '?uploadType=media&fields=id,name,webViewLink,modifiedTime&supportsAllDrives=true',
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: json
      }
    );
    return {
      fileId: updated.id,
      fileUrl: updated.webViewLink || '',
      savedAt: new Date().toISOString(),
      bytes: bytes
    };
  }

  const boundary = 'tuntas_' + crypto.randomBytes(12).toString('hex');
  const metadata = {
    name: API.dataFileName,
    mimeType: 'application/json',
    parents: [folder.id]
  };
  const body = Buffer.concat([
    Buffer.from('--' + boundary + '\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n'),
    Buffer.from(JSON.stringify(metadata)),
    Buffer.from('\r\n--' + boundary + '\r\nContent-Type: application/json\r\n\r\n'),
    Buffer.from(json),
    Buffer.from('\r\n--' + boundary + '--')
  ]);

  const created = await googleFetch(
    DRIVE_UPLOAD_API + '/files?uploadType=multipart&fields=id,name,webViewLink,modifiedTime&supportsAllDrives=true',
    {
      method: 'POST',
      headers: { 'Content-Type': 'multipart/related; boundary=' + boundary },
      body: body
    }
  );

  return {
    fileId: created.id,
    fileUrl: created.webViewLink || '',
    savedAt: new Date().toISOString(),
    bytes: bytes
  };
}

async function loadData() {
  const file = await getDataFile();
  if (!file) return { data: null, savedAt: '' };

  const text = await googleFetch(
    DRIVE_API + '/files/' + encodeURIComponent(file.id) + '?alt=media&supportsAllDrives=true',
    {},
    false
  );
  if (!text) return { data: null, savedAt: '' };

  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch (err) {
    throw new Error('Berkas data Drive rusak atau bukan JSON TUNTAS.');
  }

  return {
    data: parsed,
    savedAt: file.modifiedTime || '',
    fileUrl: file.webViewLink || ''
  };
}

async function submitReport(request) {
  const report = request.report && typeof request.report === 'object' ? request.report : request;
  const title = clean(report.taskTitle, 200) || clean(report.aktivitas, 80) || 'Laporan kinerja';
  const date = normalizeDate(report.date) || todayInTimeZone();

  if (!clean(report.nama, 120)) throw new Error('Nama belum diisi.');
  if (!clean(report.aktivitas, 8000)) throw new Error('Aktivitas belum diisi.');

  const file = await createReportDoc(report, title, date);
  const targetUrl = clean(request.targetUrl, 1000);
  const targetToken = String(request.targetToken || '');
  let forward = { ok: false, code: 0, error: '', skipped: true };

  if (targetUrl) {
    forward = await forwardReport(targetUrl, targetToken, report, file.url);
  }

  return {
    fileId: file.id,
    fileUrl: file.url,
    fileName: file.name,
    createdAt: new Date().toISOString(),
    forward: forward
  };
}

async function syncCalendar(request) {
  const tasks = Array.isArray(request.tasks) ? request.tasks.slice(0, 800) : [];
  const timezone = validTimeZone(request.timezone) || API.timezone;
  const removeMissing = request.removeMissing !== false;
  const calendar = await getCalendarInfo();
  const existing = await listTuntasEvents();
  const byTask = new Map();

  existing.forEach(function (event) {
    const taskId = event && event.extendedProperties &&
      event.extendedProperties.private && event.extendedProperties.private.tuntasTaskId;
    if (taskId) byTask.set(String(taskId), event);
  });

  let created = 0;
  let updated = 0;
  let removed = 0;
  const errors = [];
  const keep = new Set();

  for (const task of tasks) {
    if (!task || !task.id) continue;
    const taskId = String(task.id);
    const startKey = normalizeDate(task.start || task.due);
    let dueKey = normalizeDate(task.due || task.start) || startKey;
    if (!startKey) continue;
    if (dueKey < startKey) dueKey = startKey;
    keep.add(taskId);

    try {
      const body = buildCalendarEvent(task, startKey, dueKey, timezone);
      const old = byTask.get(taskId);
      if (old) {
        try {
          const patched = await calendarFetch('/events/' + encodeURIComponent(old.id), {
            method: 'PATCH',
            body: JSON.stringify(body)
          });
          byTask.set(taskId, patched);
          updated++;
        } catch (err) {
          if (err.status === 404 || err.status === 410) {
            const fresh = await calendarFetch('/events', {
              method: 'POST',
              body: JSON.stringify(body)
            });
            byTask.set(taskId, fresh);
            created++;
          } else {
            throw err;
          }
        }
      } else {
        const fresh = await calendarFetch('/events', {
          method: 'POST',
          body: JSON.stringify(body)
        });
        byTask.set(taskId, fresh);
        created++;
      }
    } catch (err) {
      errors.push((clean(task.title, 120) || taskId) + ': ' + (err.message || String(err)));
    }
  }

  if (removeMissing) {
    for (const entry of byTask.entries()) {
      const taskId = entry[0];
      const event = entry[1];
      if (keep.has(taskId)) continue;
      try {
        await calendarFetch('/events/' + encodeURIComponent(event.id), { method: 'DELETE' });
        removed++;
      } catch (err) {
        if (err.status !== 404 && err.status !== 410) {
          errors.push('Hapus acara ' + (event.summary || taskId) + ': ' + (err.message || String(err)));
        }
      }
    }
  }

  return {
    calendarName: clean(calendar.summary, 200) || API.calendarId,
    created: created,
    updated: updated,
    removed: removed,
    total: tasks.length,
    errors: errors.slice(0, 20),
    syncedAt: new Date().toISOString()
  };
}

/* ------------------------------------------------------------------ */
/* Google auth                                                        */
/* ------------------------------------------------------------------ */

async function getAccessToken() {
  if (tokenCache && tokenCache.expiresAt > Date.now() + 60000) return tokenCache.token;

  const refreshToken = clean(process.env.GOOGLE_REFRESH_TOKEN, 2000);
  let body;

  if (refreshToken) {
    const clientId = clean(process.env.GOOGLE_CLIENT_ID, 500);
    const clientSecret = clean(process.env.GOOGLE_CLIENT_SECRET, 500);
    if (!clientId || !clientSecret) {
      throw new Error('GOOGLE_CLIENT_ID dan GOOGLE_CLIENT_SECRET diperlukan bila memakai GOOGLE_REFRESH_TOKEN.');
    }
    body = new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: 'refresh_token'
    });
  } else {
    const service = getServiceAccount();
    const now = Math.floor(Date.now() / 1000);
    const header = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
    const payload = base64url(JSON.stringify({
      iss: service.email,
      scope: GOOGLE_SCOPES.join(' '),
      aud: TOKEN_ENDPOINT,
      iat: now,
      exp: now + 3600
    }));
    const unsigned = header + '.' + payload;
    const signature = crypto.sign('RSA-SHA256', Buffer.from(unsigned), service.key);
    body = new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: unsigned + '.' + base64url(signature)
    });
  }

  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body
  });
  const text = await response.text();
  let data = null;
  try { data = JSON.parse(text); } catch (err) { data = null; }

  if (!response.ok || !data || !data.access_token) {
    const detail = data && (data.error_description || data.error) ? (data.error_description || data.error) : text.slice(0, 300);
    throw new Error('Google menolak kredensial: ' + detail);
  }

  tokenCache = {
    token: data.access_token,
    expiresAt: Date.now() + (Number(data.expires_in) || 3600) * 1000
  };
  return tokenCache.token;
}

function getServiceAccount() {
  const email = clean(process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL, 320);
  let key = '';
  const base64Key = clean(process.env.GOOGLE_PRIVATE_KEY_BASE64, 20000);
  if (base64Key) {
    key = Buffer.from(base64Key, 'base64').toString('utf8');
  } else {
    key = String(process.env.GOOGLE_PRIVATE_KEY || '');
    key = key.replace(/\\n/g, '\n').trim();
    if ((key.startsWith('"') && key.endsWith('"')) || (key.startsWith("'") && key.endsWith("'"))) {
      key = key.slice(1, -1);
    }
    key = key.trim();
  }

  if (!email || !key) {
    throw new Error(
      'Kredensial Google belum diatur di Vercel. Isi GOOGLE_SERVICE_ACCOUNT_EMAIL dan GOOGLE_PRIVATE_KEY, ' +
      'atau GOOGLE_REFRESH_TOKEN + GOOGLE_CLIENT_ID + GOOGLE_CLIENT_SECRET.'
    );
  }
  if (!/-----BEGIN (?:RSA )?PRIVATE KEY-----/.test(key) || !/-----END (?:RSA )?PRIVATE KEY-----/.test(key)) {
    throw new Error(
      'GOOGLE_PRIVATE_KEY tidak berbentuk kunci PEM lengkap. Salin ulang nilai private_key dari file JSON service account, ' +
      'atau gunakan GOOGLE_PRIVATE_KEY_BASE64.'
    );
  }
  try {
    crypto.createPrivateKey(key);
  } catch (err) {
    throw new Error(
      'GOOGLE_PRIVATE_KEY tidak bisa dibaca. Pastikan newline ditulis \\n dan kunci tidak terpotong, ' +
      'atau gunakan GOOGLE_PRIVATE_KEY_BASE64.'
    );
  }
  return { email: email, key: key };
}

async function googleFetch(url, options, parseJson) {
  const token = await getAccessToken();
  const opts = Object.assign({}, options || {});
  const headers = Object.assign({
    Authorization: 'Bearer ' + token,
    Accept: 'application/json'
  }, opts.headers || {});

  if (opts.body && typeof opts.body === 'string' && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }
  opts.headers = headers;

  const response = await fetch(url, opts);
  const text = await response.text();
  let data = null;
  if (text) {
    try { data = JSON.parse(text); } catch (err) { data = null; }
  }

  if (!response.ok) {
    let message = 'HTTP ' + response.status;
    if (data && data.error) {
      message = typeof data.error === 'string' ? data.error : (data.error.message || message);
    } else if (text) {
      message = text.replace(/\s+/g, ' ').slice(0, 300);
    }
    const error = new Error(message);
    error.status = response.status;
    throw error;
  }

  if (parseJson === false) return text;
  return data;
}

/* ------------------------------------------------------------------ */
/* Google Drive                                                       */
/* ------------------------------------------------------------------ */

async function getRootFolder() {
  if (rootFolderCache) return rootFolderCache;

  if (API.rootFolderId) {
    try {
      const folder = await googleFetch(
        DRIVE_API + '/files/' + encodeURIComponent(API.rootFolderId) +
          '?fields=id,name,mimeType,webViewLink&supportsAllDrives=true'
      );
      if (folder && folder.mimeType && folder.mimeType !== FOLDER_MIME) {
        throw new Error(
          'GOOGLE_DRIVE_FOLDER_ID menunjuk ke berkas, bukan folder Drive. Salin ID folder dari URL folder Drive, ' +
          'bukan ID file tuntas-data.json.'
        );
      }
      rootFolderCache = folder;
      return folder;
    } catch (err) {
      if (err.status === 404 || err.status === 403) {
        throw new Error(
          'Folder Drive tidak bisa diakses. Bagikan folder GOOGLE_DRIVE_FOLDER_ID ke email service account ' +
          'sebagai Editor, lalu coba lagi.'
        );
      }
      throw err;
    }
  }

  let folder = await findDriveItem(API.folderName, FOLDER_MIME, 'root');
  if (!folder) {
    if (!API.ownerEmail) {
      throw new Error(
        'Folder Drive belum diatur. Isi GOOGLE_DRIVE_FOLDER_ID dengan folder yang dibagikan ke service account, ' +
        'atau isi TUNTAS_OWNER_EMAIL agar folder baru otomatis dibagikan kepadamu.'
      );
    }
    folder = await googleFetch(
      DRIVE_API + '/files?fields=id,name,webViewLink&supportsAllDrives=true',
      {
        method: 'POST',
        body: JSON.stringify({
          name: API.folderName,
          mimeType: FOLDER_MIME,
          parents: ['root']
        })
      }
    );
    await shareWithOwner(folder.id);
  } else {
    await shareWithOwner(folder.id);
  }
  rootFolderCache = folder;
  return folder;
}

async function getReportFolder() {
  if (reportFolderCache) return reportFolderCache;
  const root = await getRootFolder();
  let folder = await findDriveItem(API.reportFolderName, FOLDER_MIME, root.id);
  if (!folder) {
    folder = await googleFetch(
      DRIVE_API + '/files?fields=id,name,webViewLink&supportsAllDrives=true',
      {
        method: 'POST',
        body: JSON.stringify({
          name: API.reportFolderName,
          mimeType: FOLDER_MIME,
          parents: [root.id]
        })
      }
    );
    await shareWithOwner(folder.id);
  } else {
    await shareWithOwner(folder.id);
  }
  reportFolderCache = folder;
  return folder;
}

async function getDataFile() {
  const root = await getRootFolder();
  return findDriveItem(API.dataFileName, 'application/json', root.id);
}

async function findDriveItem(name, mimeType, parentId) {
  const q = [
    "name = '" + escapeDriveQuery(name) + "'",
    "mimeType = '" + mimeType + "'",
    "'" + escapeDriveQuery(parentId) + "' in parents",
    'trashed = false'
  ].join(' and ');
  const params = new URLSearchParams({
    q: q,
    fields: 'files(id,name,webViewLink,modifiedTime,size)',
    pageSize: '10',
    supportsAllDrives: 'true',
    includeItemsFromAllDrives: 'true'
  });
  const data = await googleFetch(DRIVE_API + '/files?' + params.toString());
  return data && Array.isArray(data.files) && data.files.length ? data.files[0] : null;
}

async function shareWithOwner(fileId) {
  if (!API.ownerEmail) return;
  try {
    await googleFetch(
      DRIVE_API + '/files/' + encodeURIComponent(fileId) +
        '/permissions?sendNotificationEmail=false&supportsAllDrives=true',
      {
        method: 'POST',
        body: JSON.stringify({
          type: 'user',
          role: 'writer',
          emailAddress: API.ownerEmail
        })
      }
    );
  } catch (err) {
    // Folder tetap bisa dipakai service account; pemilik bisa membagikannya manual.
  }
}

async function createReportDoc(report, title, date) {
  const folder = await getReportFolder();
  const docName = 'Laporan Kinerja — ' + title + ' — ' + date;
  const text = reportDocText(report, title, date);
  const existingId = clean(report.driveFileId, 200);

  if (existingId) {
    try {
      const doc = await googleFetch(DOCS_API + '/documents/' + encodeURIComponent(existingId));
      const content = doc && doc.body && Array.isArray(doc.body.content) ? doc.body.content : [];
      const last = content.length ? content[content.length - 1] : null;
      const endIndex = last && last.endIndex ? last.endIndex : 2;
      const requests = [];
      if (endIndex > 2) {
        requests.push({
          deleteContentRange: {
            range: { startIndex: 1, endIndex: endIndex - 1 }
          }
        });
      }
      requests.push({
        insertText: {
          location: { index: 1 },
          text: text
        }
      });
      await googleFetch(DOCS_API + '/documents/' + encodeURIComponent(existingId) + ':batchUpdate', {
        method: 'POST',
        body: JSON.stringify({ requests: requests })
      });

      try {
        await googleFetch(
          DRIVE_API + '/files/' + encodeURIComponent(existingId) +
            '?fields=id,name,webViewLink&supportsAllDrives=true',
          {
            method: 'PATCH',
            body: JSON.stringify({ name: docName })
          }
        );
      } catch (err) {
        // Nama lama tidak masalah; isi laporan sudah diperbarui.
      }

      return {
        id: existingId,
        name: docName,
        url: 'https://docs.google.com/document/d/' + encodeURIComponent(existingId) + '/edit'
      };
    } catch (err) {
      if (err.status !== 404 && err.status !== 403 && err.status !== 400) throw err;
    }
  }

  const created = await googleFetch(
    DRIVE_API + '/files?fields=id,name,webViewLink&supportsAllDrives=true',
    {
      method: 'POST',
      body: JSON.stringify({
        name: docName,
        mimeType: DOC_MIME,
        parents: [folder.id]
      })
    }
  );

  await googleFetch(DOCS_API + '/documents/' + encodeURIComponent(created.id) + ':batchUpdate', {
    method: 'POST',
    body: JSON.stringify({
      requests: [
        {
          insertText: {
            location: { index: 1 },
            text: text
          }
        }
      ]
    })
  });

  return {
    id: created.id,
    name: docName,
    url: created.webViewLink || ('https://docs.google.com/document/d/' + encodeURIComponent(created.id) + '/edit')
  };
}

function reportDocText(report, title, date) {
  const lines = [
    'LAPORAN KINERJA',
    'Satu pekerjaan, satu laporan · dibuat otomatis oleh TUNTAS',
    '',
    'Nama: ' + (clean(report.nama, 120) || '—'),
    'Tanggal: ' + date,
    'Jam kerja: ' + (normalizeTime(report.jamAwal) || '—') + ' – ' + (normalizeTime(report.jamAkhir) || '—'),
    'Pekerjaan: ' + title,
    '',
    'Aktivitas / Kinerja:',
    clean(report.aktivitas, 8000) || '—',
    '',
    'Keterangan tambahan:',
    clean(report.keterangan, 4000) || '—',
    '',
    'Bukti / Evidence:',
    clean(report.evidence, 2000) || '—',
    '',
    'Dibuat ' + formatDateTime(new Date()) + ' dari TUNTAS — ruang kerja pribadi.'
  ];
  return lines.join('\n');
}

/* ------------------------------------------------------------------ */
/* Google Calendar                                                    */
/* ------------------------------------------------------------------ */

async function getCalendarInfo() {
  return calendarFetch('');
}

async function calendarFetch(path, options) {
  return googleFetch(
    CALENDAR_API + '/calendars/' + encodeURIComponent(API.calendarId) + path,
    options
  );
}

async function listTuntasEvents() {
  const events = [];
  let pageToken = '';

  do {
    const params = new URLSearchParams({
      privateExtendedProperty: 'tuntas=1',
      maxResults: '2500',
      singleEvents: 'true',
      showDeleted: 'false'
    });
    if (pageToken) params.set('pageToken', pageToken);
    const data = await calendarFetch('/events?' + params.toString());
    if (data && Array.isArray(data.items)) events.push.apply(events, data.items);
    pageToken = data && data.nextPageToken ? data.nextPageToken : '';
  } while (pageToken);

  return events;
}

function buildCalendarEvent(task, startKey, dueKey, timezone) {
  const title = clean(task.title, 200) || 'Agenda TUNTAS';
  const time = normalizeTime(task.time);
  const description = calendarDescription(task);
  const extendedProperties = {
    private: {
      tuntas: '1',
      tuntasTaskId: String(task.id)
    }
  };

  if (time) {
    const parts = time.split(':');
    const hour = Number(parts[0]);
    const minute = Number(parts[1]);
    const endHour = hour + 1;
    const endDay = endHour >= 24 ? addDaysKey(dueKey, 1) : dueKey;
    const endTime = pad2(endHour % 24) + ':' + pad2(minute);

    return {
      summary: title,
      description: description,
      start: {
        dateTime: startKey + 'T' + time + ':00',
        timeZone: timezone
      },
      end: {
        dateTime: endDay + 'T' + endTime + ':00',
        timeZone: timezone
      },
      extendedProperties: extendedProperties
    };
  }

  return {
    summary: title,
    description: description,
    start: { date: startKey },
    end: { date: addDaysKey(dueKey, 1) },
    extendedProperties: extendedProperties
  };
}

function calendarDescription(task) {
  const lines = [];
  if (task.project) lines.push('Proyek: ' + clean(task.project, 120));
  if (task.status) lines.push('Status: ' + (STATUS_LABELS[task.status] || clean(task.status, 40)));
  if (task.priority) lines.push('Prioritas: ' + (PRIORITY_LABELS[task.priority] || clean(task.priority, 40)));
  if (Array.isArray(task.tags) && task.tags.length) {
    lines.push('Tag: ' + task.tags.slice(0, 20).map(function (tag) { return clean(tag, 40); }).join(', '));
  }
  if (task.recurring) {
    lines.push('Tugas berulang: ' + (RECURRENCE_LABELS[task.recurrenceFrequency] || clean(task.recurrenceFrequency, 40)));
  }
  if (task.notes) lines.push('', clean(task.notes, 4000));
  lines.push('', 'Dibuat dari TUNTAS — ruang kerja pribadi.');
  lines.push('[TUNTAS:' + clean(task.id, 80) + ']');
  return lines.join('\n');
}

/* ------------------------------------------------------------------ */
/* Penerusan ke aplikasi kinerja                                      */
/* ------------------------------------------------------------------ */

async function forwardReport(targetUrl, targetToken, report, fileUrl) {
  if (!/^https:\/\//i.test(targetUrl)) {
    return { ok: false, code: 0, error: 'URL aplikasi laporan harus https://', skipped: false };
  }

  const evidence = clean(report.evidence, 2000);
  const body = {
    token: String(targetToken || ''),
    source: 'tuntas',
    nama: clean(report.nama, 120),
    jamAwal: normalizeTime(report.jamAwal),
    jamAkhir: normalizeTime(report.jamAkhir),
    aktivitas: clean(report.aktivitas, 8000),
    keterangan: clean(report.keterangan, 4000),
    evidence: fileUrl ? (evidence ? evidence + '\n' : '') + 'File Drive: ' + fileUrl : evidence,
    taskId: clean(report.taskId, 80),
    taskTitle: clean(report.taskTitle, 200),
    reportDate: clean(report.date, 20),
    driveFileUrl: fileUrl || ''
  };

  try {
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json, text/plain, */*'
      },
      body: JSON.stringify(body),
      redirect: 'follow'
    });
    const code = response.status;
    const text = await response.text();

    if (/accounts\.google\.com/i.test(response.url || '')) {
      return {
        ok: false,
        code: code,
        error: 'Deployment aplikasi laporan tidak mengizinkan akses publik. Setel “Who has access: Anyone”.',
        skipped: false
      };
    }

    if (code >= 200 && code < 300) {
      if (/accounts\.google\.com|Sign in\s*[-–]\s*Google Accounts/i.test(text)) {
        return {
          ok: false,
          code: code,
          error: 'Aplikasi laporan meminta login. Setel deployment “Who has access: Anyone”.',
          skipped: false
        };
      }
      if (/<title>\s*Salah\s*<\/title>/i.test(text) || (/Script function not found/i.test(text) && /Salah/i.test(text))) {
        return {
          ok: false,
          code: code,
          error: 'Aplikasi laporan belum memiliki fungsi doPost. Tambahkan patch KinerjaTargetPatch.gs lalu deploy ulang.',
          skipped: false
        };
      }

      let parsed = null;
      try { parsed = JSON.parse(text); } catch (err) { parsed = null; }
      if (parsed && parsed.ok === true) {
        return { ok: true, code: code, error: '', skipped: false, message: parsed.message || 'Laporan diterima.' };
      }
      if (parsed && parsed.ok === false) {
        return {
          ok: false,
          code: code,
          error: parsed.error || parsed.message || 'Aplikasi laporan menolak laporan.',
          skipped: false
        };
      }
      if (/^\s*ok\b/i.test(text)) {
        return { ok: true, code: code, error: '', skipped: false, message: text.slice(0, 200) };
      }
      return {
        ok: false,
        code: code,
        error: 'Balasan aplikasi laporan tidak dikenali: ' + text.replace(/\s+/g, ' ').slice(0, 240),
        skipped: false
      };
    }

    return {
      ok: false,
      code: code,
      error: 'Aplikasi laporan membalas HTTP ' + code + '. ' + text.replace(/\s+/g, ' ').slice(0, 200),
      skipped: false
    };
  } catch (err) {
    return {
      ok: false,
      code: 0,
      error: err && err.message ? err.message : String(err),
      skipped: false
    };
  }
}

/* ------------------------------------------------------------------ */
/* Utilitas                                                           */
/* ------------------------------------------------------------------ */

function readRequestBody(req) {
  return new Promise(function (resolve, reject) {
    let body = req.body;

    if (Buffer.isBuffer(body)) body = body.toString('utf8');
    if (typeof body === 'string') {
      try { resolve(parseBodyText(body)); } catch (err) { reject(err); }
      return;
    }
    if (body && typeof body === 'object') {
      if (typeof body.payload === 'string' && !body.action) {
        try { resolve(parseBodyText(body.payload)); } catch (err) { reject(err); }
        return;
      }
      resolve(body);
      return;
    }

    const chunks = [];
    let size = 0;
    req.on('data', function (chunk) {
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        reject(new Error('Permintaan terlalu besar untuk Vercel (batas ±4,5 MB).'));
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', function () {
      try { resolve(parseBodyText(Buffer.concat(chunks).toString('utf8'))); } catch (err) { reject(err); }
    });
    req.on('error', reject);
  });
}

function parseBodyText(raw) {
  const text = String(raw || '').trim();
  if (!text) return null;
  if (text.charAt(0) === '{' || text.charAt(0) === '[') {
    try {
      return JSON.parse(text);
    } catch (err) {
      throw new Error('Payload bukan JSON yang valid.');
    }
  }
  const params = new URLSearchParams(text);
  if (params.has('payload')) {
    try {
      return JSON.parse(params.get('payload'));
    } catch (err) {
      throw new Error('Payload bukan JSON yang valid.');
    }
  }
  throw new Error('Payload bukan JSON yang valid.');
}

function requestIdOf(request) {
  return request && request.requestId ? clean(request.requestId, 100) : '';
}

function setCors(req, res) {
  const configured = clean(process.env.TUNTAS_ALLOWED_ORIGIN, 500) || '*';
  const origin = String(req.headers && req.headers.origin || '');
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
  res.setHeader('Access-Control-Max-Age', '86400');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  if (configured === '*') {
    res.setHeader('Access-Control-Allow-Origin', '*');
  } else if (origin && configured.split(',').map(function (item) { return item.trim(); }).indexOf(origin) >= 0) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else if (!origin) {
    res.setHeader('Access-Control-Allow-Origin', configured.split(',')[0].trim());
  }
}

function sendJson(res, status, payload) {
  const text = JSON.stringify(payload);
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(text);
}

function sendHtml(res, html) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.end(html);
}

function statusPageHtml() {
  const configured = Boolean(process.env.TUNTAS_SECRET);
  const googleConfigured = Boolean(
    (process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
      (process.env.GOOGLE_PRIVATE_KEY || process.env.GOOGLE_PRIVATE_KEY_BASE64)) ||
    (process.env.GOOGLE_REFRESH_TOKEN && process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET)
  );
  return '<!DOCTYPE html><html lang="id"><head><meta charset="utf-8">' +
    '<meta name="viewport" content="width=device-width, initial-scale=1">' +
    '<title>TUNTAS Bridge — Vercel</title><style>' +
    'body{font-family:Arial,sans-serif;background:#f7f2e8;color:#20302b;margin:0;padding:40px 20px;line-height:1.6}' +
    '.card{max-width:620px;margin:0 auto;background:#fffdf7;border:1px solid #d9d2c3;border-radius:16px;padding:26px;box-shadow:0 18px 50px -30px rgba(0,0,0,.4)}' +
    'h1{font-size:22px;margin:0 0 6px}p{margin:8px 0;color:#64736b}code{background:#efe8da;padding:2px 6px;border-radius:6px}' +
    '.ok{color:#2f6f5d;font-weight:700}.warn{color:#b98a2e;font-weight:700}li{margin:4px 0}' +
    '</style></head><body><div class="card">' +
    '<h1>TUNTAS Bridge — Vercel</h1>' +
    '<p class="' + (configured ? 'ok' : 'warn') + '">' +
    (configured ? 'TUNTAS_SECRET sudah diatur.' : 'TUNTAS_SECRET belum diatur.') +
    '</p><p class="' + (googleConfigured ? 'ok' : 'warn') + '">' +
    (googleConfigured ? 'Kredensial Google terdeteksi.' : 'Kredensial Google belum lengkap.') +
    '</p><p>Endpoint ini menerima POST JSON dari TUNTAS. Jangan bagikan URL + token.</p>' +
    '<p>Gunakan URL ini di TUNTAS → Data &amp; cadangan → Google Drive &amp; laporan:</p>' +
    '<p><code>https://domain-anda.vercel.app/api/bridge</code></p>' +
    '<p>Panduan lengkap ada di <code>VERCEL.md</code> dalam proyek.</p>' +
    '</div></body></html>';
}

function safeEqual(a, b) {
  const left = Buffer.from(String(a || ''));
  const right = Buffer.from(String(b || ''));
  if (!left.length || left.length !== right.length) return false;
  return crypto.timingSafeEqual(left, right);
}

function base64url(input) {
  return Buffer.from(input).toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

function escapeDriveQuery(value) {
  return String(value || '').replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function clean(value, max) {
  if (value === null || value === undefined) return '';
  const text = String(value).replace(/\u0000/g, '').trim();
  return max ? text.slice(0, max) : text;
}

function normalizeDate(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(value || '').trim().slice(0, 10));
  if (!match) return '';
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const probe = new Date(Date.UTC(year, month - 1, day));
  if (probe.getUTCFullYear() !== year || probe.getUTCMonth() !== month - 1 || probe.getUTCDate() !== day) return '';
  return match[1] + '-' + match[2] + '-' + match[3];
}

function normalizeTime(value) {
  const match = /^([01]?\d|2[0-3])[:.]([0-5]\d)$/.exec(String(value || '').trim());
  return match ? pad2(match[1]) + ':' + match[2] : '';
}

function addDaysKey(key, days) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(key || ''));
  if (!match) return key;
  const date = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3]) + days));
  return date.toISOString().slice(0, 10);
}

function pad2(value) {
  return String(value).padStart(2, '0');
}

function validTimeZone(value) {
  const timezone = clean(value, 80);
  if (!timezone) return '';
  try {
    new Intl.DateTimeFormat('en-US', { timeZone: timezone }).format(new Date());
    return timezone;
  } catch (err) {
    return '';
  }
}

function todayInTimeZone() {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: API.timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).formatToParts(new Date());
  const values = {};
  parts.forEach(function (part) { values[part.type] = part.value; });
  return values.year + '-' + values.month + '-' + values.day;
}

function formatDateTime(date) {
  return new Intl.DateTimeFormat('id-ID', {
    timeZone: API.timezone,
    dateStyle: 'long',
    timeStyle: 'short'
  }).format(date);
}
