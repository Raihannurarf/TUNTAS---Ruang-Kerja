# Deploy TUNTAS ke Vercel

Folder `tuntas/` ini sudah siap menjadi proyek Vercel:

- `index.html`, `styles.css`, `app.js` — aplikasi statis.
- `api/bridge.js` — serverless function untuk Google Drive, Google Docs, Google Calendar, dan penerusan laporan.
- `vercel.json` — pengaturan function dan cache.
- `package.json` — metadata proyek; tidak ada dependency npm.
- `extras/KinerjaTargetPatch.gs` — **opsional**, hanya untuk aplikasi laporan GAS yang sudah ada.

Tidak ada build step. Vercel langsung menyajikan `index.html` dan mendeteksi `api/bridge.js` sebagai function. Function memakai runtime **Node.js 24** yang tercatat di `package.json` (salah satu versi yang didukung Vercel).

---

## 1. Siapkan Google Cloud (sekali saja)

1. Buka <https://console.cloud.google.com/> dan buat project baru, misalnya `tuntas-bridge`.
2. Buka **APIs & Services → Library**, lalu aktifkan:
   - **Google Drive API**
   - **Google Docs API**
   - **Google Calendar API**
3. Buka **IAM & Admin → Service Accounts → Create service account**.
   - Nama: `tuntas-bridge`
   - Role: tidak perlu role tambahan.
4. Buka service account tersebut → tab **Keys** → **Add key → Create new key → JSON**.
5. Simpan file JSON itu di tempat aman. File ini berisi `client_email` dan `private_key`.

> Service account adalah “robot” yang dipakai Vercel untuk mengakses Drive dan Calendar. Kamu tidak perlu memberikan password Gmail.

---

## 2. Siapkan folder Google Drive

1. Di Google Drive, buat folder misalnya **TUNTAS — Ruang Kerja**.
2. Klik kanan folder → **Share** → masukkan `client_email` dari file JSON service account → **Editor**.
3. Buka folder itu dan salin ID dari URL:

   ```text
   https://drive.google.com/drive/folders/1AbCdEfGhIjKlMnOpQrStUvWxYz
                                          └────────── ini ID folder ──────────┘
   ```

4. Simpan ID itu untuk `GOOGLE_DRIVE_FOLDER_ID`.

Folder `TUNTAS — Laporan Kinerja` akan dibuat otomatis di dalam folder tersebut.

---

## 3. Siapkan Google Calendar

Pilih salah satu:

**A. Pakai kalender utama**

1. Buka Google Calendar → **Settings** → **Settings for my calendars** → pilih kalendermu.
2. Buka **Share with specific people or groups** → **Add people**.
3. Masukkan `client_email` service account → izin **Make changes to events**.
4. Untuk `GOOGLE_CALENDAR_ID`, pakai alamat Gmail-mu (contoh `nama@gmail.com`).

**B. Pakai kalender khusus (disarankan agar rapi)**

1. Buat kalender baru, misalnya **TUNTAS**.
2. Buka **Settings for my calendars → TUNTAS → Share with specific people**.
3. Tambahkan `client_email` service account → **Make changes to events**.
4. Buka **Integrate calendar** dan salin **Calendar ID** (biasanya berakhiran `@group.calendar.google.com`).
5. Tambahkan kalender itu ke tampilan Google Calendar-mu.

> Sinkron bersifat satu arah: TUNTAS → Google Calendar. Perubahan di Google Calendar tidak kembali ke TUNTAS.

---

## 4. Deploy ke Vercel

### Opsi A — Vercel CLI

Perlu Node.js dan Vercel CLI.

```powershell
cd "C:\Users\arrai\Documents\Default Project\tuntas"
npm install -g vercel
vercel
vercel --prod
```

Saat ditanya, pilih akunmu, buat project baru, dan gunakan folder saat ini sebagai root. Tidak perlu build command.

### Opsi B — GitHub

1. Buat repository baru, lalu masukkan **isi folder `tuntas/`** sebagai root repository.
2. Buka <https://vercel.com/new>, import repository itu.
3. Framework preset: **Other**.
4. Build command: kosongkan.
5. Output directory: biarkan default.
6. Deploy.

Setelah deploy, catat domain Vercel-mu, misalnya:

```text
https://tuntas-nama.vercel.app
```

Endpoint bridge otomatis tersedia di:

```text
https://tuntas-nama.vercel.app/api/bridge
```

---

## 5. Isi environment variables di Vercel

Buka **Project → Settings → Environment Variables**, lalu tambahkan:

| Nama | Nilai |
| --- | --- |
| `TUNTAS_SECRET` | kata sandi acak panjang, misalnya 40 karakter |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | `client_email` dari file JSON |
| `GOOGLE_PRIVATE_KEY` | `private_key` dari file JSON, dengan newline ditulis `\n` |
| `GOOGLE_DRIVE_FOLDER_ID` | ID folder Drive langkah 2 |
| `GOOGLE_CALENDAR_ID` | alamat Gmail atau Calendar ID langkah 3 |
| `TUNTAS_OWNER_EMAIL` | email Google-mu (opsional tetapi disarankan) |
| `TUNTAS_TIMEZONE` | `Asia/Makassar`, `Asia/Jakarta`, atau `Asia/Jayapura` |
| `TUNTAS_ALLOWED_ORIGIN` | `https://tuntas-nama.vercel.app` |

Contoh nilai `GOOGLE_PRIVATE_KEY`:

```text
-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASC...\n-----END PRIVATE KEY-----\n
```

Jika Vercel menolak newline, gunakan `GOOGLE_PRIVATE_KEY_BASE64` sebagai gantinya. Di PowerShell:

```powershell
$j = Get-Content .\kunci-service-account.json -Raw | ConvertFrom-Json
[Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes($j.private_key))
```

Salin hasilnya ke `GOOGLE_PRIVATE_KEY_BASE64`, lalu kosongkan `GOOGLE_PRIVATE_KEY`.

Setelah menambah environment variables, **Redeploy** project agar nilai baru terbaca.

### Alternatif OAuth refresh token

Selain service account, bridge mendukung OAuth:

- `GOOGLE_REFRESH_TOKEN`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`

Service account lebih disarankan untuk pemakaian pribadi karena tidak bergantung pada masa berlaku refresh token.

---

## 6. Hubungkan TUNTAS ke bridge

1. Buka aplikasi Vercel-mu.
2. Klik ikon **Data & cadangan** di kanan atas.
3. Gulir ke **Google Drive & laporan**.
4. Isi:
   - **URL bridge Vercel**: `https://tuntas-nama.vercel.app/api/bridge`
   - **Token rahasia bridge**: sama dengan `TUNTAS_SECRET`
5. Klik **Simpan pengaturan**, lalu **Uji koneksi**.
6. Bila berhasil, muncul email pemilik bridge dan status folder/Calendar.

Setelah itu:

- **Simpan ke Drive** menulis `tuntas-data.json` ke folder TUNTAS.
- **Muat dari Drive** menampilkan pratinjau sebelum data lokal diubah.
- **Cadangkan otomatis ke Google Drive** menulis beberapa detik setelah data berubah.
- **Sinkronkan sekarang** di halaman Kalender membuat/memperbarui acara.
- **Laporkan** membuat satu Google Doc untuk satu tugas selesai.

---

## 7. Penerusan otomatis ke aplikasi laporan (opsional)

Bridge Vercel selalu membuat file Google Doc. Untuk meneruskan laporan ke aplikasi kinerja yang sudah ada:

1. Buka proyek Apps Script **aplikasi laporan kinerja**.
2. Buat file baru `KinerjaTargetPatch.gs`, tempel isi [`extras/KinerjaTargetPatch.gs`](extras/KinerjaTargetPatch.gs).
3. Opsional: jalankan `generateTuntasReportToken`, salin token dari Execution log.
4. **Deploy → Manage deployments → edit deployment aktif → Version: New version → Deploy.**
5. Di TUNTAS → **Pengaturan lanjutan laporan**, isi URL aplikasi laporan dan token yang sama.
6. Kirim satu laporan percobaan. Status harus menjadi **Terkirim**.

> Ini satu-satunya bagian yang masih memakai Apps Script, karena aplikasi laporan yang diberikan memang berupa Apps Script. Bridge TUNTAS sendiri sepenuhnya berjalan di Vercel. Bila kamu tidak ingin menyentuh Apps Script sama sekali, lewati langkah ini; TUNTAS tetap membuat file Drive dan menyediakan alur salin + buka aplikasi laporan manual.

---

## 8. Keamanan

- `TUNTAS_SECRET` adalah kunci API. Jangan bagikan URL bridge + token.
- Token disimpan di `localStorage` peramban dan dikirim ke function Vercel melalui HTTPS.
- Semua environment variables hanya ada di Vercel, tidak masuk ke kode atau browser.
- Set `TUNTAS_ALLOWED_ORIGIN` ke domain Vercel-mu. Gunakan `*` hanya bila kamu juga membuka aplikasi dari `file://` atau `localhost` saat pengembangan.
- Service account hanya diberi akses ke folder Drive dan kalender yang kamu bagikan. Jangan memberinya akses seluruh Drive bila tidak perlu.
- File Google Doc dibuat oleh service account di dalam folder yang dibagikan. Pemilik folder dapat membuka dan mengelola file tersebut.

---

## 9. Batasan

- Vercel membatasi ukuran body function sekitar **4,5 MB**. TUNTAS membatasi data Drive sekitar **4 MB**. Untuk data lebih besar, gunakan ekspor JSON atau sinkron file.
- Durasi function dibatasi. Sinkron ratusan acara sekaligus bisa melewati batas; ulangi sinkron bila perlu.
- Sinkron Calendar tidak real-time dan hanya satu arah.
- Google Docs dibuat sebagai teks terstruktur, bukan template dengan format rumit.
- `GOOGLE_CALENDAR_ID=primary` berarti kalender milik service account, bukan kalendermu. Selalu isi dengan email/ID kalender yang sudah dibagikan.

---

## 10. Pemecahan masalah

| Gejala | Penyebab umum | Perbaikan |
| --- | --- | --- |
| `Kredensial Google belum diatur` | Env service account belum lengkap | Isi `GOOGLE_SERVICE_ACCOUNT_EMAIL` dan `GOOGLE_PRIVATE_KEY`, lalu redeploy |
| `Google menolak kredensial` | Private key salah/terpotong | Salin ulang `private_key`, gunakan `\n`, atau pakai base64 |
| `Folder Drive tidak bisa diakses` | Folder belum dibagikan ke service account | Share folder ke `client_email` sebagai Editor |
| `Calendar tidak ditemukan` | Calendar ID salah atau belum dibagikan | Share kalender ke service account, salin Calendar ID yang benar |
| `Token bridge salah` | `TUNTAS_SECRET` berbeda dengan token di TUNTAS | Samakan nilainya, redeploy bila baru diubah |
| `Permintaan terlalu besar` | Data > 4 MB | Ekspor JSON lokal, kurangi data, atau pakai sinkron file |
| CORS error | Origin tidak diizinkan | Set `TUNTAS_ALLOWED_ORIGIN` ke domain aplikasi atau `*` |
| `Aplikasi laporan belum memiliki doPost` | Patch target belum dipasang | Pasang `extras/KinerjaTargetPatch.gs`, deploy ulang |
| `File Drive dibuat, tetapi belum terkirim` | Penerusan otomatis gagal | Cek URL/token aplikasi laporan; gunakan tombol Kirim ulang |
| Acara ganda | Event lama dari bridge GAS | Hapus acara lama sekali, lalu sinkron ulang dari TUNTAS |

---

## 11. Struktur deployment

```text
tuntas/                       ← root proyek Vercel
├─ index.html
├─ styles.css
├─ app.js
├─ api/
│  └─ bridge.js               function /api/bridge
├─ vercel.json
├─ package.json
├─ .env.example
├─ VERCEL.md                  panduan ini
├─ README.md
└─ extras/
   └─ KinerjaTargetPatch.gs   opsional, untuk aplikasi laporan GAS
```
