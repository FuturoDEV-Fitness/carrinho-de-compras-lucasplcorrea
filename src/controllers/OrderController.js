const { Pool } = require('pg');
const pool = require('../db/db');

const createOrder = async (req, res) => {
    const { client_id, total, address, observations, items } = req.body;
    try {
        await pool.query('BEGIN');

        const orderResult = await pool.query(
            'INSERT INTO orders (client_id, total, address, observations) VALUES ($1, $2, $3, $4) RETURNING *',
            [client_id, total, address, observations]
        );
        const orderId = orderResult.rows[0].id;

        for (const item of items) {
            await pool.query(
                'INSERT INTO orders_items (order_id, product_id, amount, price) VALUES ($1, $2, $3, $4)',
                [orderId, item.product_id, item.amount, item.price]
            );
        }

        await pool.query('COMMIT');

        res.status(201).json(orderResult.rows[0]);
    } catch (err) {
        await pool.query('ROLLBACK');
        res.status(500).json({ error: err.message });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT o.*, json_agg(oi.*) as items
            FROM orders o
            LEFT JOIN orders_items oi ON o.id = oi.order_id
            GROUP BY o.id
        `);
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getOrderById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(`
            SELECT o.*, json_agg(oi.*) as items
            FROM orders o
            LEFT JOIN orders_items oi ON o.id = oi.order_id
            WHERE o.id = $1
            GROUP BY o.id
        `, [id]);
        if (result.rows.length > 0) {
            res.status(200).json(result.rows[0]);
        } else {
            res.status(404).json({ message: 'Pedido não encontrado' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteOrder = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('BEGIN');
        
        await pool.query('DELETE FROM orders_items WHERE order_id = $1', [id]);
        await pool.query('DELETE FROM orders WHERE id = $1', [id]);
        
        await pool.query('COMMIT');
        
        res.status(204).send();
    } catch (err) {
        await pool.query('ROLLBACK');
        res.status(500).json({ error: err.message });
    }
};

module.exports = { createOrder, getAllOrders, getOrderById, deleteOrder };
