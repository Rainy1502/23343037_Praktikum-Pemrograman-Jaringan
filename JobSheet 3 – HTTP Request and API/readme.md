<p align="left">
  <a href="../README.md"><img alt="Kembali" src="https://img.shields.io/badge/←%20KEMBALI-6c757d?style=for-the-badge" width="130"></a>
</p>

<div align="center">
  <a href="https://unp.ac.id/">
    <img src="https://unp.ac.id/nfs-assets/all/images/logo_unp_white.png" alt="UNP" width="400"/>
  </a>
</div><br>

<p align="center">
  <strong style="font-size: 1.5em;">PRAKTIKUM PEMROGRAMAN JARINGAN</strong><br>
  <em style="font-size: 1.1em;">Jobsheet 3 – HTTP Request and API</em>
</p>

<p align="center">
  <small>HTTP Request • RESTful API • JSON Data Exchange</small>
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
  <li>Memahami konsep HTTP request dan response dalam komunikasi jaringan berbasis aplikasi</li>
  <li>Mempelajari penggunaan API eksternal untuk mengambil data dari server remote</li>
  <li>Mengimplementasikan fetch API untuk melakukan HTTP request (GET) ke endpoint API</li>
  <li>Memahami format JSON sebagai media pertukaran data dalam komunikasi jaringan</li>
  <li>Mengolah dan menampilkan respons data dari server API</li>
</ul>

<hr>

<h2 align="center">🌐 Konsep Jaringan yang Digunakan</h2>

### HTTP Request–Response
Praktikum ini menggunakan model **HTTP Request–Response** untuk berkomunikasi dengan API eksternal. Client (aplikasi Node.JS) mengirimkan HTTP GET request ke server API, dan server merespons dengan data dalam format JSON.

### RESTful API
API yang digunakan adalah **RESTful API** berbasis HTTP dengan karakteristik:
- **Method:** GET (mengambil data)
- **Endpoint:** URL yang mengarah ke layanan spesifik
- **Query Parameters:** Parameter tambahan dalam URL untuk spesifikasi request
- **Response Format:** JSON (JavaScript Object Notation)

### Peran Client dan Server
- **Client:** Aplikasi Node.JS yang mengirimkan request ke API eksternal
- **Server API:** Layanan eksternal (weatherstack) yang menyediakan data cuaca
- **Protocol:** HTTPS untuk komunikasi aman dan terenkripsi

<hr>

<h2 align="center">⚙️ Implementasi Program</h2>

### Arsitektur Komunikasi

```
Client (Node.JS App)
      ↓
HTTPS GET Request + API Key + Query Parameters
      ↓
Server API (weatherstack)
      ↓
JSON Response (Temperature, Precipitation, Weather Description, dll)
      ↓
Client Parse & Display Data
```

### Endpoint dan Parameter

**API Cuaca (Weatherstack):**
```
http://api.weatherstack.com/current?
  access_key=<API_KEY>&
  query=<LATITUDE>,<LONGITUDE>&
  units=m
```

Komponen:
- `access_key` – Kunci autentikasi untuk mengakses API
- `query` – Koordinat lokasi (latitude, longitude)
- `units=m` – Satuan metrik (Celsius, km/h, mm)

### Alur Request dan Response

**1. Client membuat HTTP Request:**
```javascript
const url = 'http://api.weatherstack.com/current?...'
fetch(url)
```

**2. Fetch API mengirim GET request ke server:**
- HTTP Method: GET
- Target: weatherstack API endpoint
- Header dan payload disertakan otomatis

**3. Server API memproses request:**
- Validasi API key
- Query data cuaca berdasarkan koordinat
- Mengumpulkan data (suhu, presipitasi, deskripsi cuaca, dll)

**4. Server mengirim HTTP Response:**
- Status code: 200 OK
- Content-Type: application/json
- Body: JSON object berisi data cuaca

**5. Client menerima dan memproses response:**
```javascript
.then(response => response.json())  // Parse JSON
.then(data => {
  // Akses data suhu, presipitasi, deskripsi cuaca
  console.log(data.current.temperature)
})
```

### Struktur JSON Response

Response dari API cuaca berstruktur seperti:
```json
{
  "current": {
    "temperature": 28,
    "precip": 15,
    "weather_descriptions": ["Partly cloudy"],
  }
}
```

Data diakses melalui nested property access: `data.current.temperature`

### Percobaan dalam Jobsheet

**Percobaan 1:** Request sederhana ke API cuaca, menampilkan suhu

**Percobaan 2:** Dual request ke dua API berbeda (weatherstack + geocoding), memproses data gabungan

**Percobaan 3:** Request dengan parameter dinamis menggunakan template string dan `encodeURIComponent()`

<hr>

<h2 align="center">📊 Hasil dan Pembahasan</h2>

### Keberhasilan Komunikasi HTTP

Komunikasi HTTP berhasil diimplementasikan. Aplikasi dapat melakukan request ke API eksternal dan menerima respons JSON dengan data yang valid dan terolah.

### Output Program

Aplikasi menampilkan:
- Suhu saat ini dalam satuan Celsius
- Persentase kemungkinan hujan
- Deskripsi kondisi cuaca
- Data lokasi (nama tempat, tipe lokasi, koordinat)

**Contoh Output:**
```
Saat ini suhu diluar mencapai 28 derajat celcius. 
Kemungkinan terjadinya hujan adalah 15%.
Deskripsi cuaca: Partly cloudy
```

### Dokumentasi Visual

**Output A.1 – Percobaan 1: Request Sederhana**
<div align="center">
  <img src="Foto/OutputA_SubA_Langkah02.png" width="80%" alt="Percobaan 1">
</div>

<br>

**Output A.2 – Dual Request (Cuaca + Geocoding)**
<div align="center">
  <img src="Foto/OutputA_SubB_Langkah06_1.png" width="80%" alt="Dual Request">
</div>

<br>

**Output A.3 – Data Cuaca dengan Unit Berbeda**
<div align="center">
  <img src="Foto/OutputA_SubB_Langkah15_Celsius.png" width="80%" alt="Satuan Celsius">
</div>

<br>

**Output A.4 – Request Dinamis dengan Parameter**
<div align="center">
  <img src="Foto/OutputA_SubC_Langkah03.png" width="80%" alt="Request Dinamis">
</div>

### Kesesuaian dengan Tujuan

Semua tujuan praktikum tercapai:
- ✓ Pemahaman HTTP request–response untuk komunikasi aplikasi
- ✓ Implementasi fetch API untuk request ke endpoint eksternal
- ✓ Penggunaan JSON sebagai format data pertukaran
- ✓ Pengolahan dan display respons data dari server API
- ✓ Pengelolaan parameter request untuk spesifikasi data

<hr>

<h2 align="center">🚧 Kendala yang Dihadapi</h2>

Tidak terdapat kendala signifikan selama praktikum. Program berjalan dengan baik karena:

- API weatherstack stabil dan responsif
- Format JSON mudah diparsing menggunakan JavaScript
- Fetch API terintegrasi baik dengan Node.JS
- Koordinat lokasi dan parameter request dikonfigurasi dengan benar
- Network connectivity normal tanpa masalah koneksi

<hr>

<h2 align="center">📝 Kesimpulan</h2>

<div align="center">
  <table width="90%">
    <tr>
      <td>

Melalui pelaksanaan praktikum HTTP Request and API ini, aku memperoleh pemahaman mendalam tentang bagaimana aplikasi dapat berkomunikasi dengan server remote melalui HTTP request untuk mengambil data. Dengan mengimplementasikan aplikasi cuaca yang melakukan request ke API weatherstack, aku dapat melihat secara langsung alur perjalanan data dari client ke server dan sebaliknya. Praktikum ini menunjukkan pentingnya pemahaman protokol HTTP, struktur API, dan format JSON dalam membangun aplikasi jaringan modern yang dapat berinteraksi dengan layanan eksternal.

<br>

Selain itu, pengalaman praktik ini memperkuat pemahaman aku tentang bagaimana data ditukar antar aplikasi melalui jaringan komputer. Fetch API membuatnya mudah untuk melakukan HTTP request tanpa kompleksitas konfigurasi yang berlebihan, sehingga focus dapat tetap pada logika aplikasi. Pembelajaran ini menjadi fondasi penting untuk memahami ekosistem API yang luas di internet, dan memberikan bekal untuk melanjutkan ke praktikum berikutnya yang mungkin melibatkan pembuatan server sendiri atau integrasi dengan API yang lebih kompleks.

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
  <small>Kesimpulan Pelaksanaan Jobsheet 3</small>
</p>
