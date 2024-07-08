const createOrder = async (req, res) => {
    const { client_id, total, address, observations, items } = req.body;
    const client = await pool.query('SELECT * FROM clients WHERE id = $1', [client_id]);
    if (!client.rows.length) {
        return res.status(400).json({ message: 'Cliente não encontrado' });
    }
    
    const client_name = client.rows[0].name;

    try {
        const result = await pool.query(
            'INSERT INTO orders (client_id, total, address, observations) VALUES ($1, $2, $3, $4) RETURNING *',
            [client_id, total, address, observations]
        );
        const order_id = result.rows[0].id;

        for (const item of items) {
            await pool.query(
                'INSERT INTO orders_items (order_id, product_id, amount, price) VALUES ($1, $2, $3, $4)',
                [order_id, item.product_id, item.amount, item.price]
            );
        }
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { createOrder };
