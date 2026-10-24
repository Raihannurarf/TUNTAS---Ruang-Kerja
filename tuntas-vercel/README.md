# TUNTAS — ruang kerja pribadi

Aplikasi tugas satu halaman untuk pemakaian pribadi. Data utama tersimpan di peramban perangkat ini. Google Drive, Google Calendar, dan pembuatan laporan otomatis bersifat **opsional** dan dijalankan oleh satu serverless function di Vercel — bukan Apps Script.

## Menjalankan

**Cara tercepat:** buka `index.html` di Chrome, Edge, atau Firefox. Aplikasi inti langsung berjalan tanpa build.

**Cara yang disarankan** (perlu Python; fitur sinkron file hanya aktif di `localhost` atau HTTPS):

```powershell
cd "C:\Users\arrai\Documents\Default Project\tuntas"
python -m http.server 8765
```

Lalu buka <http://localhost:8765>.

> Pilih satu alamat dan pakai konsisten. `localhost` dan `127.0.0.1` dianggap dua situs berbeda oleh peramban, sehingga localStorage-nya juga terpisah.

Untuk mencoba bridge Vercel secara lokal, deploy proyek ini ke Vercel lalu isi URL bridge di TUNTAS. Alternatifnya, pasang Vercel CLI dan jalankan `vercel dev` dari folder ini; endpoint lokal biasanya `http://localhost:3000/api/bridge`.

## Fitur

- **Dasbor** — ringkasan fokus, tenggat terdekat, proyek berjalan, dan aktivitas.
- **Tugas** — daftar dengan pencarian, filter status/prioritas/proyek, serta pengurutan.
- **Papan** — kolom kanban dengan seret-lepas untuk memindahkan status.
- **Kalender** — tampilan bulanan, agenda per tanggal, dan ekspor `.ics`.
- **Timeline** — Gantt bulanan berdasarkan tanggal mulai dan tenggat.
- **Fokus hari ini** — tugas jatuh tempo, terlambat, dan berprioritas tinggi. Tersedia sebagai halaman, panel mengambang yang bisa digeser, dan Picture-in-Picture (Chromium).
- **Tugas berulang** — mingguan, bulanan, triwulan, semester, atau tahunan. Tanggal berikutnya dihitung dari tanggal tugas asal dan digeser ke hari kerja bila jatuh pada akhir pekan. Salinan berikutnya dibuat otomatis saat tugas ini selesai.
- **Pengingat tenggat** — pop-up saat aplikasi dibuka untuk tugas yang jatuh tempo dalam tiga hari ke depan, dengan pilihan “jangan tampilkan lagi hari ini”.
- **Google Calendar** — tombol “Buat acara” terisi untuk tiap tugas, ekspor `.ics`, dan sinkron satu arah lewat bridge Vercel.
- **Laporan kinerja** — satu laporan untuk satu tugas selesai, dengan file Google Doc di Drive dan penerusan otomatis ke aplikasi kinerja (opsional).
- **Tema** — terang, gelap, atau mengikuti sistem.
- **Data lokal** — ekspor/impor JSON, cadangan lokal otomatis, sinkron lewat satu file opsional, dan cadangan opsional ke Google Drive.

## Pintasan

| Tombol | Fungsi |
| --- | --- |
| `N` | Tugas baru |
| `F` | Buka Fokus hari ini |
| `/` atau `Ctrl+K` | Cari tugas |
| `Esc` | Tutup dialog/panel |

## Pindah perangkat

1. Buka **Data & cadangan** (ikon basis data di kanan atas).
2. Pilih **Ekspor JSON**, lalu simpan berkasnya di cloud, USB, atau folder pribadi.
3. Di perangkat lain, buka TUNTAS → **Data & cadangan** → **Impor JSON**.
4. Pilih **Gabungkan** untuk menambahkan/memperbarui berdasarkan ID dan waktu perubahan, atau **Ganti semua** untuk memakai isi berkas sepenuhnya.

Berkas JSON juga menyertakan nama sapaan, proyek, checklist, catatan, tugas berulang, laporan kinerja, dan riwayat aktivitas.

## Sinkron lewat file (opsional)

Gunakan Chrome/Edge versi terbaru. Melalui **Data & cadangan → Sinkron lewat file**:

1. **Buat file sinkron** di folder biasa atau folder yang disinkronkan cloud.
2. Setelah izin diberikan, perubahan akan ditulis otomatis ke berkas itu saat tab aktif.
3. Di perangkat lain, pilih **Buka file yang ada**, lalu **Gabungkan** atau **Ganti semua**.

Ini bukan sinkron waktu-nyata. Hindari mengubah data dari dua perangkat secara bersamaan; buka file yang sama secara berurutan dan periksa pratinjau impor sebelum menggabungkan.

## Tugas berulang

1. Saat membuat atau mengubah tugas, aktifkan **Tugas berulang**.
2. Pilih interval: **Mingguan**, **Bulanan**, **Triwulan**, **Semester**, atau **Tahunan**.
3. TUNTAS menampilkan tanggal berikutnya sebelum kamu menyimpan.
4. Salinan berikutnya **baru dibuat ketika tugas ini ditandai selesai**. Tanggal dihitung dari tanggal mulai/tenggat tugas asal, bukan dari tanggal penyelesaian. Bila hasilnya Sabtu/Minggu, tanggal digeser ke hari kerja berikutnya.
5. Checklist disalin ulang dalam keadaan belum dicentang. Riwayat tugas tetap tersimpan.

## Pengingat tenggat

Saat aplikasi dibuka, TUNTAS menampilkan tugas aktif yang jatuh tempo dalam **H-3 sampai hari H**. Centang **Jangan tampilkan lagi hari ini** bila tidak ingin diulang pada hari itu. Menu **Pengingat** di navigasi bisa membuka daftar yang sama kapan saja.

## Google Calendar

- **Per tugas**: buka detail tugas → **Google Calendar**. Halaman “Buat acara” Google sudah terisi judul, tanggal, jam, dan catatan. Tekan **Simpan** di Google Calendar.
- **Ekspor massal**: tombol **Ekspor .ics** menghasilkan berkas yang bisa diimpor ke Google Calendar atau aplikasi kalender lain.
- **Sinkron satu arah**: dengan bridge Vercel, tombol **Sinkronkan sekarang** membuat/memperbarui acara untuk semua tugas bertanggal. Perubahan di Google Calendar tidak kembali ke TUNTAS.

## Laporan kinerja & Google Drive (bridge Vercel)

Fitur ini memakai satu serverless function di Vercel: [`api/bridge.js`](api/bridge.js). Panduan langkah demi langkah ada di [`VERCEL.md`](VERCEL.md).

Ringkasnya:

1. Deploy folder `tuntas/` ke Vercel. Endpoint otomatis tersedia di `/api/bridge`.
2. Buat service account Google Cloud, aktifkan Drive API, Docs API, dan Calendar API.
3. Bagikan folder Drive ke email service account sebagai **Editor**, dan kalender sebagai **Make changes to events**.
4. Isi environment variables di Vercel (`TUNTAS_SECRET`, kredensial service account, ID folder, ID kalender), lalu redeploy.
5. Di TUNTAS → **Data & cadangan → Google Drive & laporan**, isi token `TUNTAS_SECRET` (URL `/api/bridge` sudah terisi bila satu domain), lalu **Uji koneksi**.
6. Untuk pengiriman otomatis ke aplikasi kinerja GAS yang lama, tambahkan [`extras/KinerjaTargetPatch.gs`](extras/KinerjaTargetPatch.gs) ke proyek **aplikasi laporan**, lalu deploy ulang versi baru.

Alur laporan:

- Setiap tugas selesai punya tombol **Laporkan** sendiri. TUNTAS tidak pernah menggabungkan beberapa tugas menjadi satu laporan.
- Bridge membuat **satu Google Doc** di folder `TUNTAS — Laporan Kinerja`, lalu meneruskannya ke aplikasi kinerja.
- Bila bridge belum diatur atau aplikasi laporan belum punya `doPost`, TUNTAS menyalin ringkasan, membuka aplikasi laporan, dan menyimpan laporan sebagai draf. Setelah dikirim manual, tekan **Tandai terkirim**.
- Data cadangan Drive disimpan sebagai `tuntas-data.json` di folder `TUNTAS — Ruang Kerja`. **Muat dari Drive** selalu menampilkan pratinjau sebelum mengganti data lokal.

Tanpa bridge, semua fitur inti tetap berjalan. Yang tidak tersedia hanya pembuatan file Drive otomatis, sinkron Calendar massal, dan pengiriman laporan otomatis.

## Deploy ke Vercel

Tidak ada build step dan tidak ada dependency npm. Vercel langsung menyajikan `index.html` serta mendeteksi `api/bridge.js` sebagai function. Function memakai runtime Node.js 24 sesuai `package.json`.

1. Import folder/repository `tuntas/` di <https://vercel.com/new> (framework preset **Other**, build command kosong).
2. Tambahkan environment variables di **Project → Settings → Environment Variables**:

   | Nama | Wajib | Keterangan |
   | --- | --- | --- |
   | `TUNTAS_SECRET` | ya | kata sandi acak panjang, sama dengan token di TUNTAS |
   | `GOOGLE_SERVICE_ACCOUNT_EMAIL` | ya* | `client_email` dari file JSON service account |
   | `GOOGLE_PRIVATE_KEY` | ya* | `private_key`, newline ditulis `\n` |
   | `GOOGLE_PRIVATE_KEY_BASE64` | alternatif | base64 dari `private_key` bila newline bermasalah |
   | `GOOGLE_DRIVE_FOLDER_ID` | ya | ID folder Drive yang dibagikan ke service account |
   | `GOOGLE_CALENDAR_ID` | ya | email Google atau Calendar ID yang dibagikan |
   | `TUNTAS_OWNER_EMAIL` | disarankan | email pemilik agar folder baru ikut dibagikan |
   | `TUNTAS_TIMEZONE` | tidak | default `Asia/Makassar` |
   | `TUNTAS_ALLOWED_ORIGIN` | tidak | domain Vercel-mu, atau `*` saat pengembangan |

   \* Bisa diganti `GOOGLE_REFRESH_TOKEN` + `GOOGLE_CLIENT_ID` + `GOOGLE_CLIENT_SECRET` bila memakai OAuth.

3. Redeploy setelah menambah atau mengubah environment variables.
4. Buka `https://nama-proyek.vercel.app`, atur integrasi, lalu uji koneksi.

Daftar lengkap langkah Google Cloud, pembuatan folder, kalender, dan pemecahan masalah ada di [`VERCEL.md`](VERCEL.md). Contoh nilai env ada di [`.env.example`](.env.example).

## Penyimpanan & cadangan

- Data utama: `tuntas.data.v1` (tugas, aktivitas, laporan, tugas berulang)
- Preferensi: `tuntas.settings.v1` (termasuk nama, jam kerja, URL bridge, dan token bridge)
- Cadangan lokal: `tuntas.backups.v1` (tugas, aktivitas, dan laporan)
- Tema: `tuntas.theme`
- Cadangan otomatis dibuat saat aplikasi dibuka, maksimal sekali per enam jam; sepuluh cadangan terakhir disimpan.
- Token bridge hanya disimpan di peramban ini dan dikirim ke function Vercel lewat HTTPS saat diperlukan. Jangan membagikan URL + token.
- Menghapus data situs/peramban juga menghapus tugas, laporan, pengaturan bridge, dan cadangan lokal. Ekspor JSON secara berkala.
- Pemulihan cadangan dan **Hapus semua data** selalu membuat cadangan pengaman lebih dulu, kecuali bila penyimpanan peramban sudah penuh.

## Catatan

- Pemakaian pribadi, tanpa peran institusi, PIC, atau WhatsApp.
- Google Drive, Google Calendar, dan laporan otomatis memerlukan deploy Vercel + service account Google. Tanpa itu, aplikasi inti tetap berjalan.
- Aplikasi laporan yang diberikan belum memiliki `doPost`; pengiriman otomatis memerlukan patch kecil dari `extras/KinerjaTargetPatch.gs`. Tanpa patch itu, TUNTAS tetap membuat file Drive dan menyediakan alur salin + buka aplikasi manual.
- Vercel membatasi body function sekitar 4,5 MB; data Drive dibatasi sekitar 4 MB. Untuk data lebih besar, gunakan ekspor JSON atau sinkron file.
- Picture-in-Picture memerlukan Chromium terbaru. Firefox/Safari tetap dapat memakai aplikasi inti dan ekspor/impor JSON.
- Font diambil dari Google Fonts; tanpa internet, aplikasi tetap jalan dengan font cadangan.
- Tanggal dan waktu mengikuti zona waktu perangkat.
- Tidak ada proses build. Ubah langsung `index.html`, `styles.css`, atau `app.js`.

## Berkas

```text
tuntas/                       ← root proyek Vercel
├─ index.html                 kerangka aplikasi
├─ styles.css                 tema, tata letak, dan tampilan responsif
├─ app.js                     logika, penyimpanan, dan seluruh tampilan
├─ api/
│  └─ bridge.js               serverless function /api/bridge
├─ extras/
│  └─ KinerjaTargetPatch.gs   opsional, patch doPost aplikasi laporan GAS
├─ vercel.json                pengaturan function dan cache
├─ package.json               metadata proyek, tanpa dependency
├─ .env.example               contoh environment variables
├─ VERCEL.md                  panduan deploy dan Google Cloud
└─ README.md                  catatan ini
```
