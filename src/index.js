const express = require('express');
const bodyParser = require('body-parser');
const clientRoutes = require('./routes/clients.routes');
const productRoutes = require('./routes/products.routes');
const orderRoutes = require('./routes/orders.routes');

const app = express();
app.use(bodyParser.json());

app.use('/api', clientRoutes);
app.use('/api', productRoutes);
app.use('/api', orderRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`O servidor está rodando na porta: ${PORT}`);
});
