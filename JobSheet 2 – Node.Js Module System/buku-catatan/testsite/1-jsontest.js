/*
    Nama             : Fattan Naufan Islami
    NIM              : 23343037
    Program Studi    : Informatika
*/

import fs from 'fs'

/* 
    -------------------------------------
                Percobaan 1
    -------------------------------------
*/

/*
const buku = {
  judul: 'Pemrograman Jaringan',
  penulis: 'Fattan Naufan Islami'
}

// Ubah objek ke JSON string
const bukuJSON = JSON.stringify(buku)

// Tulis ke file
fs.writeFileSync('1-jsontest.json', bukuJSON)

console.log('File JSON berhasil dibuat!')
*/

/* 
    -------------------------------------
                Percobaan 2
    -------------------------------------
*/

// Baca file JSON
const dataBuffer = fs.readFileSync('1-jsontest.json')

// Ubah buffer jadi string
const dataJSON = dataBuffer.toString()

// Parse JSON jadi objek JavaScript
const data = JSON.parse(dataJSON)

console.log(data.judul)
