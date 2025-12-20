/*
    Nama             : Fattan Naufan Islami
    NIM              : 23343037
    Program Studi    : Informatika
*/

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import hbs from 'hbs';
import geocode from './utils/geocode.js';
import forecast from './utils/prediksiCuaca.js';

// Konversi __filename / __dirname untuk ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// -----------------------------
// Konfigurasi direktori & view
// -----------------------------
const direktoriPublic = path.join(__dirname, '../public');
const direktoriViews = path.join(__dirname, '../templates/views');
const direktoriPartials = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', direktoriViews);
hbs.registerPartials(direktoriPartials);
app.use(express.static(direktoriPublic));

// -----------------------------
// Route: halaman statis dan API
// -----------------------------

// Halaman utama
app.get('', (req, res) => {
  res.render('index', { judul: 'Strato Nimbus', nama: 'Fattan Naufan Islami' });
});

// Halaman bantuan (FAQ)
app.get('/bantuan', (req, res) => {
  res.render('bantuan', { judul: 'Halaman Bantuan', nama: 'Fattan Naufan Islami' });
});

// Endpoint API: /infoCuaca?address=...
// Mengembalikan JSON konsisten: { prediksiCuaca, lokasi, address }
app.get('/infoCuaca', (req, res) => {
  if (!req.query.address) {
    return res.status(400).send({ error: 'Kamu harus memasukkan lokasi yang ingin dicari' });
  }

  geocode(req.query.address, (error, dataGeocode = {}) => {
    if (error) return res.status(500).send({ error });

    const { latitude, longitude, location } = dataGeocode;

    forecast(latitude, longitude, (error, dataPrediksi) => {
      if (error) return res.status(500).send({ error });

      // Pastikan bentuk respons konsisten (objek prediksi)
      const prediksiWrapped = typeof dataPrediksi === 'string' ? { deskripsi: dataPrediksi } : dataPrediksi;

      res.send({ prediksiCuaca: prediksiWrapped, lokasi: location, address: req.query.address });
    });
  });
});

// Halaman tentang
app.get('/tentang', (req, res) => {
  res.render('tentang', { judul: 'Tentang', nama: 'Fattan Naufan Islami' });
});

// Handler untuk /bantuan/:artikel (contoh fallback spesifik)
app.get('/bantuan/:artikel', (req, res) => {
  res.status(404).render('404', { judul: '404', nama: 'Fattan Naufan Islami', pesanKesalahan: 'Artikel yang dicari tidak ditemukan.' });
});

// Handler 404 umum
app.use((req, res) => {
  res.status(404).render('404', { judul: '404', nama: 'Fattan Naufan Islami', pesanKesalahan: 'Halaman tidak ditemukan.' });
});

// Jalankan server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server berjalan pada port ${PORT}.`);
});