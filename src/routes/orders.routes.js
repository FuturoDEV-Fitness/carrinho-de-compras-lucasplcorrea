const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');

router.post('/orders', OrderController.createOrder);
router.get('/orders', OrderController.getAllOrders);
router.get('/orders/:id', OrderController.getOrderById); // Nova rota para buscar por ID
router.delete('/orders/:id', OrderController.deleteOrder);

module.exports = router;
