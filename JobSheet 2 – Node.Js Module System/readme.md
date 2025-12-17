<p align="left">
  <a href="..">
    <img alt="Kembali" src="https://img.shields.io/badge/←%20KEMBALI-6c757d?style=for-the-badge" width="130">
  </a>
</p>

<div align="center">
  <a href="https://unp.ac.id/">
    <img src="https://unp.ac.id/nfs-assets/all/images/logo_unp_white.png" alt="UNP" width="400"/>
  </a>
</div><br>

<p align="center">
  <strong style="font-size: 1.5em;">PRAKTIKUM PEMROGRAMAN JARINGAN</strong><br>
  <em style="font-size: 1.1em;">Jobsheet 2 – Node.JS Module System</em>
</p>

<p align="center">
  <small>Module System • CommonJS & ES Modules • Modular Programming</small>
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
  <li>Memahami konsep sistem modul pada Node.JS dan perannya dalam organisasi kode</li>
  <li>Mempelajari penggunaan <code>require()</code> dan <code>module.exports</code> untuk eksport dan import modul</li>
  <li>Menerapkan ES6 module syntax (<code>import</code> / <code>export</code>) dalam Node.JS</li>
  <li>Membangun aplikasi yang terstruktur dengan pemisahan logika ke dalam beberapa file modul</li>
  <li>Mengintegrasikan library eksternal melalui package manager (npm)</li>
</ul>

<hr>

<h2 align="center">🌐 Konsep yang Digunakan</h2>

### Pemrograman Modular
Modular programming adalah paradigma dalam pengembangan software yang membagi aplikasi besar menjadi modul-modul kecil yang independen. Setiap modul menangani tanggung jawab spesifik dan dapat digunakan kembali (reusable).

### Sistem Modul Node.JS
Node.JS menyediakan sistem modul yang memungkinkan pemisahan kode antar file:

- **CommonJS**: Menggunakan `require()` untuk import dan `module.exports` untuk export
- **ES6 Modules**: Menggunakan `import`/`export` (diperlukan `"type": "module"` di package.json)

Sistem ini memungkinkan:
- Organisasi kode yang lebih rapi
- Reusabilitas fungsi antar file
- Manajemen dependensi yang lebih baik
- Skalabilitas aplikasi yang lebih tinggi

### Peran dalam Aplikasi Jaringan
Sistem modul adalah fondasi dalam membangun aplikasi jaringan yang scalable. Dengan memisahkan logika bisnis, I/O file, dan komunikasi jaringan ke modul terpisah, aplikasi menjadi lebih mudah dimaintain dan berkembang sesuai kebutuhan.

<hr>

<h2 align="center">⚙️ Implementasi Program</h2>

### Arsitektur Aplikasi

Program yang dibangun adalah aplikasi **Buku Catatan (Notes App)** dengan struktur modular:

```
buku-catatan/
├── app.js              (Main entry point, CLI command handler)
├── catatan.js          (Modul logika bisnis: CRUD operations)
├── catatan.json        (Data persistence dalam JSON)
├── package.json        (Konfigurasi project & dependencies)
└── testsite/           (Testing utilities)
```

### Pembagian Modul dan Fungsinya

**catatan.js (Modul Logika Bisnis)**
Modul ini mengekspor fungsi-fungsi untuk operasi CRUD:
- `tambahCatatan(judul, isi)` – Menambah catatan baru ke file JSON
- `hapusCatatan(judul)` – Menghapus catatan berdasarkan judul
- `listCatatan()` – Menampilkan daftar semua catatan
- `bacaCatatan(judul)` – Membaca isi catatan spesifik
- Helper functions: `simpanCatatan()` dan `muatCatatan()` – Mengelola file JSON

**app.js (Main Application)**
File utama yang:
- Mengimpor fungsi dari modul `catatan.js` menggunakan syntax ES6
- Mengintegrasikan library `yargs` untuk command-line interface
- Menangani command dari user: `tambah`, `hapus`, `list`, `read`
- Menghubungkan input user dengan fungsi di modul catatan

### Alur Komunikasi Antar Modul

```
User Input (CLI)
      ↓
app.js (yargs parser)
      ↓
catatan.js (Fungsi CRUD)
      ↓
catatan.json (Data persistence)
      ↓
Output ke console
```

### Library yang Diintegrasikan

| Library | Fungsi |
|---------|--------|
| **chalk** | Styling output console dengan warna dan format |
| **yargs** | Parsing command-line arguments dan membuat CLI |
| **validator** | Validasi data (URL, email, dll) |
| **nodemon** | Auto-restart aplikasi saat kode berubah (dev tool) |

### Mekanisme Import/Export

Menggunakan **ES6 Module Syntax**:

```javascript
// Di catatan.js - Export fungsi
export const tambahCatatan = (judul, isi) => { ... }
export const hapusCatatan = (judul) => { ... }

// Di app.js - Import fungsi
import { tambahCatatan, hapusCatatan, listCatatan, bacaCatatan } from "./catatan.js"
```

Konfigurasi di `package.json`:
```json
{
  "type": "module"  // Mengaktifkan ES6 Modules di Node.JS
}
```

<hr>

<h2 align="center">📊 Hasil dan Pembahasan</h2>

### Keberhasilan Implementasi Sistem Modul
Sistem modul berhasil diimplementasikan dengan baik. Aplikasi berjalan dengan struktur modular yang jelas, memisahkan logika bisnis (catatan.js) dari interface aplikasi (app.js).

### Output Program

Aplikasi buku catatan mendukung beberapa operasi:

1. **Menambah Catatan**
   ```
   node app.js tambah --judul="Catatan 1" --isi="Isi catatan 1"
   ```
   Output: ✅ Catatan baru ditambahkan!

2. **Daftar Catatan**
   ```
   node app.js list
   ```
   Output: 📘 Daftar Catatan dengan nomor urut

3. **Membaca Catatan**
   ```
   node app.js read --judul="Catatan 1"
   ```
   Output: 📖 Menampilkan judul dan isi catatan

4. **Menghapus Catatan**
   ```
   node app.js hapus --judul="Catatan 1"
   ```
   Output: ✅ Catatan dihapus! atau ❌ Catatan tidak ditemukan!

### Dokumentasi Visual

**Output A.1 – Percobaan 1: File System (Write/Append)**
<div align="center">
  <img src="Foto/OutputA_SubA_Langkah02.png" width="80%" alt="Output A.1">
</div>

<br>

**Output A.2 – Percobaan 2: Module Import/Export**
<div align="center">
  <img src="Foto/OutputA_SubA_Langkah04.png" width="80%" alt="Output A.2">
</div>

<br>

**Output B.1 – Operasi Tambah Catatan**
<div align="center">
  <img src="Foto/OutputB_SubA_Langkah02.png" width="80%" alt="Output B.1">
</div>

<br>

**Output B.2 – Menampilkan Daftar Catatan**
<div align="center">
  <img src="Foto/OutputB_SubE_Langkah03_List.png" width="80%" alt="Output B.2">
</div>

<br>

**Output B.3 – Membaca Catatan Tertentu**
<div align="center">
  <img src="Foto/OutputB_SubE_Langkah03_Read.png" width="80%" alt="Output B.3">
</div>

### Kesesuaian dengan Tujuan

Semua tujuan praktikum tercapai:
- ✓ Pemahaman konsep sistem modul Node.JS terpenuhi
- ✓ Penggunaan ES6 import/export diimplementasikan dengan benar
- ✓ Aplikasi terstruktur dengan pemisahan logika ke modul terpisah
- ✓ Integrasi library eksternal berhasil (chalk, yargs, validator)
- ✓ Aplikasi berfungsi sesuai dengan spesifikasi jobsheet

<hr>

<h2 align="center">🚧 Kendala yang Dihadapi</h2>

Tidak terdapat kendala signifikan selama pelaksanaan praktikum.  
Program berjalan dengan lancar karena:

- Dokumentasi jobsheet lengkap dan jelas
- Library yang digunakan stabil dan well-documented
- Struktur modul dirancang dengan baik sejak awal
- Lingkungan development (Node.JS & npm) berfungsi optimal

<hr>

<h2 align="center">📝 Kesimpulan</h2>

<div align="center">
  <table width="90%">
    <tr>
      <td>

Melalui pelaksanaan praktikum sistem modul Node.JS ini, aku memperoleh pemahaman mendalam tentang pentingnya modular programming dalam pengembangan aplikasi yang scalable dan maintainable. Dengan membangun aplikasi buku catatan yang terstruktur, aku dapat melihat secara langsung bagaimana pemisahan logika bisnis (modul catatan.js) dari interface aplikasi (app.js) membuat kode lebih terorganisir, mudah dibaca, dan mudah dimodifikasi. Praktikum ini menunjukkan bahwa sistem modul bukan hanya tentang mengorganisir kode, tetapi juga tentang membangun fondasi yang kuat untuk aplikasi yang lebih kompleks di masa depan.

<br>

Selain itu, praktikum ini memperkuat pemahaman aku tentang ES6 module syntax dan perannya dalam Node.JS modern development. Dengan mengintegrasikan library eksternal seperti chalk, yargs, dan validator, aku dapat merasakan bagaimana ekosistem npm memfasilitasi pengembangan aplikasi yang lebih cepat dan efisien. Pemahaman ini menjadi fondasi penting untuk mempelajari framework dan arsitektur aplikasi jaringan yang lebih kompleks, di mana organisasi kode modular adalah prasyarat utama. Praktikum ini dinyatakan berhasil dengan tingkat keberhasilan 100%, dan pembelajaran yang diperoleh akan menjadi basis kuat untuk praktikum-praktikum berikutnya dalam pemrograman jaringan.

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
  <small>Kesimpulan Pelaksanaan Jobsheet 2</small>
</p>
