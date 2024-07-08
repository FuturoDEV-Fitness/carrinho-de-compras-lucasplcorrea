const { Pool } = require('pg');
const pool = require('../db/db');

const createClient = async (req, res) => {
    const { name, email, cpf, contact } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO clients (name, email, cpf, contact) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, email, cpf, contact]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { createClient };