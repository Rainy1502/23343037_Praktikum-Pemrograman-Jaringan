// insertDocument.js
const { MongoClient, ObjectId } = require('mongodb');

const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);
const namaDatabase = 'task-manager'; 

const id = new ObjectId();

// BAGIAN INI MENCETAK INFORMASI DARI ObjectID()
console.log(id);
console.log(id.id);
console.log(id.id.length);
console.log(id.getTimestamp());
console.log(id.toHexString().length);

// BAGIAN INI ADALAH FUNGSI UTAMA
async function main() {
    try {
        // KONEKSI KE DATABASE
        await client.connect();
        console.log('Berhasil terhubung ke MongoDB database server');
        
        const db = client.db(namaDatabase);
        const clPengguna = db.collection('pengguna');
        const clTugas = db.collection('tugas');
        
        // MEMASUKAN SATU DATA (DOKUMEN)
        const insertPengguna = await clPengguna.insertOne({
            _id: id,
            nama: 'Fattan',
            usia: 20
        });
        console.log('Memasukkan data Pengguna ke koleksi =>', insertPengguna);
        
        // MEMASUKAN BANYAK DATA (DOKUMEN)
        const insertTugas = await clTugas.insertMany([
            {
                Deskripsi: 'Membersihkan rumah',
                StatusPenyelesaian: true
            },
            {
                Deskripsi: 'Mengerjakan tugas kuliah',
                StatusPenyelesaian: false
            },
            {
                Deskripsi: 'Memberikan bimbingan',
                StatusPenyelesaian: false
            }
        ]);
        console.log('Memasukkan data Tugas ke koleksi =>', insertTugas);
        
        return 'Data selesai dimasukkan.';
        
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

main()
    .then(console.log)
    .catch(console.error);