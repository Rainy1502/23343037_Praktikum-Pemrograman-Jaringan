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
        
        // Hapus data lama jika ada
        await collection.deleteMany({});
        console.log('🧹 Data lama dibersihkan');
        
        // Data dummy dengan nama yang diminta + sengaja buat duplikat untuk challenge
        const dummyData = [
            // Data dengan duplikat nama
            { nama: 'Carli', usia: 25 },
            { nama: 'Tamba', usia: 26 },
            { nama: 'Dzaki', usia: 27 },
            { nama: 'Sultan', usia: 28 },
            { nama: 'Rabbani', usia: 29 },
            { nama: 'Dafin', usia: 30 },
            { nama: 'Surya', usia: 31 },
            { nama: 'Hasanul', usia: 32 },
            { nama: 'FIkri', usia: 33 },
            { nama: 'Muhammad', usia: 34 },
            
            // Duplikat untuk challenge
            { nama: 'Carli', usia: 35 },     // Nama sama, usia beda
            { nama: 'Tamba', usia: 26 },     // Nama dan usia sama
            { nama: 'Surya', usia: 30 },     // Nama sama, usia sama dengan Dafin
            { nama: 'Hasanul', usia: 32 },   // Nama dan usia sama
            { nama: 'Muhammad', usia: 25 },  // Nama sama, usia sama dengan Carli pertama
        ];
        
        // Insert data dummy
        const result = await collection.insertMany(dummyData);
        console.log(`📥 ${result.insertedCount} data dummy berhasil dimasukkan`);
        
        // Tampilkan data
        const semuaData = await collection.find({}).toArray();
        console.log('\n📋 DATA DUMMY YANG TELAH DIMASUKKAN:');
        console.log('='.repeat(60));
        console.log('No.  Nama        Usia  Status Duplikat');
        console.log('='.repeat(60));
        
        // Tracking untuk deteksi duplikat
        const namaMap = new Map();
        const usiaMap = new Map();
        
        semuaData.forEach((doc, index) => {
            const isNamaDuplikat = namaMap.has(doc.nama);
            const isUsiaDuplikat = usiaMap.has(doc.usia);
            
            namaMap.set(doc.nama, true);
            usiaMap.set(doc.usia, true);
            
            let status = '';
            if (isNamaDuplikat && isUsiaDuplikat) {
                status = '❌ NAMA & USIA duplikat';
            } else if (isNamaDuplikat) {
                status = '⚠️  NAMA duplikat';
            } else if (isUsiaDuplikat) {
                status = '⚠️  USIA duplikat';
            } else {
                status = '✅ Unik';
            }
            
            console.log(`${(index + 1).toString().padEnd(4)} ${doc.nama.padEnd(10)} ${doc.usia.toString().padEnd(4)} ${status}`);
        });
        
        // Ringkasan duplikat
        console.log('\n🔍 RINGKASAN DUPLIKAT:');
        
        // Hitung frekuensi nama
        const namaCount = {};
        semuaData.forEach(doc => {
            namaCount[doc.nama] = (namaCount[doc.nama] || 0) + 1;
        });
        
        // Hitung frekuensi usia
        const usiaCount = {};
        semuaData.forEach(doc => {
            usiaCount[doc.usia] = (usiaCount[doc.usia] || 0) + 1;
        });
        
        // Tampilkan duplikat nama
        const namaDuplikat = Object.entries(namaCount).filter(([_, count]) => count > 1);
        if (namaDuplikat.length > 0) {
            console.log('Nama duplikat:');
            namaDuplikat.forEach(([nama, count]) => {
                console.log(`  • "${nama}" muncul ${count} kali`);
            });
        }
        
        // Tampilkan duplikat usia
        const usiaDuplikat = Object.entries(usiaCount).filter(([_, count]) => count > 1);
        if (usiaDuplikat.length > 0) {
            console.log('Usia duplikat:');
            usiaDuplikat.forEach(([usia, count]) => {
                console.log(`  • Usia ${usia} muncul ${count} kali`);
            });
        }
        
        if (namaDuplikat.length === 0 && usiaDuplikat.length === 0) {
            console.log('✅ Tidak ada duplikat');
        } else {
            console.log(`\n🎯 Total ada ${namaDuplikat.length} nama duplikat dan ${usiaDuplikat.length} usia duplikat`);
            console.log('🚀 Siap untuk Challenge membuat semua data UNIK!');
        }
        
    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await client.close();
        console.log('\n🔌 Koneksi ditutup');
    }
}

main();