const { MongoClient } = require('mongodb');
const { credentials } = require('../data/credentials/credentials');
const { dictionary } = require('../data/dictionaries/dictionary');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'defaultinator';


const loadCredentials = async (db, data, batchSize = 100) => {
    const collection = db.collection('credentials')
    const batches = [];

    while (credentials.length > 0) {
        batches.push(credentials.splice(0, batchSize));
    }

    return collection.remove()
        .then(() => {
            console.log(`Old credentials deleted. Saving new credentials in batches of ${batchSize}`);

            return Promise.all(batches.map((batch) => {
                return collection.insertMany(batch)
                    .then(console.log(`Added ${batch.length} records!`))
                    .catch((e) => console.log(e))
            }));
        });
}

const loadDictionary = async (db, data, batchSize = 100) => {
    const collection = db.collection('dictionaries')
    const batches = [];

    while (dictionary.length > 0) {
        batches.push(dictionary.splice(0, batchSize));
    }

    return collection.remove()
        .then(() => {
            console.log(`Old dictionary deleted. Saving new data in batches of ${batchSize}`);

            return Promise.all(batches.map((batch) => {
                return collection.insertMany(batch)
                    .then(console.log(`Added ${batch.length} records!`))
                    .catch((e) => console.log(e))
            }));
        });};

const dispatch = async (db) => {
    return Promise.all([
        loadCredentials(db),
        loadDictionary(db),
    ]);
};

const run = async () => {
    client.connect()
        .then(() => {
            const db = client.db(dbName);
            console.log(`Connected to ${url}/${dbName}`);
            return dispatch(db);
        })
        .catch((e) => console.log(e))
        .then((a) => console.log(a))
        // TODO: Causes an error...?
        //.finally(client.close());
};

run();