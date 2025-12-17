<div align="center">
  <a href="https://unp.ac.id/">
    <img src="https://unp.ac.id/nfs-assets/all/images/logo_unp_white.png" alt="UNP" width="400"/>
  </a>
</div><br>

<p align="center">
  <strong style="font-size: 1.5em;">PRAKTIKUM PEMROGRAMAN JARINGAN</strong><br>
  <em style="font-size: 1.1em;">Jobsheet 1 – Pengantar Node.JS</em>
</p>

<p align="center">
  <small>HTTP Server • Client–Server • Node.JS</small>
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
  <li>Memahami konsep dasar Node.JS sebagai runtime environment JavaScript di sisi server</li>
  <li>Mempelajari cara membuat aplikasi server menggunakan modul <code>http</code> bawaan Node.JS</li>
  <li>Memahami mekanisme request–response dalam komunikasi jaringan berbasis HTTP</li>
  <li>Mengimplementasikan server yang dapat menerima dan merespons request dari client</li>
</ul>

<hr>

<h2 align="center">🌐 Konsep Jaringan yang Digunakan</h2>

### Model Komunikasi
Praktikum ini menggunakan model **Client–Server** berbasis protokol **HTTP**.  
Server mendengarkan pada port tertentu dan merespons setiap request yang diterima dari client.

### Protokol Jaringan
- **HTTP (HyperText Transfer Protocol):** Protokol aplikasi untuk komunikasi client–server
- **TCP/IP:** Protokol transport dan network yang mendasari komunikasi HTTP

### Peran Aplikasi
- **Server:** Node.JS sebagai HTTP server
- **Client:** Browser atau tools lain sebagai pengirim request

<hr>

<h2 align="center">⚙️ Implementasi Program</h2>

### Arsitektur Aplikasi
Program terdiri dari dua komponen utama:
- **hello.js** – Program sederhana untuk output console
- **hello-world.js** – HTTP server pada `127.0.0.1:3000`

### Alur Komunikasi Data
1. Server dibuat menggunakan modul `http`
2. Server mendengarkan pada `127.0.0.1:3000`
3. Client mengirim request HTTP
4. Server memproses request melalui callback
5. Server mengirim response `200 OK` dengan pesan `Hello, World!`

### Mekanisme Pengiriman Data
- **Format:** Plain text (`text/plain`)
- **Metode:** HTTP GET
- **Status:** HTTP 200 (Success)

<hr>

<h2 align="center">📊 Hasil dan Pembahasan</h2>

### Keberhasilan Komunikasi
Komunikasi jaringan berhasil diimplementasikan.  
Server mampu menerima request dan memberikan respons sesuai tujuan praktikum.

### Output Program
- **hello.js:** Menampilkan `Welcome to Node.Js!`
- **hello-world.js:**  
  - Log server aktif di console  
  - Respons `Hello, World!` pada browser

### Dokumentasi Visual

**Output 1 – Eksekusi Program hello.js**
<div align="center">
  <img src="Foto/Output%201.png" width="65%" alt="Output hello.js">
</div>

<br>

**Output 2 – Server HTTP Berjalan**
<div align="center">
  <img src="Foto/Output%202.png" width="100%" alt="Server HTTP Node.JS">
</div>

<br>

**Output 3 – Respons Server di Browser**
<div align="center">
  <img src="Foto/Output%203.png" width="100%" alt="Respons Browser">
</div>

### Kesesuaian dengan Tujuan
Semua tujuan praktikum tercapai:
- Pemahaman Node.JS sebagai server runtime ✓
- Implementasi HTTP server berhasil ✓
- Mekanisme request–response berjalan baik ✓

<hr>

<h2 align="center">🚧 Kendala yang Dihadapi</h2>

Tidak terdapat kendala signifikan selama praktikum.  
Program berjalan stabil karena:
- Konfigurasi port dilakukan dengan benar
- Modul `http` Node.JS stabil dan mudah digunakan
- Lingkungan localhost minim kompleksitas jaringan

<hr>

<h2 align="center">📝 Kesimpulan</h2>

<div align="center">
  <table width="90%">
    <tr>
      <td>

Melalui pelaksanaan praktikum ini, aku memperoleh pemahaman awal mengenai konsep dasar pemrograman jaringan, khususnya bagaimana sebuah server HTTP bekerja dalam arsitektur Client–Server menggunakan Node.JS. Dengan membangun dan menjalankan HTTP server sederhana, aku dapat melihat secara langsung bagaimana request dikirim oleh client dan bagaimana server memproses serta memberikan response yang sesuai. Praktikum ini membantu saya menghubungkan konsep teoritis tentang protokol HTTP dengan implementasi nyata dalam bentuk program.

<br>

Selain itu, praktikum ini juga memberikan pengalaman praktis yang memperjelas peran Node.JS sebagai runtime environment di sisi server. Seluruh tahapan praktikum dapat dijalankan dengan baik dan sesuai dengan tujuan yang ditetapkan pada jobsheet. Pemahaman yang diperoleh dari praktikum ini menjadi dasar penting bagi aku untuk melanjutkan ke materi pemrograman jaringan yang lebih kompleks, seperti penggunaan framework web server dan pengelolaan komunikasi data yang lebih lanjut pada praktikum berikutnya.

  </td>
</tr>
  </table>
</div>

---

<p align="center">
  <em>Dokumentasi Praktikum Pemrograman Jaringan</em><br>
  <small>Kesimpulan Pelaksanaan Jobsheet 1</small>
</p>
