/*
    Nama             : Fattan Naufan Islami
    NIM              : 23343037
    Program Studi    : Informatika
*/

/* 
    -------------------------------------
                Percobaan 1
    -------------------------------------
*/

/*
//Digunakan untuk menulis dan menambahkan file secara sinkron
import fs from 'fs';

fs.writeFileSync('catatan.txt', 'Nama Saya Fattan Naufan Islami')
fs.appendFileSync('catatan.txt', '\nSaya tinggal di Padang')
*/

/* 
    -------------------------------------
                Percobaan 2
    -------------------------------------
*/

/*
// Digunakan untuk membaca file secara sinkron
import catatan from './catatan.js';
const pesan = catatan();
console.log(pesan);
*/

/* 
    -------------------------------------
                Percobaan 3
    -------------------------------------
*/

/*
//Menyimpan hasil dari fungsi catatan ke dalam variabel pesan.

import validator from 'validator';
import catatan from './catatan.js';


const pesan = catatan();
console.log(pesan);
console.log(validator.isURL('https://www.google.com'));
*/

/* 
    -------------------------------------
                Percobaan 4
    -------------------------------------
*/

/*
// Percobaan menggunakan chalk
import chalk from 'chalk';

// Teks biru standar sukses
console.log(chalk.blue('Teks biru standar sukses [nodemon]')); 

// Teks biru tebal sukses
console.log(chalk.blue.bold('Teks biru tebal sukses')); 

// Teks biru tebal dengan latar merah sukses
console.log(chalk.blue.bgRed.bold('Teks biru tebal dengan latar merah sukses')); 

// Gabungan teks biru, teks biasa, dan tanda seru merah
console.log(chalk.blue('Halo') + ' Dunia' + chalk.red('!')); 

// Teks biru tebal dengan latar merah: "Halo Dunia!"
console.log(chalk.blue.bgRed.bold('Halo Dunia!')); 

// Beberapa kata sekaligus dengan warna biru
console.log(chalk.blue('Halo', 'Dunia!', 'Foo', 'Bar', 'Biz', 'Baz')); 

// Teks merah dengan bagian "dunia" bergaris bawah dan latar biru
console.log(chalk.red('Halo', chalk.underline.bgBlue('dunia') + '!')); 

// Teks hijau dengan bagian biru bergaris bawah dan tebal di tengah
console.log(chalk.green('Saya baris hijau ' + chalk.blue.underline.bold('dengan teks biru bergaris bawah') + ' lalu kembali hijau lagi!')); 

// Menampilkan status CPU, RAM, dan DISK dengan warna berbeda
console.log(`CPU: ${chalk.red('90%')} RAM: ${chalk.green('40%')} DISK: ${chalk.yellow('70%')}`); 

// Teks garis bawah dengan warna RGB khusus
console.log(chalk.rgb(123, 45, 67).underline('Teks garis bawah dengan warna RGB baru diketik dengan nodemon')); 

// Teks abu-abu tebal menggunakan kode HEX
console.log(chalk.hex('#DEADED').bold('Teks abu-abu tebal!'));
*/

/* 
    -------------------------------------
                Percobaan 5
    -------------------------------------
*/

/*
// Percobaan mendapatkan input dari pengguna
import ambilCatatan from './catatan.js';

const command = process.argv[5];
console.log(process.argv);
console.log(process.argv[2]);

if (command === 'tambah') {
   console.log('Tambah Catatan');
} else if (command === 'hapus') {
   console.log('Hapus Catatan');
}
*/

/* 
    -------------------------------------
                Percobaan 6
    -------------------------------------
*/

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { tambahCatatan, hapusCatatan, listCatatan, bacaCatatan } from "./catatan.js";

// Kustomisasi versi yargs
yargs(hideBin(process.argv))
    // Kustomisasi versi yargs
    .version('18.0.0')

    // Membuat perintah (command) 'tambah'
    .command({
        command: 'tambah',
        describe: 'Menambahkan sebuah catatan baru',
        builder: {
            judul: {
                describe: 'Judul catatan',
                demandOption: true,
                type: 'string'
            },
            isi: {
                describe: 'Isi catatan',
                demandOption: true,
                type: 'string'
            }
        },
        handler: function(argv) {
            tambahCatatan(argv.judul, argv.isi)
        }
    })

    // Perintah hapus
    .command({
        command: 'hapus',
        describe: 'Menghapus sebuah catatan',
        builder: {
            judul: {
                describe: 'Judul catatan yang akan dihapus',
                demandOption: true,
                type: 'string'
            }
        },
        handler: function(argv) {
            hapusCatatan(argv.judul)
        }
    })

    // Perintah list
    .command({
        command: 'list',
        describe: 'Menampilkan semua catatan',
        handler: () => {
            console.log('📘 Menampilkan semua catatan:')
            listCatatan()
        }
    })

    // Perintah read
    .command({
        command: 'read',
        describe: 'Membaca sebuah catatan',
        builder: {
            judul: {
                describe: 'Judul catatan yang ingin dibaca',
                demandOption: true,
                type: 'string'
            }
        },
        handler: function(argv) {
            bacaCatatan(argv.judul)
        }
    })

    // letakkan bagian ini di pada baris terakhir
    .parse();