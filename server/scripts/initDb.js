const fs = require ('fs');
const path = require ('path');
const {Client} = require('pg');

const { USER, HOST, PASSWORD, DB_PORT, DATABASE } = require('../config.js')

const setupDbSql = fs.readFileSync(path.join(__dirname, 'setup-db.sql'), 'utf8');

const client = new Client ({user: USER, host: HOST, database: DATABASE, password: PASSWORD, port: DB_PORT});

(async () => {
    await client.connect();
    try {
    await client.query (setupDbSql)}
    catch (err) {console.error(err)}
    finally{
        client.end();
    }
})();