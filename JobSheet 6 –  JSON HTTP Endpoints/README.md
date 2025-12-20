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
  <em style="font-size: 1.1em;">Jobsheet 6 – JSON HTTP Endpoints</em>
</p>

<p align="center">
  <small>REST API • JSON Response • HTTP Query Parameters • External API Integration</small>
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
  <li>Memahami konsep REST API dan penggunaan HTTP methods untuk operasi data</li>
  <li>Mengimplementasikan endpoint yang mengembalikan response dalam format JSON</li>
  <li>Menangani query parameters dari HTTP request untuk filter dan pencarian data</li>
  <li>Melakukan validasi input dan error handling berbasis JSON</li>
  <li>Mengintegrasikan layanan API eksternal dengan aplikasi Express.js</li>
  <li>Memisahkan logika bisnis ke dalam utility modules untuk code reusability</li>
  <li>Memahami alur komunikasi client–server berbasis JSON dalam konteks RESTful API</li>
</ul>

<hr>

<h2 align="center">🌐 Konsep Jaringan yang Digunakan</h2>

### REST API (Representational State Transfer)
REST adalah paradigma arsitektur untuk merancang layanan web yang scalable. Dalam praktikum ini, endpoint dirancang mengikuti prinsip REST: menggunakan HTTP methods (GET, POST) dan URL path yang semantik untuk mengidentifikasi resources.

### JSON sebagai Format Pertukaran Data
JSON (JavaScript Object Notation) digunakan sebagai format standard untuk request dan response body. Format ini human-readable, lightweight, dan support nesting data kompleks dengan baik.

### HTTP Methods dan Query Parameters
- **GET**: Mengambil data dari server tanpa modifikasi state
- **Query Parameters**: Data dikirim melalui URL query string (misal: `?address=Padang`)
- **Status Codes**: Server merespons dengan HTTP status yang sesuai (200 OK, 400 Bad Request, 500 Server Error)

### External API Integration
Aplikasi mengintegrasikan dua layanan API publik eksternal:
- **Photon (Komoot)**: Layanan geocoding untuk konversi alamat ke koordinat geografis
- **Open-Meteo**: Layanan weather forecast dengan format standardized

### Client–Server Communication Berbasis JSON
Browser/client mengirim request ke server, server memproses dan mengirimkan response JSON yang dapat langsung diparse oleh client untuk digunakan dalam aplikasi.

<hr>

<h2 align="center">⚙️ Implementasi Program</h2>

### Arsitektur REST API

Struktur folder dirancang untuk pemisahan concern yang jelas:

```
web-server/
├── src/
│   ├── app.js                 ← Express app + routing
│   └── utils/                 ← Logika bisnis
│       ├── geocode.js         ← Integrasi API Photon
│       └── prediksiCuaca.js   ← Integrasi API Open-Meteo
├── docs/
│   └── ARCHITECTURE.md        ← Dokumentasi API design
├── public/                    ← Static files
├── templates/                 ← View template
├── .env                       ← Environment variables
├── jest.config.cjs            ← Testing configuration
└── package.json               ← Dependencies
```

### Endpoint REST API

Aplikasi mendefinisikan satu endpoint API utama untuk JSON response:

| Endpoint | Method | Query Params | Response | Fungsi |
|----------|--------|--------------|----------|--------|
| `/infoCuaca` | GET | `address=<lokasi>` | JSON object | Mencari prediksi cuaca berdasarkan alamat |

**Endpoint Detail: `/infoCuaca`**
```javascript
GET /infoCuaca?address=Padang
```

Request ini akan:
1. Validasi parameter `address` (error jika kosong)
2. Memanggil `geocode()` untuk konversi alamat → latitude/longitude
3. Memanggil `forecast()` untuk mendapatkan prediksi cuaca dari koordinat
4. Return response JSON dengan struktur:
```json
{
  "prediksiCuaca": { /* forecast data */ },
  "lokasi": "string nama lokasi",
  "address": "string address yang dicari"
}
```

**Error Handling:**
- Status 400 jika `address` tidak diberikan
- Status 500 jika gagal koneksi ke external API

### Utility Modules: Pemisahan Logika

#### `geocode.js`
**Fungsi**: Konversi alamat tekstual menjadi koordinat geografis (latitude, longitude)

**Implementasi**:
- Menggunakan API Photon (Komoot) sebagai geocoding service
- Caching hasil dengan TTL 10 menit untuk mengurangi request berulang
- Callback-based API: `geocode(address, callback)`
- Return format: `{ latitude, longitude, location }`

**Error Handling**:
- Validasi HTTP response status
- Cache error selama 1 menit untuk avoid rapid retry

#### `prediksiCuaca.js`
**Fungsi**: Mengambil data cuaca dari layanan forecast eksternal

**Implementasi**:
- Menggunakan API Open-Meteo (non-komersial, free tier)
- Caching dengan TTL yang sama untuk consistency
- Callback-based API: `forecast(latitude, longitude, callback)`
- Parsing dan transformasi response dari Open-Meteo ke format lokal

**Error Handling**:
- Graceful fallback untuk missing data
- Negative caching untuk error response

### Alur Request–Response Endpoint API

Ketika user mengakses `/infoCuaca?address=Padang`:

```
1. Browser/Client
   └─> GET /infoCuaca?address=Padang

2. Express Server
   ├─> Parse query parameters
   ├─> Validasi keberadaan address
   └─> Jika valid, lanjut ke step 3

3. Geocode Module
   ├─> Check cache dengan key "padang"
   ├─> Jika miss, fetch dari Photon API
   ├─> Parse response untuk { latitude, longitude, location }
   └─> Return ke route handler

4. Forecast Module
   ├─> Fetch dari Open-Meteo dengan lat/lon
   ├─> Cache hasil
   └─> Parse dan format response

5. Server Response
   └─> Kirim JSON response dengan status 200

6. Client
   └─> Receive JSON, parse, display data
```

### Integration dengan External APIs

**API Photon (Geocoding)**:
- Endpoint: `https://photon.komoot.io/api/?q={address}&limit=1`
- Response: GeoJSON dengan properties lokasi

**API Open-Meteo (Weather Forecast)**:
- Endpoint: `https://api.open-meteo.com/v1/forecast`
- Parameters: latitude, longitude, weather codes
- Response: Hourly/daily weather data

### Environment Variables (.env)

File `.env` menyimpan konfigurasi sensitif (PORT, API keys jika ada):
```
PORT=4000
```

**Catatan**: File `.env` tidak dicommit untuk security. Template tersedia di `.env.example`.

<hr>

<h2 align="center">📊 Hasil dan Pembahasan</h2>

### Keberhasilan Implementasi

API endpoint berfungsi dengan baik dan mengembalikan response JSON yang konsisten. Integrasi dengan layanan API eksternal berhasil dilakukan dengan proper error handling dan caching mechanism.

### Aspek-Aspek yang Diuji

**1. Validasi Query Parameters**
- Request tanpa parameter `address` ditolak dengan status 400 dan pesan error JSON
- Request dengan parameter valid diproses dengan baik

**2. Integration dengan External APIs**
- Photon API berhasil mengkonversi alamat ke koordinat geografis
- Open-Meteo API berhasil mengambil data cuaca berdasarkan latitude/longitude
- Response dari kedua API berhasil di-parse dan di-format menjadi respons JSON yang konsisten

**3. JSON Response Format**
- Response memiliki struktur yang konsisten: `{ prediksiCuaca, lokasi, address }`
- Data nested di-format dengan rapi dan sesuai konteks
- HTTP status code yang tepat dikirimkan (200, 400, 500)

**4. Error Handling**
- Error dari external API ditangani gracefully
- User mendapatkan pesan error yang informatif dalam format JSON
- Server tidak crash dan terus melayani request berikutnya

**5. Caching Mechanism**
- Cache mengurangi beban ke external API
- TTL 10 menit untuk success response, 1 menit untuk error
- Menghindari rate-limiting dari service provider

### Analisis Alur Request–Response JSON

Request example:
```
GET /infoCuaca?address=Padang HTTP/1.1
Host: localhost:4000
```

Response success example:
```json
HTTP/1.1 200 OK
Content-Type: application/json

{
  "prediksiCuaca": {
    "deskripsi": "Cerah dengan suhu 28°C",
    ...
  },
  "lokasi": "Padang, Indonesia",
  "address": "Padang"
}
```

Response error example:
```json
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "error": "Kamu harus memasukkan lokasi yang ingin dicari"
}
```

### Kesesuaian dengan Tujuan Jobsheet

Semua tujuan praktikum tercapai:
- Konsep REST API dipahami dan diimplementasikan ✓
- Endpoint mengembalikan response JSON yang terstruktur ✓
- Query parameters divalidasi dan diproses ✓
- Error handling berbasis JSON diimplementasikan ✓
- Utility modules memisahkan logika dengan baik ✓
- Integrasi API eksternal berhasil dilakukan ✓
- Alur komunikasi client–server berbasis JSON berjalan optimal ✓

<hr>

<h2 align="center">📸 Dokumentasi Praktikum</h2>

**Screenshot 1 – Halaman Utama (Home)**
<div align="center">
  <img src="Foto/Home.png" width="80%" alt="Halaman Utama">
</div>

<br>

**Screenshot 2 – API Response: Info Cuaca Padang**
<div align="center">
  <img src="Foto/infoCuaca_Padang.png" width="80%" alt="API Response Padang">
</div>

<br>

**Screenshot 3 – API Response: Info Cuaca Jakarta**
<div align="center">
  <img src="Foto/infoCuaca_Jakarta.png" width="80%" alt="API Response Jakarta">
</div>

<br>

**Screenshot 4 – Halaman Web dengan Display Cuaca**
<div align="center">
  <img src="Foto/Home_Cuaca Padang.png" width="80%" alt="Home dengan Cuaca">
</div>

<br>

**Screenshot 5 – Halaman Bantuan (FAQ)**
<div align="center">
  <img src="Foto/Bantuan.png" width="80%" alt="Halaman Bantuan">
</div>

<br>

**Screenshot 6 – Halaman Error 404**
<div align="center">
  <img src="Foto/404.png" width="80%" alt="Halaman 404">
</div>

<hr>

<h2 align="center">🚧 Kendala yang Dihadapi</h2>

Proses implementasi berjalan lancar dengan beberapa poin pembelajaran:

1. **Rate Limiting pada External APIs**: Terpaksa mengimplementasikan caching mechanism untuk menghindari excessive requests ke layanan publik yang memiliki rate limit.

2. **Async Handling**: Penggunaan callback-based async functions memerlukan careful handling untuk menghindari callback hell. Struktur kode tetap readable dengan comments yang jelas.

3. **API Response Variability**: Setiap external API memiliki format response yang berbeda, sehingga diperlukan parsing dan transformation yang careful untuk menghasilkan format konsisten ke client.

Kendala-kendala ini berhasil diatasi dengan solusi yang sesuai best practices.

<hr>

<h2 align="center">📝 Kesimpulan</h2>

<div align="center">
  <table width="90%">
    <tr>
      <td>

Melalui praktikum Jobsheet 6, aku memperoleh pemahaman yang mendalam tentang REST API dan bagaimana mengimplementasikannya menggunakan Express.js dengan JSON sebagai format pertukaran data. Praktikum ini menunjukkan bahwa REST API bukan hanya tentang membuat endpoint, tetapi tentang merancang komunikasi yang jelas dan konsisten antara client dan server. Dengan mengintegrasikan layanan API eksternal (Photon untuk geocoding dan Open-Meteo untuk weather forecast), aku dapat melihat bagaimana aplikasi modern mengkombinasikan berbagai sumber data untuk memberikan nilai tambah kepada user. JSON sebagai format response memungkinkan client dengan berbagai platform (web, mobile, desktop) dapat mengkonsumsi data yang sama dengan cara yang efisien dan standardized.

Pengalaman menangani error handling berbasis JSON, implementasi caching untuk optimisasi, dan pemisahan logika ke utility modules juga mengajarkan pentingnya code organization dan performance consideration dalam pengembangan API. Praktikum ini secara langsung mendemonstrasikan bahwa komunikasi jaringan modern tidak hanya tentang mengirim dan menerima data, tetapi tentang mendesain sistem yang robust, scalable, dan maintainable. Pemahaman dan skill yang diperoleh dari Jobsheet 6 ini menjadi fondasi yang sangat penting untuk mengembangkan aplikasi jaringan yang lebih kompleks dan production-ready pada praktikum-praktikum lanjutan.

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
  <small>Kesimpulan Pelaksanaan Jobsheet 6</small>
</p>
