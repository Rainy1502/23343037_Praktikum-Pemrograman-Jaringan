# JobSheet 1: Pengantar Node.JS

**Topik Utama:** Pengenalan lingkungan Node.JS dan HTTP Server  
**Pendekatan Jaringan:** Protokol HTTP dengan arsitektur Client–Server

---

## Tujuan Praktikum

1. Memahami konsep dasar Node.JS sebagai runtime environment JavaScript di sisi server
2. Mempelajari cara membuat aplikasi server menggunakan modul `http` bawaan Node.JS
3. Memahami mekanisme request–response dalam komunikasi jaringan berbasis HTTP
4. Mengimplementasikan server yang dapat menerima dan merespons request dari client

---

## Konsep Jaringan yang Digunakan

### Model Komunikasi
Praktikum ini menggunakan model **Client–Server** berbasis protokol **HTTP**. Server mendengarkan pada port tertentu dan merespons setiap request yang diterima dari client dengan pesan atau konten yang sesuai.

### Protokol Jaringan
- **HTTP (HyperText Transfer Protocol):** Protokol aplikasi yang digunakan untuk komunikasi antara client dan server melalui jaringan komputer
- **TCP/IP:** Layer transport dan network yang mendasari komunikasi HTTP

### Peran Aplikasi
- **Server:** Node.JS berperan sebagai HTTP server yang menerima request dari client
- **Client:** Browser atau tools seperti curl yang mengirimkan request ke server

---

## Implementasi Program

### Arsitektur Aplikasi

Program terdiri dari dua komponen utama:

1. **hello.js** – Program sederhana yang menampilkan pesan ke console tanpa melibatkan jaringan
2. **hello-world.js** – HTTP server yang mendengarkan pada `127.0.0.1:3000`

### Alur Komunikasi Data

**Pada hello-world.js:**

1. Server dibuat menggunakan modul `http` built-in Node.JS
2. Server dikonfigurasi untuk mendengarkan pada alamat lokal `127.0.0.1` port `3000`
3. Ketika client mengirimkan request HTTP ke server, callback function dijalankan
4. Server merespons dengan status code `200` (OK) dan header `Content-Type: text/plain`
5. Respons berisi teks `Hello, World!` yang dikirimkan kembali ke client

### Mekanisme Pengiriman Data

- **Format Data:** Plain text (`text/plain`)
- **Metode Pengiriman:** HTTP GET request (default ketika mengakses URL di browser)
- **Status Respons:** HTTP 200 (Successful)

---

## Hasil dan Pembahasan

### Keberhasilan Komunikasi Jaringan

Komunikasi jaringan berhasil diimplementasikan. Server dapat menerima request dari client dan memberikan respons yang tepat.

### Output Program

- **hello.js:** Menampilkan pesan `Welcome to Node.Js!` di console
- **hello-world.js:** 
  - Server menampilkan log `Server running at http://127.0.0.1:3000/` saat startup
  - Ketika client mengakses URL tersebut, server merespons dengan pesan `Hello, World!`

### Dokumentasi Foto Output

#### Output 1: Eksekusi Program hello.js
![Output 1](Foto/Output%201.png)

#### Output 2: Server HTTP Berjalan
![Output 2](Foto/Output%202.png)

#### Output 3: Respons Server di Browser
![Output 3](Foto/Output%203.png)

### Kesesuaian dengan Tujuan

Semua tujuan praktikum telah tercapai:
- ✓ Pemahaman dasar Node.JS sebagai server runtime
- ✓ Implementasi HTTP server menggunakan modul `http`
- ✓ Mekanisme request–response berfungsi dengan baik
- ✓ Server dapat menerima dan membalas request dari client

---

## Kendala yang Dihadapi

Tidak terdapat kendala signifikan selama pelaksanaan praktikum. Program berjalan sesuai harapan tanpa error atau masalah koneksi yang berarti. Hal ini dimungkinkan karena:

1. Konfigurasi port dilakukan dengan benar
2. Modul `http` Node.JS cukup stabil dan straightforward untuk digunakan
3. Lingkungan pengembangan (localhost) tidak memiliki kompleksitas jaringan eksternal

---

## Kesimpulan

1. **Pemahaman Pemrograman Jaringan:** Praktikum berhasil memberikan pemahaman fundamental tentang bagaimana server HTTP bekerja dan cara Node.JS digunakan untuk membangun aplikasi jaringan.

2. **Kesesuaian Teori dan Implementasi:** Implementasi kode sesuai dengan konsep teoritis model Client–Server dan protokol HTTP. Mekanisme request–response berfungsi dengan sempurna.

3. **Tingkat Keberhasilan:** Praktikum dinyatakan berhasil dengan tingkat keberhasilan 100%. Kedua program (hello.js dan hello-world.js) berfungsi sesuai dengan tujuan praktikum yang telah ditetapkan.

4. **Pembelajaran Lanjutan:** Fondasi yang diperoleh dari praktikum ini menjadi dasar untuk mempelajari framework web server seperti Express.JS dan mekanisme komunikasi jaringan yang lebih kompleks pada praktikum berikutnya.