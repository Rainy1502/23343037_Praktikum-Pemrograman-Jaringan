/*
    Nama             : Fattan Naufan Islami
    NIM              : 23343037
    Program Studi    : Informatika
*/

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import hbs from 'hbs';

// Konversi __dirname (karena di ESM tidak otomatis tersedia)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// =============================
// 🔹 Konfigurasi direktori
// =============================

// Mendefinisikan jalur/path untuk konfigurasi Express
const direktoriPublic = path.join(__dirname, '../public');
const direktoriViews = path.join(__dirname, '../templates/views');
const direktoriPartials = path.join(__dirname, '../templates/partials');


// Setup handlebars engine dan lokasi folder views
app.set('view engine', 'hbs');
app.set('views', direktoriViews);
hbs.registerPartials(direktoriPartials);

// Setup direktori static untuk konten statis
app.use(express.static(direktoriPublic));

// =============================
// 🔹 Halaman-halaman dinamis
// =============================

// Halaman utama
app.get('', (req, res) => {
  res.render('index', {
    judul: 'Aplikasi Cek Cuaca',
    nama: 'Fattan Naufan Islami'
  });
});

// Halaman bantuan / FAQ
app.get('/bantuan', (req, res) => {
  res.render('bantuan', {
    judul: 'Halaman Bantuan',
    teksBantuan: 'Ini adalah teks bantuan',
    nama: 'Fattan Naufan Islami'
  });
});

// Halaman info cuaca
app.get('/infoCuaca', (req, res) => {
  res.json([
    {
      prediksiCuaca: 'Cuaca berpotensi hujan',
      lokasi: 'Padang'
    }
  ]);
});

// Halaman tentang
app.get('/tentang', (req, res) => {
  res.render('tentang', {
    judul: 'Tentang Saya',
    nama: 'Fattan Naufan Islami'
  });
});

// =============================
// 🔹 Wildcard Route (404 handler)
// =============================

// Untuk artikel di dalam /bantuan/xxx
app.get('/bantuan/:artikel', (req, res) => {
  res.render('404', {
    judul: '404',
    nama: 'Fattan Naufan Islami',
    pesanKesalahan: 'Artikel yang dicari tidak ditemukan.'
  });
});

// Untuk semua rute yang tidak ada
app.use((req, res) => {
  res.status(404).render('404', {
    judul: '404',
    nama: 'Fattan Naufan Islami',
    pesanKesalahan: 'Halaman tidak ditemukan.'
  });
});

// =============================
// 🔹 Jalankan server
// =============================
app.listen(4000, () => {
  console.log('Server berjalan pada port 4000.');
});