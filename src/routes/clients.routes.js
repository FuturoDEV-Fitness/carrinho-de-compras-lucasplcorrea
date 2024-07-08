const express = require('express');
const router = express.Router();
const ClientController = require('../controllers/ClientController');

// Rota para cadastrar um cliente
router.post('/clients', ClientController.createClient);

module.exports = router;
