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
  <em style="font-size: 1.1em;">Jobsheet 8 – MongoDB and Database Server</em>
</p>

<p align="center">
  <small>MongoDB • NoSQL • CRUD Operations • Database Server</small>
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
  <li>Memahami MongoDB sebagai database server NoSQL dan arsitekturnya dalam sistem jaringan</li>
  <li>Mempelajari konsep document-oriented database dan perbedaannya dengan relational database</li>
  <li>Mengimplementasikan operasi CRUD (Create, Read, Update, Delete) menggunakan MongoDB driver untuk Node.js</li>
  <li>Memahami struktur data dalam MongoDB: collection, document, dan field</li>
  <li>Melakukan koneksi database server dari aplikasi Node.js dan manipulasi data secara programmatic</li>
  <li>Menganalisis alur data dalam sistem client-server dengan database backend</li>
</ul>

<hr>

<h2 align="center">🌐 Konsep yang Digunakan</h2>

### Database Server dalam Sistem Jaringan
Database server adalah komponen penting dalam arsitektur aplikasi jaringan yang mengelola penyimpanan dan pengambilan data. Server ini mendengarkan request dari client (aplikasi) melalui koneksi TCP/IP dan mengembalikan data yang diminta.

### NoSQL dan MongoDB
MongoDB adalah NoSQL database yang menyimpan data dalam format **document** (mirip JSON) bukan dalam bentuk tabel relasional. Karakteristik MongoDB:
- **Flexible Schema:** Tidak memerlukan struktur tabel yang rigid
- **Document-Oriented:** Setiap record adalah document yang dapat memiliki struktur berbeda
- **Scalability:** Dirancang untuk horizontal scaling
- **JSON-like Format:** Data disimpan dalam BSON (Binary JSON) yang mudah dipahami programmer

### Collection dan Document
- **Collection:** Kumpulan documents, mirip dengan "tabel" dalam SQL database
- **Document:** Record data yang disimpan dalam format JSON/BSON, mirip dengan "row" dalam SQL

Contoh struktur:
```
Database: task-manager
├── Collection: pengguna
│   ├── Document 1: { _id: ObjectId, nama: "Fattan", usia: 20 }
│   ├── Document 2: { _id: ObjectId, nama: "Islami", usia: 21 }
│   └── ...
├── Collection: tugas
│   ├── Document 1: { _id: ObjectId, Deskripsi: "Membersihkan", StatusPenyelesaian: true }
│   └── ...
```

### Operasi CRUD
**Create (INSERT):**
- `insertOne()` – Memasukkan satu document
- `insertMany()` – Memasukkan banyak documents sekaligus

**Read (QUERY):**
- `find()` – Mencari documents dengan filter tertentu
- `findOne()` – Mencari document pertama yang match

**Update (MODIFY):**
- `updateOne()` – Update satu document
- `updateMany()` – Update banyak documents
- `replaceOne()` – Replace document secara keseluruhan

**Delete (REMOVE):**
- `deleteOne()` – Hapus satu document
- `deleteMany()` – Hapus banyak documents

### Koneksi Database dari Node.js
MongoDB driver untuk Node.js memungkinkan aplikasi:
1. Koneksi ke MongoDB server (lokal atau remote)
2. Select database dan collection
3. Eksekusi operasi CRUD
4. Menangani error dan menutup koneksi

<hr>

<h2 align="center">⚙️ Implementasi Praktikum</h2>

### Setup MongoDB

**Koneksi Database:**
```javascript
const { MongoClient } = require('mongodb');
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);
const namaDatabase = 'task-manager';
```

Database dapat dijalankan:
- **Lokal:** MongoDB running di mesin sendiri (localhost:27017)
- **Cloud:** MongoDB Atlas untuk development dan production

### Struktur Script CRUD dalam task-manager

| Script | Fungsi | Operasi |
|--------|--------|---------|
| `insertDocument.js` | Menambah data baru ke collection | CREATE |
| `readDocument.js` | Mengambil dan menampilkan data | READ |
| `updateDocument.js` | Mengubah data yang sudah ada | UPDATE |
| `deleteDocument.js` | Menghapus data dari collection | DELETE |
| `createDummy.js` | Membuat data dummy untuk testing | CREATE |
| `challenge.js` | Challenge pertama: manipulasi data kompleks | CRUD |
| `challenge2.js` | Challenge kedua: query dan aggregasi | READ |

### Alur Kerja Praktikum

**1. Koneksi ke Database:**
```javascript
await client.connect();
const db = client.db(namaDatabase);
const collection = db.collection('pengguna');
```

**2. Eksekusi Operasi CRUD:**
```javascript
// INSERT
const result = await collection.insertOne({ nama: 'Fattan', usia: 20 });

// READ
const data = await collection.find({}).toArray();

// UPDATE
await collection.updateOne({ _id: id }, { $set: { usia: 21 } });

// DELETE
await collection.deleteOne({ _id: id });
```

**3. Error Handling dan Cleanup:**
```javascript
try {
  // Operasi database
} catch (error) {
  console.error('Error:', error);
} finally {
  await client.close();
}
```

### Script CRUD Explanation

#### insertDocument.js
- Membuat ObjectId baru dan menampilkan properties-nya (timestamp, hex string)
- Insert satu document ke collection `pengguna`: `{ _id, nama, usia }`
- Insert banyak documents ke collection `tugas` dengan field: `Deskripsi`, `StatusPenyelesaian`
- Menampilkan result dari insert operation (acknowledged, insertedIds)

#### readDocument.js
- Query semua data dari collection `pengguna` dan `tugas`
- Menampilkan hasil dalam format readable
- Demonstrasi filter/projection query

#### updateDocument.js
- Update document di collection `pengguna`: mengubah field `usia`
- Update document di collection `tugas`: mengubah field `StatusPenyelesaian`
- Menggunakan `updateOne()` dengan filter `_id` dan operator `$set`

#### deleteDocument.js
- Menghapus document berdasarkan filter criteria
- Menampilkan deleteCount untuk verifikasi

#### Challenge Scripts
- **challenge.js:** Update semua data pengguna dengan nama unik dari list
- **challenge2.js:** Query kompleks dan aggregasi data

<hr>

<h2 align="center">📊 Hasil dan Pembahasan</h2>

### Keberhasilan Eksekusi CRUD

Semua operasi CRUD berhasil dieksekusi dengan baik. Data berhasil disimpan, diambil, diubah, dan dihapus dari MongoDB server dengan hasil yang konsisten.

### Aspek-Aspek yang Diimplementasikan

**1. Connection Management**
- Koneksi ke MongoDB server berhasil terbentuk
- Database `task-manager` otomatis dibuat saat insert pertama
- Koneksi ditutup dengan baik setelah operasi selesai

**2. Document Creation (INSERT)**
- `insertOne()` berhasil membuat document baru dengan field lengkap
- `insertMany()` berhasil memasukkan multiple documents sekaligus
- MongoDB otomatis generate `_id` jika tidak disediakan

**3. Data Retrieval (READ)**
- `find()` berhasil mengambil semua documents dari collection
- Query dengan filter (e.g., `{ nama: "Fattan" }`) bekerja dengan baik
- Data ditampilkan dalam format array of objects

**4. Data Modification (UPDATE)**
- `updateOne()` berhasil mengubah field dalam document
- Operator `$set` bekerja untuk selective field update
- Multiple documents dapat di-update dengan criteria yang sama

**5. Data Removal (DELETE)**
- `deleteOne()` dan `deleteMany()` berhasil menghapus documents
- Deletion mengikuti filter yang ditentukan dengan akurat

**6. Challenge Execution**
- Challenge.js berhasil melakukan bulk update dengan nama unik
- Challenge2.js berhasil melakukan query dan aggregation kompleks

### Analisis Alur Data dalam Database Server

Ketika script dijalankan:
```
Node.js Application
    ↓ (TCP connection)
MongoDB Server (localhost:27017)
    ↓ (query execution)
    ↓ (data manipulation)
    ↓ (result returned)
Node.js Application (receives result)
    ↓ (display/process)
Console Output
```

Setiap operasi:
1. Aplikasi Node.js mengirim query ke MongoDB server
2. Server memproses query (find, insert, update, delete)
3. Server mengembalikan result object dengan metadata (acknowledged, insertedCount, modifiedCount, deletedCount)
4. Node.js memproses result dan menampilkan ke console

### Konsistensi Data

Database memastikan consistency:
- Setiap document memiliki unique `_id`
- Update dan delete menggunakan criteria yang jelas
- Transaksi operations dijamin atomic

### Kesesuaian dengan Tujuan Jobsheet

Semua tujuan praktikum tercapai:
- Pemahaman MongoDB sebagai NoSQL database server ✓
- Konsep document-oriented dan flexible schema dipahami ✓
- CRUD operations diimplementasikan dan dijalankan ✓
- Koneksi database dari Node.js berhasil dilakukan ✓
- Alur client-server dengan database backend dipahami ✓

<hr>

<h2 align="center">📸 Dokumentasi Praktikum</h2>

**Screenshot 1 – Insert Document (Script Execution)**
<div align="center">
  <img src="Foto/insertDocument.png" width="80%" alt="Insert Document Script">
</div>

<br>

**Screenshot 2 – Insert Document (Hasil Output)**
<div align="center">
  <img src="Foto/Hasil_insertDocument1.png" width="80%" alt="Hasil Insert">
</div>

<br>

**Screenshot 3 – Read Document**
<div align="center">
  <img src="Foto/updateDocument_pengguna.png" width="80%" alt="Read Document">
</div>

<br>

**Screenshot 4 – Update Document Pengguna**
<div align="center">
  <img src="Foto/Hasil_updateDocument_pengguna.png" width="80%" alt="Update Pengguna">
</div>

<br>

**Screenshot 5 – Update Document Tugas**
<div align="center">
  <img src="Foto/Hasil_updateDocument_tugas.png" width="80%" alt="Update Tugas">
</div>

<br>

**Screenshot 6 – Challenge 1 Execution**
<div align="center">
  <img src="Foto/Challenge1.png" width="80%" alt="Challenge 1">
</div>

<br>

**Screenshot 7 – Delete Document**
<div align="center">
  <img src="Foto/Hasil_deleteDocument.png" width="80%" alt="Delete Document">
</div>

<br>

**Screenshot 8 – Challenge 2 Results**
<div align="center">
  <img src="Foto/Challenge2.png" width="80%" alt="Challenge 2">
</div>

<hr>

<h2 align="center">🚧 Kendala yang Dihadapi</h2>

Proses praktikum berjalan lancar dengan beberapa poin pembelajaran:

1. **MongoDB Connection:** Perlu memastikan MongoDB server sudah running sebelum menjalankan scripts. Error koneksi terjadi jika server belum dimulai atau URL salah.

2. **Document Structure:** Memahami bahwa MongoDB tidak memerlukan schema yang rigid memerlukan planning yang baik untuk field naming dan data types agar konsisten.

3. **ObjectId Handling:** ObjectId adalah tipe data spesial MongoDB yang berbeda dari string. Conversion antara ObjectId dan string memerlukan attention khusus dalam query filtering.

4. **Async/Await:** Scripts menggunakan async function dengan try-catch, yang memerlukan pemahaman tentang promise-based programming dalam Node.js.

Kendala-kendala ini berhasil diatasi melalui error handling yang baik dan dokumentasi kode yang jelas.

<hr>

<h2 align="center">📝 Kesimpulan</h2>

<div align="center">
  <table width="90%">
    <tr>
      <td>

Melalui praktikum Jobsheet 8, aku memperoleh pemahaman mendalam tentang MongoDB sebagai database server NoSQL dan bagaimana database server berperan penting dalam sistem aplikasi jaringan. Praktikum ini menunjukkan bahwa database server bukan hanya tentang menyimpan data, tetapi tentang menyediakan interface yang efficient dan reliable untuk aplikasi melakukan operasi data. Dengan mengeksekusi script CRUD secara langsung terhadap MongoDB, aku dapat melihat bagaimana operasi database bekerja di level yang fundamental. Perbedaan antara document-oriented database (MongoDB) dan relational database memberikan perspektif baru tentang fleksibilitas dalam data modeling, dimana schema dapat berkembang sesuai kebutuhan aplikasi tanpa harus menjalani migration yang kompleks.

Pengalaman mengintegrasikan MongoDB dengan Node.js juga memperjelas bagaimana client-server architecture bekerja di konteks database. Aplikasi Node.js bertindak sebagai client yang mengirim query ke database server, menerima response, dan memproses hasilnya. Pemahaman tentang CRUD operations sebagai fondasi dari setiap backend application menjadi sangat penting, karena aplikasi jaringan modern selalu membutuhkan layer database yang solid dan scalable. Praktikum ini menjadi fondasi essential untuk memahami bagaimana backend systems bekerja, dan skill-skill ini akan aku terapkan dalam pengembangan aplikasi jaringan yang lebih kompleks di praktikum-praktikum selanjutnya.

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
  <small>Kesimpulan Pelaksanaan Jobsheet 8</small>
</p>
