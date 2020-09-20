const {Client} = require('pg');

const client = new Client ({
    user: 'postgres',
    password: '654321',
    host: 'localhost',
    port: 5454,
    database: 'projeto02'
});

module.exports = client;