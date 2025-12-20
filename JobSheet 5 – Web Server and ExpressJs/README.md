<p align="left">
  <a href="../README.md">
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
  <em style="font-size: 1.1em;">Jobsheet 5 – Web Server and ExpressJs</em>
</p>

<p align="center">
  <small>Web Server • Express.js • Routing • Handlebars Templating</small>
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

<h2 align="center">🎯 Tujuan Praktikum</h2>

<ul>
  <li>Memahami Express.js sebagai framework web server berbasis Node.js</li>
  <li>Mengimplementasikan routing untuk menangani request klien ke berbagai halaman</li>
  <li>Menggunakan templating engine (Handlebars) untuk menghasilkan halaman dinamis</li>
  <li>Mengorganisir static files (CSS, JavaScript, gambar) secara terstruktur</li>
  <li>Menerapkan error handling melalui wildcard route dan 404 page</li>
  <li>Memahami alur request–response dalam arsitektur web server berbasis Express.js</li>
</ul>

<hr>

<h2 align="center">🌐 Konsep Jaringan dan Web yang Digunakan</h2>

### Arsitektur Client–Server
Praktikum ini mengimplementasikan model **Client–Server** berbasis HTTP. Browser sebagai klien mengirimkan request ke server Express.js, kemudian server memproses request tersebut dan mengirimkan response dalam bentuk halaman HTML yang telah di-render.

### Protokol dan Komunikasi
- **HTTP (HyperText Transfer Protocol):** Protokol komunikasi antara klien dan server
- **Request–Response Model:** Klien mengirim request (GET), server memproses, dan mengirimkan response (HTML, JSON, atau error)

### Peran Express.js dalam Web Server
Express.js memfasilitasi:
- **Routing:** Mengarahkan request ke handler yang sesuai berdasarkan URL path
- **Templating:** Menggunakan Handlebars untuk menghasilkan HTML dinamis
- **Static File Serving:** Melayani CSS, JavaScript, dan aset statis lainnya
- **Middleware:** Memproses request sebelum sampai ke route handler

### Templating Engine dan Reusability
Handlebars memungkinkan pemisahan logic dan tampilan, serta mendukung **partials** (komponen template yang dapat digunakan kembali) untuk membuat kode lebih modular dan maintainable.

<hr>

<h2 align="center">⚙️ Implementasi Program</h2>

### Arsitektur Aplikasi Express.js

Struktur folder web-server dirancang untuk pemisahan concern:

```
web-server/
├── src/
│   └── app.js                 ← Express app setup dan routing
├── public/                    ← Static files
│   ├── css/
│   ├── js/
│   ├── img/
│   └── file_html/
├── templates/                 ← Handlebars templates
│   ├── views/                 ← Page templates
│   └── partials/              ← Reusable components
└── package.json               ← Dependencies
```

### Konfigurasi Express.js

**File: `src/app.js`**

1. **Setup path dan module imports:**
   - Menggunakan `path` module untuk mendefinisikan jalur absolut
   - Import `express`, `hbs` (Handlebars), dan modules pendukung

2. **Konfigurasi template engine:**
   - Menentukan Handlebars sebagai view engine
   - Mendaftarkan lokasi views dan partials
   - Partials dapat digunakan dalam setiap template dengan syntax `{{>namaPartial}}`

3. **Serving static files:**
   - Middleware `express.static()` melayani file statis dari folder `/public`
   - CSS, JavaScript, dan gambar dapat diakses klien langsung

### Routing dan Alur Request

Aplikasi mendefinisikan beberapa route untuk menangani berbagai request:

| Route | Method | Handler | Deskripsi |
|-------|--------|---------|-----------|
| `/` | GET | `res.render('index')` | Halaman utama |
| `/bantuan` | GET | `res.render('bantuan')` | Halaman bantuan/FAQ |
| `/infoCuaca` | GET | `res.json([...])` | API response JSON |
| `/tentang` | GET | `res.render('tentang')` | Halaman tentang |
| `/bantuan/:artikel` | GET | `res.render('404')` | Sub-route tidak ditemukan |
| Wildcard | ALL | `res.render('404')` | Tangkap semua route tidak ada |

### Alur Request–Response

1. **Klien mengirim request:** Browser mengakses URL (misal: `http://localhost:4000/`)
2. **Express menerima request:** Express melakukan route matching terhadap defined routes
3. **Server memproses:** Route handler yang sesuai dieksekusi
4. **Template di-render:** Handlebars menggabungkan view + partials + data dinamis
5. **Response dikirim:** Server mengirimkan HTML lengkap ke klien
6. **Browser menampilkan:** Klien menerima HTML dan memuat static files (CSS, JS, img)

### Handlebars Partials dan Views

**Partials (Reusable Components):**
- `head.hbs` – Meta tags dan CSS links (header dokumen)
- `header.hbs` – Navigation dan branding
- `footer.hbs` – Footer content

**Views (Page Templates):**
- `index.hbs` – Halaman utama aplikasi
- `bantuan.hbs` – Halaman bantuan/FAQ
- `tentang.hbs` – Halaman tentang/profil
- `404.hbs` – Error page untuk route tidak ditemukan

Setiap view menginklusikan partials untuk memaksimalkan reusability dan menjaga consistency visual.

### Error Handling

Wildcard route di akhir menangkap semua request yang tidak sesuai dengan route yang didefinisikan, kemudian merespons dengan HTTP status 404 dan rendering error page.

<hr>

<h2 align="center">📊 Hasil dan Pembahasan</h2>

### Keberhasilan Implementasi

Server Express.js berhasil dijalankan dan merespons request dengan baik. Semua halaman dapat diakses melalui browser, dan error handling (404 page) berfungsi untuk route yang tidak ada.

### Aspek-Aspek yang Diuji

**1. Routing Dinamis**
- Route `/` (home), `/bantuan`, `/tentang` merespons dengan tepat
- Sub-route `/bantuan/:artikel` menangani parameter dinamis
- Wildcard route menangkap error 404

**2. Template Rendering**
- Handlebars berhasil merender view dengan data dinamis
- Partials (head, header, footer) terintegrasi dalam setiap halaman
- Interpolasi data (`{{judul}}`, `{{nama}}`) berfungsi dengan baik

**3. Static File Serving**
- CSS dari `/public/css/` dimuat dengan benar
- JavaScript dari `/public/js/` dapat diakses
- Gambar dan aset statis tersajikan dengan baik

**4. HTTP Status Code**
- Route yang valid merespons dengan status 200 OK
- Route tidak ada merespons dengan status 404 Not Found

### Analisis Alur Request–Response

Ketika user mengakses `/bantuan`:

1. Browser mengirim `GET /bantuan` HTTP request
2. Express cocokkan URL path dengan defined routes
3. Route handler `app.get('/bantuan', ...)` dieksekusi
4. Handler memanggil `res.render('bantuan', {...})` dengan data
5. Handlebars memproses `bantuan.hbs` dan meng-inject partials
6. Server mengirimkan HTML lengkap + referensi ke static files
7. Browser download CSS/JS dan menampilkan halaman secara utuh

### Kesesuaian dengan Tujuan Jobsheet

Semua tujuan praktikum tercapai:
- Pemahaman Express.js sebagai web framework ✓
- Implementasi routing untuk berbagai halaman ✓
- Penggunaan Handlebars untuk template dinamis ✓
- Organisasi static files yang terstruktur ✓
- Error handling dengan 404 page ✓
- Alur request–response sesuai HTTP protocol ✓

<hr>

<h2 align="center">📸 Dokumentasi Praktikum</h2>

**Screenshot 1 – Halaman Utama (Home)**
<div align="center">
  <img src="Foto/Home.png" width="80%" alt="Halaman Utama">
</div>

<br>

**Screenshot 2 – Halaman Bantuan**
<div align="center">
  <img src="Foto/Bantuan.png" width="80%" alt="Halaman Bantuan">
</div>

<br>

**Screenshot 3 – Halaman Tentang**
<div align="center">
  <img src="Foto/Tentang.png" width="80%" alt="Halaman Tentang">
</div>

<br>

**Screenshot 4 – Halaman Error 404**
<div align="center">
  <img src="Foto/404.png" width="80%" alt="Halaman 404">
</div>

<br>

**Screenshot 5 – Endpoint Info Cuaca (JSON Response)**
<div align="center">
  <img src="Foto/InfoCuaca.png" width="80%" alt="Info Cuaca JSON">
</div>

<hr>

<h2 align="center">🚧 Kendala yang Dihadapi</h2>

Proses praktikum berjalan lancar tanpa kendala signifikan. Express.js dan Handlebars bekerja dengan baik sesuai dokumentasi. Struktur folder yang terorganisir memudahkan pengelolaan route, template, dan static files. Implementasi dapat diselesaikan dengan baik berkat pemahaman yang jelas tentang konsep web server dan alur request–response.

<hr>

<h2 align="center">📝 Kesimpulan</h2>

<div align="center">
  <table width="90%">
    <tr>
      <td>

Melalui pelaksanaan Jobsheet 5, aku memperoleh pemahaman mendalam mengenai Express.js sebagai framework web server dan bagaimana menerapkannya dalam konteks pemrograman jaringan. Praktikum ini menunjukkan bagaimana HTTP request dari klien (browser) diproses oleh server Express, dirutingkan ke handler yang tepat, dan dikembalikan sebagai respons HTML yang dinamis melalui templating engine Handlebars. Pemisahan antara logic (routing), presentasi (templates), dan aset statis membuat kode lebih terorganisir dan scalable, yang merupakan best practice dalam pengembangan web modern.

Secara lebih spesifik, aku dapat melihat peran penting Express.js dalam memfasilitasi komunikasi client–server berbasis HTTP. Dengan fitur routing yang fleksibel, Express memungkinkan developer mendefinisikan berbagai endpoint yang merespons request berbeda. Integrasi dengan Handlebars menunjukkan bagaimana templating engine memisahkan logic aplikasi dari presentasi, sehingga halaman dapat dirender secara dinamis berdasarkan data yang diterima dari server. Pengalaman praktikum ini menjadi fondasi penting untuk memahami arsitektur web modern dan memperdalam kemampuan dalam membangun aplikasi jaringan yang lebih kompleks pada praktikum-praktikum selanjutnya.

  </td>
</tr>
  </table>
</div>

---

<p align="center">
  <a href="../README.md"><img alt="Kembali" src="https://img.shields.io/badge/←%20KEMBALI%20KE%20HALAMAN%20UTAMA-6c757d?style=for-the-badge" width="300"></a>
</p>

<p align="center">
  <em>Dokumentasi Praktikum Pemrograman Jaringan</em><br>
  <small>Kesimpulan Pelaksanaan Jobsheet 5</small>
</p>
