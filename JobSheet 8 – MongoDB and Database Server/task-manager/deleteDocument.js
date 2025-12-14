const { MongoClient } = require('mongodb');

const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);
const namaDatabase = 'task-manager';

async function main() {
    try {
        await client.connect();
        console.log('Berhasil terhubung ke MongoDB database server');
        const db = client.db(namaDatabase);

        db.collection('pengguna').deleteMany({
            usia: 28
        }).then((result) => {
            console.log(result);
        }).catch((error) => {
            console.error(error);
        });
    } catch (error) {
        console.error(error);
    }
}

main();