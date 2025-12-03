const { MongoClient, ObjectId } = require('mongodb');
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);
const namaDatabase = 'task-manager';

async function main() {
    try {
        await client.connect();
        console.log('Berhasil terhubung ke MongoDB database server');
        const db = client.db(namaDatabase);
        const collection = db.collection('pengguna');

        // 1. Ambil semua data pengguna
        const semuaPengguna = await collection.find({}).toArray();
        console.log(`Jumlah data pengguna: ${semuaPengguna.length}`);

        // 2. Data unik untuk update (sesuai permintaan)
        const namaUnik = ['Fattan', 'Islami', 'Athif', 'Dolly', 'Anggara', 'Hasanul', 'Fikri', 'Faza', 'Azka', 'Mahasya'];
        const usiaBase = [20, 21, 22, 23, 24, 25, 26, 27, 28, 29]; // Usia dasar

        // 3. Update setiap dokumen dengan nilai unik
        for (let i = 0; i < semuaPengguna.length; i++) {
            const pengguna = semuaPengguna[i];
            
            // Pilih nama berdasarkan indeks (berputar jika lebih banyak data)
            const namaIndex = i % namaUnik.length;
            const usiaIndex = i % usiaBase.length;
            
            // Buat nama lebih unik jika data lebih banyak dari namaUnik
            let namaFinal = namaUnik[namaIndex];
            if (semuaPengguna.length > namaUnik.length) {
                // Tambahkan angka unik
                namaFinal = `${namaUnik[namaIndex]}${Math.floor(i / namaUnik.length) + 1}`;
            }
            
            // Hitung usia unik
            const usiaFinal = usiaBase[usiaIndex] + Math.floor(i / usiaBase.length) * 3;
            
            const updateResult = await collection.updateOne(
                { _id: pengguna._id },
                { 
                    $set: { 
                        nama: namaFinal,
                        usia: usiaFinal
                    } 
                }
            );
            
            if (updateResult.modifiedCount > 0) {
                console.log(`Updated: ${pengguna.nama || 'null'} → ${namaFinal} (${usiaFinal} tahun)`);
            }
        }

        console.log('\n✅ Semua data telah diupdate menjadi unik');
        
        // 4. Verifikasi hasil
        const hasilAkhir = await collection.find({}).sort({ nama: 1 }).toArray();
        console.log('\n📊 DATA PENGguna TERBARU:');
        console.log('='.repeat(50));
        
        hasilAkhir.forEach((p, index) => {
            console.log(`${index + 1}. ${p.nama.padEnd(12)} | Usia: ${p.usia.toString().padEnd(2)} tahun | ID: ${p._id}`);
        });

        // 5. Cek duplikat
        console.log('\n🔍 VERIFIKASI UNIK:');
        const namaMap = new Map();
        const usiaMap = new Map();
        let adaDuplikat = false;
        
        hasilAkhir.forEach(p => {
            if (namaMap.has(p.nama)) {
                console.log(`❌ NAMA DUPLIKAT: ${p.nama}`);
                adaDuplikat = true;
            }
            namaMap.set(p.nama, true);
            
            if (usiaMap.has(p.usia)) {
                console.log(`❌ USIA DUPLIKAT: ${p.usia}`);
                adaDuplikat = true;
            }
            usiaMap.set(p.usia, true);
        });
        
        if (!adaDuplikat) {
            console.log('✅ Semua nama dan usia UNIK!');
        }

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await client.close();
        console.log('\n🔌 Koneksi ditutup');
    }
}

main();