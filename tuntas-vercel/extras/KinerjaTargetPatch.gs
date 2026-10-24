/**
 * TUNTAS → aplikasi kinerja — patch doPost (opsional)
 * ---------------------------------------------------------------------------
 * Tempel fungsi ini ke proyek Apps Script APLIKASI LAPORAN KINERJA milikmu
 * (bukan ke proyek TUNTAS), lalu deploy ulang Web App-nya sebagai versi baru.
 *
 * Bridge TUNTAS berjalan di Vercel (api/bridge.js). Fungsi ini hanya membuat
 * aplikasi laporan lama menerima satu laporan JSON dari bridge Vercel, lalu
 * memanggil fungsi simpanData yang sudah ada di aplikasi itu.
 *
 * Langkah:
 *  1. Buka proyek Apps Script aplikasi kinerja.
 *  2. Buat berkas baru bernama KinerjaTargetPatch.gs, tempel isi ini.
 *  3. (Opsional, disarankan) Project Settings → Script Properties →
 *     tambahkan TUNTAS_REPORT_TOKEN dengan kata sandi acak. Isi token yang sama
 *     di TUNTAS → Data & cadangan → Google Drive & laporan → Token aplikasi.
 *  4. Deploy → Manage deployments → edit deployment aktif → Version: New version
 *     → Deploy. URL /exec tetap sama.
 *
 * Catatan: jangan mengganti doGet yang sudah ada. Fungsi ini hanya menambah
 * doPost. Bila proyek sudah punya doPost, gabungkan isinya dengan hati-hati.
 * Panduan lengkap: lihat VERCEL.md bagian 7.
 */

function doPost(e) {
  try {
    var body = bacaBodyTuntas_(e);
    if (!body) return balasTuntas_({ ok: false, error: 'Isi permintaan kosong atau bukan JSON.' });

    // Token opsional. Bila TUNTAS_REPORT_TOKEN diisi di proyek ini, token dari
    // TUNTAS harus sama.
    var expected = PropertiesService.getScriptProperties().getProperty('TUNTAS_REPORT_TOKEN');
    if (expected && String(body.token || '') !== String(expected)) {
      return balasTuntas_({ ok: false, error: 'Token aplikasi laporan salah.' });
    }

    var nama = bersihTuntas_(body.nama, 120);
    var jamAwal = bersihTuntas_(body.jamAwal, 10);
    var jamAkhir = bersihTuntas_(body.jamAkhir, 10);
    var aktivitas = bersihTuntas_(body.aktivitas, 8000);
    var keterangan = bersihTuntas_(body.keterangan, 4000);
    var evidence = bersihTuntas_(body.evidence, 3000);

    if (!nama) return balasTuntas_({ ok: false, error: 'Nama belum diisi.' });
    if (!aktivitas) return balasTuntas_({ ok: false, error: 'Aktivitas belum diisi.' });
    if (!jamAwal || !jamAkhir) return balasTuntas_({ ok: false, error: 'Jam kerja belum lengkap.' });

    // Cegah laporan ganda bila bridge mengirim ulang setelah timeout.
    var lock = LockService.getScriptLock();
    if (!lock.tryLock(15000)) {
      return balasTuntas_({ ok: false, error: 'Aplikasi sedang menyimpan laporan lain. Coba lagi.' });
    }
    try {
      if (typeof simpanData !== 'function') {
        return balasTuntas_({
          ok: false,
          error: 'Fungsi simpanData tidak ditemukan di proyek ini. Pastikan patch dipasang di proyek aplikasi kinerja yang benar.'
        });
      }
      var hasil = simpanData(nama, jamAwal, jamAkhir, aktivitas, keterangan, evidence);
      return balasTuntas_({
        ok: true,
        message: 'Laporan diterima aplikasi kinerja.',
        result: hasil === undefined || hasil === null ? null : String(hasil).slice(0, 500)
      });
    } finally {
      try { lock.releaseLock(); } catch (err) { /* noop */ }
    }
  } catch (err) {
    return balasTuntas_({ ok: false, error: err && err.message ? err.message : String(err) });
  }
}

function bacaBodyTuntas_(e) {
  if (!e) return null;
  var raw = '';
  if (e.postData && e.postData.contents) raw = e.postData.contents;
  else if (e.parameter && e.parameter.payload) raw = e.parameter.payload;
  if (!raw) return null;
  if (raw.length > 200000) return null;
  try {
    var parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : null;
  } catch (err) {
    return null;
  }
}

function bersihTuntas_(value, max) {
  if (value === null || value === undefined) return '';
  return String(value).replace(/\u0000/g, '').trim().slice(0, max || 1000);
}

function balasTuntas_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Jalankan sekali untuk membuat token aplikasi laporan. Salin nilainya ke
 * TUNTAS → Data & cadangan → Token aplikasi laporan.
 */
function generateTuntasReportToken() {
  var props = PropertiesService.getScriptProperties();
  var token = props.getProperty('TUNTAS_REPORT_TOKEN');
  if (!token) {
    token = Utilities.getUuid().replace(/-/g, '');
    props.setProperty('TUNTAS_REPORT_TOKEN', token);
  }
  Logger.log('TUNTAS_REPORT_TOKEN: ' + token);
  return token;
}
