const express = require('express');
const bodyParser = require('body-parser');
const clientsRoutes = require('./routes/clients.routes');
const productsRoutes = require('./routes/products.routes');
const ordersRoutes = require('./routes/orders.routes');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/api', clientsRoutes);
app.use('/api', productsRoutes);
app.use('/api', ordersRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
