const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'miniprojeto',
    password: 'SUASENHA',
    port: 5432,
});

module.exports = pool;
