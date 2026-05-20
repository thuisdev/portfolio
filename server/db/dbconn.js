const {Pool} = require('pg')
const { USER, HOST, PASSWORD, DB_PORT, DATABASE } = require('../config.js')

const pool = new Pool ({user: USER, host: HOST, database: DATABASE, password: PASSWORD, port: DB_PORT});

module.exports = {pool};