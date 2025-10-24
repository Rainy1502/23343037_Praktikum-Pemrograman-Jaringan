/*
    Nama             : Fattan Naufan Islami
    NIM              : 23343037
    Program Studi    : Informatika
*/

import fs from 'fs'
import chalk from 'chalk'

export const ambilCatatan = () => {
  return 'Ini Catatan Fattan Naufan Islami...'
}

export const tambahCatatan = (judul, isi) => {
  const catatan = muatCatatan()

  const catatanGanda = catatan.filter((note) => note.judul === judul)

  if (catatanGanda.length === 0) {
    catatan.push({ judul, isi })
    simpanCatatan(catatan)
    console.log(chalk.green.inverse('✅ Catatan baru ditambahkan!'))
  } else {
    console.log(chalk.red.inverse('⚠️ Judul catatan telah dipakai!'))
  }
}

const simpanCatatan = (catatan) => {
  const dataJSON = JSON.stringify(catatan)
  fs.writeFileSync('catatan.json', dataJSON)
}

const muatCatatan = () => {
  try {
    const dataBuffer = fs.readFileSync('catatan.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
  } catch (e) {
    return []
  }
}

export const hapusCatatan = (judul) => {
  const catatan = muatCatatan()
  const catatanUntukDisimpan = catatan.filter((note) => note.judul !== judul)

  if (catatan.length > catatanUntukDisimpan.length) {
    console.log(chalk.green.inverse('Catatan dihapus!'))
    simpanCatatan(catatanUntukDisimpan)
  } else {
    console.log(chalk.red.inverse('Catatan tidak ditemukan!'))
  }
}

export const listCatatan = () => {
  const catatan = muatCatatan()
  console.log(chalk.blue.inverse('📘 Daftar Catatan:'))
  catatan.forEach((note, index) => {
    console.log(`${index + 1}. ${note.judul}`)
  })
}

export const bacaCatatan = (judul) => {
  const catatan = muatCatatan()
  const note = catatan.find((note) => note.judul === judul)

  if (note) {
    console.log(chalk.yellow.inverse(`📖 ${note.judul}`))
    console.log(note.isi)
  } else {
    console.log(chalk.red.inverse('❌ Catatan tidak ditemukan!'))
  }
}