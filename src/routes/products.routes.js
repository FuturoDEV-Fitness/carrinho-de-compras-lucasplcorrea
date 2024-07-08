const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');

// Rota para cadastrar um produto
router.post('/products', ProductController.createProduct);

// Rota para listar todos os produtos
router.get('/products', ProductController.getAllProducts);

// Rota para listar um produto com detalhes
router.get('/products/:id', ProductController.getProductDetails);

module.exports = router;
