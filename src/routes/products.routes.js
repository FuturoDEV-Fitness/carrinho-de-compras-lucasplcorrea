const express = require('express');
const router = express.Router();
const ProductController = require('./ProductController');

// Rota para cadastrar um produto
router.post('/products', ProductController.createProduct);

module.exports = router;
