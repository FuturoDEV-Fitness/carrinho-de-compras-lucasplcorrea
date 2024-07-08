const express = require('express');
const router = express.Router();
const OrderController = require('./OrderController');

// Rota para cadastrar um pedido
router.post('/orders', OrderController.createOrder);

module.exports = router;
