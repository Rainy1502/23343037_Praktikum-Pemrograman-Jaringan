const { MongoClient } = require('mongodb');
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);
const namaDatabase = 'task-manager';

async function main() {
    try {
        await client.connect();
        console.log('✅ Berhasil terhubung ke MongoDB');
        const db = client.db(namaDatabase);
        const collection = db.collection('pengguna');

        // Ambil semua data
        const semuaData = await collection.find({}).toArray();
        console.log(`📊 Menemukan ${semuaData.length} data untuk diupdate`);
        
        // LIST NAMA UNIK LENGKAP (15 nama berbeda)
        const semuaNamaUnik = [
            'Fattan', 'Islami', 'Athif', 'Dolly', 'Anggara',
            'Hasanul', 'Fikri', 'Faza', 'Azka', 'Mahasya',
            'Rizki', 'Farhan', 'Adit', 'Bima', 'Candra'  // Tambahan untuk data ke-11-15
        ];
        
        console.log('\n🔄 MEMPROSES UPDATE:');
        console.log('='.repeat(50));
        
        // Pastikan kita punya cukup nama unik
        if (semuaData.length > semuaNamaUnik.length) {
            console.log(`⚠️  Data (${semuaData.length}) lebih banyak dari nama unik (${semuaNamaUnik.length})`);
            console.log('   Akan menambahkan angka untuk membuat unik');
        }
        
        // Update setiap dokumen
        for (let i = 0; i < semuaData.length; i++) {
            const data = semuaData[i];
            
            // Pilih nama: jika data ≤ 15, pakai nama berbeda semua
            let namaFinal;
            if (i < semuaNamaUnik.length) {
                namaFinal = semuaNamaUnik[i];  // Nama berbeda semua untuk 15 data pertama
            } else {
                // Jika lebih dari 15 data, baru pakai pengulangan dengan angka
                const namaIndex = i % 10; // Kembali ke 10 nama pertama
                namaFinal = `${semuaNamaUnik[namaIndex]}${Math.floor(i / 10) + 1}`;
            }
            
            // Usia unik (mulai dari 20, increment 1)
            const usiaFinal = 20 + i;
            
            await collection.updateOne(
                { _id: data._id },
                { $set: { nama: namaFinal, usia: usiaFinal } }
            );
            
            console.log(`${(i + 1).toString().padEnd(3)} ${data.nama.padEnd(10)} → ${namaFinal.padEnd(12)} (${data.usia} → ${usiaFinal})`);
        }
        
        // Tampilkan hasil akhir
        console.log('\n📋 HASIL AKHIR (SEMUA NAMA BERBEDA):');
        console.log('='.repeat(60));
        const hasil = await collection.find({}).sort({ usia: 1 }).toArray();
        
        hasil.forEach((doc, idx) => {
            const no = idx + 1;
            const status = no <= 15 ? '✅ NAMA UNIK' : '🔢 NAMA+ANGKA';
            console.log(`${no.toString().padEnd(3)} ${doc.nama.padEnd(12)} | Usia: ${doc.usia.toString().padEnd(2)} | ${status}`);
        });
        
        // VERIFIKASI DETAIL
        console.log('\n🔍 VERIFIKASI DETAIL:');
        const namaMap = new Map();
        const usiaMap = new Map();
        let duplikatDitemukan = false;
        
        hasil.forEach(doc => {
            // Cek duplikat nama
            if (namaMap.has(doc.nama)) {
                console.log(`❌ NAMA "${doc.nama}" DUPLIKAT!`);
                duplikatDitemukan = true;
            } else {
                namaMap.set(doc.nama, doc.usia);
            }
            
            // Cek duplikat usia
            if (usiaMap.has(doc.usia)) {
                console.log(`❌ USIA ${doc.usia} DUPLIKAT!`);
                duplikatDitemukan = true;
            } else {
                usiaMap.set(doc.usia, doc.nama);
            }
        });
        
        if (!duplikatDitemukan) {
            console.log('🎉 SUKSES: Semua ' + hasil.length + ' data memiliki NAMA dan USIA yang UNIK!');
            
            // Tampilkan mapping nama-asal ke nama-baru
            console.log('\n📝 TRANSFORMASI DATA:');
            console.log('='.repeat(50));
            console.log('No.  Nama Asal     → Nama Baru        Usia Baru');
            console.log('='.repeat(50));
            
            for (let i = 0; i < Math.min(semuaData.length, 15); i++) {
                const asal = semuaData[i];
                const baru = hasil[i];
                console.log(`${(i + 1).toString().padEnd(4)} ${asal.nama.padEnd(12)} → ${baru.nama.padEnd(15)} ${baru.usia} tahun`);
            }
        }
        
    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await client.close();
        console.log('\n🔌 Koneksi ditutup');
    }
}

main();