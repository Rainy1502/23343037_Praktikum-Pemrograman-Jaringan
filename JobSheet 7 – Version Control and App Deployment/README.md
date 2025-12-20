<p align="left">
  <a href="..">
    <img alt="Kembali" src="https://img.shields.io/badge/←%20KEMBALI-6c757d?style=for-the-badge" width="130">
  </a>
</p>

<div align="center">
  <a href="https://unp.ac.id/">
    <img src="https://unp.ac.id/nfs-assets/all/images/logo_unp_white.png" alt="UNP" width="400"/>
  </a>
</div>
<br>

<p align="center">
  <strong style="font-size: 1.5em;">PRAKTIKUM PEMROGRAMAN JARINGAN</strong><br>
  <em style="font-size: 1.1em;">Jobsheet 7 – Version Control and App Deployment</em>
</p>

<p align="center">
  <small>Git • GitHub • Deployment • CI/CD • Production</small>
</p>

<hr>

<p align="center">
  <small>
    Nama : <b>Fattan Naufan Islami</b> &nbsp;|&nbsp;
    NIM : <b>23343037</b> &nbsp;|&nbsp;
    Prodi : <b>Informatika</b>
  </small>
</p>

---

<h2 align="center">🔗 Repository dan Deployment</h2>

Aplikasi **StratoNimbus** telah berhasil di-deploy dan tersedia di repository GitHub berikut:

<div align="center">
  <a href="https://github.com/Rainy1502/Strato_Nimbus">
    <img alt="GitHub Repository" src="https://img.shields.io/badge/GitHub-Strato_Nimbus-blue?style=for-the-badge&logo=github" />
  </a>
</div>

<br>

Repository ini mengelola seluruh lifecycle aplikasi: dari development dengan Git version control, hingga production deployment dengan Vercel. Setiap commit, branch, dan deployment tercatat dan dapat di-track untuk memastikan traceability dan reproducibility.

<hr>

<h2 align="center">🎯 Tujuan Praktikum</h2>

<ul>
  <li>Memahami Git sebagai Version Control System dan workflow pengembangan berbasis version control</li>
  <li>Mengelola repository pada GitHub dan memahami fitur collaboration seperti branching dan pull requests</li>
  <li>Mengorganisir project dengan struktur yang siap untuk production deployment</li>
  <li>Mengimplementasikan deployment aplikasi web ke cloud platform (Vercel)</li>
  <li>Memahami CI/CD dasar melalui integrasi GitHub dengan platform deployment</li>
  <li>Menerapkan best practices dalam version control dan deployment (environment variables, .gitignore, configuration files)</li>
</ul>

<hr>

<h2 align="center">🌐 Konsep yang Digunakan</h2>

### Version Control System (Git)
Git adalah distributed version control system yang memungkinkan developer melacak perubahan kode, berkolaborasi dengan tim, dan mengelola multiple versions dari codebase. Dalam praktikum ini, Git digunakan untuk:
- **Commit:** Menyimpan snapshot kode dengan pesan deskriptif
- **Branching:** Membuat branch terpisah untuk feature development tanpa mempengaruhi main branch
- **History:** Melacak perubahan dan siapa yang melakukan perubahan kapan

### Repository Management pada GitHub
GitHub adalah platform hosting untuk Git repository yang menyediakan tools untuk collaboration, code review, dan project management. Fitur yang digunakan:
- **Remote Repository:** Menyimpan code di cloud untuk accessibility dan backup
- **Branching Strategy:** Main branch untuk production, develop untuk staging
- **Pull Requests:** Mekanisme code review sebelum merge ke main

### Deployment ke Cloud (Vercel)
Vercel adalah platform deployment untuk aplikasi JavaScript/Node.js yang mendukung automatic deployment dari Git repository. Integrasi GitHub dengan Vercel memungkinkan:
- **Automatic Deploy:** Setiap push ke main branch otomatis di-deploy
- **Preview Deploy:** Setiap pull request mendapat preview URL
- **Environment Variables:** Konfigurasi sensitif dikelola di Vercel console

### CI/CD Dasar
Continuous Integration dan Continuous Deployment otomatis:
- GitHub mendeteksi push ke repository
- Vercel trigger build process
- Aplikasi di-build, di-test (jika ada), dan di-deploy
- User bisa akses aplikasi live di production URL

### Environment Variables dan Configuration
Konfigurasi sensitif (API keys, database URLs) disimpan di:
- **File `.env.example`:** Template variabel yang diperlukan (di-commit)
- **File `.env`:** Actual values (tidak di-commit, ada di .gitignore)
- **Vercel Console:** Environment variables untuk production (secure)

<hr>

<h2 align="center">⚙️ Implementasi Praktikum</h2>

### Struktur Project StratoNimbus

Project diorganisir dengan pemisahan concern yang jelas:

```
StratoNimbus/
├── src/                       ← Source code aplikasi
│   ├── app.js                 ← Express app dan routing
│   ├── server.js              ← Server initialization
│   └── utils/                 ← Utility modules
│       ├── geocode.js         ← Geocoding service
│       ├── prediksiCuaca.js   ← Weather forecast
│       ├── berita.js          ← News service
│       └── cache.js           ← Caching mechanism
├── api/                       ← Serverless functions (Vercel)
│   └── index.js               ← Vercel serverless entry point
├── public/                    ← Static assets
├── templates/                 ← Handlebars views
├── docs/                      ← Documentation
│   └── ARCHITECTURE.md        ← API architecture
├── .env.example               ← Environment variables template
├── .env                       ← Actual env vars (NOT in git)
├── .gitignore                 ← Files to ignore in git
├── .vercelignore              ← Files to ignore in Vercel
├── .eslintrc.cjs              ← Linting configuration
├── jest.config.cjs            ← Testing configuration
├── package.json               ← Dependencies dan scripts
└── README.md                  ← Project documentation
```

### Konfigurasi File untuk Version Control dan Deployment

**`.gitignore`**
Mendefinisikan file/folder yang tidak perlu di-commit ke Git:
```
node_modules/    ← Dependencies (diinstall via npm install)
.env             ← Sensitive configuration
npm-debug.log    ← Debug logs
dist/, coverage/ ← Build outputs
.DS_Store        ← System files
```

**`.env.example`**
Template environment variables yang diperlukan aplikasi:
```
PORT=4000
WEATHER_API_KEY=...
```
File ini di-commit sebagai dokumentasi variabel apa saja yang diperlukan.

**`.vercelignore`**
Mengoptimalkan deployment di Vercel dengan mengabaikan file yang tidak diperlukan di production.

**`.eslintrc.cjs`**
Konfigurasi code linting untuk memastikan code quality dan consistency.

**`jest.config.cjs`**
Setup testing framework untuk automated testing.

### Alur Penggunaan Git dan Deployment

**Development Workflow:**
```
1. Buat branch baru dari main
   git checkout -b feature/nama-fitur

2. Lakukan perubahan kode dan test lokal

3. Commit perubahan dengan pesan deskriptif
   git add .
   git commit -m "Add: fitur baru dengan deskripsi"

4. Push ke remote repository
   git push origin feature/nama-fitur

5. Buat Pull Request di GitHub untuk code review

6. Setelah approve, merge ke develop/main branch
   git merge feature/nama-fitur

7. Delete feature branch
   git branch -d feature/nama-fitur
```

**Production Deployment:**
```
1. Merge ke main branch di GitHub

2. GitHub webhook trigger Vercel build

3. Vercel:
   - Download code dari repository
   - Install dependencies (npm install)
   - Build aplikasi (npm run build jika ada)
   - Deploy ke production URL

4. Aplikasi live di production environment

5. Monitor logs dan metrics di Vercel dashboard
```

### Integrasi GitHub dan Vercel

**Continuous Deployment Flow:**
```
Developer Push Code
    ↓
GitHub Receives Commit
    ↓
GitHub Webhook Notification
    ↓
Vercel Receives Notification
    ↓
Vercel Build & Deploy
    ↓
Application Live at Production URL
```

**Preview Deployment untuk Pull Requests:**
Setiap PR mendapat preview URL untuk testing sebelum merge ke main.

### Environment Variables Management

**Development (Local):**
- Buat file `.env` dari template `.env.example`
- Isi dengan actual values
- File tidak di-commit (ada di .gitignore)

**Production (Vercel):**
- Environment variables dikonfigurasi di Vercel Project Settings
- Vercel inject variables saat build time
- Aplikasi dapat akses via `process.env.VARIABLE_NAME`

<hr>

<h2 align="center">📊 Hasil dan Pembahasan</h2>

### Keberhasilan Version Control dan Deployment

Aplikasi StratoNimbus berhasil dikelola dengan Git version control dan di-deploy ke production melalui Vercel. Repository GitHub menunjukkan riwayat development yang terstruktur dengan commit history yang jelas.

### Aspek-Aspek yang Diimplementasikan

**1. Version Control dengan Git**
- Commit history tercatat dengan baik
- Branching strategy diikuti untuk feature development
- .gitignore mencegah file sensitif masuk repository

**2. Repository Management pada GitHub**
- Repository tersedia secara public/private
- Branch main untuk production, develop untuk staging
- Documentation melalui README dan ARCHITECTURE.md

**3. Project Structure untuk Production**
- Pemisahan source code, utilities, dan configuration jelas
- Environment variables management dengan .env.example
- Linting dan testing infrastructure tersedia

**4. Deployment ke Vercel**
- Integrasi GitHub-Vercel berhasil dikonfigurasi
- Automatic deployment trigger ketika push ke main branch
- Aplikasi accessible di production URL yang stable

**5. CI/CD Dasar**
- Build process otomatis di Vercel
- Environment variables injected saat deployment
- Monitoring dan logs tersedia di Vercel dashboard

**6. Best Practices**
- Sensitive data tidak di-commit (.env di .gitignore)
- Configuration files version-controlled untuk reproducibility
- Clear commit messages untuk traceability

### Analisis Alur Deployment

Ketika developer push kode ke GitHub:

1. **Git Detects Change** → Commit disimpan di repository
2. **GitHub Webhook** → Mengirim notifikasi ke Vercel
3. **Vercel Build** → Download code, install dependencies
4. **Vercel Test** → Run linting dan tests (jika dikonfigurasi)
5. **Vercel Deploy** → Upload artifacts ke CDN dan server
6. **Live** → Aplikasi accessible di production URL

Proses ini fully automated dan dapat diulang untuk setiap push tanpa intervensi manual.

### Kesesuaian dengan Tujuan Jobsheet

Semua tujuan praktikum tercapai:
- Git sebagai VCS dipahami dan diimplementasikan ✓
- GitHub repository management dilakukan dengan baik ✓
- Project structure siap untuk production deployment ✓
- Deployment ke Vercel berhasil dan automatic ✓
- CI/CD dasar terintegrasi GitHub-Vercel ✓
- Best practices dalam version control dan deployment diterapkan ✓

<hr>

<h2 align="center">📸 Dokumentasi Praktikum</h2>

**Screenshot 1 – Halaman Utama (Home)**
<div align="center">
  <img src="Foto/Home.png" width="80%" alt="Halaman Utama">
</div>

<br>

**Screenshot 2 – Halaman dengan Weather Information**
<div align="center">
  <img src="Foto/Home_Cuaca Padang.png" width="80%" alt="Home dengan Cuaca">
</div>

<br>

**Screenshot 3 – Halaman Bantuan (FAQ)**
<div align="center">
  <img src="Foto/Bantuan.png" width="80%" alt="Halaman Bantuan">
</div>

<br>

**Screenshot 4 – Halaman Berita**
<div align="center">
  <img src="Foto/Berita1.png" width="80%" alt="Halaman Berita 1">
</div>

<br>

**Screenshot 5 – Halaman Tentang**
<div align="center">
  <img src="Foto/Tentang1.png" width="80%" alt="Halaman Tentang">
</div>

<br>

**Screenshot 6 – Halaman Error 404**
<div align="center">
  <img src="Foto/404.png" width="80%" alt="Halaman 404">
</div>

<hr>

<h2 align="center">🚧 Kendala yang Dihadapi</h2>

Proses version control dan deployment berjalan dengan lancar dengan beberapa learning points:

1. **Environment Variables Configuration:** Memahami perbedaan antara `.env` untuk development dan environment variables di Vercel console memerlukan attention terhadap detail untuk menghindari missing variables di production.

2. **Serverless Functions Adaptation:** Adaptasi dari server tradisional ke serverless functions (Vercel) di folder `api/` memerlukan pemahaman tentang bagaimana request dipindahkan dari Express routing ke serverless handlers.

3. **Build Optimization:** Mengoptimalkan build time dan deployment package size dengan .vercelignore dan excluding unnecessary files merupakan practical consideration untuk production efficiency.

Kendala-kendala ini berhasil diatasi melalui dokumentasi dan testing di environment yang sesuai.

<hr>

<h2 align="center">📝 Kesimpulan</h2>

<div align="center">
  <table width="90%">
    <tr>
      <td>

Melalui praktikum Jobsheet 7, aku memperoleh pemahaman komprehensif tentang version control dengan Git dan proses deployment aplikasi ke production. Jobsheet ini menunjukkan bahwa pengembangan aplikasi jaringan modern bukan hanya tentang menulis kode yang baik, tetapi juga tentang mengelola lifecycle aplikasi dengan baik: dari development, version control, collaboration, hingga production deployment. Pengalaman menggunakan Git dan GitHub secara practical menunjukkan pentingnya tracking setiap perubahan kode, memiliki riwayat yang clear, dan memudahkan rollback jika diperlukan. Integrasi automated antara GitHub dan Vercel mendemonstrasikan bagaimana CI/CD bekerja dalam practice, menghilangkan manual deployment steps dan mengurangi human error.

Lebih jauh, Jobsheet 7 mengajarkan pentingnya treating aplikasi sebagai production artifact yang memerlukan proper configuration, environment management, dan monitoring. Struktur project StratoNimbus yang terorganisir dengan baik, penggunaan .env untuk secrets management, dan integrasi deployment yang smooth menunjukkan how professional development teams organize dan deploy applications. Pemahaman tentang bagaimana Git, GitHub, dan cloud deployment platforms bekerja bersama ini menjadi skills fundamental yang akan aku gunakan dalam setiap project development di masa depan. Praktikum ini mengajarkan bahwa version control dan deployment adalah equally important dengan code quality itu sendiri dalam membuat sustainable dan maintainable applications.

  </td>
</tr>
  </table>
</div>

---

<p align="center">
  <a href=".."><img alt="Kembali" src="https://img.shields.io/badge/←%20KEMBALI%20KE%20HALAMAN%20UTAMA-6c757d?style=for-the-badge" width="300"></a>
</p>

<p align="center">
  <em>Dokumentasi Praktikum Pemrograman Jaringan</em><br>
  <small>Kesimpulan Pelaksanaan Jobsheet 7</small>
</p>
