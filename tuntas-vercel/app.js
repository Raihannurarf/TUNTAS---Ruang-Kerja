/* TUNTAS — ruang kerja pribadi
   Satu berkas, tanpa kerangka kerja, tanpa server. Data tinggal di perambanmu. */
(function () {
  'use strict';

  /* ---------- ikon ---------- */
  const ICONS = {
    check: '<path d="M20 6 9 17l-5-5"/>',
    'check-circle': '<circle cx="12" cy="12" r="9"/><path d="m8.5 12 2.5 2.5 4.7-5"/>',
    'check-check': '<path d="m2 12 5 5L18 6"/><path d="m13 16 2 2 7-8"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    'plus-circle': '<circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/>',
    minus: '<path d="M5 12h14"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.4-3.4"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    database: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    moon: '<path d="M20.4 14.2A8.5 8.5 0 0 1 9.8 3.6 8.5 8.5 0 1 0 20.4 14.2Z"/>',
    monitor: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    'layout-dashboard': '<rect x="3" y="3" width="7" height="8" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="15" width="7" height="6" rx="1.5"/>',
    'list-todo': '<path d="M10 6h11M10 12h11M10 18h11"/><path d="m3 6 1.5 1.5L7 5M3 12l1.5 1.5L7 11M3 18l1.5 1.5L7 17"/>',
    columns: '<rect x="3" y="4" width="5" height="16" rx="1.5"/><rect x="10" y="4" width="5" height="11" rx="1.5"/><rect x="17" y="4" width="4" height="7" rx="1.5"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
    'calendar-days': '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/>',
    'calendar-plus': '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18M12 14v4M10 16h4"/>',
    bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/>',
    repeat: '<path d="m17 2 4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>',
    'clipboard-check': '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V3h6v1M9 12l2 2 4-4"/>',
    send: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
    cloud: '<path d="M17.5 19H7a5 5 0 0 1-.6-9.96A6 6 0 0 1 18 10.5a4.5 4.5 0 0 1-.5 8.5Z"/>',
    'cloud-upload': '<path d="M17.5 19H7a5 5 0 0 1-.6-9.96A6 6 0 0 1 18 10.5a4.5 4.5 0 0 1-.5 8.5Z"/><path d="M12 16V8M9 11l3-3 3 3"/>',
    'external-link': '<path d="M15 3h6v6M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
    'file-text': '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9Z"/><path d="M14 3v6h6M8 13h8M8 17h6"/>',
    gantt: '<path d="M4 5h10M4 12h16M4 19h7"/><path d="M3 3v18"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    flag: '<path d="M5 21V4c4-2 6 2 10 0v9c-4 2-6-2-10 0"/>',
    folder: '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/>',
    trash: '<path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13M10 11v5M14 11v5"/>',
    copy: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"/>',
    pencil: '<path d="m17 3 4 4L8 20H4v-4Z"/><path d="m15 5 4 4"/>',
    circle: '<circle cx="12" cy="12" r="8"/>',
    'circle-dashed': '<circle cx="12" cy="12" r="8" stroke-dasharray="3 4"/>',
    play: '<path d="m8 5 11 7-11 7Z"/>',
    pause: '<path d="M8 5v14M16 5v14"/>',
    'x-circle': '<circle cx="12" cy="12" r="9"/><path d="m9 9 6 6M15 9l-6 6"/>',
    inbox: '<path d="M4 5h16v10H4z"/><path d="m4 15 3-5h3l1 2h2l1-2h3l3 5v4H4Z"/>',
    sparkles: '<path d="m12 3 1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6Z"/><path d="m19 15 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8Z"/>',
    lightbulb: '<path d="M9 18h6M10 22h4"/><path d="M8.5 14.5a6 6 0 1 1 7 0c-.8.7-1 1.3-1 2.5h-5c0-1.2-.2-1.8-1-2.5Z"/>',
    download: '<path d="M12 3v12M7 10l5 5 5-5"/><path d="M4 19h16"/>',
    upload: '<path d="M12 16V4M7 9l5-5 5 5"/><path d="M4 20h16"/>',
    'file-json': '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9Z"/><path d="M14 3v6h6M9 13v4M15 13v4M9 15h6"/>',
    file: '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9Z"/><path d="M14 3v6h6"/>',
    shield: '<path d="M12 3 4 6v5c0 5 3.4 8.5 8 10 4.6-1.5 8-5 8-10V6Z"/><path d="m8.5 12 2.5 2.5 4.5-5"/>',
    'hard-drive': '<rect x="3" y="5" width="18" height="6" rx="1.5"/><rect x="3" y="13" width="18" height="6" rx="1.5"/><path d="M7 8h.01M7 16h.01M11 8h6M11 16h6"/>',
    link: '<path d="M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1"/>',
    unlink: '<path d="m3 3 18 18"/><path d="M10 13a5 5 0 0 0 7 0l1-1M14 11a5 5 0 0 0-7 0l-1 1"/>',
    refresh: '<path d="M20 11a8 8 0 0 0-14.7-4L3 10"/><path d="M3 5v5h5"/><path d="M4 13a8 8 0 0 0 14.7 4L21 14"/><path d="M21 19v-5h-5"/>',
    'alert-triangle': '<path d="M10.3 3.8 2 18a2 2 0 0 0 1.7 3h16.6a2 2 0 0 0 1.7-3L13.7 3.8a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4M12 17h.01"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
    'more-horizontal': '<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
    'grip-horizontal': '<circle cx="9" cy="6" r="1"/><circle cx="15" cy="6" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="9" cy="18" r="1"/><circle cx="15" cy="18" r="1"/>',
    pip: '<rect x="3" y="4" width="18" height="16" rx="2"/><rect x="12" y="11" width="6" height="6" rx="1"/>',
    sunrise: '<path d="M17 18a5 5 0 0 0-10 0M12 2v5M4.2 10.2l1.4 1.4M19.8 10.2l-1.4 1.4M2 18h2M20 18h2M2 22h20"/>',
    activity: '<path d="M3 12h4l2-6 4 12 2-6h6"/>',
    coffee: '<path d="M4 8h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5Z"/><path d="M17 9h2a2 2 0 0 1 0 4h-2M6 3v2M10 3v2M14 3v2"/>',
    'arrow-right': '<path d="M5 12h14M13 6l6 6-6 6"/>',
    'arrow-left': '<path d="M19 12H5M11 18l-6-6 6-6"/>',
    'arrow-up-right': '<path d="M7 17 17 7M8 7h9v9"/>',
    'chevron-left': '<path d="m15 18-6-6 6-6"/>',
    'chevron-right': '<path d="m9 18 6-6-6-6"/>',
    'chevron-down': '<path d="m6 9 6 6 6-6"/>',
    'chevron-up': '<path d="m18 15-6-6-6 6"/>',
    keyboard: '<rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M7 14h10"/>',
    lock: '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
    pin: '<path d="m15 4 5 5-3 1-4 4 1 4-2 2-3-5-5-3 2-2 4 1 4-4Z"/>',
    maximize: '<path d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5"/>',
    'rotate-ccw': '<path d="M3 3v6h6"/><path d="M3.5 9A9 9 0 1 1 3 14"/>',
    'map-pin': '<path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
    'panel-right': '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M15 4v16"/>',
    'panel-bottom': '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 14h18"/>',
    'mouse-pointer': '<path d="m4 3 7 18 2.5-7.5L21 11Z"/>'
  };

  function icon(name, size = 16, className = '') {
    const body = ICONS[name] || ICONS.circle;
    return '<svg viewBox="0 0 24 24" width="' + size + '" height="' + size + '" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"' + (className ? ' class="' + className + '"' : '') + '>' + body + '</svg>';
  }

  /* ---------- konstanta ---------- */
  const STORE = {
    data: 'tuntas.data.v1',
    settings: 'tuntas.settings.v1',
    backups: 'tuntas.backups.v1',
    theme: 'tuntas.theme'
  };
  const APP_VERSION = 3;
  const DEFAULT_REPORT_URL = 'https://script.google.com/macros/s/AKfycbyeCuACcwoOVgXaVaeVgp9FYSxS6c82qmXdKk5_0IjryiCqxe58SgOxKAtW1qZ__bxP/exec';
  const BRIDGE_ENV_TEMPLATE = [
    '# Vercel → Project Settings → Environment Variables',
    '# Salin nilai asli dari file JSON service account. Jangan bagikan file ini.',
    'TUNTAS_SECRET=kata-sandi-acak-panjang',
    'GOOGLE_SERVICE_ACCOUNT_EMAIL=akun@proyek.iam.gserviceaccount.com',
    'GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\nISI_PRIVATE_KEY\\n-----END PRIVATE KEY-----\\n"',
    'GOOGLE_DRIVE_FOLDER_ID=id-folder-drive',
    'GOOGLE_CALENDAR_ID=alamat-email-google',
    'TUNTAS_OWNER_EMAIL=alamat-email-google',
    'TUNTAS_TIMEZONE=Asia/Makassar',
    'TUNTAS_ALLOWED_ORIGIN=https://nama-proyek.vercel.app'
  ].join('\n');
  const RECURRENCES = [
    { key: 'weekly', label: 'Mingguan', short: 'Mingguan', months: 0, days: 7, hint: 'setiap 7 hari' },
    { key: 'monthly', label: 'Bulanan', short: 'Bulanan', months: 1, days: 0, hint: 'setiap bulan' },
    { key: 'quarterly', label: 'Triwulan', short: 'Triwulan', months: 3, days: 0, hint: 'setiap 3 bulan' },
    { key: 'semester', label: 'Semester', short: 'Semester', months: 6, days: 0, hint: 'setiap 6 bulan' },
    { key: 'yearly', label: 'Tahunan', short: 'Tahunan', months: 12, days: 0, hint: 'setiap tahun' }
  ];
  const RECURRENCE_MAP = Object.fromEntries(RECURRENCES.map(r => [r.key, r]));

  const STATUSES = [
    { key: 'backlog', label: 'Backlog', short: 'Backlog', icon: 'inbox' },
    { key: 'not_started', label: 'Belum dimulai', short: 'Belum', icon: 'circle-dashed' },
    { key: 'in_progress', label: 'Sedang dikerjakan', short: 'Proses', icon: 'play' },
    { key: 'pending', label: 'Tertunda', short: 'Tertunda', icon: 'pause' },
    { key: 'done', label: 'Selesai', short: 'Selesai', icon: 'check' },
    { key: 'cancelled', label: 'Dibatalkan', short: 'Batal', icon: 'x' }
  ];
  const STATUS_KEYS = STATUSES.map(s => s.key);
  const STATUS_MAP = Object.fromEntries(STATUSES.map(s => [s.key, s]));
  const OPEN_STATUSES = ['backlog', 'not_started', 'in_progress', 'pending'];

  const PRIORITIES = [
    { key: 'urgent', label: 'Mendesak', short: 'Mendesak' },
    { key: 'high', label: 'Tinggi', short: 'Tinggi' },
    { key: 'medium', label: 'Sedang', short: 'Sedang' },
    { key: 'low', label: 'Rendah', short: 'Rendah' }
  ];
  const PRIORITY_KEYS = PRIORITIES.map(p => p.key);
  const PRIORITY_MAP = Object.fromEntries(PRIORITIES.map(p => [p.key, p]));
  const PRIORITY_COLORS = {
    urgent: 'var(--danger)',
    high: 'var(--accent-2)',
    medium: 'var(--gold)',
    low: 'var(--ink-faint)'
  };

  const VIEW_META = {
    dashboard: { label: 'Dasbor', icon: 'layout-dashboard', title: 'Dasbor' },
    tasks: { label: 'Tugas', icon: 'list-todo', title: 'Tugas' },
    board: { label: 'Papan', icon: 'columns', title: 'Papan' },
    calendar: { label: 'Kalender', icon: 'calendar-days', title: 'Kalender' },
    timeline: { label: 'Timeline', icon: 'gantt', title: 'Timeline' },
    focus: { label: 'Fokus hari ini', icon: 'target', title: 'Fokus hari ini' },
    report: { label: 'Laporan', icon: 'clipboard-check', title: 'Laporan kinerja' }
  };
  const VIEWS = Object.keys(VIEW_META);

  const MONTHS = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  const WEEKDAYS = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
  const WEEKDAYS_SHORT = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
  const WEEKDAYS_MINI = ['S', 'S', 'R', 'K', 'J', 'S', 'M'];

  const DEFAULT_FILTERS = { search: '', status: 'all', priority: 'all', project: 'all', sort: 'smart' };
  const THEME_ORDER = ['light', 'dark', 'system'];
  const THEME_LABEL = { light: 'Terang', dark: 'Gelap', system: 'Ikuti sistem' };

  /* ---------- utilitas ---------- */
  function esc(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  }
  function pad2(n) { return String(n).padStart(2, '0'); }
  function uid(prefix) { return prefix + '_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8); }
  function nowIso() { return new Date().toISOString(); }
  function dateKey(date) {
    const d = date instanceof Date ? date : new Date(date);
    if (isNaN(d.getTime())) return '';
    return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate());
  }
  function todayKey() { return dateKey(new Date()); }
  function parseKey(key) {
    if (!key) return null;
    const m = String(key).match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!m) return null;
    const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
    if (isNaN(d.getTime()) || dateKey(d) !== key) return null;
    return d;
  }
  function normalizeDate(value) {
    if (value instanceof Date && !isNaN(value.getTime())) return dateKey(value);
    const str = String(value == null ? '' : value).trim();
    if (!str) return '';
    const exact = parseKey(str.slice(0, 10));
    if (exact) return dateKey(exact);
    const parsed = new Date(str);
    return isNaN(parsed.getTime()) ? '' : dateKey(parsed);
  }
  function normalizeTime(value) {
    const str = String(value == null ? '' : value).trim();
    const m = str.match(/^([01]?\d|2[0-3])[:.]([0-5]\d)$/);
    return m ? pad2(m[1]) + ':' + m[2] : '';
  }
  function addDaysKey(key, amount) {
    const d = parseKey(key || todayKey());
    if (!d) return todayKey();
    d.setDate(d.getDate() + amount);
    return dateKey(d);
  }
  function diffDays(fromKey, toKey) {
    const a = parseKey(fromKey), b = parseKey(toKey);
    if (!a || !b) return 0;
    return Math.round((Date.UTC(b.getFullYear(), b.getMonth(), b.getDate()) - Date.UTC(a.getFullYear(), a.getMonth(), a.getDate())) / 86400000);
  }
  function addMonthsKey(key, months) {
    const d = parseKey(key);
    if (!d || !months) return key || '';
    const day = d.getDate();
    const target = new Date(d.getFullYear(), d.getMonth() + months, 1);
    const last = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate();
    target.setDate(Math.min(day, last));
    return dateKey(target);
  }
  function nextWorkingDayKey(key) {
    let out = normalizeDate(key);
    let guard = 0;
    while (out && isWeekendKey(out) && guard < 7) {
      out = addDaysKey(out, 1);
      guard++;
    }
    return out;
  }
  function normalizeRecurrenceFrequency(value) {
    const raw = String(value == null ? '' : value).trim().toLowerCase();
    const map = {
      mingguan: 'weekly', weekly: 'weekly', week: 'weekly', '7 hari': 'weekly',
      bulanan: 'monthly', monthly: 'monthly', month: 'monthly',
      triwulan: 'quarterly', quarterly: 'quarterly', '3 bulan': 'quarterly',
      semester: 'semester', semiannual: 'semester', '6 bulan': 'semester',
      tahunan: 'yearly', yearly: 'yearly', annual: 'yearly', year: 'yearly'
    };
    return RECURRENCE_MAP[raw] ? raw : (map[raw] || 'monthly');
  }
  function recurrenceMeta(freq) {
    return RECURRENCE_MAP[normalizeRecurrenceFrequency(freq)] || RECURRENCE_MAP.monthly;
  }
  function recurrenceLabel(freq) {
    return recurrenceMeta(freq).label;
  }
  function shiftByRecurrence(key, freq) {
    const meta = recurrenceMeta(freq);
    if (!parseKey(key)) return '';
    return meta.days ? addDaysKey(key, meta.days) : addMonthsKey(key, meta.months);
  }
  function recurrenceNextDates(task) {
    if (!task) return null;
    const base = task.due || task.start || '';
    if (!base) return null;
    const freq = normalizeRecurrenceFrequency(task.recurrenceFrequency);
    const rawDue = shiftByRecurrence(base, freq);
    if (!rawDue) return null;
    const due = nextWorkingDayKey(rawDue);
    const delta = diffDays(base, due);
    const start = task.start ? addDaysKey(task.start, delta) : '';
    return { due, start, rawDue, freq, adjusted: due !== rawDue, delta };
  }
  function timeKeyFromIso(iso) {
    const d = new Date(iso);
    return isNaN(d.getTime()) ? '' : pad2(d.getHours()) + ':' + pad2(d.getMinutes());
  }
  function startOfMonthKey(key) {
    const d = parseKey(key || todayKey());
    return dateKey(new Date(d.getFullYear(), d.getMonth(), 1));
  }
  function monthEndKey(key) {
    const d = parseKey(key);
    return dateKey(new Date(d.getFullYear(), d.getMonth() + 1, 0));
  }
  function shiftMonthKey(key, amount) {
    const d = parseKey(key);
    return dateKey(new Date(d.getFullYear(), d.getMonth() + amount, 1));
  }
  function daysInMonth(key) {
    const d = parseKey(key);
    return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
  }
  function formatDateLong(key) {
    const d = parseKey(key);
    if (!d) return '—';
    return WEEKDAYS[(d.getDay() + 6) % 7] + ', ' + d.getDate() + ' ' + MONTHS[d.getMonth()] + ' ' + d.getFullYear();
  }
  function formatDateMedium(key) {
    const d = parseKey(key);
    if (!d) return '—';
    const sameYear = d.getFullYear() === new Date().getFullYear();
    return d.getDate() + ' ' + MONTHS_SHORT[d.getMonth()] + (sameYear ? '' : ' ' + d.getFullYear());
  }
  function formatMonth(key) {
    const d = parseKey(key);
    return d ? MONTHS[d.getMonth()] + ' ' + d.getFullYear() : '—';
  }
  function weekDayName(key, short) {
    const d = parseKey(key);
    if (!d) return '';
    return (short ? WEEKDAYS_SHORT : WEEKDAYS)[(d.getDay() + 6) % 7];
  }
  function isWeekendKey(key) {
    const d = parseKey(key);
    return d ? d.getDay() === 0 || d.getDay() === 6 : false;
  }
  function monthMatrix(key) {
    const first = startOfMonthKey(key);
    const firstDate = parseKey(first);
    const offset = (firstDate.getDay() + 6) % 7;
    const start = addDaysKey(first, -offset);
    return Array.from({ length: 42 }, (_, i) => addDaysKey(start, i));
  }
  function dueLabel(key) {
    if (!key) return '';
    const diff = diffDays(todayKey(), key);
    if (diff === 0) return 'Hari ini';
    if (diff === 1) return 'Besok';
    if (diff === -1) return 'Kemarin';
    return formatDateMedium(key);
  }
  function dueFullLabel(task) {
    if (!task.due) return 'Tanpa tenggat';
    return formatDateLong(task.due) + (task.time ? ' · ' + task.time.replace(':', '.') : '');
  }
  function lateLabel(task) {
    if (!task.due) return '';
    const days = diffDays(task.due, todayKey());
    if (days <= 0) return '';
    if (days === 1) return 'Terlambat 1 hari';
    return 'Terlambat ' + days + ' hari';
  }
  function timeAgo(iso) {
    if (!iso) return '';
    const then = new Date(iso);
    if (isNaN(then.getTime())) return '';
    const seconds = Math.max(0, Math.round((Date.now() - then.getTime()) / 1000));
    if (seconds < 60) return 'baru saja';
    const minutes = Math.round(seconds / 60);
    if (minutes < 60) return minutes + ' mnt lalu';
    const hours = Math.round(minutes / 60);
    if (hours < 24) return hours + ' jam lalu';
    const days = Math.round(hours / 24);
    if (days < 7) return days + ' hari lalu';
    return formatDateMedium(dateKey(then));
  }
  function clockNow() {
    const d = new Date();
    return pad2(d.getHours()) + '.' + pad2(d.getMinutes());
  }
  function greeting() {
    const h = new Date().getHours();
    if (h < 11) return 'Selamat pagi';
    if (h < 15) return 'Selamat siang';
    if (h < 19) return 'Selamat sore';
    return 'Selamat malam';
  }
  function isoAt(key, hour, minute) {
    const d = parseKey(key);
    if (!d) return nowIso();
    d.setHours(hour || 0, minute || 0, 0, 0);
    return d.toISOString();
  }
  function isoNow() { return new Date().toISOString(); }
  function clamp(n, min, max) { return Math.min(max, Math.max(min, n)); }
  function pct(part, total) { return total ? Math.round((part / total) * 100) : 0; }

  function readJson(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return fallback;
      return JSON.parse(raw);
    } catch (err) {
      return fallback;
    }
  }
  function writeJson(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /* ---------- model data ---------- */
  function emptyData() {
    const now = nowIso();
    return { version: APP_VERSION, tasks: [], activity: [], reports: [], createdAt: now, updatedAt: now };
  }
  function defaultSettings() {
    return {
      version: 2,
      name: '',
      lastView: 'dashboard',
      dockOpen: false,
      dockPosition: null,
      fileSyncEnabled: false,
      fileSyncName: '',
      lastFileSyncAt: '',
      lastBackupAt: '',
      workStart: '08:00',
      workEnd: '16:00',
      reminderDismissedDate: '',
      bridgeUrl: '/api/bridge',
      bridgeSecret: '',
      driveSyncEnabled: false,
      lastDriveSyncAt: '',
      lastDriveFileUrl: '',
      lastDriveFileId: '',
      calendarLastSyncAt: '',
      calendarName: '',
      reportTargetUrl: DEFAULT_REPORT_URL,
      reportTargetToken: ''
    };
  }
  function normalizeStatus(value, fallback) {
    const raw = String(value == null ? '' : value).trim().toLowerCase();
    const map = {
      '': fallback || 'not_started', belum: 'not_started', 'belum mulai': 'not_started', baru: 'not_started',
      backlog: 'backlog', proses: 'in_progress', dikerjakan: 'in_progress', 'in progress': 'in_progress',
      tertunda: 'pending', pending: 'pending', tunda: 'pending', selesai: 'done', done: 'done',
      complete: 'done', completed: 'done', batal: 'cancelled', dibatalkan: 'cancelled', cancelled: 'cancelled', cancel: 'cancelled'
    };
    if (STATUS_KEYS.includes(raw)) return raw;
    return map[raw] || fallback || 'not_started';
  }
  function normalizePriority(value, fallback) {
    const raw = String(value == null ? '' : value).trim().toLowerCase();
    const map = {
      '': fallback || 'medium', mendesak: 'urgent', urgent: 'urgent', kritis: 'urgent',
      tinggi: 'high', high: 'high', penting: 'high', sedang: 'medium', medium: 'medium', normal: 'medium',
      rendah: 'low', low: 'low', santai: 'low'
    };
    if (PRIORITY_KEYS.includes(raw)) return raw;
    return map[raw] || fallback || 'medium';
  }
  function normalizeChecklist(value) {
    const list = Array.isArray(value) ? value : (Array.isArray(value && value.items) ? value.items : []);
    return list.map(item => {
      if (typeof item === 'string') return { id: uid('c'), text: item.trim(), done: false };
      return {
        id: String(item && item.id || uid('c')),
        text: String(item && (item.text || item.title || item.label) || '').trim(),
        done: Boolean(item && item.done)
      };
    }).filter(item => item.text);
  }
  function normalizeTask(raw) {
    const src = raw && typeof raw === 'object' ? raw : {};
    const done = Boolean(src.done || src.completed || src.selesai);
    const status = done && !src.status ? 'done' : normalizeStatus(src.status, 'not_started');
    const createdAt = src.createdAt || src.created || nowIso();
    const updatedAt = src.updatedAt || src.updated || createdAt;
    const completedAt = src.completedAt || src.finishedAt || (status === 'done' ? (src.completedAt || updatedAt) : null);
    const tagsSource = Array.isArray(src.tags) ? src.tags : String(src.tags || '').split(',');
    const tags = tagsSource.map(t => String(t || '').trim().replace(/^#/, '')).filter(Boolean);
    const recurrenceSource = typeof src.recurrence === 'string' ? src.recurrence : '';
    const recurring = Boolean(src.recurring || src.isRecurring || (src.recurrence && typeof src.recurrence === 'object' && src.recurrence.enabled) || recurrenceSource);
    const recurrenceFrequency = recurring ? normalizeRecurrenceFrequency(src.recurrenceFrequency || recurrenceSource || (src.recurrence && src.recurrence.frequency)) : '';
    const seriesId = src.seriesId ? String(src.seriesId) : (recurring ? String(src.id || uid('series')) : '');
    return {
      id: String(src.id || uid('t')),
      title: String(src.title || src.nama || src.name || src.judul || 'Tanpa judul').trim().slice(0, 240) || 'Tanpa judul',
      project: String(src.project || src.proyek || '').trim().slice(0, 80),
      status,
      priority: normalizePriority(src.priority, 'medium'),
      start: normalizeDate(src.start || src.startDate || src.mulai),
      due: normalizeDate(src.due || src.dueDate || src.deadline || src.tenggat),
      time: normalizeTime(src.time || src.jam),
      tags: [...new Set(tags)].slice(0, 12),
      notes: String(src.notes || src.catatan || src.description || '').trim().slice(0, 8000),
      checklist: normalizeChecklist(src.checklist || src.subtasks || src.items),
      createdAt: String(createdAt),
      updatedAt: String(updatedAt),
      completedAt: status === 'done' ? String(completedAt || updatedAt) : null,
      recurring,
      recurrenceFrequency,
      seriesId,
      spawnedTaskId: String(src.spawnedTaskId || ''),
      previousTaskId: String(src.previousTaskId || '')
    };
  }
  function normalizeActivity(raw) {
    const src = raw && typeof raw === 'object' ? raw : {};
    const allowed = ['create', 'complete', 'reopen', 'status', 'delete', 'import', 'update', 'report', 'calendar', 'drive'];
    return {
      id: String(src.id || uid('a')),
      at: String(src.at || nowIso()),
      kind: allowed.includes(src.kind) ? src.kind : 'update',
      taskId: src.taskId ? String(src.taskId) : '',
      title: String(src.title || '').slice(0, 240),
      detail: String(src.detail || '').slice(0, 240)
    };
  }
  function normalizeReport(raw) {
    const src = raw && typeof raw === 'object' ? raw : {};
    const allowed = ['draft', 'sending', 'sent', 'file_created', 'failed'];
    return {
      id: String(src.id || uid('rep')),
      taskId: String(src.taskId || ''),
      taskTitle: String(src.taskTitle || '').slice(0, 240),
      taskCompletedAt: String(src.taskCompletedAt || ''),
      date: normalizeDate(src.date) || todayKey(),
      nama: String(src.nama || '').slice(0, 120),
      jamAwal: normalizeTime(src.jamAwal),
      jamAkhir: normalizeTime(src.jamAkhir),
      aktivitas: String(src.aktivitas || '').slice(0, 8000),
      keterangan: String(src.keterangan || '').slice(0, 4000),
      evidence: String(src.evidence || '').slice(0, 2000),
      status: allowed.includes(src.status) ? src.status : 'draft',
      driveFileId: String(src.driveFileId || ''),
      driveFileUrl: String(src.driveFileUrl || ''),
      targetUrl: String(src.targetUrl || ''),
      forward: src.forward && typeof src.forward === 'object' ? {
        ok: Boolean(src.forward.ok),
        code: Number(src.forward.code) || 0,
        error: String(src.forward.error || '').slice(0, 500),
        skipped: Boolean(src.forward.skipped)
      } : null,
      manual: Boolean(src.manual),
      sentAt: String(src.sentAt || ''),
      createdAt: String(src.createdAt || nowIso()),
      updatedAt: String(src.updatedAt || nowIso())
    };
  }
  function normalizeData(raw) {
    let src = raw;
    if (src && typeof src === 'object' && src.data && !Array.isArray(src.data)) src = src.data;
    if (Array.isArray(src)) src = { tasks: src };
    if (!src || typeof src !== 'object' || !Array.isArray(src.tasks)) throw new Error('Berkas tidak berisi daftar tugas TUNTAS.');
    const now = nowIso();
    const tasks = src.tasks.map(normalizeTask).filter(t => t.title);
    const seen = new Set();
    const deduped = tasks.filter(t => {
      if (seen.has(t.id)) return false;
      seen.add(t.id);
      return true;
    });
    const activity = (Array.isArray(src.activity) ? src.activity : [])
      .map(normalizeActivity)
      .sort((a, b) => new Date(b.at) - new Date(a.at))
      .slice(0, 120);
    const reports = (Array.isArray(src.reports) ? src.reports : [])
      .map(normalizeReport)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 600);
    return {
      version: APP_VERSION,
      tasks: deduped,
      activity,
      reports,
      createdAt: src.createdAt || now,
      updatedAt: src.updatedAt || now
    };
  }
  function loadData() {
    const raw = readJson(STORE.data, null);
    try {
      if (!raw) return emptyData();
      return normalizeData(raw);
    } catch (err) {
      return emptyData();
    }
  }
  function loadSettings() {
    const raw = readJson(STORE.settings, {});
    const base = defaultSettings();
    if (!raw || typeof raw !== 'object') return base;
    const merged = Object.assign(base, raw, {
      dockPosition: raw.dockPosition && typeof raw.dockPosition === 'object' ? raw.dockPosition : null
    });
    merged.workStart = normalizeTime(merged.workStart) || base.workStart;
    merged.workEnd = normalizeTime(merged.workEnd) || base.workEnd;
    merged.bridgeUrl = String(merged.bridgeUrl || base.bridgeUrl).trim();
    merged.bridgeSecret = String(merged.bridgeSecret || '').trim();
    merged.reportTargetUrl = String(merged.reportTargetUrl || DEFAULT_REPORT_URL).trim();
    merged.reportTargetToken = String(merged.reportTargetToken || '').trim();
    merged.driveSyncEnabled = Boolean(merged.driveSyncEnabled);
    merged.reminderDismissedDate = normalizeDate(merged.reminderDismissedDate);
    merged.version = 2;
    return merged;
  }
  function saveSettings() {
    try {
      writeJson(STORE.settings, settings);
    } catch (err) {
      /* preferensi bisa gagal tanpa menghentikan aplikasi */
    }
  }
  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }
  function isOpenTask(task) {
    return OPEN_STATUSES.includes(task.status);
  }
  function isDoneTask(task) {
    return task.status === 'done';
  }
  function isOverdue(task) {
    return Boolean(task.due && isOpenTask(task) && task.due < todayKey());
  }
  function isDueToday(task) {
    return Boolean(task.due && task.due === todayKey() && isOpenTask(task));
  }
  function isFocusCandidate(task) {
    return isOpenTask(task) && (isOverdue(task) || task.due === todayKey() || task.priority === 'urgent' || task.priority === 'high');
  }
  function completedToday(task) {
    return task.status === 'done' && task.completedAt && dateKey(new Date(task.completedAt)) === todayKey();
  }
  function focusGroups() {
    const overdue = data.tasks.filter(isOverdue).sort(compareSmart);
    const today = data.tasks.filter(isDueToday).sort(compareSmart);
    const priority = data.tasks.filter(t => isOpenTask(t) && !isOverdue(t) && t.due !== todayKey() && (t.priority === 'urgent' || t.priority === 'high')).sort(compareSmart);
    const done = data.tasks.filter(completedToday).sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));
    return { overdue, today, priority, done, open: [...overdue, ...today, ...priority] };
  }
  function priorityRank(p) { return PRIORITY_KEYS.indexOf(p); }
  function statusRank(s) { return STATUS_KEYS.indexOf(s); }
  function compareSmart(a, b) {
    const aDue = a.due || '9999-99-99';
    const bDue = b.due || '9999-99-99';
    if (aDue !== bDue) return aDue < bDue ? -1 : 1;
    const p = priorityRank(a.priority) - priorityRank(b.priority);
    if (p !== 0) return p;
    return new Date(b.updatedAt) - new Date(a.updatedAt);
  }
  function compareBy(sort, a, b) {
    if (sort === 'priority') {
      const p = priorityRank(a.priority) - priorityRank(b.priority);
      return p !== 0 ? p : compareSmart(a, b);
    }
    if (sort === 'due') return compareSmart(a, b);
    if (sort === 'created') return new Date(b.createdAt) - new Date(a.createdAt);
    if (sort === 'updated') return new Date(b.updatedAt) - new Date(a.updatedAt);
    if (sort === 'title') return a.title.localeCompare(b.title, 'id');
    return compareSmart(a, b);
  }
  function taskById(id) { return data.tasks.find(t => t.id === id); }
  function projectsFromTasks() {
    return [...new Set(data.tasks.map(t => t.project).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'id'));
  }
  function statusColor(status) { return 'var(--status-' + normalizeStatus(status, 'not_started') + ')'; }
  function priorityChip(priority, className) {
    const p = PRIORITY_MAP[priority] || PRIORITY_MAP.medium;
    return '<span class="chip ' + (className || '') + '" style="--c:' + PRIORITY_COLORS[p.key] + '">' + esc(p.short) + '</span>';
  }
  function statusLabel(status) { return (STATUS_MAP[status] || STATUS_MAP.not_started).label; }
  function taskProgress(task) {
    if (!task.checklist || !task.checklist.length) return null;
    const done = task.checklist.filter(i => i.done).length;
    return { done, total: task.checklist.length };
  }
  function taskMeta(task) {
    const bits = [];
    if (task.project) bits.push('<span class="project-name-inline">' + esc(task.project) + '</span>');
    if (task.due) {
      const late = isOpenTask(task) ? lateLabel(task) : '';
      bits.push('<span class="' + (late ? 'is-overdue' : '') + '">' + esc(late || dueLabel(task.due)) + '</span>');
    }
    if (task.time) bits.push('<span>' + icon('clock', 10) + ' ' + esc(task.time.replace(':', '.')) + '</span>');
    const progress = taskProgress(task);
    if (progress) bits.push('<span class="checklist-mini">' + icon('check-check', 10) + ' ' + progress.done + '/' + progress.total + '</span>');
    if (task.recurring) bits.push('<span class="task-repeat" title="Tugas berulang">' + icon('repeat', 10) + ' ' + esc(recurrenceLabel(task.recurrenceFrequency)) + '</span>');
    if (task.tags && task.tags.length) bits.push('<span class="task-tags">' + task.tags.map(t => '<span class="tag">#' + esc(t) + '</span>').join('') + '</span>');
    return bits.join('<span class="sep">·</span>');
  }

  /* ---------- state ---------- */
  let data = loadData();
  let settings = loadSettings();
  let ui = {
    view: 'dashboard',
    filters: Object.assign({}, DEFAULT_FILTERS),
    calendarCursor: startOfMonthKey(todayKey()),
    selectedDate: todayKey(),
    timelineCursor: startOfMonthKey(todayKey()),
    taskModal: null,
    dataModalOpen: false,
    pendingImport: null,
    pendingConfirm: null,
    draggedTaskId: null,
    lastFocused: null,
    saveTimer: null,
    saveTimer2: null,
    fileTimer: null,
    fileHandle: null,
    filePermission: 'unknown',
    fileBusy: false,
    pipWindow: null,
    reminderOpen: false,
    reportModal: null,
    reportDetailId: '',
    calendarModalOpen: false,
    bridgeBusy: false,
    driveBusy: false,
    driveTimer: null
  };

  function setTheme(pref, announce) {
    const choice = THEME_ORDER.includes(pref) ? pref : 'system';
    try { localStorage.setItem(STORE.theme, choice); } catch (err) { /* noop */ }
    applyTheme(choice);
    updateThemeButton(choice);
    if (announce) toast('Tema: ' + THEME_LABEL[choice].toLowerCase(), { iconName: choice === 'dark' ? 'moon' : choice === 'light' ? 'sun' : 'monitor' });
  }
  function resolvedTheme() {
    const pref = (() => { try { return localStorage.getItem(STORE.theme) || 'system'; } catch (err) { return 'system'; } })();
    if (pref === 'dark' || pref === 'light') return pref;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function applyTheme(pref) {
    const dark = pref === 'dark' || (pref === 'system' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', dark ? '#0b1310' : '#f7f2e8');
    if (ui.pipWindow && !ui.pipWindow.closed) {
      try { ui.pipWindow.document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light'); } catch (err) { /* noop */ }
    }
  }
  function updateThemeButton(pref) {
    const btn = document.getElementById('theme-btn');
    if (!btn) return;
    const choice = THEME_ORDER.includes(pref) ? pref : 'system';
    btn.innerHTML = icon(choice === 'dark' ? 'moon' : choice === 'light' ? 'sun' : 'monitor', 18);
    btn.title = 'Tema: ' + THEME_LABEL[choice] + ' — klik untuk berganti';
    btn.setAttribute('aria-label', 'Ganti tema, sekarang ' + THEME_LABEL[choice]);
  }
  function cycleTheme() {
    let current = 'system';
    try { current = localStorage.getItem(STORE.theme) || 'system'; } catch (err) { /* noop */ }
    const next = THEME_ORDER[(THEME_ORDER.indexOf(current) + 1) % THEME_ORDER.length];
    setTheme(next, true);
  }

  /* ---------- simpan & indikator ---------- */
  function markSave(state, message) {
    const pill = document.getElementById('header-save');
    const text = document.getElementById('header-save-text');
    const footer = document.getElementById('footer-status');
    const footerText = document.getElementById('footer-status-text');
    if (pill) {
      pill.classList.toggle('is-saving', state === 'saving');
      pill.classList.toggle('is-error', state === 'error');
      if (text) text.textContent = state === 'saving' ? 'Menyimpan…' : state === 'error' ? 'Gagal menyimpan' : 'Tersimpan';
    }
    if (footer) footer.classList.toggle('is-error', state === 'error');
    if (footerText) {
      if (message) footerText.textContent = message;
      else if (state === 'saving') footerText.textContent = 'Menyimpan di perangkat ini…';
      else if (state === 'error') footerText.textContent = 'Penyimpanan perangkat penuh atau diblokir';
      else footerText.textContent = 'Tersimpan di perangkat ini · ' + clockNow();
    }
  }
  function persistData(options) {
    const opts = options || {};
    data.updatedAt = nowIso();
    markSave('saving');
    try {
      writeJson(STORE.data, data);
      clearTimeout(ui.saveTimer);
      clearTimeout(ui.saveTimer2);
      ui.saveTimer = setTimeout(function () {
        markSave('saved');
        if (opts.message) toast(opts.message, { type: opts.toastType || 'success', iconName: opts.toastIcon });
      }, 260);
      scheduleFileSync();
      scheduleDriveSync();
      return true;
    } catch (err) {
      markSave('error');
      toast('Data tidak bisa disimpan. Ruang penyimpanan mungkin penuh.', { type: 'error', iconName: 'alert-triangle', duration: 6000 });
      return false;
    }
  }
  function saveAndRender(options) {
    const opts = options || {};
    const focusInfo = captureFocus();
    const boardScroll = document.querySelector('.board') ? document.querySelector('.board').scrollLeft : 0;
    const timelineScroll = document.querySelector('.timeline-scroll') ? document.querySelector('.timeline-scroll').scrollLeft : 0;
    const ok = persistData(opts);
    if (opts.render !== false) renderAll();
    restoreFocus(focusInfo);
    restoreScrolls(boardScroll, timelineScroll);
    if (!ok) return false;
    return true;
  }
  function captureFocus() {
    const el = document.activeElement;
    if (!el || el === document.body) return null;
    if (el.id) return { id: el.id };
    if (el.dataset && el.dataset.action) return { action: el.dataset.action, id: el.dataset.id || '', view: el.dataset.view || '' };
    if (el.dataset && el.dataset.filter) return { filter: el.dataset.filter, tag: el.tagName };
    return null;
  }
  function restoreFocus(info) {
    if (!info) return;
    let el = null;
    if (info.id) el = document.getElementById(info.id);
    else if (info.action) {
      const selector = '[data-action="' + info.action + '"]' + (info.id ? '[data-id="' + info.id.replace(/"/g, '\\"') + '"]' : '') + (info.view ? '[data-view="' + info.view + '"]' : '');
      el = document.querySelector(selector);
    } else if (info.filter) {
      el = document.querySelector('[data-filter="' + info.filter + '"]');
    }
    if (el && typeof el.focus === 'function') {
      try { el.focus({ preventScroll: true }); } catch (err) { /* noop */ }
    }
  }
  function restoreScrolls(board, timeline) {
    if (board) {
      const el = document.querySelector('.board');
      if (el) el.scrollLeft = board;
    }
    if (timeline) {
      const el = document.querySelector('.timeline-scroll');
      if (el) el.scrollLeft = timeline;
    }
  }

  /* ---------- toast & konfirmasi ---------- */
  function toast(message, options) {
    const opts = options || {};
    const root = document.getElementById('toast-root');
    if (!root) return;
    while (root.children.length >= 3) root.removeChild(root.firstElementChild);
    const el = document.createElement('div');
    el.className = 'toast' + (opts.type === 'error' ? ' is-error' : opts.type === 'warn' ? ' is-warn' : '');
    const iconName = opts.iconName || (opts.type === 'error' ? 'alert-triangle' : opts.type === 'warn' ? 'info' : 'check');
    el.innerHTML = '<span class="toast-icon">' + icon(iconName, 13) + '</span><span class="toast-text">' + esc(message) + '</span>';
    root.appendChild(el);
    const duration = opts.duration || 3200;
    setTimeout(function () {
      el.classList.add('is-out');
      setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 240);
    }, duration);
  }
  function askConfirm(config) {
    const cfg = Object.assign({ title: 'Yakin?', message: '', confirmLabel: 'Hapus', cancelLabel: 'Batal', danger: true, iconName: 'alert-triangle' }, config || {});
    ui.pendingConfirm = cfg.onConfirm || null;
    ui.lastFocused = document.activeElement;
    const root = document.getElementById('confirm-root');
    root.innerHTML = '<div class="modal-backdrop" data-modal="confirm">' +
      '<div class="modal-card confirm-card" role="dialog" aria-modal="true" aria-labelledby="confirm-title">' +
      '<div class="modal-head"><div><h2 id="confirm-title">' + esc(cfg.title) + '</h2><p>' + esc(cfg.message) + '</p></div>' +
      '<button type="button" class="icon-btn modal-close" data-action="confirm-cancel" aria-label="Tutup">' + icon('x', 17) + '</button></div>' +
      '<div class="confirm-actions"><button type="button" class="btn btn-ghost" data-action="confirm-cancel">' + esc(cfg.cancelLabel) + '</button>' +
      '<button type="button" class="btn ' + (cfg.danger ? 'btn-danger' : 'btn-primary') + '" data-action="confirm-accept">' + esc(cfg.confirmLabel) + '</button></div></div></div>';
    syncBodyLock();
    setTimeout(function () { const btn = root.querySelector('[data-action="confirm-cancel"]'); if (btn) btn.focus(); }, 30);
  }
  function closeConfirm() {
    document.getElementById('confirm-root').innerHTML = '';
    ui.pendingConfirm = null;
    syncBodyLock();
    if (ui.lastFocused && typeof ui.lastFocused.focus === 'function') {
      try { ui.lastFocused.focus({ preventScroll: true }); } catch (err) { /* noop */ }
    }
  }
  function syncBodyLock() {
    const locked = Boolean(document.querySelector('.modal-backdrop')) || Boolean(document.querySelector('.dock-scrim'));
    document.body.classList.toggle('is-locked', locked);
  }

  /* ---------- tema awal ---------- */
  (function bootTheme() {
    let pref = 'system';
    try { pref = localStorage.getItem(STORE.theme) || 'system'; } catch (err) { /* noop */ }
    applyTheme(pref);
    updateThemeButton(pref);
  })();

  /* ---------- render inti ---------- */
  function initStaticIcons() {
    document.querySelectorAll('[data-icon]').forEach(el => {
      el.innerHTML = icon(el.getAttribute('data-icon'), Number(el.getAttribute('data-size')) || 17);
    });
  }

  function renderAll() {
    renderNav();
    renderHeaderBits();
    renderMain();
    renderDock();
    updateDocumentTitle();
  }

  function updateDocumentTitle() {
    document.title = 'TUNTAS — ' + (VIEW_META[ui.view] ? VIEW_META[ui.view].title : 'Ruang kerja pribadi');
  }

  function renderNav() {
    const nav = document.getElementById('app-nav');
    if (!nav) return;
    const openCount = data.tasks.filter(isOpenTask).length;
    const focusCount = focusGroups().open.length;
    const reportCount = pendingReportsToday();
    const reminderCount = upcomingReminderTasks().length;
    nav.innerHTML = VIEWS.map(key => {
      const meta = VIEW_META[key];
      let badge = '';
      if (key === 'tasks' && openCount > 0) badge = '<span class="nav-badge">' + openCount + '</span>';
      if (key === 'focus' && focusCount > 0) badge = '<span class="nav-badge">' + focusCount + '</span>';
      if (key === 'report' && reportCount > 0) badge = '<span class="nav-badge">' + reportCount + '</span>';
      return '<button type="button" class="nav-btn' + (ui.view === key ? ' is-active' : '') + '" data-action="nav" data-view="' + key + '"' + (ui.view === key ? ' aria-current="page"' : '') + '>' + icon(meta.icon, 15) + '<span>' + meta.label + '</span>' + badge + '</button>';
    }).join('') + '<button type="button" class="nav-btn nav-reminder-btn" data-action="open-reminder" title="Pengingat tenggat waktu">' + icon('bell', 15) + '<span>Pengingat</span>' + (reminderCount > 0 ? '<span class="nav-badge">' + reminderCount + '</span>' : '') + '</button>';
  }

  function renderHeaderBits() {
    const groups = focusGroups();
    const count = document.getElementById('focus-header-count');
    if (count) count.textContent = String(groups.open.length);
    const btn = document.querySelector('.focus-header-btn');
    if (btn) {
      btn.classList.toggle('is-active', ui.view === 'focus');
      btn.title = groups.open.length ? 'Fokus hari ini — ' + groups.open.length + ' tugas menunggu' : 'Fokus hari ini — semua beres';
    }
    const pill = document.getElementById('header-save');
    if (pill) pill.title = data.tasks.length + ' tugas · ' + data.activity.length + ' aktivitas · data lokal';
  }

  function renderMain() {
    const main = document.getElementById('main');
    if (!main) return;
    const boardScroll = document.querySelector('.board') ? document.querySelector('.board').scrollLeft : 0;
    const tlScroll = document.querySelector('.timeline-scroll') ? document.querySelector('.timeline-scroll').scrollLeft : 0;
    let html = '';
    switch (ui.view) {
      case 'tasks': html = renderTasksView(); break;
      case 'board': html = renderBoardView(); break;
      case 'calendar': html = renderCalendarView(); break;
      case 'timeline': html = renderTimelineView(); break;
      case 'focus': html = renderFocusView(); break;
      case 'report': html = renderReportView(); break;
      default: html = renderDashboardView(); break;
    }
    main.innerHTML = html;
    restoreScrolls(boardScroll, tlScroll);
    if (ui.view === 'timeline' && !tlScroll) scrollTimelineToToday();
  }

  function emptyState(iconName, title, description, actionHtml, success) {
    return '<div class="empty"><div class="empty-icon' + (success ? ' is-success' : '') + '">' + icon(iconName, 22) + '</div>' +
      '<h3>' + esc(title) + '</h3><p>' + esc(description) + '</p>' + (actionHtml || '') + '</div>';
  }

  function panelHead(title, iconName, count, actionHtml) {
    return '<div class="panel-head"><h2 class="panel-title">' + icon(iconName, 15) + esc(title) +
      (count != null ? '<span class="count-pill">' + count + '</span>' : '') + '</h2>' + (actionHtml || '') + '</div>';
  }

  function miniTaskHtml(task, withDate) {
    const late = lateLabel(task);
    const meta = [];
    if (task.project) meta.push('<span>' + esc(task.project) + '</span>');
    if (task.time) meta.push('<span>' + esc(task.time.replace(':', '.')) + '</span>');
    if (late) meta.push('<span class="is-overdue">' + esc(late) + '</span>');
    else if (withDate && task.due) meta.push('<span>' + esc(dueLabel(task.due)) + '</span>');
    const progress = taskProgress(task);
    if (progress) meta.push('<span>' + progress.done + '/' + progress.total + '</span>');
    return '<li class="mini-task">' +
      '<button type="button" class="mini-check" data-action="toggle-done" data-id="' + esc(task.id) + '" title="Tandai selesai" aria-label="Tandai selesai: ' + esc(task.title) + '">' + icon('check', 11) + '</button>' +
      '<button type="button" class="mini-main" data-action="edit-task" data-id="' + esc(task.id) + '">' +
      '<span class="mini-title">' + esc(task.title) + '</span>' +
      (meta.length ? '<span class="mini-meta">' + meta.join('') + '</span>' : '') + '</button>' +
      '<span class="mini-priority" style="--c:' + PRIORITY_COLORS[task.priority] + '" title="Prioritas ' + esc(PRIORITY_MAP[task.priority].label) + '"></span>' +
      (withDate ? '<span class="mini-date">' + (late ? '<span class="is-overdue">' + esc(dueLabel(task.due)) + '</span>' : esc(dueLabel(task.due))) + '</span>' : '') +
      '</li>';
  }

  function renderDashboardView() {
    const groups = focusGroups();
    const open = data.tasks.filter(isOpenTask);
    const overdue = data.tasks.filter(isOverdue);
    const dueToday = data.tasks.filter(t => isOpenTask(t) && t.due === todayKey());
    const doneToday = groups.done;
    const focusOpen = groups.open;
    const focusDone = groups.done;
    const focusPercent = pct(focusDone.length, focusDone.length + focusOpen.length);
    const weekAgo = addDaysKey(todayKey(), -6);
    const doneWeek = data.tasks.filter(t => t.status === 'done' && t.completedAt && dateKey(new Date(t.completedAt)) >= weekAgo);
    const upcoming = open.filter(t => t.due && t.due > todayKey() && t.due <= addDaysKey(todayKey(), 7)).sort(compareSmart).slice(0, 6);
    const todayTasks = open.filter(t => t.due === todayKey()).sort(compareSmart);
    const name = settings.name ? esc(settings.name) : 'kamu';
    const heroSub = data.tasks.length === 0
      ? 'Belum ada tugas. Tulis satu hal yang paling penting, lalu jalani harimu dengan tenang.'
      : (overdue.length
        ? '<strong>' + overdue.length + ' tugas terlambat</strong> dan <strong>' + dueToday.length + ' jatuh tempo hari ini</strong>. Mulai dari yang paling berat, sisanya bisa menyusul.'
        : dueToday.length
          ? '<strong>' + dueToday.length + ' tugas menunggu hari ini</strong>. Tidak perlu semuanya sekaligus — satu langkah kecil sudah cukup.'
          : 'Tidak ada yang mendesak hari ini. Waktu yang bagus untuk merapikan rencana atau beristirahat sejenak.');
    let html = '<section class="view view-dashboard" aria-labelledby="view-title">' +
      '<div class="hero"><div class="hero-main">' +
      '<p class="hero-eyebrow">' + esc(formatDateLong(todayKey())) + ' · ' + esc(greeting()) + '</p>' +
      '<h1 id="view-title">' + esc(greeting()) + ', ' + name + '.<br><span class="accent">Satu hal dulu.</span></h1>' +
      '<p class="hero-sub">' + heroSub + '</p>' +
      '<div class="hero-actions"><button type="button" class="btn btn-primary" data-action="goto-focus">' + icon('target', 15) + 'Fokus hari ini</button>' +
      '<button type="button" class="btn btn-ghost" data-action="nav" data-view="tasks">' + icon('list-todo', 15) + 'Lihat semua tugas</button></div>' +
      '</div><div class="hero-ring" style="--p:' + focusPercent + '" title="' + focusDone.length + ' dari ' + (focusDone.length + focusOpen.length) + ' fokus selesai"><strong>' + focusPercent + '%</strong><span>fokus</span></div></div>' +
      '<form class="quick-capture" id="quick-capture" autocomplete="off">' +
      '<span class="quick-capture-icon">' + icon('plus-circle', 18) + '</span>' +
      '<input type="text" name="title" maxlength="200" required placeholder="Catat satu tugas untuk hari ini…" aria-label="Judul tugas cepat">' +
      '<select name="priority" aria-label="Prioritas tugas cepat">' + PRIORITIES.map(p => '<option value="' + p.key + '"' + (p.key === 'medium' ? ' selected' : '') + '>' + p.label + '</option>').join('') + '</select>' +
      '<button type="submit" class="btn btn-primary btn-compact">' + icon('plus', 14) + '<span>Tambah</span></button></form>';

    if (data.tasks.length === 0) {
      html += '<div class="onboarding"><div class="onboarding-icon">' + icon('sparkles', 24) + '</div><div>' +
        '<h2>Ruang kerjamu masih bersih.</h2><p>TUNTAS menyimpan semuanya di peramban ini. Tidak ada akun, tidak ada server. Mulai dari satu tugas, lalu pindahkan ke papan, kalender, atau fokus hari ini.</p>' +
        '<ul class="onboarding-steps"><li><strong>1. Catat</strong>Tulis satu hal yang ingin selesai.</li><li><strong>2. Atur</strong>Beri proyek, prioritas, dan tenggat.</li><li><strong>3. Bawa</strong>Ekspor cadangan untuk pindah perangkat.</li></ul>' +
        '<div class="onboarding-actions"><button type="button" class="btn btn-primary" data-action="new-task">' + icon('plus', 15) + 'Tugas pertama</button><button type="button" class="btn btn-ghost" data-action="sample-data">' + icon('sparkles', 15) + 'Isi dengan data contoh</button></div>' +
        '</div></div></section>';
      return html;
    }

    html += '<div class="stat-grid">' +
      '<div class="stat-card"><span class="stat-label">Terbuka</span><span class="stat-value">' + open.length + '</span><span class="stat-sub">' + dueToday.length + ' jatuh tempo hari ini</span></div>' +
      '<div class="stat-card"><span class="stat-label">Terlambat</span><span class="stat-value' + (overdue.length ? ' is-danger' : '') + '">' + overdue.length + '</span><span class="stat-sub">' + (overdue.length ? 'Perlu dibereskan' : 'Tidak ada yang tertinggal') + '</span></div>' +
      '<div class="stat-card"><span class="stat-label">Selesai 7 hari</span><span class="stat-value">' + doneWeek.length + '</span><span class="stat-sub">Momentum minggu ini</span></div>' +
      '<div class="stat-card"><span class="stat-label">Fokus hari ini</span><span class="stat-value' + (focusOpen.length ? ' is-warning' : '') + '">' + focusOpen.length + '</span><span class="stat-sub">' + doneToday.length + ' selesai hari ini</span></div></div>';

    const totalTasks = data.tasks.length;
    html += '<div class="status-grid">' + STATUSES.map(s => {
      const count = data.tasks.filter(t => t.status === s.key).length;
      const percent = pct(count, totalTasks);
      return '<button type="button" class="status-card" data-action="filter-status" data-status="' + s.key + '" title="Lihat tugas ' + esc(s.label) + '" style="--c:var(--status-' + s.key + ')">' +
        '<span class="status-card-top"><span class="status-dot"></span><span class="status-card-count">' + count + '</span></span>' +
        '<span class="status-card-label">' + esc(s.label) + '</span><span class="status-track"><span class="status-fill" style="width:' + percent + '%"></span></span>' +
        '<span class="status-card-pct">' + percent + '% dari semua</span></button>';
    }).join('') + '</div>';

    html += '<div class="grid-2">' +
      '<section class="panel">' + panelHead('Hari ini', 'sun', todayTasks.length, '<button type="button" class="panel-link" data-action="nav" data-view="tasks">Semua tugas ' + icon('arrow-right', 12) + '</button>') +
      (todayTasks.length ? '<ul class="mini-list">' + todayTasks.slice(0, 6).map(t => miniTaskHtml(t, false)).join('') + '</ul>' : emptyState('check-circle', 'Hari ini lapang', 'Tidak ada tugas yang jatuh tempo. Nikmati ruang yang tenang, atau tarik satu rencana dari daftar berikutnya.', '<button type="button" class="btn btn-ghost btn-compact" data-action="new-task" data-due="' + todayKey() + '">' + icon('plus', 13) + 'Tugas hari ini</button>', true)) +
      '</section>' +
      '<section class="panel">' + panelHead('Berikutnya', 'calendar', upcoming.length, '<button type="button" class="panel-link" data-action="nav" data-view="calendar">Kalender ' + icon('arrow-right', 12) + '</button>') +
      (upcoming.length ? '<ul class="mini-list">' + upcoming.map(t => miniTaskHtml(t, true)).join('') + '</ul>' : emptyState('calendar', 'Belum ada jadwal terdekat', 'Tugas dengan tenggat dalam tujuh hari ke depan akan muncul di sini.', '<button type="button" class="btn btn-ghost btn-compact" data-action="nav" data-view="timeline">' + icon('gantt', 13) + 'Buka timeline</button>')) +
      '</section></div>';

    const projectRows = projectsFromTasks().map(name => {
      const tasks = data.tasks.filter(t => t.project === name);
      const active = tasks.filter(t => t.status !== 'cancelled');
      const done = active.filter(t => t.status === 'done').length;
      const percent = pct(done, active.length);
      return '<button type="button" class="project-row" data-action="filter-project" data-project="' + esc(name) + '">' +
        '<span class="project-head"><span class="project-name">' + esc(name) + '</span><span class="project-meta">' + done + '/' + active.length + ' · ' + percent + '%</span></span>' +
        '<span class="project-track"><span class="project-fill" style="width:' + percent + '%"></span></span></button>';
    }).join('');
    html += '<div class="grid-2">' +
      '<section class="panel">' + panelHead('Proyek berjalan', 'folder', null, '<button type="button" class="panel-link" data-action="nav" data-view="board">Papan ' + icon('arrow-right', 12) + '</button>') +
      (projectRows ? '<div class="project-list">' + projectRows + '</div>' : emptyState('folder', 'Belum ada proyek', 'Tambahkan nama proyek pada tugas untuk melihat kemajuannya di sini.', '<button type="button" class="btn btn-ghost btn-compact" data-action="new-task">' + icon('plus', 13) + 'Tugas baru</button>')) +
      '</section>' +
      '<section class="panel">' + panelHead('Momentum', 'activity', null, '<span class="stat-sub">7 hari terakhir</span>') + momentumHtml() + '</section>' +
      '</div>';

    const acts = data.activity.slice(0, 6);
    html += '<section class="panel">' + panelHead('Aktivitas terakhir', 'refresh', acts.length, '<button type="button" class="panel-link" data-action="open-data">Kelola data ' + icon('arrow-right', 12) + '</button>') +
      (acts.length ? '<ul class="activity-list">' + acts.map(activityHtml).join('') + '</ul>' : '<p class="empty-inline">Belum ada aktivitas. Setiap perubahan kecil akan tampil di sini.</p>') +
      '</section></section>';
    return html;
  }

  function momentumHtml() {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const key = addDaysKey(todayKey(), -i);
      const count = data.tasks.filter(t => t.status === 'done' && t.completedAt && dateKey(new Date(t.completedAt)) === key).length;
      days.push({ key, count });
    }
    const max = Math.max(1, ...days.map(d => d.count));
    const total = days.reduce((n, d) => n + d.count, 0);
    return '<div class="momentum-wrap"><div class="momentum-chart">' + days.map(d => {
      const height = Math.max(3, Math.round((d.count / max) * 100));
      return '<div class="momentum-col" title="' + esc(formatDateLong(d.key)) + ' · ' + d.count + ' selesai"><div class="momentum-bar-holder"><div class="momentum-bar" style="height:' + height + '%"></div></div><span class="momentum-label">' + WEEKDAYS_MINI[(parseKey(d.key).getDay() + 6) % 7] + '</span></div>';
    }).join('') + '</div><div class="momentum-foot"><span><strong>' + total + '</strong> tugas selesai minggu ini</span><span>Rata-rata ' + (total / 7).toFixed(1).replace('.', ',') + '/hari</span></div></div>';
  }

  function activityHtml(act) {
    const kind = act.kind || 'update';
    const iconName = kind === 'create' ? 'plus' : kind === 'complete' ? 'check' : kind === 'status' ? 'flag' : kind === 'delete' ? 'trash' : kind === 'import' ? 'download' : 'pencil';
    let text = '';
    if (kind === 'create') text = 'Menambahkan <strong>' + esc(act.title) + '</strong>';
    else if (kind === 'complete') text = 'Menyelesaikan <strong>' + esc(act.title) + '</strong>';
    else if (kind === 'reopen') text = 'Membuka kembali <strong>' + esc(act.title) + '</strong>';
    else if (kind === 'status') text = 'Memindahkan <strong>' + esc(act.title) + '</strong> ke ' + esc(act.detail || 'status baru');
    else if (kind === 'delete') text = 'Menghapus <strong>' + esc(act.title) + '</strong>';
    else if (kind === 'import') text = esc(act.detail || 'Memperbarui data');
    else text = 'Memperbarui <strong>' + esc(act.title) + '</strong>';
    return '<li class="activity-item"><span class="activity-icon kind-' + kind + '">' + icon(iconName, 13) + '</span><div class="activity-main">' + text + '</div><span class="activity-time">' + esc(timeAgo(act.at)) + '</span></li>';
  }

  function renderTasksView() {
    const hasFilters = ui.filters.search || ui.filters.status !== 'all' || ui.filters.priority !== 'all' || ui.filters.project !== 'all';
    const projectOptions = '<option value="all">Semua proyek</option><option value="__none" ' + (ui.filters.project === '__none' ? 'selected' : '') + '>Tanpa proyek</option>' + projectsFromTasks().map(p => '<option value="' + esc(p) + '"' + (ui.filters.project === p ? ' selected' : '') + '>' + esc(p) + '</option>').join('');
    const total = data.tasks.length;
    const visible = filteredTasks().length;
    return '<section class="view view-tasks" aria-labelledby="view-title">' +
      '<div class="page-head"><div><p class="eyebrow">Semua pekerjaan, satu tempat</p><h1 id="view-title">Tugas</h1><p>Urutkan, saring, dan selesaikan satu per satu. ' + total + ' tugas tersimpan di perangkat ini.</p></div>' +
      '<div class="page-head-actions"><button type="button" class="btn btn-ghost" data-action="export-ics">' + icon('calendar', 15) + 'Ekspor .ics</button><button type="button" class="btn btn-primary" data-action="new-task">' + icon('plus', 15) + 'Tugas baru</button></div></div>' +
      '<div class="toolbar">' +
      '<label class="search-box">' + icon('search', 15) + '<input type="search" id="task-search" data-filter="search" placeholder="Cari tugas, proyek, tag…" value="' + esc(ui.filters.search) + '" aria-label="Cari tugas"></label>' +
      '<select class="select" data-filter="status" aria-label="Saring status"><option value="all">Semua status</option>' + STATUSES.map(s => '<option value="' + s.key + '"' + (ui.filters.status === s.key ? ' selected' : '') + '>' + s.label + '</option>').join('') + '</select>' +
      '<select class="select" data-filter="priority" aria-label="Saring prioritas"><option value="all">Semua prioritas</option>' + PRIORITIES.map(p => '<option value="' + p.key + '"' + (ui.filters.priority === p.key ? ' selected' : '') + '>' + p.label + '</option>').join('') + '</select>' +
      '<select class="select" data-filter="project" aria-label="Saring proyek">' + projectOptions + '</select>' +
      '<select class="select" data-filter="sort" aria-label="Urutkan tugas"><option value="smart" ' + (ui.filters.sort === 'smart' ? 'selected' : '') + '>Urutan cerdas</option><option value="due" ' + (ui.filters.sort === 'due' ? 'selected' : '') + '>Tenggat</option><option value="priority" ' + (ui.filters.sort === 'priority' ? 'selected' : '') + '>Prioritas</option><option value="created" ' + (ui.filters.sort === 'created' ? 'selected' : '') + '>Terbaru</option><option value="title" ' + (ui.filters.sort === 'title' ? 'selected' : '') + '>Judul A–Z</option></select>' +
      '<span id="filter-clear-slot">' + (hasFilters ? '<button type="button" class="filter-clear" data-action="clear-filters">' + icon('x', 12) + 'Bersihkan</button>' : '') + '</span>' +
      '</div>' +
      '<div class="result-line" id="task-result-line">' + taskResultLine(visible, total) + '</div>' +
      '<div id="task-results">' + taskGroupsHtml(filteredTasks()) + '</div></section>';
  }

  function taskResultLine(visible, total) {
    const active = [];
    if (ui.filters.search) active.push('carian “' + esc(ui.filters.search) + '”');
    if (ui.filters.status !== 'all') active.push('status ' + esc(statusLabel(ui.filters.status)));
    if (ui.filters.priority !== 'all') active.push('prioritas ' + esc((PRIORITY_MAP[ui.filters.priority] || {}).label || ui.filters.priority));
    if (ui.filters.project !== 'all') active.push('proyek ' + esc(ui.filters.project === '__none' ? 'tanpa proyek' : ui.filters.project));
    return 'Menampilkan <strong>' + visible + '</strong> dari <strong>' + total + '</strong> tugas' + (active.length ? ' <span class="dot-sep">·</span> ' + active.join(' <span class="dot-sep">·</span> ') : '');
  }

  function filteredTasks() {
    const q = ui.filters.search.trim().toLowerCase();
    return data.tasks.filter(task => {
      if (ui.filters.status !== 'all' && task.status !== ui.filters.status) return false;
      if (ui.filters.priority !== 'all' && task.priority !== ui.filters.priority) return false;
      if (ui.filters.project === '__none' && task.project) return false;
      if (ui.filters.project !== 'all' && ui.filters.project !== '__none' && task.project !== ui.filters.project) return false;
      if (q) {
        const hay = [task.title, task.project, task.notes, task.tags.join(' ')].join(' ').toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }

  function taskGroupsHtml(tasks) {
    if (!tasks.length) {
      const hasTasks = data.tasks.length > 0;
      const hasFilters = ui.filters.search || ui.filters.status !== 'all' || ui.filters.priority !== 'all' || ui.filters.project !== 'all';
      return emptyState(hasTasks ? 'search' : 'inbox', hasTasks ? 'Tidak ada yang cocok' : 'Belum ada tugas',
        hasTasks ? 'Coba kata kunci lain atau bersihkan saringan untuk melihat semua tugas.' : 'Mulai dengan satu tugas kecil. Kamu tidak harus menulis semuanya sekarang.',
        hasFilters ? '<button type="button" class="btn btn-ghost btn-compact" data-action="clear-filters">' + icon('x', 13) + 'Bersihkan saringan</button>' : '<button type="button" class="btn btn-primary btn-compact" data-action="new-task">' + icon('plus', 13) + 'Tugas pertama</button>', !hasTasks ? false : true);
    }
    const today = todayKey();
    const groups = [
      { key: 'overdue', label: 'Terlambat', tasks: [] },
      { key: 'today', label: 'Hari ini', tasks: [] },
      { key: 'tomorrow', label: 'Besok', tasks: [] },
      { key: 'week', label: 'Tujuh hari ke depan', tasks: [] },
      { key: 'later', label: 'Nanti', tasks: [] },
      { key: 'none', label: 'Tanpa tenggat', tasks: [] },
      { key: 'closed', label: 'Selesai & dibatalkan', tasks: [] }
    ];
    tasks.forEach(task => {
      const group = !isOpenTask(task) ? groups[6] : !task.due ? groups[5] : task.due < today ? groups[0] : task.due === today ? groups[1] : task.due === addDaysKey(today, 1) ? groups[2] : task.due <= addDaysKey(today, 7) ? groups[3] : groups[4];
      group.tasks.push(task);
    });
    return '<div class="task-groups">' + groups.filter(g => g.tasks.length).map(group => {
      group.tasks.sort((a, b) => compareBy(ui.filters.sort, a, b));
      return '<section class="task-group"><div class="task-group-head"><h2 class="task-group-title' + (group.key === 'overdue' ? ' is-overdue' : '') + '">' + group.label + '</h2><span class="task-group-line"></span><span class="task-group-count">' + group.tasks.length + '</span></div>' +
        '<div class="task-list">' + group.tasks.map(taskRowHtml).join('') + '</div></section>';
    }).join('') + '</div>';
  }

  function taskRowHtml(task) {
    const done = task.status === 'done';
    const late = isOverdue(task);
    const isToday = task.due === todayKey() && isOpenTask(task);
    const status = STATUS_MAP[task.status] || STATUS_MAP.not_started;
    const dateText = task.due ? (late ? lateLabel(task) : dueLabel(task.due)) : '';
    return '<article class="task-row' + (done ? ' is-done' : '') + '" data-task-id="' + esc(task.id) + '">' +
      '<button type="button" class="status-orb" data-action="toggle-done" data-id="' + esc(task.id) + '" style="--c:' + statusColor(task.status) + '" title="' + (done ? 'Buka kembali tugas' : 'Tandai selesai') + '" aria-label="' + (done ? 'Buka kembali: ' : 'Selesaikan: ') + esc(task.title) + '">' + icon(done ? 'check' : status.icon, 12) + '</button>' +
      '<button type="button" class="task-main" data-action="edit-task" data-id="' + esc(task.id) + '"><span class="task-title"><span class="title-text">' + esc(task.title) + '</span></span>' +
      (taskMeta(task) ? '<span class="task-sub">' + taskMeta(task) + '</span>' : '') + '</button>' +
      priorityChip(task.priority) +
      (dateText ? '<span class="task-date' + (late ? ' is-overdue' : isToday ? ' is-today' : '') + '" title="' + esc(dueFullLabel(task)) + '">' + icon('calendar', 12) + esc(dateText) + '</span>' : '') +
      '<div class="task-actions"><button type="button" class="icon-btn" data-action="edit-task" data-id="' + esc(task.id) + '" title="Ubah tugas" aria-label="Ubah tugas">' + icon('pencil', 14) + '</button>' +
      '<button type="button" class="icon-btn" data-action="duplicate-task" data-id="' + esc(task.id) + '" title="Duplikat tugas" aria-label="Duplikat tugas">' + icon('copy', 14) + '</button>' +
      '<button type="button" class="icon-btn delete-btn" data-action="delete-task" data-id="' + esc(task.id) + '" title="Hapus tugas" aria-label="Hapus tugas">' + icon('trash', 14) + '</button></div></article>';
  }

  function renderBoardView() {
    const openCount = data.tasks.filter(isOpenTask).length;
    return '<section class="view view-board" aria-labelledby="view-title">' +
      '<div class="page-head"><div><p class="eyebrow">Alur kerja sekilas pandang</p><h1 id="view-title">Papan</h1><p>Seret kartu ke kolom lain untuk memindahkan status. Semua perubahan langsung tersimpan.</p></div>' +
      '<div class="page-head-actions"><span class="chip neutral">' + icon('columns', 12) + openCount + ' aktif</span><button type="button" class="btn btn-primary" data-action="new-task">' + icon('plus', 15) + 'Tugas baru</button></div></div>' +
      '<div class="board">' + STATUSES.map(s => {
        const tasks = data.tasks.filter(t => t.status === s.key).sort(compareSmart);
        return '<section class="board-col" data-column-status="' + s.key + '" aria-label="Kolom ' + s.label + '">' +
          '<div class="board-col-head"><span class="status-dot" style="--c:var(--status-' + s.key + ')"></span><span class="board-col-title">' + s.label + '</span><span class="board-col-count">' + tasks.length + '</span><button type="button" class="board-col-add" data-action="new-task" data-status="' + s.key + '" title="Tambah ke ' + s.label + '" aria-label="Tambah tugas ke ' + s.label + '">' + icon('plus', 14) + '</button></div>' +
          '<div class="board-col-body" data-drop-status="' + s.key + '">' + (tasks.length ? tasks.map(boardCardHtml).join('') : '<div class="board-empty">Belum ada kartu</div>') + '</div>' +
          '<div class="board-col-foot"><button type="button" class="board-add-btn" data-action="new-task" data-status="' + s.key + '">' + icon('plus', 11) + 'Tambah</button></div></section>';
      }).join('') + '</div></section>';
  }

  function boardCardHtml(task) {
    const late = isOverdue(task);
    const progress = taskProgress(task);
    return '<article class="board-card' + (task.status === 'done' ? ' is-done' : '') + '" draggable="true" data-task-id="' + esc(task.id) + '" style="--c:' + statusColor(task.status) + '">' +
      '<div class="board-card-top"><button type="button" class="board-card-title" data-action="edit-task" data-id="' + esc(task.id) + '">' + esc(task.title) + '</button>' + priorityChip(task.priority) + '</div>' +
      (task.project ? '<div class="board-card-meta"><span class="tag">' + esc(task.project) + '</span>' + (task.tags.length ? '<span class="tag">#' + esc(task.tags[0]) + '</span>' : '') + '</div>' : '') +
      '<div class="board-card-foot"><span class="' + (late ? 'is-overdue' : '') + '">' + (task.due ? (late ? lateLabel(task) : dueLabel(task.due)) : 'Tanpa tenggat') + '</span>' +
      (progress ? '<span class="board-card-check">' + icon('check-check', 10) + progress.done + '/' + progress.total + '</span>' : task.time ? '<span>' + esc(task.time.replace(':', '.')) + '</span>' : '') + '</div></article>';
  }

  /* ---------- kalender ---------- */
  function tasksByDueMap(includeCancelled) {
    const map = {};
    data.tasks.forEach(task => {
      if (!task.due) return;
      if (!includeCancelled && task.status === 'cancelled') return;
      if (!map[task.due]) map[task.due] = [];
      map[task.due].push(task);
    });
    Object.keys(map).forEach(key => map[key].sort(compareSmart));
    return map;
  }

  function renderCalendarView() {
    const cursor = startOfMonthKey(ui.calendarCursor);
    const selected = ui.selectedDate || todayKey();
    const map = tasksByDueMap(false);
    const cells = monthMatrix(cursor).map(key => {
      const dayTasks = map[key] || [];
      const out = parseKey(key).getMonth() !== parseKey(cursor).getMonth();
      const weekend = isWeekendKey(key);
      const isToday = key === todayKey();
      const isSelected = key === selected;
      return '<div class="cal-cell' + (out ? ' is-out' : '') + (weekend ? ' is-weekend' : '') + (isToday ? ' is-today' : '') + (isSelected ? ' is-selected' : '') + '" role="button" tabindex="0" data-action="select-day" data-date="' + key + '" aria-label="' + esc(formatDateLong(key) + ', ' + dayTasks.length + ' tugas') + '"' + (isSelected ? ' aria-pressed="true"' : '') + '>' +
        '<span class="cal-daynum">' + parseKey(key).getDate() + '</span><div class="cal-chips">' +
        dayTasks.slice(0, 3).map(task => '<span class="cal-chip' + (task.status === 'done' ? ' is-done' : '') + '" title="' + esc(task.title + ' — ' + statusLabel(task.status)) + '"><span class="cal-chip-dot" style="--c:' + statusColor(task.status) + '"></span><span class="cal-chip-title">' + esc(task.title) + '</span></span>').join('') +
        (dayTasks.length > 3 ? '<span class="cal-more">+' + (dayTasks.length - 3) + ' lagi</span>' : '') +
        '</div></div>';
    }).join('');
    const selectedTasks = (map[selected] || []).slice().sort((a, b) => {
      if (a.status === 'done' && b.status !== 'done') return 1;
      if (b.status === 'done' && a.status !== 'done') return -1;
      return compareSmart(a, b);
    });
    const selectedDate = parseKey(selected);
    return '<section class="view view-calendar" aria-labelledby="view-title">' +
      '<div class="page-head"><div><p class="eyebrow">Rencana dalam bentuk tanggal</p><h1 id="view-title">Kalender</h1><p>Lihat beban harian dan agenda. Klik tanggal untuk melihat detailnya.</p></div>' +
      '<div class="page-head-actions"><button type="button" class="btn btn-ghost" data-action="open-calendar-sync">' + icon('calendar-plus', 15) + 'Google Calendar</button><button type="button" class="btn btn-ghost" data-action="export-ics">' + icon('download', 15) + 'Ekspor .ics</button><button type="button" class="btn btn-primary" data-action="new-task" data-due="' + selected + '">' + icon('plus', 15) + 'Tugas baru</button></div></div>' +
      '<div class="calendar-layout"><section class="panel calendar-panel">' +
      '<div class="cal-nav"><button type="button" class="icon-btn" data-action="cal-prev" title="Bulan sebelumnya" aria-label="Bulan sebelumnya">' + icon('chevron-left', 18) + '</button>' +
      '<div class="cal-title">' + formatMonth(cursor) + '</div>' +
      '<button type="button" class="icon-btn" data-action="cal-next" title="Bulan berikutnya" aria-label="Bulan berikutnya">' + icon('chevron-right', 18) + '</button>' +
      '<span class="cal-nav-spacer"></span><button type="button" class="btn btn-ghost btn-compact" data-action="cal-today">Hari ini</button></div>' +
      '<div class="cal-weekdays">' + WEEKDAYS.map((day, i) => '<div class="cal-weekday' + (i > 4 ? ' is-weekend' : '') + '">' + WEEKDAYS_SHORT[i] + '</div>').join('') + '</div>' +
      '<div class="cal-grid">' + cells + '</div>' +
      '<div class="cal-legend">' + STATUSES.filter(s => s.key !== 'cancelled').map(s => '<span class="legend-item"><span class="status-dot" style="--c:var(--status-' + s.key + ')"></span>' + s.label + '</span>').join('') + '</div>' +
      '</section>' +
      '<section class="panel"><div class="panel-head"><div><div class="side-date">' + (selectedDate ? selectedDate.getDate() + ' ' + MONTHS[selectedDate.getMonth()] : '—') + '</div><div class="side-weekday">' + esc(weekDayName(selected, false) + ' · ' + (selectedDate ? selectedDate.getFullYear() : '')) + '</div></div>' +
      '<button type="button" class="btn btn-ghost btn-compact" data-action="new-task" data-due="' + selected + '">' + icon('plus', 13) + 'Tambah</button></div>' +
      (selectedTasks.length ? '<ul class="agenda-list">' + selectedTasks.map(task => {
        const late = isOverdue(task);
        const progress = taskProgress(task);
        return '<li class="agenda-item"><button type="button" class="mini-check" data-action="toggle-done" data-id="' + esc(task.id) + '" aria-label="' + (task.status === 'done' ? 'Buka kembali: ' : 'Selesaikan: ') + esc(task.title) + '">' + icon('check', 11) + '</button>' +
          '<button type="button" class="agenda-main" data-action="edit-task" data-id="' + esc(task.id) + '"><span class="agenda-title">' + esc(task.title) + '</span>' +
          '<span class="agenda-meta">' + (task.project ? '<span>' + esc(task.project) + '</span>' : '') + (task.time ? '<span>' + icon('clock', 9) + ' ' + esc(task.time.replace(':', '.')) + '</span>' : '') + (late ? '<span class="is-overdue">' + esc(lateLabel(task)) + '</span>' : '') + (progress ? '<span>' + progress.done + '/' + progress.total + '</span>' : '') + '</span></button>' +
          priorityChip(task.priority) + '</li>';
      }).join('') + '</ul>' : '<div class="agenda-empty">' + emptyState('coffee', 'Tanggal ini lapang', 'Tidak ada tugas pada tanggal ini. Tambahkan satu rencana bila perlu.', '<button type="button" class="btn btn-ghost btn-compact" data-action="new-task" data-due="' + selected + '">' + icon('plus', 13) + 'Tugas untuk tanggal ini</button>', true) + '</div>') +
      '</section></div></section>';
  }

  /* ---------- timeline ---------- */
  function renderTimelineView() {
    const cursor = startOfMonthKey(ui.timelineCursor);
    const days = daysInMonth(cursor);
    const monthStart = cursor;
    const monthEnd = monthEndKey(cursor);
    const tasks = data.tasks.filter(task => {
      if (task.status === 'cancelled') return false;
      const start = task.start || task.due;
      const end = task.due || task.start;
      if (!start && !end) return false;
      const s = start < end ? start : end;
      const e = start < end ? end : start;
      return e >= monthStart && s <= monthEnd;
    });
    const groups = {};
    tasks.forEach(task => {
      const project = task.project || 'Tanpa proyek';
      if (!groups[project]) groups[project] = [];
      groups[project].push(task);
    });
    Object.keys(groups).forEach(key => groups[key].sort(compareSmart));
    const today = todayKey();
    const todayIndex = diffDays(monthStart, today);
    const headerDays = Array.from({ length: days }, (_, i) => addDaysKey(monthStart, i));
    const head = '<div class="tl-head"><div class="tl-head-label">Proyek / tugas</div><div class="tl-days" style="--days:' + days + '">' +
      headerDays.map(key => {
        const d = parseKey(key);
        return '<div class="tl-day' + (isWeekendKey(key) ? ' is-weekend' : '') + (key === today ? ' is-today' : '') + '"><span class="tl-day-name">' + WEEKDAYS_MINI[(d.getDay() + 6) % 7] + '</span>' + d.getDate() + '</div>';
      }).join('') + '</div></div>';
    const groupHtml = Object.keys(groups).sort((a, b) => a.localeCompare(b, 'id')).map(project => {
      const rows = groups[project].map(task => {
        const start = task.start || task.due;
        const due = task.due || task.start;
        const s = start < due ? start : due;
        const e = start < due ? due : start;
        const barStart = s < monthStart ? monthStart : s;
        const barEnd = e > monthEnd ? monthEnd : e;
        const startIndex = diffDays(monthStart, barStart);
        const endIndex = diffDays(monthStart, barEnd);
        const left = (startIndex / days) * 100;
        const width = ((endIndex - startIndex + 1) / days) * 100;
        const late = isOverdue(task);
        return '<div class="tl-row"><button type="button" class="tl-label" data-action="edit-task" data-id="' + esc(task.id) + '" title="' + esc(task.title) + '"><span class="status-dot" style="--c:' + statusColor(task.status) + '"></span><span class="tl-label-text">' + esc(task.title) + '</span></button>' +
          '<div class="tl-track" style="--days:' + days + '">' +
          headerDays.filter(isWeekendKey).map(key => {
            const idx = diffDays(monthStart, key);
            return '<span class="tl-weekend" style="left:' + ((idx / days) * 100) + '%;width:' + (100 / days) + '%"></span>';
          }).join('') +
          (todayIndex >= 0 && todayIndex < days ? '<span class="tl-today-line" style="left:' + (((todayIndex + 0.5) / days) * 100) + '%"></span>' : '') +
          '<button type="button" class="tl-bar' + (task.status === 'done' ? ' is-done' : '') + (late ? ' is-overdue' : '') + '" data-action="edit-task" data-id="' + esc(task.id) + '" style="left:' + left + '%;width:' + width + '%;--c:' + statusColor(task.status) + '" title="' + esc(task.title + ' · ' + formatDateMedium(barStart) + ' – ' + formatDateMedium(barEnd)) + '">' +
          '<span class="tl-bar-text">' + esc(task.title) + '</span></button></div></div>';
      }).join('');
      return '<div class="tl-group"><div class="tl-group-head"><div class="tl-group-name">' + esc(project) + ' <span>(' + groups[project].length + ')</span></div><div></div></div>' + rows + '</div>';
    }).join('');
    return '<section class="view view-timeline" aria-labelledby="view-title">' +
      '<div class="page-head"><div><p class="eyebrow">Rentang waktu bulanan</p><h1 id="view-title">Timeline</h1><p>Lihat bagaimana pekerjaan tersebar sepanjang bulan. Bar menunjukkan rentang mulai dan tenggat.</p></div>' +
      '<div class="page-head-actions"><button type="button" class="btn btn-ghost" data-action="nav" data-view="calendar">' + icon('calendar', 15) + 'Kalender</button><button type="button" class="btn btn-primary" data-action="new-task">' + icon('plus', 15) + 'Tugas baru</button></div></div>' +
      '<section class="panel timeline-panel"><div class="cal-nav"><button type="button" class="icon-btn" data-action="tl-prev" title="Bulan sebelumnya">' + icon('chevron-left', 18) + '</button>' +
      '<div class="cal-title">' + formatMonth(cursor) + '</div><button type="button" class="icon-btn" data-action="tl-next" title="Bulan berikutnya">' + icon('chevron-right', 18) + '</button>' +
      '<span class="cal-nav-spacer"></span><button type="button" class="btn btn-ghost btn-compact" data-action="tl-today">Hari ini</button></div>' +
      (tasks.length ? '<div class="timeline-scroll"><div class="timeline" style="--days:' + days + '">' + head + groupHtml + '</div></div>' +
        '<div class="tl-legend">' + STATUSES.filter(s => s.key !== 'cancelled').map(s => '<span class="legend-item"><span class="status-dot" style="--c:var(--status-' + s.key + ')"></span>' + s.label + '</span>').join('') + '<span class="legend-item">' + icon('gantt', 11) + ' Bar = mulai s.d. tenggat</span></div>'
        : emptyState('gantt', 'Belum ada rentang di bulan ini', 'Tambahkan tanggal mulai atau tenggat pada tugas agar muncul di timeline.', '<button type="button" class="btn btn-primary btn-compact" data-action="new-task">' + icon('plus', 13) + 'Tugas baru</button>')) +
      '</section></section>';
  }

  function scrollTimelineToToday() {
    const cursor = startOfMonthKey(ui.timelineCursor);
    if (cursor !== startOfMonthKey(todayKey())) return;
    requestAnimationFrame(function () {
      const wrap = document.querySelector('.timeline-scroll');
      const line = document.querySelector('.tl-today-line');
      if (!wrap || !line) return;
      const target = line.offsetLeft - Math.max(120, wrap.clientWidth * 0.3);
      wrap.scrollLeft = Math.max(0, target);
    });
  }

  /* ---------- fokus ---------- */
  function renderFocusView() {
    const groups = focusGroups();
    const percent = pct(groups.done.length, groups.done.length + groups.open.length);
    const totalFocus = groups.done.length + groups.open.length;
    const dueTodayAll = data.tasks.filter(t => t.due === todayKey() && t.status !== 'cancelled');
    const dueTodayDone = dueTodayAll.filter(t => t.status === 'done').length;
    const sub = groups.open.length
      ? '<strong>' + groups.open.length + ' tugas</strong> menunggu perhatian. ' + (groups.overdue.length ? '<strong>' + groups.overdue.length + ' di antaranya terlambat.</strong> ' : '') + 'Kerjakan satu per satu, tanpa harus melihat seluruh daftar.'
      : (groups.done.length ? 'Semua fokus hari ini sudah selesai. Tutup lembar kerja, regangkan badan, dan beri dirimu ruang.' : 'Belum ada fokus untuk hari ini. Pilih satu tugas yang paling penting, lalu mulai dari sana.');
    let html = '<section class="view view-focus" aria-labelledby="view-title">' +
      '<div class="focus-hero"><div class="focus-hero-main"><p class="eyebrow">' + esc(formatDateLong(todayKey())) + '</p>' +
      '<h1 id="view-title">' + esc(greeting()) + '. <span class="accent">Fokus dulu.</span></h1><p>' + sub + '</p>' +
      '<div class="focus-hero-actions"><button type="button" class="btn btn-primary" data-action="toggle-dock">' + icon('panel-bottom', 15) + 'Buka panel fokus</button>' +
      '<button type="button" class="btn btn-ghost" data-action="new-task" data-due="' + todayKey() + '">' + icon('plus', 15) + 'Tambah tugas</button></div></div>' +
      '<div class="focus-summary"><div class="focus-ring" style="--p:' + percent + '"><strong>' + percent + '%</strong><span>selesai</span></div><span class="focus-summary-text">' + groups.done.length + ' dari ' + totalFocus + ' fokus</span></div></div>' +
      '<div class="focus-layout"><section class="panel focus-panel">' +
      panelHead('Daftar fokus', 'target', groups.open.length, '<button type="button" class="panel-link" data-action="nav" data-view="tasks">Semua tugas ' + icon('arrow-right', 12) + '</button>');

    if (!groups.open.length) {
      html += emptyState('check-circle', 'Fokus hari ini beres', groups.done.length ? 'Yang penting sudah selesai. Sisanya boleh menunggu besok.' : 'Belum ada tugas yang jatuh tempo atau berprioritas tinggi. Tambahkan satu bila ada yang terasa penting.', '<button type="button" class="btn btn-ghost btn-compact" data-action="new-task" data-due="' + todayKey() + '">' + icon('plus', 13) + 'Tambah fokus</button>', true);
    } else {
      const groupBlocks = [
        { key: 'overdue', title: 'Terlambat', tasks: groups.overdue },
        { key: 'today', title: 'Hari ini', tasks: groups.today },
        { key: 'priority', title: 'Prioritas tinggi', tasks: groups.priority }
      ];
      groupBlocks.forEach(group => {
        if (!group.tasks.length) return;
        html += '<div class="focus-group"><div class="focus-group-head"><h2 class="focus-group-title' + (group.key === 'overdue' ? ' is-overdue' : '') + '">' + group.title + '</h2><span class="focus-group-line"></span><span class="focus-group-count">' + group.tasks.length + '</span></div><div class="focus-tasks">' +
          group.tasks.map(task => focusTaskHtml(task, group.key)).join('') + '</div></div>';
      });
    }
    if (groups.done.length) {
      html += '<div class="focus-group"><div class="focus-group-head"><h2 class="focus-group-title">Selesai hari ini</h2><span class="focus-group-line"></span><span class="focus-group-count">' + groups.done.length + '</span></div><div class="focus-done-list">' +
        groups.done.map(task => '<div class="focus-done-item"><span class="done-mark">' + icon('check', 11) + '</span><span class="focus-done-title">' + esc(task.title) + '</span></div>').join('') + '</div></div>';
    }
    html += '</section><div class="focus-side-stack"><section class="panel">' +
      panelHead('Ritme hari ini', 'activity') +
      '<div class="focus-progress-row"><span>Jatuh tempo hari ini</span><strong>' + dueTodayDone + '/' + dueTodayAll.length + '</strong></div>' +
      '<div class="focus-progress-track"><div class="focus-progress-fill" style="width:' + pct(dueTodayDone, dueTodayAll.length) + '%"></div></div>' +
      '<div class="focus-progress-row"><span>Tugas terlambat</span><strong class="' + (groups.overdue.length ? 'danger-text' : '') + '">' + groups.overdue.length + '</strong></div>' +
      '<div class="focus-progress-row"><span>Prioritas tinggi</span><strong>' + data.tasks.filter(t => isOpenTask(t) && (t.priority === 'urgent' || t.priority === 'high')).length + '</strong></div>' +
      '<div class="focus-progress-row"><span>Selesai hari ini</span><strong>' + groups.done.length + '</strong></div>' +
      '<div class="focus-tip">' + icon('lightbulb', 15) + '<span>Satu tugas pada satu waktu. Bila pikiran melayang, kembali ke daftar ini dan pilih yang paling kecil langkahnya.</span></div></section>' +
      '<section class="panel">' + panelHead('Jalan pintas', 'keyboard') +
      '<div class="focus-progress-row"><span>Tugas baru</span><strong><kbd class="kbd">N</kbd></strong></div>' +
      '<div class="focus-progress-row"><span>Fokus hari ini</span><strong><kbd class="kbd">F</kbd></strong></div>' +
      '<div class="focus-progress-row"><span>Cari tugas</span><strong><kbd class="kbd">/</kbd></strong></div>' +
      '<div class="focus-tip">' + icon('pip', 15) + '<span>Tekan tombol Picture-in-Picture di panel fokus untuk membuat daftar kecil yang selalu terlihat di atas jendela lain.</span></div></section></div></div></section>';
    return html;
  }

  function focusTaskHtml(task, group) {
    const late = isOverdue(task);
    const progress = taskProgress(task);
    const due = late ? lateLabel(task) : task.due ? dueLabel(task.due) : 'Tanpa tenggat';
    const classes = 'focus-task' + (late ? ' is-overdue' : task.due === todayKey() ? ' is-today' : ' is-priority');
    return '<div class="' + classes + '"><button type="button" class="focus-check" data-action="toggle-done" data-id="' + esc(task.id) + '" title="Tandai selesai" aria-label="Selesaikan: ' + esc(task.title) + '">' + icon('check', 14) + '</button>' +
      '<button type="button" class="focus-main" data-action="edit-task" data-id="' + esc(task.id) + '"><span class="focus-title">' + esc(task.title) + '</span>' +
      '<span class="focus-meta">' + (task.project ? '<span>' + esc(task.project) + '</span>' : '') + '<span class="' + (late ? 'is-overdue' : '') + '">' + icon('calendar', 9) + ' ' + esc(due) + '</span>' + (task.time ? '<span class="desktop-only">' + icon('clock', 9) + ' ' + esc(task.time.replace(':', '.')) + '</span>' : '') + (progress ? '<span>' + icon('check-check', 9) + ' ' + progress.done + '/' + progress.total + '</span>' : '') + '</span></button>' +
      '<span class="focus-badge">' + priorityChip(task.priority) + '</span></div>';
  }

  /* ---------- dock fokus ---------- */
  function dockProgress() {
    const groups = focusGroups();
    return { groups, percent: pct(groups.done.length, groups.done.length + groups.open.length) };
  }

  function dockPositionStyle() {
    if (!settings.dockPosition) return '';
    if (window.matchMedia && window.matchMedia('(max-width: 640px)').matches) return '';
    const pos = settings.dockPosition;
    const width = Math.min(354, window.innerWidth - 28);
    const x = clamp(Number(pos.x) || 0, 8, Math.max(8, window.innerWidth - width - 8));
    const y = clamp(Number(pos.y) || 0, 8, Math.max(8, window.innerHeight - 100));
    return 'left:' + x + 'px;top:' + y + 'px;right:auto;bottom:auto;';
  }

  function renderDock() {
    const root = document.getElementById('dock-root');
    if (!root) return;
    const progress = dockProgress();
    let html = '';
    if (settings.dockOpen) {
      const mobile = window.matchMedia && window.matchMedia('(max-width: 640px)').matches;
      if (mobile) html += '<div class="dock-scrim" data-action="collapse-dock"></div>';
      html += dockShellHtml(progress, 'main');
    } else {
      html += '<button type="button" class="dock-pill" data-action="open-dock" title="Buka Fokus Hari Ini">' +
        '<span class="dock-pill-ring" style="--p:' + progress.percent + '"><span>' + progress.percent + '%</span></span>' +
        '<span class="dock-pill-text"><strong>Fokus hari ini</strong><small>' + progress.groups.open.length + ' sisa · ' + progress.groups.done.length + ' selesai</small></span>' + icon('chevron-up', 15) + '</button>';
    }
    root.innerHTML = html;
    syncBodyLock();
    renderPipDock();
  }

  function dockShellHtml(progress, context) {
    const groups = progress.groups;
    const totalOpen = groups.open.length;
    const items = [];
    const add = (label, tasks, danger) => { if (tasks.length) items.push({ label, tasks, danger }); };
    add('Terlambat', groups.overdue, true);
    add('Hari ini', groups.today, false);
    add('Prioritas', groups.priority, false);
    let remaining = 8;
    let body = '';
    items.forEach(item => {
      if (remaining <= 0) return;
      const shown = item.tasks.slice(0, remaining);
      remaining -= shown.length;
      body += '<div class="dock-group"><span class="' + (item.danger ? 'is-overdue' : '') + '">' + item.label + '</span><span>' + item.tasks.length + '</span></div>';
      body += shown.map(task => {
        const late = isOverdue(task);
        return '<div class="dock-row' + (late ? ' is-overdue' : '') + '">' +
          '<button type="button" class="dock-check" data-action="toggle-done" data-id="' + esc(task.id) + '" aria-label="Selesaikan: ' + esc(task.title) + '">' + icon('check', 11) + '</button>' +
          '<button type="button" class="dock-main" data-action="edit-task" data-id="' + esc(task.id) + '"><span class="dock-task">' + esc(task.title) + '</span>' +
          '<span class="dock-meta">' + (task.project ? '<span>' + esc(task.project) + '</span>' : '') + (task.due ? '<span class="' + (late ? 'is-late' : task.due === todayKey() ? 'is-today' : '') + '">' + esc(late ? lateLabel(task) : dueLabel(task.due)) + '</span>' : '<span>Tanpa tenggat</span>') + (task.time ? '<span>' + esc(task.time.replace(':', '.')) + '</span>' : '') + '</span></button>' +
          '<span class="dock-dot" style="--c:' + PRIORITY_COLORS[task.priority] + '"></span></div>';
      }).join('');
    });
    if (totalOpen > 8) body += '<button type="button" class="dock-more" data-action="goto-focus">Lihat semua ' + totalOpen + ' tugas fokus</button>';
    if (!totalOpen) {
      body = '<div class="dock-empty"><span class="dock-empty-icon">' + icon('check', 20) + '</span><strong>' + (groups.done.length ? 'Fokus hari ini beres' : 'Belum ada fokus') + '</strong><span>' + (groups.done.length ? 'Kerja bagus. Sisanya boleh menunggu.' : 'Tambah satu tugas untuk hari ini.') + '</span><button type="button" class="btn btn-ghost btn-compact" data-action="new-task" data-due="' + todayKey() + '">' + icon('plus', 12) + 'Tambah tugas</button></div>';
    }
    const isPip = context === 'pip';
    return '<div class="dock" style="' + (isPip ? '' : dockPositionStyle()) + '">' +
      '<div class="dock-head" data-dock-drag><span class="dock-emblem">' + icon('target', 15) + '</span>' +
      '<div class="dock-title"><strong>Fokus hari ini</strong><span>' + esc(weekDayName(todayKey(), false) + ', ' + formatDateMedium(todayKey())) + ' · ' + totalOpen + ' sisa</span></div>' +
      '<div class="dock-actions">' +
      '<button type="button" class="icon-btn" data-action="goto-focus" title="Buka halaman fokus" aria-label="Buka halaman fokus">' + icon('arrow-up-right', 14) + '</button>' +
      (isPip ? '<button type="button" class="icon-btn is-active" data-action="close-pip" title="Tutup jendela kecil" aria-label="Tutup jendela kecil">' + icon('pip', 14) + '</button>' : '<button type="button" class="icon-btn" data-action="toggle-pip" title="Selalu di atas (Picture-in-Picture)" aria-label="Buka Picture-in-Picture">' + icon('pip', 14) + '</button>') +
      '<button type="button" class="icon-btn" data-action="' + (isPip ? 'close-pip' : 'collapse-dock') + '" title="Kecilkan panel" aria-label="Kecilkan panel">' + icon('chevron-down', 14) + '</button></div></div>' +
      '<div class="dock-progress"><div class="dock-bar"><span style="width:' + progress.percent + '%"></span></div><span class="dock-count">' + groups.done.length + '/' + (groups.done.length + groups.open.length) + ' · ' + progress.percent + '%</span></div>' +
      '<div class="dock-body">' + body + '</div>' +
      '<div class="dock-foot"><button type="button" class="btn btn-ghost btn-compact" data-action="new-task" data-due="' + todayKey() + '">' + icon('plus', 13) + 'Tugas</button><button type="button" class="btn btn-primary btn-compact" data-action="goto-focus">' + icon('target', 13) + 'Buka fokus</button></div></div>';
  }

  /* ---------- aktivitas & tugas ---------- */
  function addActivity(kind, task, detail) {
    data.activity.unshift({
      id: uid('a'),
      at: nowIso(),
      kind,
      taskId: task ? task.id : '',
      title: task ? task.title : '',
      detail: detail || ''
    });
    data.activity = data.activity.slice(0, 120);
  }
  function addRawActivity(kind, detail) {
    data.activity.unshift({ id: uid('a'), at: nowIso(), kind, taskId: '', title: '', detail });
    data.activity = data.activity.slice(0, 120);
  }
  function spawnRecurringOccurrence(task) {
    if (!task || !task.recurring) return null;
    if (task.spawnedTaskId && taskById(task.spawnedTaskId)) return taskById(task.spawnedTaskId);
    const existing = data.tasks.find(t => t.previousTaskId === task.id);
    if (existing) {
      task.spawnedTaskId = existing.id;
      return existing;
    }
    const nextDates = recurrenceNextDates(task);
    if (!nextDates) return null;
    const seriesId = task.seriesId || task.id;
    const copy = normalizeTask(Object.assign({}, clone(task), {
      id: uid('t'),
      status: 'not_started',
      completedAt: null,
      createdAt: nowIso(),
      updatedAt: nowIso(),
      due: nextDates.due,
      start: nextDates.start,
      checklist: (task.checklist || []).map(item => ({ id: uid('c'), text: item.text, done: false })),
      recurring: true,
      recurrenceFrequency: normalizeRecurrenceFrequency(task.recurrenceFrequency),
      seriesId,
      spawnedTaskId: '',
      previousTaskId: task.id
    }));
    data.tasks.push(copy);
    task.spawnedTaskId = copy.id;
    addActivity('create', copy, 'Tugas berulang berikutnya');
    return copy;
  }
  function completeTaskRecord(task) {
    if (!task || task.status === 'done') return null;
    task.status = 'done';
    task.completedAt = nowIso();
    task.updatedAt = nowIso();
    addActivity('complete', task);
    return spawnRecurringOccurrence(task);
  }
  function completionMessage(task, next) {
    if (!task || !next || !next.due) return 'Satu hal beres. Kerja bagus.';
    return 'Selesai. Tugas berulang berikutnya dibuat untuk ' + formatDateMedium(next.due) + '.';
  }
  function blankTask(preset) {
    const p = preset || {};
    const now = nowIso();
    return {
      id: uid('t'), title: '', project: p.project || '', status: normalizeStatus(p.status, 'not_started'),
      priority: normalizePriority(p.priority, 'medium'), start: normalizeDate(p.start), due: normalizeDate(p.due),
      time: normalizeTime(p.time), tags: [], notes: '', checklist: [], createdAt: now, updatedAt: now, completedAt: null,
      recurring: Boolean(p.recurring), recurrenceFrequency: p.recurring ? normalizeRecurrenceFrequency(p.recurrenceFrequency) : '',
      seriesId: p.seriesId || '', spawnedTaskId: '', previousTaskId: ''
    };
  }
  function quickAddTask(title, priority) {
    const task = normalizeTask({
      title,
      priority: normalizePriority(priority, 'medium'),
      status: 'not_started',
      due: todayKey()
    });
    data.tasks.push(task);
    addActivity('create', task);
    saveAndRender({ message: 'Tugas ditambahkan ke hari ini.', toastIcon: 'plus' });
  }
  function toggleDone(id) {
    const task = taskById(id);
    if (!task) return;
    if (task.status === 'done') {
      task.status = 'not_started';
      task.completedAt = null;
      task.updatedAt = nowIso();
      addActivity('reopen', task);
      saveAndRender({ message: 'Tugas dibuka kembali.', toastIcon: 'rotate-ccw' });
    } else {
      const next = completeTaskRecord(task);
      saveAndRender({ message: completionMessage(task, next), toastIcon: 'check' });
    }
  }
  function changeTaskStatus(id, status) {
    const task = taskById(id);
    if (!task || !STATUS_KEYS.includes(status) || task.status === status) return;
    const previous = task.status;
    let next = null;
    if (status === 'done') {
      next = completeTaskRecord(task);
    } else {
      task.status = status;
      task.updatedAt = nowIso();
      if (previous === 'done') {
        task.completedAt = null;
        addActivity('reopen', task);
      } else {
        addActivity('status', task, statusLabel(status));
      }
    }
    saveAndRender({ message: status === 'done' ? completionMessage(task, next) : 'Status: ' + statusLabel(status) + '.', toastIcon: status === 'done' ? 'check' : 'flag' });
  }
  function duplicateTask(id) {
    const source = taskById(id);
    if (!source) return;
    const copy = clone(source);
    copy.id = uid('t');
    copy.title = source.title + ' (salinan)';
    copy.status = 'not_started';
    copy.completedAt = null;
    copy.createdAt = nowIso();
    copy.updatedAt = nowIso();
    copy.checklist = copy.checklist.map(item => ({ id: uid('c'), text: item.text, done: false }));
    copy.seriesId = copy.recurring ? copy.id : '';
    copy.spawnedTaskId = '';
    copy.previousTaskId = '';
    data.tasks.push(copy);
    addActivity('create', copy);
    saveAndRender({ message: 'Tugas diduplikat.', toastIcon: 'copy' });
  }
  function requestDeleteTask(id) {
    const task = taskById(id);
    if (!task) return;
    askConfirm({
      title: 'Hapus tugas ini?',
      message: '“' + task.title + '” akan dihapus dari semua tampilan. Cadangan lokal tetap bisa dipulihkan lewat menu Data.',
      confirmLabel: 'Hapus tugas',
      danger: true,
      onConfirm: function () { deleteTaskById(id); }
    });
  }
  function deleteTaskById(id) {
    const index = data.tasks.findIndex(t => t.id === id);
    if (index < 0) return;
    const task = data.tasks[index];
    data.tasks.splice(index, 1);
    addActivity('delete', task);
    if (ui.taskModal && ui.taskModal.task.id === id) closeTaskModal(false);
    closeConfirm();
    saveAndRender({ message: 'Tugas dihapus.', toastIcon: 'trash' });
  }
  function setFilterStatus(status) {
    ui.filters = Object.assign({}, DEFAULT_FILTERS, { status });
    navigate('tasks');
  }
  function setFilterProject(project) {
    ui.filters = Object.assign({}, DEFAULT_FILTERS, { project });
    navigate('tasks');
  }

  /* ---------- modal tugas ---------- */
  function openTaskModal(task, preset) {
    const draft = task ? clone(task) : blankTask(preset);
    ui.taskModal = { task: draft, isNew: !task, returnFocus: document.activeElement };
    renderTaskModal();
    syncBodyLock();
    setTimeout(function () {
      const input = document.getElementById('task-title');
      if (input) {
        input.focus({ preventScroll: true });
        if (!ui.taskModal || !ui.taskModal.isNew) input.select();
      }
    }, 40);
  }
  function closeTaskModal(restoreFocus) {
    document.getElementById('task-modal-root').innerHTML = '';
    const returnEl = ui.taskModal ? ui.taskModal.returnFocus : null;
    ui.taskModal = null;
    syncBodyLock();
    if (restoreFocus !== false && returnEl && typeof returnEl.focus === 'function') {
      try { returnEl.focus({ preventScroll: true }); } catch (err) { /* noop */ }
    }
  }
  function taskModalChecklistHtml(task) {
    if (!task.checklist.length) return '<p class="field-hint">Belum ada langkah kecil. Tambahkan satu agar tugas besar terasa lebih ringan.</p>';
    return task.checklist.map(item => '<div class="checklist-item' + (item.done ? ' is-done' : '') + '" data-checklist-row="' + esc(item.id) + '">' +
      '<input type="checkbox" data-checklist-toggle="' + esc(item.id) + '"' + (item.done ? ' checked' : '') + ' aria-label="' + esc(item.text) + '">' +
      '<span>' + esc(item.text) + '</span><button type="button" class="checklist-remove" data-action="remove-checklist" data-id="' + esc(item.id) + '" title="Hapus langkah" aria-label="Hapus langkah">' + icon('x', 12) + '</button></div>').join('');
  }
  function taskModalChecklistMeta(task) {
    const done = task.checklist.filter(i => i.done).length;
    return task.checklist.length ? done + ' dari ' + task.checklist.length + ' selesai' : 'Belum ada langkah';
  }
  function recurrencePreviewHtml(task) {
    if (!task.recurring) return '<p class="field-hint">Aktifkan untuk membuat salinan tugas berikutnya secara otomatis saat tugas ini selesai.</p>';
    const next = recurrenceNextDates(task);
    if (!next) return '<p class="recurrence-warning">Isi tanggal mulai atau tenggat agar jadwal berikutnya bisa dihitung.</p>';
    return '<div class="recurrence-preview-card"><span class="recurrence-preview-icon">' + icon('repeat', 14) + '</span><div><strong>Berikutnya: ' + esc(formatDateLong(next.due)) + '</strong>' +
      '<span>Dihitung dari ' + esc(recurrenceLabel(task.recurrenceFrequency).toLowerCase()) + ' tanggal ' + esc(formatDateMedium(task.due || task.start)) +
      (next.adjusted ? ' · akhir pekan digeser ke hari kerja' : ' · jatuh di hari kerja') + '</span></div></div>';
  }
  function recurrenceFormHtml(task) {
    return '<div class="form-section recurrence-section">' +
      '<label class="switch-row"><span class="switch-copy"><strong>Tugas berulang</strong><span>Buat salinan berikutnya otomatis saat tugas ini selesai.</span></span>' +
      '<span class="switch"><input type="checkbox" name="recurring" id="task-recurring"' + (task.recurring ? ' checked' : '') + '><span class="switch-track" aria-hidden="true"></span></span></label>' +
      '<div class="recurrence-options" id="recurrence-options"' + (task.recurring ? '' : ' hidden') + '>' +
      '<label class="field"><span>Ulangi setiap</span><select name="recurrenceFrequency">' +
      RECURRENCES.map(r => '<option value="' + r.key + '"' + (normalizeRecurrenceFrequency(task.recurrenceFrequency) === r.key ? ' selected' : '') + '>' + r.label + '</option>').join('') +
      '</select></label><div id="recurrence-preview">' + recurrencePreviewHtml(task) + '</div></div></div>';
  }
  function refreshRecurrenceForm() {
    const form = document.getElementById('task-form');
    if (!form) return;
    const toggle = form.querySelector('[name="recurring"]');
    const options = document.getElementById('recurrence-options');
    const preview = document.getElementById('recurrence-preview');
    const freq = form.querySelector('[name="recurrenceFrequency"]');
    const draft = {
      recurring: Boolean(toggle && toggle.checked),
      recurrenceFrequency: freq ? freq.value : 'monthly',
      due: normalizeDate(form.querySelector('[name="due"]').value),
      start: normalizeDate(form.querySelector('[name="start"]').value)
    };
    if (options) options.hidden = !draft.recurring;
    if (preview) preview.innerHTML = recurrencePreviewHtml(draft);
  }
  function renderTaskModal() {
    const root = document.getElementById('task-modal-root');
    if (!root || !ui.taskModal) return;
    const task = ui.taskModal.task;
    const editing = !ui.taskModal.isNew;
    const projectList = projectsFromTasks().map(p => '<option value="' + esc(p) + '"></option>').join('');
    root.innerHTML = '<div class="modal-backdrop" data-modal="task"><div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="task-modal-title">' +
      '<div class="modal-head"><div><h2 id="task-modal-title">' + (editing ? 'Ubah tugas' : 'Tugas baru') + '</h2><p>' + (editing ? 'Perbarui detail, jadwal, atau langkah kecilnya.' : 'Tulis satu hal. Detail lain bisa menyusul.') + '</p></div>' +
      '<button type="button" class="icon-btn modal-close" data-action="close-task-modal" aria-label="Tutup">' + icon('x', 17) + '</button></div>' +
      '<form id="task-form" autocomplete="off">' +
      '<div class="modal-body">' +
      '<label class="field"><span>Judul tugas</span><input id="task-title" name="title" type="text" maxlength="240" required placeholder="Misalnya: susun agenda rapat besok" value="' + esc(task.title) + '"></label>' +
      '<div class="field-row"><label class="field"><span>Proyek</span><input name="project" list="project-options" maxlength="80" placeholder="Opsional" value="' + esc(task.project) + '"></label>' +
      '<label class="field"><span>Prioritas</span><select name="priority">' + PRIORITIES.map(p => '<option value="' + p.key + '"' + (task.priority === p.key ? ' selected' : '') + '>' + p.label + '</option>').join('') + '</select></label></div>' +
      '<datalist id="project-options">' + projectList + '</datalist>' +
      '<div class="field-row"><label class="field"><span>Status</span><select name="status">' + STATUSES.map(s => '<option value="' + s.key + '"' + (task.status === s.key ? ' selected' : '') + '>' + s.label + '</option>').join('') + '</select></label>' +
      '<label class="field"><span>Jam</span><input name="time" type="time" value="' + esc(task.time) + '"></label></div>' +
      '<div class="field-row"><label class="field"><span>Mulai</span><input name="start" type="date" value="' + esc(task.start) + '"></label>' +
      '<label class="field"><span>Tenggat</span><input name="due" type="date" value="' + esc(task.due) + '"></label></div>' +
      recurrenceFormHtml(task) +
      '<label class="field"><span>Tag <span class="field-hint">pisahkan dengan koma</span></span><input name="tags" maxlength="200" placeholder="rapat, penting, rumah" value="' + esc(task.tags.join(', ')) + '"></label>' +
      '<label class="field"><span>Catatan</span><textarea name="notes" rows="3" maxlength="8000" placeholder="Konteks, tautan, atau hal yang perlu diingat…">' + esc(task.notes) + '</textarea></label>' +
      '<div class="form-section"><div class="form-section-head"><h3 class="form-section-title">' + icon('check-check', 14) + 'Langkah kecil</h3><span class="form-section-meta" id="checklist-meta">' + taskModalChecklistMeta(task) + '</span></div>' +
      '<div class="checklist-editor" id="checklist-editor">' + taskModalChecklistHtml(task) + '</div>' +
      '<div class="checklist-add"><input type="text" id="checklist-new" maxlength="200" placeholder="Tambah langkah…" aria-label="Langkah baru"><button type="button" class="btn btn-ghost btn-compact" data-action="add-checklist">' + icon('plus', 12) + 'Tambah</button></div></div>' +
      '<div class="form-meta">' + (editing ? 'Dibuat ' + esc(formatDateMedium(dateKey(new Date(task.createdAt)))) + ' <span class="dot-sep">·</span> Diperbarui ' + esc(timeAgo(task.updatedAt)) : 'Akan tersimpan otomatis di peramban ini') + '</div>' +
      '</div>' +
      '<div class="modal-foot">' + (editing ? '<button type="button" class="btn btn-danger btn-compact" data-action="delete-task" data-id="' + esc(task.id) + '">' + icon('trash', 13) + 'Hapus</button>' : '') +
      (editing && (task.due || task.start) ? '<button type="button" class="btn btn-ghost btn-compact" data-action="add-to-gcal" data-id="' + esc(task.id) + '">' + icon('calendar-plus', 13) + 'Google Calendar</button>' : '') +
      '<span class="spacer"></span><button type="button" class="btn btn-ghost" data-action="close-task-modal">Batal</button><button type="submit" class="btn btn-primary">' + icon('check', 14) + (editing ? 'Simpan' : 'Tambah tugas') + '</button></div>' +
      '</form></div></div>';
  }
  function refreshChecklistEditor() {
    if (!ui.taskModal) return;
    const editor = document.getElementById('checklist-editor');
    const meta = document.getElementById('checklist-meta');
    if (editor) editor.innerHTML = taskModalChecklistHtml(ui.taskModal.task);
    if (meta) meta.textContent = taskModalChecklistMeta(ui.taskModal.task);
  }
  function addChecklistItem() {
    if (!ui.taskModal) return;
    const input = document.getElementById('checklist-new');
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;
    ui.taskModal.task.checklist.push({ id: uid('c'), text, done: false });
    input.value = '';
    refreshChecklistEditor();
    input.focus();
  }
  function removeChecklistItem(itemId) {
    if (!ui.taskModal) return;
    ui.taskModal.task.checklist = ui.taskModal.task.checklist.filter(item => item.id !== itemId);
    refreshChecklistEditor();
  }
  function handleTaskSubmit(e) {
    e.preventDefault();
    if (!ui.taskModal) return;
    const form = e.target;
    const fd = new FormData(form);
    const title = String(fd.get('title') || '').trim();
    if (!title) {
      const input = document.getElementById('task-title');
      if (input) input.focus();
      toast('Judul tugas belum diisi.', { type: 'warn', iconName: 'info' });
      return;
    }
    const start = normalizeDate(fd.get('start'));
    const due = normalizeDate(fd.get('due'));
    if (start && due && start > due) {
      toast('Tanggal mulai tidak boleh setelah tenggat.', { type: 'warn', iconName: 'calendar' });
      const input = form.querySelector('[name="due"]');
      if (input) input.focus();
      return;
    }
    const status = normalizeStatus(fd.get('status'), ui.taskModal.task.status);
    const priority = normalizePriority(fd.get('priority'), 'medium');
    const tags = String(fd.get('tags') || '').split(',').map(t => t.trim().replace(/^#/, '')).filter(Boolean);
    const recurring = Boolean(fd.get('recurring'));
    if (recurring && !due && !start) {
      toast('Isi tanggal mulai atau tenggat untuk tugas berulang.', { type: 'warn', iconName: 'repeat' });
      const input = form.querySelector('[name="due"]');
      if (input) input.focus();
      return;
    }
    const task = Object.assign({}, ui.taskModal.task, {
      title: title.slice(0, 240),
      project: String(fd.get('project') || '').trim().slice(0, 80),
      status,
      priority,
      start,
      due,
      time: normalizeTime(fd.get('time')),
      tags: [...new Set(tags)].slice(0, 12),
      notes: String(fd.get('notes') || '').trim().slice(0, 8000),
      recurring,
      recurrenceFrequency: recurring ? normalizeRecurrenceFrequency(fd.get('recurrenceFrequency')) : '',
      seriesId: recurring ? (ui.taskModal.task.seriesId || ui.taskModal.task.id) : '',
      updatedAt: nowIso()
    });
    const previousStatus = ui.taskModal.task.status;
    if (status === 'done') task.completedAt = ui.taskModal.task.completedAt || nowIso();
    else task.completedAt = null;
    let spawned = null;
    if (ui.taskModal.isNew) {
      data.tasks.push(task);
      addActivity('create', task);
      if (status === 'done') spawned = spawnRecurringOccurrence(task);
    } else {
      const index = data.tasks.findIndex(t => t.id === task.id);
      if (index >= 0) data.tasks[index] = task;
      if (previousStatus !== status) {
        if (status === 'done') {
          addActivity('complete', task);
          spawned = spawnRecurringOccurrence(task);
        } else if (previousStatus === 'done') addActivity('reopen', task);
        else addActivity('status', task, statusLabel(status));
      }
    }
    const isNew = ui.taskModal.isNew;
    closeTaskModal(false);
    const message = isNew ? 'Tugas baru tersimpan.' : (spawned ? completionMessage(task, spawned) : 'Perubahan tersimpan.');
    saveAndRender({ message, toastIcon: isNew ? 'plus' : (spawned ? 'repeat' : 'check') });
  }

  /* ---------- cadangan ---------- */
  function readBackups() {
    const list = readJson(STORE.backups, []);
    return Array.isArray(list) ? list : [];
  }
  function writeBackups(list) {
    try { writeJson(STORE.backups, list.slice(0, 10)); } catch (err) { /* diamkan bila penuh */ }
  }
  function createBackup(label, kind) {
    const snap = {
      id: uid('bak'),
      at: nowIso(),
      label: label || 'Cadangan',
      kind: kind || 'manual',
      taskCount: data.tasks.length,
      reportCount: (data.reports || []).length,
      tasks: clone(data.tasks),
      activity: clone(data.activity),
      reports: clone(data.reports || [])
    };
    const list = readBackups();
    list.unshift(snap);
    writeBackups(list);
    settings.lastBackupAt = snap.at;
    saveSettings();
    return snap;
  }
  function maybeAutoBackup() {
    const list = readBackups();
    const latestAuto = list.find(b => b.kind === 'auto');
    if (!latestAuto || Date.now() - new Date(latestAuto.at).getTime() > 6 * 60 * 60 * 1000) {
      createBackup('Otomatis', 'auto');
    }
  }
  function requestRestoreBackup(id) {
    const backup = readBackups().find(b => b.id === id);
    if (!backup) return;
    askConfirm({
      title: 'Pulihkan cadangan?',
      message: 'Data saat ini akan dicadangkan lebih dulu, lalu diganti dengan cadangan dari ' + formatDateMedium(dateKey(new Date(backup.at))) + ' (' + backup.taskCount + ' tugas).',
      confirmLabel: 'Pulihkan',
      danger: false,
      onConfirm: function () { restoreBackup(id); }
    });
  }
  function restoreBackup(id) {
    const backup = readBackups().find(b => b.id === id);
    if (!backup) return;
    createBackup('Sebelum memulihkan', 'manual');
    try {
      data = normalizeData({ tasks: backup.tasks || [], activity: backup.activity || [], reports: backup.reports || [] });
      addRawActivity('import', 'Memulihkan cadangan dari ' + formatDateLong(dateKey(new Date(backup.at))) + '.');
      closeConfirm();
      closeDataModal();
      saveAndRender({ message: 'Cadangan dipulihkan.', toastIcon: 'rotate-ccw' });
    } catch (err) {
      toast('Cadangan tidak bisa dipulihkan.', { type: 'error' });
    }
  }

  /* ---------- ekspor / impor ---------- */
  function downloadFile(fileName, content, mime) {
    const blob = new Blob([content], { type: mime || 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1200);
  }
  function exportPayload() {
    return {
      app: 'tuntas',
      version: APP_VERSION,
      exportedAt: nowIso(),
      settings: { name: settings.name },
      data: {
        version: APP_VERSION,
        tasks: data.tasks,
        activity: data.activity,
        reports: data.reports,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
      }
    };
  }
  function exportJson() {
    const stamp = new Date();
    const name = 'tuntas-backup-' + dateKey(stamp) + '-' + pad2(stamp.getHours()) + pad2(stamp.getMinutes()) + '.json';
    downloadFile(name, JSON.stringify(exportPayload(), null, 2), 'application/json');
    createBackup('Ekspor manual', 'manual');
    renderDataModal();
    toast('Cadangan JSON diunduh.', { toastIcon: 'download' });
  }
  async function copyJson() {
    const text = JSON.stringify(exportPayload(), null, 2);
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
      }
      toast('JSON disalin ke papan klip.', { toastIcon: 'copy' });
    } catch (err) {
      toast('Tidak bisa menyalin otomatis. Gunakan ekspor file.', { type: 'error' });
    }
  }
  function parseImportText(text, fileName) {
    if (!text || !text.trim()) throw new Error('Berkas kosong.');
    if (text.length > 6000000) throw new Error('Berkas terlalu besar.');
    let raw;
    try { raw = JSON.parse(text); } catch (err) { throw new Error('JSON tidak valid. Pastikan berkas berasal dari TUNTAS.'); }
    const importedSettings = raw && typeof raw === 'object' && raw.settings && typeof raw.settings === 'object' ? { name: String(raw.settings.name || '').slice(0, 60) } : null;
    const normalized = normalizeData(raw);
    const label = fileName || 'tempel JSON';
    return { data: normalized, settings: importedSettings, fileName: label, at: nowIso(), source: 'file' };
  }
  function setPendingImport(payload) {
    ui.pendingImport = payload;
    if (!ui.dataModalOpen) openDataModal();
    else renderDataModal();
    toast('Berkas siap ditinjau: ' + payload.data.tasks.length + ' tugas.', { type: 'warn', iconName: 'file-json' });
  }
  function applyImport(mode) {
    if (!ui.pendingImport) return;
    const payload = ui.pendingImport;
    if (mode === 'replace') {
      askConfirm({
        title: 'Ganti semua data?',
        message: 'Data lokal saat ini akan dicadangkan, lalu diganti dengan ' + payload.data.tasks.length + ' tugas dari “' + payload.fileName + '”.',
        confirmLabel: 'Ganti data',
        danger: true,
        onConfirm: function () { executeImport('replace'); }
      });
      return;
    }
    executeImport('merge');
  }
  function executeImport(mode) {
    if (!ui.pendingImport) return;
    const payload = ui.pendingImport;
    createBackup('Sebelum impor', 'manual');
    let message = '';
    if (mode === 'replace') {
      data = clone(payload.data);
      addRawActivity('import', 'Mengganti data dengan impor ' + payload.data.tasks.length + ' tugas dari ' + payload.fileName + '.');
      message = 'Data diganti. ' + data.tasks.length + ' tugas dimuat.';
    } else {
      const existing = new Map(data.tasks.map(t => [t.id, t]));
      let added = 0;
      let updated = 0;
      payload.data.tasks.forEach(task => {
        const current = existing.get(task.id);
        if (!current) {
          data.tasks.push(clone(task));
          existing.set(task.id, task);
          added++;
        } else if (new Date(task.updatedAt) > new Date(current.updatedAt)) {
          const index = data.tasks.findIndex(t => t.id === task.id);
          data.tasks[index] = clone(task);
          updated++;
        }
      });
      const existingActs = new Set(data.activity.map(a => a.id));
      payload.data.activity.forEach(act => {
        if (!existingActs.has(act.id)) {
          data.activity.push(clone(act));
          existingActs.add(act.id);
        }
      });
      data.activity.sort((a, b) => new Date(b.at) - new Date(a.at));
      data.activity = data.activity.slice(0, 120);
      const existingReports = new Map(data.reports.map(r => [r.id, r]));
      let reportsAdded = 0;
      let reportsUpdated = 0;
      (payload.data.reports || []).forEach(report => {
        const current = existingReports.get(report.id);
        if (!current) {
          data.reports.push(clone(report));
          existingReports.set(report.id, report);
          reportsAdded++;
        } else if (new Date(report.updatedAt) > new Date(current.updatedAt)) {
          const index = data.reports.findIndex(r => r.id === report.id);
          if (index >= 0) {
            data.reports[index] = clone(report);
            reportsUpdated++;
          }
        }
      });
      data.reports.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      data.reports = data.reports.slice(0, 600);
      addRawActivity('import', 'Menggabungkan impor dari ' + payload.fileName + ': ' + added + ' baru, ' + updated + ' diperbarui.' + (reportsAdded || reportsUpdated ? ' Laporan: ' + reportsAdded + ' baru, ' + reportsUpdated + ' diperbarui.' : ''));
      message = 'Impor digabungkan: ' + added + ' baru, ' + updated + ' diperbarui.' + (reportsAdded || reportsUpdated ? ' Laporan: ' + reportsAdded + ' baru, ' + reportsUpdated + ' diperbarui.' : '');
    }
    if (payload.settings && payload.settings.name && (mode === 'replace' || !settings.name)) {
      settings.name = payload.settings.name;
      saveSettings();
    }
    ui.pendingImport = null;
    closeConfirm();
    closeDataModal();
    saveAndRender({ message, toastIcon: 'download' });
  }

  /* ---------- ekspor kalender ---------- */
  function icsEscape(value) {
    return String(value == null ? '' : value).replace(/\\/g, '\\\\').replace(/\r?\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
  }
  function icsDateStamp(iso) {
    const d = new Date(iso);
    return isNaN(d.getTime()) ? '' : d.getUTCFullYear() + pad2(d.getUTCMonth() + 1) + pad2(d.getUTCDate()) + 'T' + pad2(d.getUTCHours()) + pad2(d.getUTCMinutes()) + pad2(d.getUTCSeconds()) + 'Z';
  }
  function icsLocal(d) {
    return d.getFullYear() + pad2(d.getMonth() + 1) + pad2(d.getDate()) + 'T' + pad2(d.getHours()) + pad2(d.getMinutes()) + '00';
  }
  function exportIcs() {
    const stamp = icsDateStamp(nowIso());
    const priorityMap = { urgent: 1, high: 3, medium: 5, low: 9 };
    const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//TUNTAS//Ruang Kerja Pribadi//ID', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH', 'X-WR-CALNAME:TUNTAS'];
    let count = 0;
    data.tasks.filter(t => t.due).sort((a, b) => a.due.localeCompare(b.due)).forEach(task => {
      const dueDate = parseKey(task.due);
      if (!dueDate) return;
      count++;
      lines.push('BEGIN:VEVENT');
      lines.push('UID:' + icsEscape(task.id + '@tuntas.local'));
      lines.push('DTSTAMP:' + stamp);
      if (task.time) {
        const start = parseKey(task.due);
        const hm = task.time.split(':');
        start.setHours(Number(hm[0]), Number(hm[1]), 0, 0);
        const end = new Date(start.getTime() + 30 * 60000);
        lines.push('DTSTART:' + icsLocal(start));
        lines.push('DTEND:' + icsLocal(end));
      } else {
        const next = new Date(dueDate.getTime());
        next.setDate(next.getDate() + 1);
        lines.push('DTSTART;VALUE=DATE:' + task.due.replace(/-/g, ''));
        lines.push('DTEND;VALUE=DATE:' + dateKey(next).replace(/-/g, ''));
      }
      lines.push('SUMMARY:' + icsEscape(task.title));
      const desc = [];
      if (task.project) desc.push('Proyek: ' + task.project);
      if (task.tags.length) desc.push('Tag: ' + task.tags.join(', '));
      if (task.notes) desc.push(task.notes);
      if (desc.length) lines.push('DESCRIPTION:' + icsEscape(desc.join('\n')));
      lines.push('STATUS:' + (task.status === 'cancelled' ? 'CANCELLED' : 'CONFIRMED'));
      lines.push('PRIORITY:' + (priorityMap[task.priority] || 5));
      if (task.project) lines.push('CATEGORIES:' + icsEscape(task.project));
      if (task.status === 'done' && task.completedAt) lines.push('COMPLETED:' + icsDateStamp(task.completedAt));
      lines.push('END:VEVENT');
    });
    lines.push('END:VCALENDAR');
    if (!count) {
      toast('Belum ada tugas bertanggal untuk diekspor.', { type: 'warn', iconName: 'calendar' });
      return;
    }
    downloadFile('tuntas-kalender-' + todayKey() + '.ics', lines.join('\r\n') + '\r\n', 'text/calendar;charset=utf-8');
    toast(count + ' tugas diekspor ke .ics.', { toastIcon: 'calendar' });
  }

  /* ---------- pengingat tenggat ---------- */
  function upcomingReminderTasks() {
    const today = todayKey();
    return data.tasks.filter(task => {
      if (!task.due || !['not_started', 'in_progress', 'pending'].includes(task.status)) return false;
      const d = diffDays(today, task.due);
      return d >= 0 && d <= 3;
    }).sort((a, b) => {
      const due = String(a.due).localeCompare(String(b.due));
      return due !== 0 ? due : compareSmart(a, b);
    });
  }
  function maybeShowReminder(force) {
    if (!force && settings.reminderDismissedDate === todayKey()) return;
    const list = upcomingReminderTasks();
    if (!list.length) {
      if (force) toast('Tidak ada tenggat dalam tiga hari ke depan.', { type: 'warn', iconName: 'bell' });
      return;
    }
    openReminderModal(force);
  }
  function openReminderModal(manual) {
    const list = upcomingReminderTasks();
    if (!list.length) {
      toast('Tidak ada tenggat dalam tiga hari ke depan.', { type: 'warn', iconName: 'bell' });
      return;
    }
    ui.reminderOpen = true;
    renderReminderModal(list, manual);
    syncBodyLock();
    setTimeout(function () {
      const btn = document.querySelector('#reminder-modal-root [data-action="close-reminder"]');
      if (btn) btn.focus({ preventScroll: true });
    }, 40);
  }
  function closeReminderModal(persist) {
    if (persist) {
      const check = document.getElementById('reminder-dismiss-check');
      if (check && check.checked) {
        settings.reminderDismissedDate = todayKey();
        saveSettings();
      }
    }
    const root = document.getElementById('reminder-modal-root');
    if (root) root.innerHTML = '';
    ui.reminderOpen = false;
    syncBodyLock();
    renderNav();
  }
  function renderReminderModal(list, manual) {
    const root = document.getElementById('reminder-modal-root');
    if (!root) return;
    const rows = list.map(task => {
      const days = diffDays(todayKey(), task.due);
      const label = days === 0 ? 'Hari ini' : days === 1 ? 'Besok' : 'H-' + days;
      return '<li class="reminder-item"><button type="button" class="reminder-main" data-action="edit-task" data-id="' + esc(task.id) + '">' +
        '<span class="reminder-dot" style="--c:' + statusColor(task.status) + '"></span>' +
        '<span class="reminder-copy"><strong>' + esc(task.title) + '</strong><span>' + esc(task.project || 'Tanpa proyek') + (task.time ? ' · ' + esc(task.time.replace(':', '.')) : '') + ' · ' + esc(statusLabel(task.status)) + '</span></span>' +
        '<span class="reminder-when' + (days === 0 ? ' is-today' : '') + '">' + label + '</span></button></li>';
    }).join('');
    root.innerHTML = '<div class="modal-backdrop" data-modal="reminder"><div class="modal-card reminder-card" role="dialog" aria-modal="true" aria-labelledby="reminder-title">' +
      '<div class="modal-head"><div><p class="eyebrow">Pengingat tenggat</p><h2 id="reminder-title">' + (manual ? 'Tenggat yang perlu dijaga' : 'Ada yang mendekati tenggat') + '</h2><p>Tugas aktif dengan tenggat dalam tiga hari ke depan.</p></div>' +
      '<button type="button" class="icon-btn modal-close" data-action="close-reminder" aria-label="Tutup">' + icon('x', 17) + '</button></div>' +
      '<div class="modal-body"><ul class="reminder-list">' + rows + '</ul>' +
      '<label class="check-row"><input type="checkbox" id="reminder-dismiss-check"> Jangan tampilkan lagi hari ini</label>' +
      '<p class="reminder-note">' + icon('info', 13) + '<span>Pengingat muncul sekali saat aplikasi dibuka. Kamu bisa membukanya lagi lewat menu Pengingat.</span></p></div>' +
      '<div class="modal-foot"><span class="spacer"></span><button type="button" class="btn btn-ghost" data-action="close-reminder">Nanti saja</button><button type="button" class="btn btn-primary" data-action="close-reminder">Mengerti</button></div>' +
      '</div></div>';
  }

  /* ---------- Google Calendar ---------- */
  function calendarTimeZone() {
    try { return Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Makassar'; } catch (err) { return 'Asia/Makassar'; }
  }
  function calendarDescription(task) {
    const lines = [];
    if (task.project) lines.push('Proyek: ' + task.project);
    lines.push('Status: ' + statusLabel(task.status));
    lines.push('Prioritas: ' + (PRIORITY_MAP[task.priority] || PRIORITY_MAP.medium).label);
    if (task.tags && task.tags.length) lines.push('Tag: ' + task.tags.join(', '));
    if (task.notes) lines.push('', task.notes);
    if (task.recurring) lines.push('', 'Tugas berulang: ' + recurrenceLabel(task.recurrenceFrequency));
    lines.push('', 'Dibuat dari TUNTAS — ruang kerja pribadi.');
    return lines.join('\n');
  }
  function gcalTemplateUrl(task) {
    if (!task || (!task.due && !task.start)) return '';
    const startKey = task.due || task.start;
    const endKey = task.due || task.start;
    const tz = calendarTimeZone();
    let start;
    let end;
    if (task.time) {
      const [hh, mm] = task.time.split(':').map(Number);
      const startDate = new Date(parseKey(startKey).getFullYear(), parseKey(startKey).getMonth(), parseKey(startKey).getDate(), hh, mm);
      const endDate = new Date(startDate.getTime() + 60 * 60000);
      const compact = d => d.getFullYear() + pad2(d.getMonth() + 1) + pad2(d.getDate()) + 'T' + pad2(d.getHours()) + pad2(d.getMinutes()) + '00';
      start = compact(startDate);
      end = compact(endDate);
    } else {
      const first = task.start && task.start < endKey ? task.start : endKey;
      const last = task.due && task.start && task.due > task.start ? task.due : first;
      start = first.replace(/-/g, '');
      end = addDaysKey(last, 1).replace(/-/g, '');
    }
    const params = new URLSearchParams();
    params.set('action', 'TEMPLATE');
    params.set('text', task.title || 'Agenda TUNTAS');
    params.set('dates', start + '/' + end);
    params.set('details', calendarDescription(task));
    if (task.time) params.set('ctz', tz);
    return 'https://calendar.google.com/calendar/render?' + params.toString();
  }
  function addTaskToGoogleCalendar(id) {
    const task = taskById(id);
    if (!task) return;
    const url = gcalTemplateUrl(task);
    if (!url) {
      toast('Isi tanggal mulai atau tenggat terlebih dahulu.', { type: 'warn', iconName: 'calendar' });
      return;
    }
    window.open(url, '_blank', 'noopener');
    toast('Google Calendar dibuka. Tekan Simpan di sana untuk menambahkan agenda.', { toastIcon: 'calendar-plus', duration: 5000 });
  }
  function calendarTaskPayload() {
    return data.tasks.filter(t => t.status !== 'cancelled' && (t.due || t.start)).map(t => ({
      id: t.id, title: t.title, start: t.start, due: t.due, time: t.time,
      project: t.project, status: t.status, priority: t.priority, tags: t.tags, notes: t.notes,
      recurring: t.recurring, recurrenceFrequency: t.recurrenceFrequency
    }));
  }
  function openCalendarSyncModal() {
    ui.calendarModalOpen = true;
    renderCalendarSyncModal();
    syncBodyLock();
  }
  function closeCalendarSyncModal() {
    document.getElementById('calendar-modal-root').innerHTML = '';
    ui.calendarModalOpen = false;
    syncBodyLock();
  }
  function renderCalendarSyncModal() {
    if (!ui.calendarModalOpen) return;
    const root = document.getElementById('calendar-modal-root');
    if (!root) return;
    const dated = data.tasks.filter(t => t.status !== 'cancelled' && (t.due || t.start)).sort(compareSmart);
    const upcoming = dated.filter(t => (t.due || t.start) >= todayKey()).slice(0, 6);
    const configured = bridgeConfigured();
    const busy = ui.bridgeBusy;
    const statusLine = settings.calendarLastSyncAt
      ? 'Terakhir sinkron ' + timeAgo(settings.calendarLastSyncAt) + (settings.calendarName ? ' · ' + settings.calendarName : '')
      : 'Belum pernah disinkronkan.';
    root.innerHTML = '<div class="modal-backdrop" data-modal="calendar-sync"><div class="modal-card sync-modal" role="dialog" aria-modal="true" aria-labelledby="calendar-sync-title">' +
      '<div class="modal-head"><div><p class="eyebrow">Google Calendar</p><h2 id="calendar-sync-title">Sinkronkan agenda</h2><p>Satu arah dari TUNTAS ke kalender Google-mu.</p></div>' +
      '<button type="button" class="icon-btn modal-close" data-action="close-calendar-sync" aria-label="Tutup">' + icon('x', 17) + '</button></div>' +
      '<div class="modal-body">' +
      '<div class="sync-status-card"><span class="sync-status-icon">' + icon('calendar-plus', 20) + '</span><div><strong>' + (configured ? 'Bridge siap dipakai' : 'Hubungkan bridge Vercel sekali') + '</strong><span>' + esc(statusLine) + '</span></div></div>' +
      '<div class="sync-steps"><div><strong>1. Tanpa pengaturan</strong><span>Buka halaman “Buat acara” Google Calendar untuk tiap tugas. Kamu tinggal menekan Simpan.</span></div>' +
      '<div><strong>2. Dengan bridge</strong><span>Sinkronkan semua agenda sekaligus ke kalender utama. Perubahan di Google Calendar tidak kembali ke TUNTAS.</span></div></div>' +
      (configured ? '<div class="sync-info">' + icon('info', 14) + '<span>Bridge akan membuat atau memperbarui acara untuk ' + dated.length + ' tugas bertanggal. Tugas yang dihapus akan ikut dihapus dari kalender saat sinkron.</span></div>' :
        '<div class="sync-info is-warn">' + icon('cloud', 14) + '<span>Untuk sinkron massal dan pembuatan file Drive, atur bridge Vercel di menu Data & cadangan.</span></div>') +
      '<div class="data-actions"><button type="button" class="btn btn-primary btn-compact" data-action="calendar-sync-now"' + (configured && !busy ? '' : ' disabled') + '>' + icon('refresh', 13) + (busy ? 'Menyinkronkan…' : 'Sinkronkan sekarang') + '</button>' +
      '<button type="button" class="btn btn-ghost btn-compact" data-action="' + (configured ? 'open-integration' : 'open-integration') + '">' + icon('cloud', 13) + 'Atur integrasi</button>' +
      '<button type="button" class="btn btn-ghost btn-compact" data-action="export-ics">' + icon('download', 13) + 'Ekspor .ics</button></div>' +
      (upcoming.length ? '<div class="sync-task-list"><div class="sync-list-title">Tambah satu per satu</div>' + upcoming.map(task =>
        '<div class="sync-task-row"><div class="sync-task-main"><strong>' + esc(task.title) + '</strong><span>' + esc(formatDateMedium(task.due || task.start)) + (task.time ? ' · ' + esc(task.time.replace(':', '.')) : '') + (task.project ? ' · ' + esc(task.project) : '') + '</span></div>' +
        '<button type="button" class="btn btn-ghost btn-compact" data-action="add-to-gcal" data-id="' + esc(task.id) + '">' + icon('calendar-plus', 12) + 'Tambah</button></div>').join('') + '</div>' :
        '<p class="empty-inline">Belum ada tugas bertanggal. Tambahkan tenggat agar agenda bisa dikirim ke Google Calendar.</p>') +
      '</div><div class="modal-foot"><span class="spacer"></span><button type="button" class="btn btn-ghost" data-action="close-calendar-sync">Tutup</button></div></div></div>';
  }
  async function syncCalendarNow() {
    if (ui.bridgeBusy) return;
    if (!bridgeConfigured()) {
      toast('Atur bridge Vercel terlebih dahulu di menu Data & cadangan.', { type: 'warn', iconName: 'cloud' });
      return;
    }
    const tasks = calendarTaskPayload();
    if (!tasks.length) {
      toast('Belum ada tugas bertanggal untuk disinkronkan.', { type: 'warn', iconName: 'calendar' });
      return;
    }
    ui.bridgeBusy = true;
    renderCalendarSyncModal();
    try {
      const result = await bridgeRequest('syncCalendar', { tasks, removeMissing: true, timezone: calendarTimeZone() }, 120000);
      settings.calendarLastSyncAt = nowIso();
      settings.calendarName = String(result.calendarName || '');
      saveSettings();
      addRawActivity('calendar', 'Sinkron Google Calendar: ' + (result.created || 0) + ' baru, ' + (result.updated || 0) + ' diperbarui, ' + (result.removed || 0) + ' dihapus.');
      persistData();
      renderAll();
      renderCalendarSyncModal();
      toast('Google Calendar tersinkron: ' + (result.created || 0) + ' baru, ' + (result.updated || 0) + ' diperbarui.', { toastIcon: 'calendar-plus', duration: 5000 });
    } catch (err) {
      toast('Sinkron Calendar gagal. ' + (err.message || ''), { type: 'error', duration: 6500, iconName: 'alert-triangle' });
      renderCalendarSyncModal();
    } finally {
      ui.bridgeBusy = false;
      if (ui.calendarModalOpen) renderCalendarSyncModal();
    }
  }

  /* ---------- laporan kinerja ---------- */
  function isReportFiled(report) {
    return Boolean(report && (report.status === 'sent' || report.status === 'file_created'));
  }
  function reportForTask(task) {
    if (!task) return null;
    const completed = task.completedAt || '';
    return data.reports.find(r => r.taskId === task.id && (!r.taskCompletedAt || !completed || r.taskCompletedAt === completed)) || null;
  }
  function pendingReportsToday() {
    const today = todayKey();
    return data.tasks.filter(task => task.status === 'done' && task.completedAt && dateKey(new Date(task.completedAt)) === today && !isReportFiled(reportForTask(task))).length;
  }
  function doneTasksForReport() {
    return data.tasks.filter(t => t.status === 'done' && t.completedAt).sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));
  }
  function reportStatusMeta(report) {
    if (!report) return { key: 'pending', label: 'Belum dilaporkan', iconName: 'circle', className: 'is-pending' };
    if (report.status === 'sent') return { key: 'sent', label: 'Terkirim', iconName: 'check-circle', className: 'is-sent' };
    if (report.status === 'file_created') return { key: 'file', label: 'File Drive dibuat', iconName: 'cloud', className: 'is-file' };
    if (report.status === 'sending') return { key: 'sending', label: 'Sedang dikirim', iconName: 'refresh', className: 'is-sending' };
    if (report.status === 'failed') return { key: 'failed', label: 'Gagal, coba lagi', iconName: 'alert-triangle', className: 'is-failed' };
    return { key: 'draft', label: 'Draf / manual', iconName: 'pencil', className: 'is-draft' };
  }
  function renderReportView() {
    const today = todayKey();
    const doneToday = doneTasksForReport().filter(t => dateKey(new Date(t.completedAt)) === today);
    const filedToday = doneToday.filter(t => isReportFiled(reportForTask(t)));
    const pendingToday = doneToday.length - filedToday.length;
    const olderPending = doneTasksForReport().filter(t => dateKey(new Date(t.completedAt)) !== today && !isReportFiled(reportForTask(t))).slice(0, 60);
    const allDone = doneTasksForReport();
    const totalFiled = allDone.filter(t => isReportFiled(reportForTask(t))).length;
    const recentReports = data.reports.slice(0, 20);
    const configured = bridgeConfigured();
    let html = '<section class="view view-report" aria-labelledby="view-title">' +
      '<div class="page-head"><div><p class="eyebrow">Satu pekerjaan, satu laporan</p><h1 id="view-title">Laporan kinerja</h1><p>Setiap tugas yang selesai dilaporkan satu per satu. TUNTAS menyiapkan isinya, membuat file Drive, lalu mengirimkannya ke aplikasi laporan.</p></div>' +
      '<div class="page-head-actions"><button type="button" class="btn btn-ghost" data-action="open-report-target">' + icon('external-link', 15) + 'Buka aplikasi laporan</button><button type="button" class="btn btn-ghost" data-action="open-integration">' + icon('cloud', 15) + 'Integrasi</button></div></div>' +
      '<div class="stat-grid report-stat-grid">' +
      '<div class="stat-card"><span class="stat-label">Selesai hari ini</span><span class="stat-value">' + doneToday.length + '</span><span class="stat-sub">Pekerjaan yang bisa dilaporkan</span></div>' +
      '<div class="stat-card"><span class="stat-label">Sudah dilaporkan</span><span class="stat-value' + (filedToday.length ? ' is-ok' : '') + '">' + filedToday.length + '</span><span class="stat-sub">Selesai hari ini</span></div>' +
      '<div class="stat-card"><span class="stat-label">Menunggu</span><span class="stat-value' + (pendingToday ? ' is-warning' : '') + '">' + pendingToday + '</span><span class="stat-sub">Belum dilaporkan hari ini</span></div>' +
      '<div class="stat-card"><span class="stat-label">Total laporan</span><span class="stat-value">' + data.reports.length + '</span><span class="stat-sub">' + data.reports.filter(r => r.driveFileUrl).length + ' punya file Drive</span></div></div>' +
      ((!configured || pendingToday || olderPending.length) ? '<div class="report-banner' + (configured ? '' : ' is-warn') + '">' + icon(configured ? 'clipboard-check' : 'cloud', 18) + '<div><strong>' + (configured ? 'Laporkan satu per satu, tanpa batch.' : 'Hubungkan Google Drive untuk kirim otomatis.') + '</strong><span>' + (configured ? 'Setiap tombol Laporkan membuat satu file Drive dan mengirim satu laporan. Tombol ini tidak pernah mengirim beberapa tugas sekaligus.' : 'Tanpa bridge, TUNTAS tetap bisa menyiapkan ringkasan dan membuka aplikasi laporan. Untuk pembuatan file Drive dan pengiriman satu klik, atur integrasi sekali saja.') + '</span></div>' +
        (configured ? '' : '<button type="button" class="btn btn-primary btn-compact" data-action="open-integration">' + icon('cloud', 13) + 'Atur integrasi</button>') + '</div>' : '') +
      '<section class="panel"><div class="panel-head"><h2 class="panel-title">' + icon('check-circle', 15) + 'Selesai hari ini' + '<span class="count-pill">' + doneToday.length + '</span></h2><span class="stat-sub">' + esc(formatDateLong(today)) + '</span></div>' +
      (doneToday.length ? '<div class="report-task-list">' + doneToday.map(reportTaskRowHtml).join('') + '</div>' : emptyState('check-circle', 'Belum ada pekerjaan selesai hari ini', 'Tandai tugas selesai, lalu laporan kinerjanya akan muncul di sini satu per satu.', '<button type="button" class="btn btn-ghost btn-compact" data-action="nav" data-view="focus">' + icon('target', 13) + 'Buka fokus hari ini</button>', true)) +
      '</section>' +
      (olderPending.length ? '<section class="panel"><div class="panel-head"><h2 class="panel-title">' + icon('alert-triangle', 15) + 'Belum dilaporkan' + '<span class="count-pill">' + olderPending.length + '</span></h2><span class="stat-sub">Selesai sebelum hari ini</span></div><div class="report-task-list">' + olderPending.map(reportTaskRowHtml).join('') + '</div></section>' : '') +
      '<section class="panel"><div class="panel-head"><h2 class="panel-title">' + icon('file-text', 15) + 'Riwayat laporan' + '<span class="count-pill">' + data.reports.length + '</span></h2><button type="button" class="panel-link" data-action="open-report-target">Aplikasi laporan ' + icon('external-link', 12) + '</button></div>' +
      (recentReports.length ? '<div class="report-history">' + recentReports.map(reportHistoryRowHtml).join('') + '</div>' : '<p class="empty-inline">Belum ada laporan. Setiap laporan yang dikirim akan tercatat di sini.</p>') +
      '</section></section>';
    return html;
  }
  function reportTaskRowHtml(task) {
    const report = reportForTask(task);
    const filed = isReportFiled(report);
    const meta = reportStatusMeta(report);
    const when = dateKey(new Date(task.completedAt));
    return '<article class="report-task">' +
      '<span class="report-task-mark">' + icon('check', 12) + '</span>' +
      '<div class="report-task-main"><strong>' + esc(task.title) + '</strong><span>' + (task.project ? esc(task.project) + ' · ' : '') + esc(when === todayKey() ? 'Hari ini' : formatDateMedium(when)) +
      (task.completedAt ? ' · ' + esc(timeKeyFromIso(task.completedAt).replace(':', '.')) : '') + (task.recurring ? ' · berulang' : '') + '</span></div>' +
      '<span class="report-status ' + meta.className + '">' + icon(meta.iconName, 11) + esc(meta.label) + '</span>' +
      '<div class="report-task-actions">' + (filed
        ? '<button type="button" class="btn btn-ghost btn-compact" data-action="view-report" data-id="' + esc(report.id) + '">Lihat</button>'
        : '<button type="button" class="btn btn-primary btn-compact" data-action="open-report" data-id="' + esc(task.id) + '">' + icon('send', 12) + (report ? 'Lanjutkan' : 'Laporkan') + '</button>') + '</div></article>';
  }
  function reportHistoryRowHtml(report) {
    const meta = reportStatusMeta(report);
    return '<div class="report-history-row"><div class="report-history-main"><strong>' + esc(report.taskTitle || 'Laporan kinerja') + '</strong><span>' + esc(formatDateMedium(report.date)) + ' · ' + esc(report.jamAwal || '—') + '–' + esc(report.jamAkhir || '—') + (report.driveFileUrl ? ' · file Drive' : '') + '</span></div>' +
      '<span class="report-status ' + meta.className + '">' + icon(meta.iconName, 11) + esc(meta.label) + '</span>' +
      '<button type="button" class="btn btn-ghost btn-compact" data-action="view-report" data-id="' + esc(report.id) + '">Detail</button></div>';
  }
  function blankReport(task) {
    const now = new Date();
    const completedTime = task && task.completedAt ? timeKeyFromIso(task.completedAt) : timeKeyFromIso(now.toISOString());
    const end = settings.workEnd || completedTime;
    const start = settings.workStart && (!end || settings.workStart <= end) ? settings.workStart : '08:00';
    return normalizeReport({
      id: uid('rep'),
      taskId: task ? task.id : '',
      taskTitle: task ? task.title : '',
      taskCompletedAt: task ? (task.completedAt || '') : '',
      date: todayKey(),
      nama: settings.name || '',
      jamAwal: start,
      jamAkhir: end || completedTime,
      aktivitas: task ? buildReportActivity(task) : '',
      keterangan: task ? buildReportKeterangan(task) : '',
      evidence: '',
      status: 'draft'
    });
  }
  function buildReportActivity(task) {
    const lines = [task.title];
    if (task.project) lines.push('Proyek: ' + task.project);
    const doneItems = (task.checklist || []).filter(i => i.done).map(i => i.text);
    if (doneItems.length) lines.push('Langkah selesai: ' + doneItems.join('; '));
    if (task.notes) lines.push('', task.notes);
    return lines.join('\n').slice(0, 8000);
  }
  function buildReportKeterangan(task) {
    const bits = [];
    bits.push('Diselesaikan melalui TUNTAS pada ' + formatDateLong(dateKey(new Date(task.completedAt || nowIso()))) + '.');
    if (task.priority) bits.push('Prioritas: ' + (PRIORITY_MAP[task.priority] || PRIORITY_MAP.medium).label + '.');
    if (task.recurring) bits.push('Tugas berulang: ' + recurrenceLabel(task.recurrenceFrequency) + '.');
    return bits.join(' ');
  }
  function openReportModal(task, existing) {
    if (!task) return;
    const current = existing || reportForTask(task);
    if (current && current.status === 'sent') {
      openReportDetail(current.id);
      return;
    }
    ui.reportDetailId = '';
    ui.reportModal = { task: clone(task), report: current ? clone(current) : blankReport(task) };
    renderReportModal();
    syncBodyLock();
    setTimeout(function () {
      const input = document.getElementById('report-name');
      if (input) input.focus({ preventScroll: true });
    }, 40);
  }
  function closeReportModal() {
    const root = document.getElementById('report-modal-root');
    if (root) root.innerHTML = '';
    ui.reportModal = null;
    ui.reportDetailId = '';
    syncBodyLock();
  }
  function reportBridgeWarningHtml(report) {
    if (bridgeConfigured()) {
      return '<div class="report-note is-ok">' + icon('cloud', 14) + '<span>File Google Drive dibuat otomatis. Setelah itu laporan dikirim ke aplikasi kinerja.</span></div>';
    }
    return '<div class="report-note is-warn">' + icon('cloud', 14) + '<span>Bridge Vercel belum terhubung. Tombol di bawah akan menyalin ringkasan dan membuka aplikasi laporan; file Drive belum dibuat otomatis.</span><button type="button" class="btn btn-ghost btn-compact" data-action="open-integration">Atur</button></div>';
  }
  function renderReportModal() {
    if (!ui.reportModal) return;
    const root = document.getElementById('report-modal-root');
    if (!root) return;
    const task = ui.reportModal.task;
    const report = ui.reportModal.report;
    const existing = Boolean(report.driveFileUrl);
    const primaryLabel = bridgeConfigured() ? (existing ? 'Kirim ulang ke aplikasi' : 'Buat file Drive & kirim') : 'Salin & buka aplikasi';
    root.innerHTML = '<div class="modal-backdrop" data-modal="report"><div class="modal-card report-modal" role="dialog" aria-modal="true" aria-labelledby="report-title">' +
      '<div class="modal-head"><div><p class="eyebrow">Laporan kinerja · satu pekerjaan</p><h2 id="report-title">' + esc(task ? task.title : 'Laporan kinerja') + '</h2><p>' + esc(formatDateLong(task && task.completedAt ? dateKey(new Date(task.completedAt)) : report.date)) + ' · satu laporan untuk satu pekerjaan ini.</p></div>' +
      '<button type="button" class="icon-btn modal-close" data-action="close-report" aria-label="Tutup">' + icon('x', 17) + '</button></div>' +
      '<form id="report-form" autocomplete="off"><div class="modal-body">' +
      reportBridgeWarningHtml(report) +
      '<div class="field-row"><label class="field"><span>Nama Anda</span><input id="report-name" name="nama" maxlength="120" required placeholder="Nama lengkap" value="' + esc(report.nama || settings.name) + '"></label>' +
      '<label class="field"><span>Tanggal</span><input name="date" type="text" value="' + esc(formatDateMedium(report.date)) + '" readonly></label></div>' +
      '<div class="field-row"><label class="field"><span>Jam awal kerja</span><input name="jamAwal" type="time" required value="' + esc(report.jamAwal || settings.workStart) + '"></label>' +
      '<label class="field"><span>Jam akhir kerja</span><input name="jamAkhir" type="time" required value="' + esc(report.jamAkhir || settings.workEnd) + '"></label></div>' +
      '<label class="field"><span>Aktivitas / Kinerja</span><textarea name="aktivitas" rows="5" maxlength="8000" required>' + esc(report.aktivitas || buildReportActivity(task)) + '</textarea></label>' +
      '<label class="field"><span>Keterangan tambahan</span><textarea name="keterangan" rows="3" maxlength="4000">' + esc(report.keterangan || buildReportKeterangan(task)) + '</textarea></label>' +
      '<label class="field"><span>Bukti / Evidence <span class="field-hint">opsional — tautan file Drive ditambahkan otomatis</span></span><input name="evidence" maxlength="2000" placeholder="Teks atau tautan tambahan" value="' + esc(report.evidence) + '"></label>' +
      '<p class="form-meta">' + icon('info', 11) + ' Satu laporan hanya untuk tugas ini. Tugas lain harus dilaporkan lewat tombolnya masing-masing.</p>' +
      '</div><div class="modal-foot"><button type="button" class="btn btn-danger btn-compact" data-action="close-report">Batal</button><span class="spacer"></span>' +
      (report.driveFileUrl ? '<a class="btn btn-ghost btn-compact" href="' + esc(report.driveFileUrl) + '" target="_blank" rel="noopener">' + icon('external-link', 12) + 'File Drive</a>' : '') +
      '<button type="submit" class="btn btn-primary"' + (ui.bridgeBusy ? ' disabled' : '') + '>' + icon(bridgeConfigured() ? 'send' : 'external-link', 14) + (ui.bridgeBusy ? 'Mengirim…' : primaryLabel) + '</button></div></form></div></div>';
  }
  function upsertReport(report) {
    const index = data.reports.findIndex(r => r.id === report.id);
    const record = normalizeReport(Object.assign({}, report, { updatedAt: nowIso() }));
    if (index >= 0) data.reports[index] = record;
    else data.reports.unshift(record);
    data.reports.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    data.reports = data.reports.slice(0, 600);
    return record;
  }
  async function copyPlainText(text) {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch (err) { /* fallback di bawah */ }
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      ta.remove();
      return ok;
    } catch (err) {
      return false;
    }
  }
  function buildReportText(report) {
    return ['Laporan Kinerja', 'Tanggal: ' + report.date, 'Nama: ' + report.nama, 'Jam kerja: ' + report.jamAwal + '–' + report.jamAkhir, '', 'Aktivitas / Kinerja:', report.aktivitas, '', 'Keterangan Tambahan:', report.keterangan || '-', '', 'Bukti / Evidence:', report.evidence || report.driveFileUrl || '-'].join('\n');
  }
  async function submitReportManually(report) {
    const target = settings.reportTargetUrl || DEFAULT_REPORT_URL;
    const win = window.open(target, '_blank', 'noopener');
    report.status = 'draft';
    report.manual = true;
    const saved = upsertReport(report);
    addRawActivity('report', 'Ringkasan laporan disalin untuk ' + (saved.taskTitle || 'satu tugas') + '.');
    const copied = await copyPlainText(buildReportText(saved));
    saveAndRender({ render: false });
    closeReportModal();
    openReportDetail(saved.id);
    toast(copied ? 'Ringkasan disalin. Tempelkan ke formulir yang terbuka, lalu tandai sudah dikirim.' : 'Aplikasi laporan dibuka. Salin ringkasan dari detail laporan bila perlu.', { type: 'warn', iconName: 'clipboard-check', duration: 6500 });
    if (!win) toast('Peramban memblokir tab baru. Buka aplikasi laporan dari tombol di halaman laporan.', { type: 'warn', duration: 6000 });
  }
  async function handleReportSubmit(event) {
    event.preventDefault();
    if (!ui.reportModal || ui.bridgeBusy) return;
    const form = event.target;
    const fd = new FormData(form);
    const report = Object.assign({}, ui.reportModal.report, {
      nama: String(fd.get('nama') || '').trim().slice(0, 120),
      jamAwal: normalizeTime(fd.get('jamAwal')),
      jamAkhir: normalizeTime(fd.get('jamAkhir')),
      aktivitas: String(fd.get('aktivitas') || '').trim().slice(0, 8000),
      keterangan: String(fd.get('keterangan') || '').trim().slice(0, 4000),
      evidence: String(fd.get('evidence') || '').trim().slice(0, 2000),
      targetUrl: settings.reportTargetUrl || DEFAULT_REPORT_URL,
      updatedAt: nowIso()
    });
    if (!report.nama || !report.aktivitas || !report.jamAwal || !report.jamAkhir) {
      toast('Lengkapi nama, jam kerja, dan aktivitas terlebih dahulu.', { type: 'warn', iconName: 'clipboard-check' });
      const missing = !report.nama ? 'report-name' : !report.aktivitas ? 'report-activity' : '';
      if (missing) { const el = document.getElementById(missing); if (el) el.focus(); }
      return;
    }
    if (report.jamAwal > report.jamAkhir) {
      toast('Jam akhir tidak boleh lebih awal dari jam mulai.', { type: 'warn', iconName: 'clock' });
      return;
    }
    settings.name = report.nama;
    settings.workStart = report.jamAwal;
    settings.workEnd = report.jamAkhir;
    saveSettings();
    if (!bridgeConfigured()) {
      await submitReportManually(report);
      return;
    }
    ui.bridgeBusy = true;
    const btn = form.querySelector('button[type="submit"]');
    if (btn) { btn.disabled = true; btn.textContent = 'Mengirim…'; }
    report.status = 'sending';
    try {
      const result = await bridgeRequest('submitReport', {
        report,
        targetUrl: settings.reportTargetUrl || DEFAULT_REPORT_URL,
        targetToken: settings.reportTargetToken || '',
        retryForward: Boolean(report.driveFileUrl)
      }, 120000);
      report.driveFileId = String(result.fileId || report.driveFileId || '');
      report.driveFileUrl = String(result.fileUrl || report.driveFileUrl || '');
      report.forward = result.forward || null;
      if (result.forward && result.forward.ok) {
        report.status = 'sent';
        report.sentAt = nowIso();
      } else {
        report.status = 'file_created';
      }
      const saved = upsertReport(report);
      addRawActivity('report', 'Laporan ' + (saved.taskTitle || '') + (saved.status === 'sent' ? ' terkirim ke aplikasi kinerja.' : ' tersimpan sebagai file Drive; pengiriman otomatis belum diterima.'));
      saveAndRender({ render: true });
      ui.bridgeBusy = false;
      closeReportModal();
      openReportDetail(saved.id);
      if (saved.status === 'sent') toast('Laporan terkirim dan file Drive dibuat.', { toastIcon: 'send', duration: 5000 });
      else toast('File Drive dibuat, tetapi aplikasi laporan belum menerima otomatis. Lihat petunjuk di detail.', { type: 'warn', iconName: 'cloud', duration: 7000 });
    } catch (err) {
      ui.bridgeBusy = false;
      report.status = 'failed';
      report.forward = { ok: false, error: err.message || 'Bridge gagal.', code: 0, skipped: false };
      const saved = upsertReport(report);
      saveAndRender({ render: false });
      renderReportModal();
      openReportDetail(saved.id);
      toast('Gagal mengirim laporan. ' + (err.message || ''), { type: 'error', iconName: 'alert-triangle', duration: 7000 });
    }
  }
  function openReportDetail(id) {
    const report = data.reports.find(r => r.id === id);
    if (!report) return;
    ui.reportModal = null;
    ui.reportDetailId = id;
    renderReportDetail(report);
    syncBodyLock();
  }
  function renderReportDetail(report) {
    const root = document.getElementById('report-modal-root');
    if (!root) return;
    const meta = reportStatusMeta(report);
    const forwarded = report.forward && report.forward.ok;
    const warning = report.status === 'file_created' || report.status === 'failed' || (report.status === 'draft' && report.manual);
    root.innerHTML = '<div class="modal-backdrop" data-modal="report"><div class="modal-card report-detail-card" role="dialog" aria-modal="true" aria-labelledby="report-detail-title">' +
      '<div class="modal-head"><div><p class="eyebrow">Detail laporan</p><h2 id="report-detail-title">' + esc(report.taskTitle || 'Laporan kinerja') + '</h2><p>' + esc(formatDateLong(report.date)) + ' · ' + esc(report.jamAwal || '—') + '–' + esc(report.jamAkhir || '—') + '</p></div>' +
      '<button type="button" class="icon-btn modal-close" data-action="close-report" aria-label="Tutup">' + icon('x', 17) + '</button></div>' +
      '<div class="modal-body">' +
      '<div class="report-detail-status ' + meta.className + '">' + icon(meta.iconName, 13) + '<span>' + esc(meta.label) + '</span>' + (report.sentAt ? '<small>' + esc(timeAgo(report.sentAt)) + '</small>' : '') + '</div>' +
      (warning ? '<div class="report-note is-warn">' + icon('info', 14) + '<span>' + (report.status === 'failed' ? 'Pengiriman gagal: ' + esc((report.forward && report.forward.error) || 'tidak ada respons.') : report.status === 'file_created' ? 'File Drive sudah dibuat, tetapi aplikasi laporan belum menerima laporan secara otomatis. Tambahkan fungsi doPost ke aplikasi laporan (lihat <a href="VERCEL.md" target="_blank" rel="noopener">VERCEL.md</a>), lalu coba kirim ulang. Kamu juga bisa membuka aplikasi dan menempelkan ringkasan.' : 'Laporan masih berupa draf. Buka aplikasi laporan, tempel ringkasan, lalu tandai sudah dikirim.') + '</span></div>' : '') +
      '<div class="report-detail-grid"><div><span>Nama</span><strong>' + esc(report.nama || '—') + '</strong></div><div><span>Aktivitas</span><strong>' + esc(report.aktivitas || '—') + '</strong></div><div><span>Keterangan</span><strong>' + esc(report.keterangan || '—') + '</strong></div><div><span>Bukti</span><strong>' + esc(report.evidence || (report.driveFileUrl ? 'File Drive laporan' : '—')) + '</strong></div></div>' +
      (report.driveFileUrl ? '<div class="report-file-card"><span class="file-icon">' + icon('file-text', 17) + '</span><div><strong>File Google Drive</strong><span>' + (forwarded ? 'Sudah dibuat dan dikirim.' : 'Tersimpan di folder TUNTAS — Laporan Kinerja.') + '</span></div><a class="btn btn-ghost btn-compact" href="' + esc(report.driveFileUrl) + '" target="_blank" rel="noopener">' + icon('external-link', 12) + 'Buka</a></div>' : '') +
      '</div><div class="modal-foot"><button type="button" class="btn btn-ghost" data-action="open-report-target">' + icon('external-link', 13) + 'Aplikasi laporan</button>' +
      (report.status !== 'sent' ? '<button type="button" class="btn btn-ghost btn-compact" data-action="copy-report" data-id="' + esc(report.id) + '">' + icon('copy', 12) + 'Salin</button>' : '') +
      '<span class="spacer"></span>' +
      (report.status !== 'sent' && bridgeConfigured() ? '<button type="button" class="btn btn-primary btn-compact" data-action="retry-report" data-id="' + esc(report.id) + '"' + (ui.bridgeBusy ? ' disabled' : '') + '>' + icon('refresh', 12) + 'Kirim ulang</button>' : '') +
      (report.status !== 'sent' ? '<button type="button" class="btn btn-ghost btn-compact" data-action="mark-report-sent" data-id="' + esc(report.id) + '">Tandai terkirim</button>' : '') +
      '<button type="button" class="btn btn-ghost" data-action="close-report">Tutup</button></div></div></div>';
  }
  async function retryReportSubmission(id) {
    const report = data.reports.find(r => r.id === id);
    if (!report || ui.bridgeBusy) return;
    if (!bridgeConfigured()) {
      await submitReportManually(Object.assign({}, report));
      return;
    }
    ui.bridgeBusy = true;
    renderReportDetail(report);
    try {
      const result = await bridgeRequest('submitReport', {
        report,
        targetUrl: settings.reportTargetUrl || DEFAULT_REPORT_URL,
        targetToken: settings.reportTargetToken || '',
        retryForward: true
      }, 120000);
      report.driveFileId = String(result.fileId || report.driveFileId || '');
      report.driveFileUrl = String(result.fileUrl || report.driveFileUrl || '');
      report.forward = result.forward || null;
      if (result.forward && result.forward.ok) {
        report.status = 'sent';
        report.sentAt = nowIso();
      } else {
        report.status = 'file_created';
      }
      const saved = upsertReport(report);
      addRawActivity('report', 'Mengirim ulang laporan ' + (saved.taskTitle || '') + '.');
      saveAndRender({ render: true });
      renderReportDetail(saved);
      if (saved.status === 'sent') toast('Laporan berhasil dikirim.', { toastIcon: 'send' });
      else toast('Pengiriman otomatis masih belum diterima aplikasi laporan.', { type: 'warn', iconName: 'cloud', duration: 6000 });
    } catch (err) {
      report.forward = { ok: false, error: err.message || 'Bridge gagal.', code: 0, skipped: false };
      report.status = 'failed';
      const saved = upsertReport(report);
      saveAndRender({ render: true });
      renderReportDetail(saved);
      toast('Kirim ulang gagal. ' + (err.message || ''), { type: 'error', iconName: 'alert-triangle', duration: 6000 });
    } finally {
      ui.bridgeBusy = false;
      if (ui.reportDetailId === id) {
        const latest = data.reports.find(r => r.id === id);
        if (latest) renderReportDetail(latest);
      }
    }
  }
  function requestMarkReportSent(id) {
    const report = data.reports.find(r => r.id === id);
    if (!report) return;
    askConfirm({
      title: 'Tandai laporan sudah dikirim?',
      message: 'Gunakan ini hanya setelah kamu menempelkan laporan ke aplikasi kinerja. TUNTAS tidak bisa memverifikasi pengiriman manual.',
      confirmLabel: 'Ya, sudah terkirim',
      danger: false,
      onConfirm: function () {
        report.status = 'sent';
        report.sentAt = nowIso();
        report.manual = true;
        upsertReport(report);
        addRawActivity('report', 'Menandai laporan ' + (report.taskTitle || '') + ' sudah dikirim.');
        closeConfirm();
        saveAndRender({ render: true });
        openReportDetail(report.id);
        toast('Laporan ditandai terkirim.', { toastIcon: 'check' });
      }
    });
  }
  function openReportTarget() {
    window.open(settings.reportTargetUrl || DEFAULT_REPORT_URL, '_blank', 'noopener');
  }

  /* ---------- bridge Vercel (Drive, Calendar, laporan) ---------- */
  function bridgeConfigured() {
    return Boolean(String(settings.bridgeUrl || '').trim() && String(settings.bridgeSecret || '').trim());
  }
  function bridgeUrlAllowed(value) {
    if (!value) return true;
    if (value.charAt(0) === '/' && value.charAt(1) !== '/') return true;
    if (/^https:\/\//i.test(value)) return true;
    return /^http:\/\/(localhost|127\.0\.0\.1|\[::1\])(:\d+)?(\/|$)/i.test(value);
  }
  function bridgeEndpoint() {
    const configured = String(settings.bridgeUrl || '').trim();
    if (!configured) return '';
    if (configured.charAt(0) !== '/') return configured;
    if (!/^https?:$/i.test(location.protocol)) {
      throw new Error('URL bridge relatif hanya bekerja saat aplikasi dibuka dari Vercel atau localhost. Isi URL lengkap, misalnya https://nama-proyek.vercel.app/api/bridge.');
    }
    return location.origin + configured;
  }
  function bridgeRequest(action, payload, timeoutMs) {
    if (!bridgeConfigured()) {
      return Promise.reject(new Error('Bridge Vercel belum diatur. Buka Data & cadangan → Google Drive & laporan.'));
    }

    let endpoint;
    try {
      endpoint = bridgeEndpoint();
    } catch (err) {
      return Promise.reject(err);
    }

    const requestId = uid('br');
    const timeout = Math.max(5000, Number(timeoutMs) || 60000);
    const controller = typeof AbortController === 'function' ? new AbortController() : null;
    const body = JSON.stringify(Object.assign({ action, secret: settings.bridgeSecret, requestId }, payload || {}));

    return new Promise(function (resolve, reject) {
      let settled = false;
      const timer = setTimeout(function () {
        if (controller) {
          try { controller.abort(); } catch (err) { /* noop */ }
        }
        finish(new Error('Bridge tidak merespons dalam ' + Math.round(timeout / 1000) + ' detik. Periksa URL Vercel dan koneksi internet.'));
      }, timeout);

      function finish(err, result) {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        if (err) reject(err);
        else resolve(result);
      }

      fetch(endpoint, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-store',
        credentials: 'omit',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: body,
        signal: controller ? controller.signal : undefined
      }).then(function (response) {
        return response.text().then(function (text) {
          let parsed = null;
          try { parsed = text ? JSON.parse(text) : null; } catch (err) { parsed = null; }

          if (!parsed || typeof parsed !== 'object') {
            if (response.status === 404) {
              throw new Error('Endpoint /api/bridge tidak ditemukan (HTTP 404). Pastikan file api/bridge.js ikut ter-deploy di Vercel.');
            }
            if (response.status === 405) {
              throw new Error('Bridge menolak metode POST (HTTP 405). Pastikan URL berakhiran /api/bridge, bukan halaman aplikasi.');
            }
            if (response.status === 501) {
              throw new Error('Endpoint bridge tidak menerima POST (HTTP 501). Pastikan api/bridge.js ter-deploy di Vercel, bukan server statis biasa.');
            }
            if (response.status >= 500) {
              throw new Error('Bridge Vercel mengalami kesalahan (HTTP ' + response.status + '). Buka Logs di dashboard Vercel.');
            }
            throw new Error('Balasan bridge bukan JSON (HTTP ' + response.status + '). Periksa URL bridge Vercel.');
          }

          if (parsed.ok === false) {
            throw new Error(parsed.error || 'Bridge mengembalikan kesalahan.');
          }
          if (!response.ok) {
            throw new Error('Bridge membalas HTTP ' + response.status + '.');
          }
          return parsed.result === undefined ? parsed : parsed.result;
        });
      }).then(function (result) {
        finish(null, result);
      }).catch(function (err) {
        if (err && err.name === 'AbortError') {
          finish(new Error('Bridge tidak merespons. Periksa URL Vercel dan koneksi internet.'));
          return;
        }
        if (err instanceof TypeError) {
          finish(new Error('Tidak bisa menghubungi bridge. Periksa URL, koneksi internet, dan izin CORS (TUNTAS_ALLOWED_ORIGIN) di Vercel.'));
          return;
        }
        finish(err);
      });
    });
  }
  async function testBridge() {
    if (ui.bridgeBusy) return;
    if (!saveIntegrationSettings(false)) return;
    if (!bridgeConfigured()) {
      toast('Isi URL bridge dan token rahasia terlebih dahulu.', { type: 'warn', iconName: 'cloud' });
      return;
    }
    ui.bridgeBusy = true;
    if (ui.dataModalOpen) renderDataModal();
    try {
      const result = await bridgeRequest('ping', {}, 30000);
      const detail = [result.email ? 'sebagai ' + result.email : '', result.folderName ? 'folder ' + result.folderName : '', result.calendarName ? 'kalender ' + result.calendarName : ''].filter(Boolean).join(', ');
      toast('Bridge terhubung' + (detail ? ' ' + detail : '') + '.', { toastIcon: 'cloud', duration: 6000 });
    } catch (err) {
      toast('Bridge belum terhubung. ' + (err.message || ''), { type: 'error', iconName: 'alert-triangle', duration: 7500 });
    } finally {
      ui.bridgeBusy = false;
      if (ui.dataModalOpen) renderDataModal();
    }
  }
  function integrationSectionHtml() {
    const configured = bridgeConfigured();
    const saved = settings.lastDriveSyncAt ? 'Terakhir ke Drive ' + timeAgo(settings.lastDriveSyncAt) : 'Belum ada cadangan Drive dari perangkat ini.';
    const calendarLine = settings.calendarLastSyncAt ? 'Calendar ' + timeAgo(settings.calendarLastSyncAt) : 'Calendar belum disinkronkan.';
    return '<div class="data-section integration-section" id="integration-settings"><div class="data-section-head"><div><h3>' + icon('cloud', 15) + 'Google Drive & laporan</h3><p>Cadangkan data ke Drive, sinkronkan agenda ke Google Calendar, dan buat satu Google Doc untuk tiap laporan kinerja lewat bridge Vercel.</p></div>' +
      '<span class="cloud-state ' + (configured ? 'is-on' : '') + '">' + icon(configured ? 'check-circle' : 'cloud', 11) + (configured ? 'Bridge aktif' : 'Belum diatur') + '</span></div>' +
      '<div class="cloud-status"><div><span class="file-status-dot ' + (configured ? 'is-connected' : '') + '"></span><strong>' + (configured ? 'Bridge siap' : 'Satu kali pengaturan') + '</strong><span>' + esc(saved) + ' · ' + esc(calendarLine) + '</span></div>' +
      (settings.lastDriveFileUrl ? '<a class="btn btn-ghost btn-compact" href="' + esc(settings.lastDriveFileUrl) + '" target="_blank" rel="noopener">' + icon('external-link', 12) + 'File Drive</a>' : '') + '</div>' +
      '<div class="cloud-grid"><label class="field"><span>URL bridge Vercel</span><input id="bridge-url" type="text" inputmode="url" spellcheck="false" placeholder="/api/bridge atau https://…/api/bridge" value="' + esc(settings.bridgeUrl) + '"></label>' +
      '<label class="field"><span>Token rahasia bridge <span class="field-hint">sama dengan TUNTAS_SECRET</span></span><input id="bridge-secret" type="password" placeholder="TUNTAS_SECRET" value="' + esc(settings.bridgeSecret) + '"></label></div>' +
      '<label class="switch-row compact"><span class="switch-copy"><strong>Cadangkan otomatis ke Google Drive</strong><span>Setiap perubahan ditulis ke Drive beberapa detik kemudian. Data tetap tersimpan lokal.</span></span>' +
      '<span class="switch"><input type="checkbox" data-setting="drive-auto"' + (settings.driveSyncEnabled ? ' checked' : '') + '><span class="switch-track" aria-hidden="true"></span></span></label>' +
      '<div class="data-actions"><button type="button" class="btn btn-primary btn-compact" data-action="save-integration">' + icon('check', 13) + 'Simpan pengaturan</button>' +
      '<button type="button" class="btn btn-ghost btn-compact" data-action="test-bridge"' + (ui.bridgeBusy ? ' disabled' : '') + '>' + icon('link', 13) + (ui.bridgeBusy ? 'Menguji…' : 'Uji koneksi') + '</button>' +
      '<button type="button" class="btn btn-ghost btn-compact" data-action="drive-sync-now"' + (configured && !ui.bridgeBusy && !ui.driveBusy ? '' : ' disabled') + '>' + icon('cloud-upload', 13) + (ui.driveBusy ? 'Mengunggah…' : 'Simpan ke Drive') + '</button>' +
      '<button type="button" class="btn btn-ghost btn-compact" data-action="drive-load"' + (configured && !ui.bridgeBusy ? '' : ' disabled') + '>' + icon('download', 13) + 'Muat dari Drive</button></div>' +
      '<details class="setup-details"><summary>' + icon('info', 12) + ' Panduan singkat menyiapkan bridge Vercel</summary><ol class="file-steps">' +
      '<li>Deploy folder <strong>tuntas/</strong> ke Vercel. Panduan lengkap ada di <strong>VERCEL.md</strong>; endpoint bridge otomatis tersedia di <strong>/api/bridge</strong>.</li>' +
      '<li>Isi environment variables di Vercel: <strong>TUNTAS_SECRET</strong>, <strong>GOOGLE_SERVICE_ACCOUNT_EMAIL</strong>, <strong>GOOGLE_PRIVATE_KEY</strong>, <strong>GOOGLE_DRIVE_FOLDER_ID</strong>, dan <strong>GOOGLE_CALENDAR_ID</strong>. Redeploy setelah mengubahnya.</li>' +
      '<li>Bagikan folder Drive ke email service account sebagai <strong>Editor</strong>, dan kalender sebagai <strong>Make changes to events</strong>. Service account adalah “robot” Google, bukan akun Gmail biasa.</li>' +
      '<li>Biarkan URL <strong>/api/bridge</strong> bila aplikasi dan bridge berada di domain Vercel yang sama, lalu isi token yang sama dengan <strong>TUNTAS_SECRET</strong> dan klik <strong>Uji koneksi</strong>.</li>' +
      '<li>Opsional: agar laporan otomatis diteruskan ke aplikasi kinerja GAS yang lama, tambahkan <strong>extras/KinerjaTargetPatch.gs</strong> ke proyek aplikasi itu lalu deploy ulang.</li></ol>' +
      '<div class="data-actions"><button type="button" class="btn btn-ghost btn-compact" data-action="open-vercel-guide">' + icon('external-link', 12) + 'Buka panduan Vercel</button>' +
      '<button type="button" class="btn btn-ghost btn-compact" data-action="copy-bridge-env">' + icon('copy', 12) + 'Salin contoh env</button></div></details>' +
      '<details class="setup-details"><summary>' + icon('settings', 12) + ' Pengaturan lanjutan laporan</summary>' +
      '<label class="field"><span>URL aplikasi laporan kinerja</span><input id="report-target-url" type="url" value="' + esc(settings.reportTargetUrl || DEFAULT_REPORT_URL) + '"></label>' +
      '<label class="field"><span>Token aplikasi laporan <span class="field-hint">opsional, samakan dengan TUNTAS_REPORT_TOKEN di aplikasi laporan</span></span><input id="report-target-token" type="password" value="' + esc(settings.reportTargetToken) + '"></label></details>' +
      '<p class="hint">Token hanya tersimpan di peramban ini dan dikirim ke function Vercel lewat HTTPS. Jangan bagikan URL bridge + token kepada orang lain. Sinkron Calendar bersifat satu arah; hapus atau ubah acara di Google Calendar tidak mengubah TUNTAS.</p></div>';
  }
  function openIntegrationSettings() {
    if (!ui.dataModalOpen) openDataModal();
    else renderDataModal();
    setTimeout(function () {
      const section = document.getElementById('integration-settings');
      if (section) section.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }, 80);
  }
  function readIntegrationForm() {
    const url = document.getElementById('bridge-url');
    const secret = document.getElementById('bridge-secret');
    const target = document.getElementById('report-target-url');
    const token = document.getElementById('report-target-token');
    return {
      bridgeUrl: url ? url.value.trim() : settings.bridgeUrl,
      bridgeSecret: secret ? secret.value.trim() : settings.bridgeSecret,
      reportTargetUrl: target ? target.value.trim() : settings.reportTargetUrl,
      reportTargetToken: token ? token.value.trim() : settings.reportTargetToken
    };
  }
  function saveIntegrationSettings(announce) {
    const next = readIntegrationForm();
    if (!bridgeUrlAllowed(next.bridgeUrl)) {
      toast('URL bridge harus https://, /api/bridge, atau http://localhost saat pengembangan.', { type: 'error', iconName: 'cloud' });
      return false;
    }
    if (next.bridgeUrl && next.bridgeUrl.charAt(0) === '/' && !/^\/[^\s]*$/.test(next.bridgeUrl)) {
      toast('URL bridge relatif tidak valid. Gunakan /api/bridge.', { type: 'error', iconName: 'cloud' });
      return false;
    }
    if (next.bridgeUrl && next.bridgeUrl.slice(0, 2) === '//') {
      toast('URL bridge tidak boleh diawali //. Gunakan /api/bridge atau URL https lengkap.', { type: 'error', iconName: 'cloud' });
      return false;
    }
    if (next.reportTargetUrl && !/^https:\/\//i.test(next.reportTargetUrl)) {
      toast('URL aplikasi laporan harus dimulai dengan https://', { type: 'error', iconName: 'cloud' });
      return false;
    }
    settings.bridgeUrl = next.bridgeUrl;
    settings.bridgeSecret = next.bridgeSecret;
    settings.reportTargetUrl = next.reportTargetUrl || DEFAULT_REPORT_URL;
    settings.reportTargetToken = next.reportTargetToken;
    saveSettings();
    if (announce && settings.driveSyncEnabled && bridgeConfigured()) scheduleDriveSync();
    else if (!settings.driveSyncEnabled) clearTimeout(ui.driveTimer);
    if (ui.dataModalOpen) renderDataModal();
    if (announce) toast('Pengaturan integrasi disimpan.', { toastIcon: 'check' });
    return true;
  }
  async function driveSyncNow(explicit) {
    if (ui.driveBusy) return false;
    if (ui.dataModalOpen) saveIntegrationSettings(false);
    if (!bridgeConfigured()) {
      if (explicit) toast('Atur URL bridge dan token terlebih dahulu.', { type: 'warn', iconName: 'cloud' });
      return false;
    }
    ui.driveBusy = true;
    if (ui.dataModalOpen) renderDataModal();
    try {
      const result = await bridgeRequest('saveData', { data: exportPayload(), source: 'tuntas-web' }, 60000);
      settings.lastDriveSyncAt = nowIso();
      settings.lastDriveFileUrl = String(result.fileUrl || '');
      settings.lastDriveFileId = String(result.fileId || '');
      saveSettings();
      if (explicit) toast('Data tersimpan ke Google Drive.', { toastIcon: 'cloud', duration: 4500 });
      return true;
    } catch (err) {
      if (explicit) toast('Gagal menyimpan ke Drive. ' + (err.message || ''), { type: 'error', iconName: 'alert-triangle', duration: 7000 });
      return false;
    } finally {
      ui.driveBusy = false;
      if (ui.dataModalOpen) renderDataModal();
    }
  }
  async function loadDriveSnapshot() {
    if (ui.bridgeBusy) return;
    if (!saveIntegrationSettings(false)) return;
    if (!bridgeConfigured()) {
      toast('Atur bridge Vercel terlebih dahulu.', { type: 'warn', iconName: 'cloud' });
      return;
    }
    clearTimeout(ui.driveTimer);
    ui.bridgeBusy = true;
    if (ui.dataModalOpen) renderDataModal();
    try {
      const result = await bridgeRequest('loadData', {}, 60000);
      if (!result || !result.data) {
        toast('Belum ada cadangan data di Google Drive.', { type: 'warn', iconName: 'cloud' });
        return;
      }
      const payload = parseImportText(JSON.stringify(result.data), 'Google Drive');
      payload.source = 'drive';
      setPendingImport(payload);
      toast('Cadangan Drive siap ditinjau.', { toastIcon: 'download' });
    } catch (err) {
      toast('Gagal memuat data dari Drive. ' + (err.message || ''), { type: 'error', iconName: 'alert-triangle', duration: 7000 });
    } finally {
      ui.bridgeBusy = false;
      if (ui.dataModalOpen) renderDataModal();
    }
  }
  function scheduleDriveSync() {
    if (!settings.driveSyncEnabled || !bridgeConfigured()) return;
    clearTimeout(ui.driveTimer);
    ui.driveTimer = setTimeout(function () { driveSyncNow(false); }, 10000);
  }
  function openBridgeGuide() {
    window.open('VERCEL.md', '_blank', 'noopener');
  }
  async function copyBridgeEnv() {
    const ok = await copyPlainText(BRIDGE_ENV_TEMPLATE);
    if (ok) toast('Contoh environment variables disalin. Tempel di Vercel → Settings → Environment Variables.', { toastIcon: 'copy', duration: 5500 });
    else toast('Tidak bisa menyalin otomatis. Buka VERCEL.md untuk melihat daftar environment variables.', { type: 'warn', iconName: 'file-text', duration: 6000 });
  }

  /* ---------- data contoh & reset ---------- */
  function requestSampleData() {
    if (data.tasks.length) {
      askConfirm({
        title: 'Muat data contoh?',
        message: 'Tugas saat ini akan dicadangkan lebih dulu, lalu diganti dengan data contoh untuk mencoba semua tampilan.',
        confirmLabel: 'Muat contoh',
        danger: false,
        onConfirm: loadSampleData
      });
    } else {
      loadSampleData();
    }
  }
  function loadSampleData() {
    if (data.tasks.length) createBackup('Sebelum data contoh', 'manual');
    const now = nowIso();
    const defs = [
      { title: 'Susun rencana minggu ini', project: 'Kantor', status: 'in_progress', priority: 'high', start: addDaysKey(todayKey(), -2), due: todayKey(), time: '09:00', tags: ['rencana'], notes: 'Tulis tiga hal yang paling penting, sisanya opsional.', checklist: [{ text: 'Kumpulkan catatan minggu lalu', done: true }, { text: 'Tentukan tiga prioritas', done: false }] },
      { title: 'Balas email penting', project: 'Kantor', status: 'not_started', priority: 'urgent', due: todayKey(), time: '11:00', tags: ['email'] },
      { title: 'Review deck presentasi', project: 'Kantor', status: 'in_progress', priority: 'high', start: todayKey(), due: addDaysKey(todayKey(), 2), time: '14:00', tags: ['presentasi'], checklist: [{ text: 'Cek alur cerita', done: true }, { text: 'Rapikan angka', done: false }, { text: 'Latihan sekali', done: false }] },
      { title: 'Olahraga 30 menit', project: 'Kesehatan', status: 'done', priority: 'medium', due: todayKey(), time: '06:30', tags: ['gerak'], completedAt: isoAt(todayKey(), 7, 5) },
      { title: 'Belanja kebutuhan dapur', project: 'Rumah', status: 'not_started', priority: 'low', due: addDaysKey(todayKey(), 1), tags: ['rumah'], checklist: [{ text: 'Sayur dan buah', done: false }, { text: 'Kopi', done: false }] },
      { title: 'Baca 20 halaman', project: 'Belajar', status: 'pending', priority: 'medium', start: todayKey(), due: addDaysKey(todayKey(), 4), tags: ['buku'] },
      { title: 'Rapikan meja kerja', project: 'Rumah', status: 'pending', priority: 'low', due: addDaysKey(todayKey(), -2), tags: ['rumah'] },
      { title: 'Telepon keluarga', project: 'Pribadi', status: 'not_started', priority: 'medium', due: addDaysKey(todayKey(), 1), time: '19:00', tags: ['keluarga'] },
      { title: 'Rangkum catatan rapat', project: 'Kantor', status: 'done', priority: 'medium', due: addDaysKey(todayKey(), -1), time: '16:00', tags: ['rapat'], completedAt: isoAt(addDaysKey(todayKey(), -1), 16, 30), checklist: [{ text: 'Keputusan', done: true }, { text: 'Tindak lanjut', done: true }] }
    ];
    const tasks = defs.map((def, index) => normalizeTask(Object.assign({}, def, {
      id: uid('t'),
      createdAt: isoAt(addDaysKey(todayKey(), -3), 9 + index % 6, 0),
      updatedAt: def.completedAt || isoAt(addDaysKey(todayKey(), -1), 15, 0)
    })));
    const activity = [];
    tasks.forEach(task => {
      activity.push({ id: uid('a'), at: task.createdAt, kind: 'create', taskId: task.id, title: task.title, detail: '' });
      if (task.status === 'done' && task.completedAt) activity.push({ id: uid('a'), at: task.completedAt, kind: 'complete', taskId: task.id, title: task.title, detail: '' });
    });
    activity.sort((a, b) => new Date(b.at) - new Date(a.at));
    data = { version: APP_VERSION, tasks, activity: activity.slice(0, 40), reports: [], createdAt: now, updatedAt: now };
    ui.filters = Object.assign({}, DEFAULT_FILTERS);
    closeConfirm();
    closeDataModal();
    saveAndRender({ message: 'Data contoh dimuat. Jelajahi semua tampilan.', toastIcon: 'sparkles' });
  }
  function requestResetData() {
    askConfirm({
      title: 'Hapus semua data?',
      message: 'Seluruh tugas, catatan, dan aktivitas di peramban ini akan dihapus. Cadangan otomatis dibuat lebih dulu, tetapi tetap ekspor bila ragu.',
      confirmLabel: 'Hapus semua',
      danger: true,
      onConfirm: function () {
        createBackup('Sebelum reset', 'manual');
        data = emptyData();
        ui.pendingImport = null;
        ui.filters = Object.assign({}, DEFAULT_FILTERS);
        closeConfirm();
        closeDataModal();
        saveAndRender({ message: 'Semua data dihapus. Cadangan lokal masih tersedia.', toastIcon: 'trash' });
      }
    });
  }
  function saveProfileName(value) {
    settings.name = String(value || '').trim().slice(0, 60);
    saveSettings();
    renderAll();
    renderDataModal();
    toast(settings.name ? 'Nama disimpan: ' + settings.name : 'Nama sapaan dikosongkan.', { toastIcon: 'check' });
  }

  /* ---------- modal data ---------- */
  function openDataModal() {
    ui.lastFocused = document.activeElement;
    ui.dataModalOpen = true;
    renderDataModal();
    syncBodyLock();
    setTimeout(function () {
      const close = document.querySelector('#data-modal-root .modal-close');
      if (close) close.focus({ preventScroll: true });
    }, 40);
  }
  function closeDataModal() {
    const root = document.getElementById('data-modal-root');
    if (!root) return;
    root.innerHTML = '';
    ui.dataModalOpen = false;
    ui.pendingImport = null;
    syncBodyLock();
    if (ui.lastFocused && typeof ui.lastFocused.focus === 'function') {
      try { ui.lastFocused.focus({ preventScroll: true }); } catch (err) { /* noop */ }
    }
  }
  function fileSyncSectionHtml() {
    const supported = Boolean(window.showOpenFilePicker && window.showSaveFilePicker);
    const connected = Boolean(ui.fileHandle);
    const permission = ui.filePermission;
    const name = ui.fileHandle ? ui.fileHandle.name : (settings.fileSyncName || 'tuntas-sync.json');
    let statusText = 'Belum terhubung';
    let statusClass = '';
    if (connected) {
      if (permission === 'granted') { statusText = 'Terhubung · izin diberikan'; statusClass = 'is-connected'; }
      else if (permission === 'prompt') { statusText = 'Izin akses diperlukan'; statusClass = 'is-needs'; }
      else if (permission === 'denied') { statusText = 'Akses ditolak'; statusClass = 'is-error'; }
      else { statusText = 'Terhubung · status belum diperiksa'; statusClass = 'is-needs'; }
    }
    let actions = '';
    if (!supported) {
      actions = '<p class="hint">Peramban ini belum mendukung file sinkron. Ekspor dan impor JSON tetap bisa digunakan.</p>';
    } else if (!connected) {
      actions = '<div class="data-actions"><button type="button" class="btn btn-primary btn-compact" data-action="sync-create">' + icon('file-json', 13) + 'Buat file sinkron</button>' +
        '<button type="button" class="btn btn-ghost btn-compact" data-action="sync-open">' + icon('folder', 13) + 'Buka file yang ada</button></div>';
    } else {
      const blocked = permission !== 'granted';
      actions = '<div class="data-actions">' +
        (blocked
          ? '<button type="button" class="btn btn-primary btn-compact" data-action="sync-reconnect">' + icon('link', 13) + 'Berikan izin akses</button>'
          : '<button type="button" class="btn btn-primary btn-compact" data-action="sync-write">' + icon('upload', 13) + 'Tulis sekarang</button>') +
        '<button type="button" class="btn btn-ghost btn-compact" data-action="sync-load">' + icon('download', 13) + 'Muat dari file</button>' +
        '<button type="button" class="btn btn-danger btn-compact" data-action="sync-disconnect">' + icon('unlink', 13) + 'Putuskan</button></div>';
    }
    return '<div class="data-section"><div class="data-section-head"><div><h3>' + icon('hard-drive', 15) + 'Sinkron lewat file</h3><p>Simpan data ke satu berkas JSON di folder biasa atau folder cloud. Cocok untuk berpindah perangkat tanpa akun.</p></div></div>' +
      '<div class="file-card"><span class="file-icon">' + icon('file-json', 17) + '</span><div class="file-main"><div class="file-name">' + esc(name) + '</div>' +
      '<div class="file-meta"><span class="file-status-dot ' + statusClass + '"></span>' + esc(statusText) +
      (settings.lastFileSyncAt ? ' · terakhir ditulis ' + esc(timeAgo(settings.lastFileSyncAt)) : '') + '</div></div></div>' +
      actions +
      '<p class="hint">File hanya bisa ditulis setelah kamu memberi izin. Perubahan berikutnya ditulis otomatis saat tab ini aktif. Di perangkat lain, buka file yang sama lalu pilih <strong>Gabungkan</strong> atau <strong>Ganti data</strong>.</p>' +
      '</div>';
  }
  function renderDataModal() {
    if (!ui.dataModalOpen) return;
    const root = document.getElementById('data-modal-root');
    if (!root) return;
    const active = data.tasks.filter(isOpenTask).length;
    const done = data.tasks.filter(t => t.status === 'done').length;
    const backups = readBackups();
    const pending = ui.pendingImport;
    let body = '';
    body += '<div class="data-section"><div class="data-section-head"><div><h3>' + icon('shield', 15) + 'Ringkasan & cadangan</h3><p>Semua data milikmu, tersimpan di peramban ini. Ekspor berkala untuk mengamankannya.</p></div></div>' +
      '<div class="data-stat-grid"><div class="data-stat"><span>Tugas</span><strong>' + data.tasks.length + '</strong></div><div class="data-stat"><span>Aktif</span><strong>' + active + '</strong></div><div class="data-stat"><span>Selesai</span><strong>' + done + '</strong></div><div class="data-stat"><span>Laporan</span><strong>' + data.reports.length + '</strong></div></div>' +
      '<div class="data-actions"><button type="button" class="btn btn-primary btn-compact" data-action="export-json">' + icon('download', 13) + 'Ekspor JSON</button>' +
      '<button type="button" class="btn btn-ghost btn-compact" data-action="copy-json">' + icon('copy', 13) + 'Salin JSON</button>' +
      '<button type="button" class="btn btn-ghost btn-compact" data-action="import-pick">' + icon('upload', 13) + 'Impor JSON</button>' +
      '<button type="button" class="btn btn-ghost btn-compact" data-action="export-ics">' + icon('calendar', 13) + 'Ekspor .ics</button></div>' +
      '<input type="file" id="import-file" accept=".json,application/json" hidden>' +
      '<p class="hint">Terakhir diubah ' + esc(timeAgo(data.updatedAt)) + ' · berkas ekspor juga berisi aktivitas, proyek, checklist, laporan, tugas berulang, dan pengaturan nama.</p></div>';

    if (pending) {
      body += '<div class="import-preview"><div class="import-preview-head"><span class="import-preview-title">' + icon('file-json', 14) + ' ' + esc(pending.fileName) + '</span><span class="import-preview-meta">' + esc(timeAgo(pending.at)) + '</span></div>' +
        '<div class="import-preview-meta">' + pending.data.tasks.length + ' tugas · ' + pending.data.activity.length + ' aktivitas · ' + pending.data.reports.length + ' laporan · ' + pending.data.tasks.filter(isOpenTask).length + ' masih aktif</div>' +
        '<div class="data-actions"><button type="button" class="btn btn-primary btn-compact" data-action="import-merge">' + icon('link', 13) + 'Gabungkan</button>' +
        '<button type="button" class="btn btn-danger btn-compact" data-action="import-replace">' + icon('refresh', 13) + 'Ganti semua</button>' +
        '<button type="button" class="btn btn-ghost btn-compact" data-action="import-cancel">Batal</button></div></div>';
    }

    body += '<div class="data-section"><div class="data-section-head"><div><h3>' + icon('database', 15) + 'Cadangan lokal</h3><p>Cadangan otomatis dibuat saat aplikasi dibuka, maksimal sekali per enam jam. Tugas, aktivitas, dan laporan ikut tersimpan; sepuluh cadangan terakhir disimpan.</p></div><button type="button" class="btn btn-ghost btn-compact" data-action="backup-now">' + icon('plus', 12) + 'Cadangkan</button></div>';
    if (backups.length) {
      body += '<div class="backup-list">' + backups.slice(0, 5).map(b => '<div class="backup-item"><div class="backup-main"><div class="backup-title">' + esc(b.label || 'Cadangan') + ' · ' + b.taskCount + ' tugas</div><div class="backup-meta">' + esc(formatDateMedium(dateKey(new Date(b.at)))) + ' · ' + esc(timeAgo(b.at)) + '</div></div><button type="button" class="btn btn-ghost btn-compact" data-action="restore-backup" data-id="' + esc(b.id) + '">Pulihkan</button></div>').join('') + '</div>';
    } else {
      body += '<p class="hint">Belum ada cadangan lokal. Buat satu sebelum melakukan perubahan besar.</p>';
    }
    body += '</div>';

    body += fileSyncSectionHtml();
    body += integrationSectionHtml();

    body += '<div class="data-section"><h3>' + icon('pencil', 15) + 'Nama sapaan</h3><p>Dipakai pada sapaan di dasbor dan halaman fokus. Tidak dikirim ke mana pun.</p>' +
      '<div class="settings-row"><input class="input" id="display-name" type="text" maxlength="60" value="' + esc(settings.name) + '" placeholder="Namamu" aria-label="Nama sapaan"><button type="button" class="btn btn-ghost btn-compact" data-action="save-profile">Simpan nama</button></div></div>';

    body += '<div class="data-section danger-zone"><div class="data-section-head"><div><h3>' + icon('alert-triangle', 15) + 'Zona hati-hati</h3><p>Muat data contoh untuk menjelajah, atau hapus seluruh data di peramban ini.</p></div></div>' +
      '<div class="data-actions"><button type="button" class="btn btn-ghost btn-compact" data-action="sample-data">' + icon('sparkles', 13) + 'Muat data contoh</button>' +
      '<button type="button" class="btn btn-danger btn-compact" data-action="reset-data">' + icon('trash', 13) + 'Hapus semua data</button></div></div>';

    body += '<div class="data-note">' + icon('info', 14) + '<span>Data tidak dikirim ke server mana pun. Menghapus data peramban juga menghapus tugas dan cadangan lokal, jadi simpan berkas JSON di tempat aman.</span></div>';

    root.innerHTML = '<div class="modal-backdrop" data-modal="data"><div class="modal-card data-modal" role="dialog" aria-modal="true" aria-labelledby="data-modal-title">' +
      '<div class="modal-head"><div><h2 id="data-modal-title">Data & cadangan</h2><p>Bawa ruang kerjamu ke perangkat lain tanpa akun.</p></div><button type="button" class="icon-btn modal-close" data-action="close-data" aria-label="Tutup">' + icon('x', 17) + '</button></div>' +
      '<div class="modal-body">' + body + '</div></div></div>';
    syncBodyLock();
  }

  /* ---------- file sinkron (File System Access API) ---------- */
  function openHandleDb() {
    return new Promise(function (resolve, reject) {
      if (!window.indexedDB) { reject(new Error('IndexedDB tidak tersedia')); return; }
      const req = indexedDB.open('tuntas-fs', 1);
      req.onupgradeneeded = function () {
        if (!req.result.objectStoreNames.contains('handles')) req.result.createObjectStore('handles');
      };
      req.onsuccess = function () { resolve(req.result); };
      req.onerror = function () { reject(req.error || new Error('IndexedDB gagal')); };
    });
  }
  function idbHandle(mode, action) {
    return openHandleDb().then(function (db) {
      return new Promise(function (resolve, reject) {
        const tx = db.transaction('handles', mode);
        const store = tx.objectStore('handles');
        const req = action(store);
        req.onsuccess = function () { resolve(req.result); };
        req.onerror = function () { reject(req.error); };
        tx.oncomplete = function () { db.close(); };
      });
    });
  }
  function getStoredHandle() { return idbHandle('readonly', s => s.get('sync')).catch(() => null); }
  function setStoredHandle(handle) { return idbHandle('readwrite', s => s.put(handle, 'sync')).catch(() => null); }
  function clearStoredHandle() { return idbHandle('readwrite', s => s.delete('sync')).catch(() => null); }
  async function queryHandlePermission() {
    if (!ui.fileHandle) { ui.filePermission = 'unknown'; return 'unknown'; }
    try {
      const state = await ui.fileHandle.queryPermission({ mode: 'readwrite' });
      ui.filePermission = state;
      return state;
    } catch (err) {
      ui.filePermission = 'error';
      return 'error';
    }
  }
  async function requestHandlePermission() {
    if (!ui.fileHandle) return 'unknown';
    try {
      const state = await ui.fileHandle.requestPermission({ mode: 'readwrite' });
      ui.filePermission = state;
      return state;
    } catch (err) {
      ui.filePermission = 'denied';
      return 'denied';
    }
  }
  async function initFileSync() {
    if (!(window.showOpenFilePicker && window.showSaveFilePicker)) return;
    const handle = await getStoredHandle();
    if (!handle) return;
    ui.fileHandle = handle;
    settings.fileSyncName = handle.name;
    await queryHandlePermission();
    if (ui.dataModalOpen) renderDataModal();
  }
  function fileApiSupported() { return Boolean(window.showOpenFilePicker && window.showSaveFilePicker); }
  async function adoptHandle(handle) {
    ui.fileHandle = handle;
    ui.filePermission = 'unknown';
    settings.fileSyncEnabled = true;
    settings.fileSyncName = handle.name;
    saveSettings();
    await setStoredHandle(handle);
    const perm = await queryHandlePermission();
    if (perm !== 'granted') await requestHandlePermission();
  }
  async function createSyncFile() {
    if (!fileApiSupported()) { toast('Peramban ini belum mendukung sinkron file.', { type: 'warn' }); return; }
    try {
      const handle = await window.showSaveFilePicker({
        suggestedName: settings.fileSyncName || 'tuntas-sync.json',
        types: [{ description: 'Berkas TUNTAS', accept: { 'application/json': ['.json'] } }]
      });
      await adoptHandle(handle);
      await writeSyncFile({ explicit: true });
      renderDataModal();
      toast('File sinkron dibuat: ' + handle.name, { toastIcon: 'file-json' });
    } catch (err) {
      if (err && err.name !== 'AbortError') toast('Tidak bisa membuat file sinkron. ' + (err.message || ''), { type: 'error' });
      renderDataModal();
    }
  }
  async function openSyncFile() {
    if (!fileApiSupported()) { toast('Peramban ini belum mendukung sinkron file.', { type: 'warn' }); return; }
    try {
      const picks = await window.showOpenFilePicker({
        multiple: false,
        types: [{ description: 'Berkas TUNTAS', accept: { 'application/json': ['.json'] } }]
      });
      const handle = picks[0];
      if (!handle) return;
      await adoptHandle(handle);
      const text = await readHandleText(handle);
      if (!text || !text.trim()) {
        await writeSyncFile({ explicit: true });
        renderDataModal();
        toast('File kosong. Data saat ini ditulis ke file.', { toastIcon: 'upload' });
        return;
      }
      const payload = parseImportText(text, handle.name);
      payload.source = 'sync';
      setPendingImport(payload);
      renderDataModal();
    } catch (err) {
      if (err && err.name !== 'AbortError') toast(err.message || 'Tidak bisa membuka file sinkron.', { type: 'error', iconName: 'alert-triangle' });
      renderDataModal();
    }
  }
  async function readHandleText(handle) {
    const file = await handle.getFile();
    return file.text();
  }
  async function reconnectSyncFile() {
    if (!ui.fileHandle) return;
    const perm = await requestHandlePermission();
    renderDataModal();
    if (perm === 'granted') toast('Akses file diberikan.', { toastIcon: 'link' });
    else toast('Akses file belum diberikan. Coba lagi dari dialog peramban.', { type: 'warn' });
  }
  async function writeSyncFile(options) {
    const opts = options || {};
    if (!ui.fileHandle) {
      if (opts.explicit) toast('Belum ada file sinkron yang terhubung.', { type: 'warn' });
      return false;
    }
    if (ui.fileBusy) return false;
    let perm = ui.filePermission;
    if (perm !== 'granted') perm = await queryHandlePermission();
    if (perm !== 'granted' && opts.explicit) perm = await requestHandlePermission();
    if (perm !== 'granted') {
      if (opts.explicit) { toast('Izin akses file diperlukan.', { type: 'warn', iconName: 'lock' }); renderDataModal(); }
      return false;
    }
    ui.fileBusy = true;
    try {
      const writable = await ui.fileHandle.createWritable();
      await writable.write(JSON.stringify(exportPayload(), null, 2));
      await writable.close();
      settings.lastFileSyncAt = nowIso();
      saveSettings();
      if (opts.explicit) {
        toast('Data ditulis ke ' + ui.fileHandle.name + '.', { toastIcon: 'upload' });
        renderDataModal();
      }
      return true;
    } catch (err) {
      if (opts.explicit) toast('Gagal menulis file sinkron. ' + (err.message || ''), { type: 'error' });
      return false;
    } finally {
      ui.fileBusy = false;
    }
  }
  function scheduleFileSync() {
    if (!ui.fileHandle || !settings.fileSyncEnabled) return;
    clearTimeout(ui.fileTimer);
    ui.fileTimer = setTimeout(function () {
      if (ui.filePermission === 'granted') writeSyncFile({ explicit: false });
    }, 900);
  }
  async function loadConnectedFile() {
    if (!ui.fileHandle) return;
    try {
      const text = await readHandleText(ui.fileHandle);
      if (!text || !text.trim()) {
        toast('File masih kosong. Gunakan “Tulis sekarang”.', { type: 'warn' });
        return;
      }
      const payload = parseImportText(text, ui.fileHandle.name);
      payload.source = 'sync';
      setPendingImport(payload);
    } catch (err) {
      toast(err.message || 'Tidak bisa membaca file sinkron.', { type: 'error' });
    }
  }
  function requestDisconnectSync() {
    askConfirm({
      title: 'Putuskan file sinkron?',
      message: 'Tautan ke file akan dilepas. Data lokal tetap ada dan bisa diekspor kapan saja.',
      confirmLabel: 'Putuskan',
      danger: true,
      onConfirm: async function () {
        ui.fileHandle = null;
        ui.filePermission = 'unknown';
        settings.fileSyncEnabled = false;
        settings.fileSyncName = '';
        settings.lastFileSyncAt = '';
        saveSettings();
        await clearStoredHandle();
        closeConfirm();
        renderDataModal();
        toast('File sinkron dilepas.', { toastIcon: 'unlink' });
      }
    });
  }
  async function handleImportFile(file) {
    if (!file) return;
    try {
      if (file.size > 6000000) throw new Error('Berkas terlalu besar.');
      const text = await file.text();
      const payload = parseImportText(text, file.name);
      setPendingImport(payload);
    } catch (err) {
      toast(err.message || 'Impor gagal.', { type: 'error', iconName: 'alert-triangle' });
    }
  }

  /* ---------- picture-in-picture ---------- */
  async function togglePip() {
    if (ui.pipWindow && !ui.pipWindow.closed) { closePip(); return; }
    if (!('documentPictureInPicture' in window)) {
      toast('Picture-in-Picture dokumen belum didukung di peramban ini. Coba Chrome atau Edge versi baru.', { type: 'warn', iconName: 'pip', duration: 5000 });
      return;
    }
    try {
      const pip = await window.documentPictureInPicture.requestWindow({ width: 380, height: 500 });
      ui.pipWindow = pip;
      setupPipDocument(pip);
      pip.addEventListener('pagehide', function () {
        ui.pipWindow = null;
        renderDock();
      });
      renderPipDock();
    } catch (err) {
      toast('Jendela kecil tidak bisa dibuka.', { type: 'error' });
    }
  }
  function setupPipDocument(pip) {
    const doc = pip.document;
    const cssHref = new URL('styles.css', location.href).href;
    const fontHref = (document.querySelector('link[href*="fonts.googleapis.com"]') || {}).href || '';
    doc.documentElement.setAttribute('data-theme', document.documentElement.getAttribute('data-theme') || 'light');
    doc.head.innerHTML = '<meta charset="utf-8"><title>Fokus Hari Ini — TUNTAS</title>' +
      '<link rel="stylesheet" href="' + esc(cssHref) + '">' +
      (fontHref ? '<link rel="stylesheet" href="' + esc(fontHref) + '">' : '') +
      '<style>html,body{margin:0;height:100%;overflow:hidden;background:var(--bg);} #pip-dock-root{height:100%;}</style>';
    doc.body.className = 'pip-body';
    doc.body.innerHTML = '<div id="pip-dock-root"></div>';
    doc.addEventListener('click', function (event) { handleDocumentClick(event, 'pip'); });
    doc.addEventListener('keydown', function (event) { if (event.key === 'Escape') closePip(); });
  }
  function renderPipDock() {
    if (!ui.pipWindow || ui.pipWindow.closed) return;
    try {
      const root = ui.pipWindow.document.getElementById('pip-dock-root');
      if (!root) return;
      root.innerHTML = dockShellHtml(dockProgress(), 'pip');
    } catch (err) { /* jendela sedang ditutup */ }
  }
  function closePip() {
    if (ui.pipWindow && !ui.pipWindow.closed) {
      try { ui.pipWindow.close(); } catch (err) { /* noop */ }
    }
    ui.pipWindow = null;
    renderDock();
  }

  function setDockOpen(open) {
    settings.dockOpen = Boolean(open);
    saveSettings();
    renderDock();
  }

  /* ---------- navigasi & interaksi ---------- */
  function taskIdFromEl(el) {
    if (!el) return '';
    if (el.dataset && el.dataset.id) return el.dataset.id;
    const holder = el.closest('[data-task-id]');
    return holder ? holder.getAttribute('data-task-id') : '';
  }
  function presetFromEl(el) {
    const preset = {};
    if (!el) return preset;
    if (el.dataset.due) preset.due = el.dataset.due;
    if (el.dataset.status) preset.status = el.dataset.status;
    if (el.dataset.project) preset.project = el.dataset.project;
    return preset;
  }
  function navigate(view, options) {
    const opts = options || {};
    const target = VIEWS.includes(view) ? view : 'dashboard';
    const changed = ui.view !== target;
    ui.view = target;
    settings.lastView = target;
    saveSettings();
    if (changed && !opts.keepScroll) {
      try { window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); } catch (err) { window.scrollTo(0, 0); }
    }
    const hash = '#' + target;
    if (location.hash !== hash) {
      try { location.hash = target; } catch (err) { history.replaceState(null, '', hash); }
    }
    renderAll();
  }
  function applyLocationView() {
    const view = location.hash.replace(/^#/, '');
    if (VIEWS.includes(view) && view !== ui.view) {
      ui.view = view;
      settings.lastView = view;
      saveSettings();
      renderAll();
    }
  }
  function focusSearch() {
    if (ui.view !== 'tasks') navigate('tasks');
    setTimeout(function () {
      const input = document.getElementById('task-search');
      if (input) {
        input.focus();
        input.select();
      }
    }, 60);
  }
  function handleDocumentClick(event, source) {
    const target = event.target;
    if (target.classList && target.classList.contains('modal-backdrop')) {
      const modal = target.getAttribute('data-modal');
      if (modal === 'confirm') closeConfirm();
      else if (modal === 'task') closeTaskModal();
      else if (modal === 'data') closeDataModal();
      else if (modal === 'reminder') closeReminderModal(false);
      else if (modal === 'report') closeReportModal();
      else if (modal === 'calendar-sync') closeCalendarSyncModal();
      return;
    }
    const actionEl = target.closest ? target.closest('[data-action]') : null;
    if (!actionEl) return;
    const action = actionEl.getAttribute('data-action');
    const id = taskIdFromEl(actionEl);
    if (source === 'pip' && ['goto-focus', 'edit-task', 'new-task', 'open-data'].includes(action)) {
      closePip();
      try { window.focus(); } catch (err) { /* noop */ }
    }
    if (actionEl.closest('.dock') && (action === 'goto-focus' || (action === 'nav' && window.matchMedia && window.matchMedia('(max-width: 640px)').matches))) {
      setDockOpen(false);
    }
    switch (action) {
      case 'nav':
        event.preventDefault();
        navigate(actionEl.getAttribute('data-view'));
        break;
      case 'new-task':
        openTaskModal(null, presetFromEl(actionEl));
        break;
      case 'edit-task':
        if (id) openTaskModal(taskById(id), null);
        break;
      case 'goto-focus':
        navigate('focus');
        break;
      case 'cycle-theme':
        cycleTheme();
        break;
      case 'open-data':
        openDataModal();
        break;
      case 'close-data':
        closeDataModal();
        break;
      case 'close-task-modal':
        closeTaskModal();
        break;
      case 'toggle-done':
        if (id) toggleDone(id);
        break;
      case 'duplicate-task':
        if (id) duplicateTask(id);
        break;
      case 'delete-task':
        if (id) requestDeleteTask(id);
        break;
      case 'filter-status':
        setFilterStatus(actionEl.getAttribute('data-status'));
        break;
      case 'filter-project':
        setFilterProject(actionEl.getAttribute('data-project'));
        break;
      case 'clear-filters':
        ui.filters = Object.assign({}, DEFAULT_FILTERS);
        renderMain();
        break;
      case 'select-day':
        ui.selectedDate = actionEl.getAttribute('data-date');
        ui.calendarCursor = startOfMonthKey(ui.selectedDate);
        renderMain();
        break;
      case 'cal-prev':
        ui.calendarCursor = shiftMonthKey(ui.calendarCursor, -1);
        ui.selectedDate = ui.calendarCursor;
        renderMain();
        break;
      case 'cal-next':
        ui.calendarCursor = shiftMonthKey(ui.calendarCursor, 1);
        ui.selectedDate = ui.calendarCursor;
        renderMain();
        break;
      case 'cal-today':
        ui.calendarCursor = startOfMonthKey(todayKey());
        ui.selectedDate = todayKey();
        renderMain();
        break;
      case 'tl-prev':
        ui.timelineCursor = shiftMonthKey(ui.timelineCursor, -1);
        renderMain();
        scrollTimelineToToday();
        break;
      case 'tl-next':
        ui.timelineCursor = shiftMonthKey(ui.timelineCursor, 1);
        renderMain();
        scrollTimelineToToday();
        break;
      case 'tl-today':
        ui.timelineCursor = startOfMonthKey(todayKey());
        renderMain();
        scrollTimelineToToday();
        break;
      case 'export-ics':
        exportIcs();
        break;
      case 'open-dock':
        setDockOpen(true);
        break;
      case 'collapse-dock':
        setDockOpen(false);
        break;
      case 'toggle-dock':
        setDockOpen(!settings.dockOpen);
        break;
      case 'toggle-pip':
        togglePip();
        break;
      case 'close-pip':
        closePip();
        break;
      case 'add-checklist':
        addChecklistItem();
        break;
      case 'remove-checklist':
        removeChecklistItem(actionEl.getAttribute('data-id'));
        break;
      case 'confirm-cancel':
        closeConfirm();
        break;
      case 'confirm-accept': {
        const callback = ui.pendingConfirm;
        closeConfirm();
        if (callback) {
          try {
            const result = callback();
            if (result && typeof result.catch === 'function') result.catch(err => toast(err.message || 'Tindakan gagal.', { type: 'error' }));
          } catch (err) {
            toast(err.message || 'Tindakan gagal.', { type: 'error' });
          }
        }
        break;
      }
      case 'export-json':
        exportJson();
        break;
      case 'copy-json':
        copyJson();
        break;
      case 'import-pick': {
        const input = document.getElementById('import-file');
        if (input) input.click();
        break;
      }
      case 'import-merge':
        applyImport('merge');
        break;
      case 'import-replace':
        applyImport('replace');
        break;
      case 'import-cancel':
        ui.pendingImport = null;
        renderDataModal();
        break;
      case 'backup-now':
        createBackup('Manual', 'manual');
        renderDataModal();
        toast('Cadangan lokal dibuat.', { toastIcon: 'database' });
        break;
      case 'restore-backup':
        requestRestoreBackup(actionEl.getAttribute('data-id'));
        break;
      case 'sample-data':
        requestSampleData();
        break;
      case 'reset-data':
        requestResetData();
        break;
      case 'save-profile': {
        const input = document.getElementById('display-name');
        saveProfileName(input ? input.value : '');
        break;
      }
      case 'sync-create':
        createSyncFile();
        break;
      case 'sync-open':
        openSyncFile();
        break;
      case 'sync-write':
        writeSyncFile({ explicit: true });
        break;
      case 'sync-load':
        loadConnectedFile();
        break;
      case 'sync-reconnect':
        reconnectSyncFile();
        break;
      case 'sync-disconnect':
        requestDisconnectSync();
        break;
      case 'open-reminder':
        openReminderModal(true);
        break;
      case 'close-reminder':
        closeReminderModal(true);
        break;
      case 'open-report': {
        const task = taskById(id);
        if (task) openReportModal(task, reportForTask(task));
        break;
      }
      case 'view-report':
        if (id) openReportDetail(id);
        break;
      case 'close-report':
        closeReportModal();
        break;
      case 'retry-report':
        if (id) retryReportSubmission(id);
        break;
      case 'mark-report-sent':
        if (id) requestMarkReportSent(id);
        break;
      case 'copy-report': {
        const report = data.reports.find(r => r.id === id);
        if (report) {
          copyPlainText(buildReportText(report)).then(function (ok) {
            if (ok) toast('Ringkasan laporan disalin.', { toastIcon: 'copy' });
            else toast('Tidak bisa menyalin otomatis.', { type: 'error' });
          });
        }
        break;
      }
      case 'open-report-target':
        openReportTarget();
        break;
      case 'open-calendar-sync':
        openCalendarSyncModal();
        break;
      case 'close-calendar-sync':
        closeCalendarSyncModal();
        break;
      case 'calendar-sync-now':
        syncCalendarNow();
        break;
      case 'add-to-gcal':
        if (id) addTaskToGoogleCalendar(id);
        break;
      case 'open-integration':
        openIntegrationSettings();
        break;
      case 'save-integration':
        saveIntegrationSettings(true);
        break;
      case 'test-bridge':
        testBridge();
        break;
      case 'drive-sync-now':
        driveSyncNow(true);
        break;
      case 'drive-load':
        loadDriveSnapshot();
        break;
      case 'open-vercel-guide':
        openBridgeGuide();
        break;
      case 'copy-bridge-env':
        copyBridgeEnv();
        break;
      default:
        break;
    }
  }
  function handleSubmit(event) {
    if (event.target.id === 'quick-capture') {
      event.preventDefault();
      const fd = new FormData(event.target);
      const title = String(fd.get('title') || '').trim();
      if (!title) {
        const input = event.target.querySelector('input[name="title"]');
        if (input) input.focus();
        return;
      }
      const priority = String(fd.get('priority') || 'medium');
      quickAddTask(title, priority);
      setTimeout(function () {
        const input = document.querySelector('#quick-capture input[name="title"]');
        if (input) input.focus();
      }, 60);
      return;
    }
    if (event.target.id === 'task-form') {
      handleTaskSubmit(event);
      return;
    }
    if (event.target.id === 'report-form') {
      handleReportSubmit(event);
    }
  }
  function handleInput(event) {
    const target = event.target;
    if (target.matches && target.matches('[data-filter="search"]')) {
      ui.filters.search = target.value;
      const results = document.getElementById('task-results');
      const line = document.getElementById('task-result-line');
      const slot = document.getElementById('filter-clear-slot');
      const visible = filteredTasks();
      if (results) results.innerHTML = taskGroupsHtml(visible);
      if (line) line.innerHTML = taskResultLine(visible.length, data.tasks.length);
      if (slot) {
        const hasFilters = ui.filters.search || ui.filters.status !== 'all' || ui.filters.priority !== 'all' || ui.filters.project !== 'all';
        slot.innerHTML = hasFilters ? '<button type="button" class="filter-clear" data-action="clear-filters">' + icon('x', 12) + 'Bersihkan</button>' : '';
      }
    }
  }
  function handleChange(event) {
    const target = event.target;
    if (target.matches && target.matches('[data-filter]') && target.tagName === 'SELECT') {
      const key = target.getAttribute('data-filter');
      if (key in ui.filters) {
        ui.filters[key] = target.value;
        const info = { filter: key };
        renderMain();
        setTimeout(function () {
          const next = document.querySelector('[data-filter="' + key + '"]');
          if (next) next.focus({ preventScroll: true });
        }, 20);
        void info;
      }
      return;
    }
    if (target.matches && target.matches('[data-checklist-toggle]')) {
      if (!ui.taskModal) return;
      const item = ui.taskModal.task.checklist.find(i => i.id === target.getAttribute('data-checklist-toggle'));
      if (item) {
        item.done = target.checked;
        const row = target.closest('.checklist-item');
        if (row) row.classList.toggle('is-done', item.done);
        const meta = document.getElementById('checklist-meta');
        if (meta) meta.textContent = taskModalChecklistMeta(ui.taskModal.task);
      }
      return;
    }
    if (target.closest && target.closest('#task-form') && ['recurring', 'recurrenceFrequency', 'start', 'due'].includes(target.name)) {
      refreshRecurrenceForm();
      return;
    }
    if (target.matches && target.matches('[data-setting="drive-auto"]')) {
      settings.driveSyncEnabled = Boolean(target.checked);
      saveSettings();
      if (settings.driveSyncEnabled) {
        if (!bridgeConfigured()) {
          toast('Atur URL bridge dan token agar cadangan Drive bisa berjalan.', { type: 'warn', iconName: 'cloud', duration: 6000 });
        } else {
          scheduleDriveSync();
          toast('Cadangan otomatis ke Drive diaktifkan.', { toastIcon: 'cloud' });
        }
      } else {
        clearTimeout(ui.driveTimer);
        toast('Cadangan otomatis ke Drive dimatikan.', { toastIcon: 'cloud' });
      }
      return;
    }
    if (target.id === 'import-file') {
      const file = target.files && target.files[0];
      target.value = '';
      if (file) handleImportFile(file);
    }
  }
  function closeTopModal() {
    const confirm = document.querySelector('#confirm-root .modal-backdrop');
    if (confirm) { closeConfirm(); return true; }
    const dataRoot = document.querySelector('#data-modal-root .modal-backdrop');
    if (dataRoot) { closeDataModal(); return true; }
    const task = document.querySelector('#task-modal-root .modal-backdrop');
    if (task) { closeTaskModal(); return true; }
    const report = document.querySelector('#report-modal-root .modal-backdrop');
    if (report) { closeReportModal(); return true; }
    const calendarModal = document.querySelector('#calendar-modal-root .modal-backdrop');
    if (calendarModal) { closeCalendarSyncModal(); return true; }
    const reminder = document.querySelector('#reminder-modal-root .modal-backdrop');
    if (reminder) { closeReminderModal(true); return true; }
    return false;
  }
  function trapTab(event) {
    const backdrops = document.querySelectorAll('.modal-backdrop');
    if (!backdrops.length) return;
    const modal = backdrops[backdrops.length - 1];
    const focusables = Array.from(modal.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')).filter(el => el.offsetParent !== null);
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
  function handleKeydown(event) {
    const target = event.target;
    const isElement = target && target.nodeType === 1;
    const isTyping = isElement && (target.matches('input, textarea, select, [contenteditable="true"]') || target.isContentEditable);
    if (event.key === 'Tab') { trapTab(event); return; }
    if (event.key === 'Escape') {
      if (closeTopModal()) { event.preventDefault(); return; }
      if (settings.dockOpen) { setDockOpen(false); return; }
      if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
      return;
    }
    if (isTyping) {
      if (event.key === 'Enter' && target.id === 'checklist-new') {
        event.preventDefault();
        addChecklistItem();
      }
      return;
    }
    const roleButton = isElement && target.closest ? target.closest('[role="button"][data-action]') : null;
    if (roleButton && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      roleButton.click();
      return;
    }
    const mod = event.ctrlKey || event.metaKey;
    if (mod && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      focusSearch();
      return;
    }
    if (mod || event.altKey) return;
    const key = event.key.toLowerCase();
    if (key === '/') {
      event.preventDefault();
      focusSearch();
    } else if (key === 'n') {
      event.preventDefault();
      openTaskModal(null, {});
    } else if (key === 'f') {
      event.preventDefault();
      navigate('focus');
    }
  }
  function setupDragAndDrop() {
    document.addEventListener('dragstart', function (event) {
      const card = event.target.closest('.board-card');
      if (!card) return;
      ui.draggedTaskId = card.getAttribute('data-task-id');
      if (event.dataTransfer) {
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('text/plain', ui.draggedTaskId);
      }
      card.classList.add('is-dragging');
    });
    document.addEventListener('dragover', function (event) {
      const column = event.target.closest('[data-drop-status]');
      if (!column) return;
      event.preventDefault();
      if (event.dataTransfer) event.dataTransfer.dropEffect = 'move';
      document.querySelectorAll('.board-col.is-drag-over').forEach(el => { if (el !== column) el.classList.remove('is-drag-over'); });
      column.classList.add('is-drag-over');
    });
    document.addEventListener('dragleave', function (event) {
      const column = event.target.closest('[data-drop-status]');
      if (!column) return;
      if (!column.contains(event.relatedTarget)) column.classList.remove('is-drag-over');
    });
    document.addEventListener('drop', function (event) {
      const column = event.target.closest('[data-drop-status]');
      if (!column) return;
      event.preventDefault();
      const id = ui.draggedTaskId || (event.dataTransfer ? event.dataTransfer.getData('text/plain') : '');
      const status = column.getAttribute('data-drop-status');
      document.querySelectorAll('.board-col.is-drag-over').forEach(el => el.classList.remove('is-drag-over'));
      document.querySelectorAll('.board-card.is-dragging').forEach(el => el.classList.remove('is-dragging'));
      ui.draggedTaskId = null;
      if (id) changeTaskStatus(id, status);
    });
    document.addEventListener('dragend', function () {
      ui.draggedTaskId = null;
      document.querySelectorAll('.board-card.is-dragging').forEach(el => el.classList.remove('is-dragging'));
      document.querySelectorAll('.board-col.is-drag-over').forEach(el => el.classList.remove('is-drag-over'));
    });
  }
  function setupDockDrag() {
    let drag = null;
    document.addEventListener('pointerdown', function (event) {
      const head = event.target.closest('[data-dock-drag]');
      if (!head) return;
      if (event.target.closest('button, a, input, select')) return;
      if (window.matchMedia && window.matchMedia('(max-width: 640px)').matches) return;
      const dock = head.closest('.dock');
      if (!dock) return;
      const rect = dock.getBoundingClientRect();
      drag = { dock, offsetX: event.clientX - rect.left, offsetY: event.clientY - rect.top, moved: false };
      dock.classList.add('is-dragging');
      dock.style.left = rect.left + 'px';
      dock.style.top = rect.top + 'px';
      dock.style.right = 'auto';
      dock.style.bottom = 'auto';
      document.body.style.userSelect = 'none';
      event.preventDefault();
    });
    window.addEventListener('pointermove', function (event) {
      if (!drag) return;
      drag.moved = true;
      const width = drag.dock.offsetWidth;
      const height = drag.dock.offsetHeight;
      const x = clamp(event.clientX - drag.offsetX, 8, Math.max(8, window.innerWidth - width - 8));
      const y = clamp(event.clientY - drag.offsetY, 8, Math.max(8, window.innerHeight - Math.min(height, 80) - 8));
      drag.dock.style.left = x + 'px';
      drag.dock.style.top = y + 'px';
    });
    window.addEventListener('pointerup', function () {
      if (!drag) return;
      const dock = drag.dock;
      dock.classList.remove('is-dragging');
      document.body.style.userSelect = '';
      if (drag.moved) {
        const rect = dock.getBoundingClientRect();
        settings.dockPosition = {
          x: clamp(rect.left, 8, Math.max(8, window.innerWidth - rect.width - 8)),
          y: clamp(rect.top, 8, Math.max(8, window.innerHeight - 80))
        };
        saveSettings();
        applyDockPosition();
      }
      drag = null;
    });
  }
  function applyDockPosition() {
    const dock = document.querySelector('#dock-root .dock');
    if (!dock) return;
    const style = dockPositionStyle();
    if (!style) {
      dock.style.left = '';
      dock.style.top = '';
      dock.style.right = '';
      dock.style.bottom = '';
      return;
    }
    const pos = settings.dockPosition;
    if (pos) {
      dock.style.left = clamp(Number(pos.x) || 0, 8, Math.max(8, window.innerWidth - dock.offsetWidth - 8)) + 'px';
      dock.style.top = clamp(Number(pos.y) || 0, 8, Math.max(8, window.innerHeight - 80)) + 'px';
      dock.style.right = 'auto';
      dock.style.bottom = 'auto';
    }
  }
  function setupWindowListeners() {
    window.addEventListener('hashchange', applyLocationView);
    window.addEventListener('resize', function () { applyDockPosition(); });
    const media = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
    if (media) {
      const handler = function () {
        let pref = 'system';
        try { pref = localStorage.getItem(STORE.theme) || 'system'; } catch (err) { /* noop */ }
        if (pref === 'system') applyTheme('system');
      };
      if (media.addEventListener) media.addEventListener('change', handler);
      else if (media.addListener) media.addListener(handler);
    }
    window.addEventListener('storage', function (event) {
      if (event.key === STORE.data && event.newValue) {
        try {
          data = normalizeData(JSON.parse(event.newValue));
          ui.taskModal = null;
          document.getElementById('task-modal-root').innerHTML = '';
          renderAll();
          toast('Data diperbarui dari tab lain.', { toastIcon: 'refresh' });
        } catch (err) { /* abaikan data setengah jadi */ }
      } else if (event.key === STORE.theme) {
        applyTheme(event.newValue || 'system');
        updateThemeButton(event.newValue || 'system');
      }
    });
  }
  let currentDay = todayKey();
  function setupDayRollover() {
    setInterval(function () {
      const day = todayKey();
      if (day !== currentDay) {
        currentDay = day;
        ui.calendarCursor = startOfMonthKey(day);
        ui.selectedDate = day;
        ui.timelineCursor = startOfMonthKey(day);
        renderAll();
        maybeAutoBackup();
        toast('Hari baru. Fokus hari ini sudah diperbarui.', { toastIcon: 'sunrise' });
      }
    }, 60000);
  }
  function init() {
    initStaticIcons();
    let pref = 'system';
    try { pref = localStorage.getItem(STORE.theme) || 'system'; } catch (err) { /* noop */ }
    applyTheme(pref);
    updateThemeButton(pref);
    const hashView = location.hash.replace(/^#/, '');
    if (VIEWS.includes(hashView)) {
      ui.view = hashView;
    } else if (VIEWS.includes(settings.lastView)) {
      ui.view = settings.lastView;
      try { history.replaceState(null, '', '#' + ui.view); } catch (err) { /* noop */ }
    } else {
      ui.view = 'dashboard';
      try { history.replaceState(null, '', '#dashboard'); } catch (err) { /* noop */ }
    }
    document.addEventListener('click', function (event) { handleDocumentClick(event, 'main'); });
    document.addEventListener('submit', handleSubmit);
    document.addEventListener('input', handleInput);
    document.addEventListener('change', handleChange);
    document.addEventListener('keydown', handleKeydown);
    setupDragAndDrop();
    setupDockDrag();
    setupWindowListeners();
    setupDayRollover();
    renderAll();
    markSave('saved');
    if (data.tasks.length || data.activity.length) maybeAutoBackup();
    initFileSync();
    setTimeout(function () { maybeShowReminder(false); }, 1100);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();

