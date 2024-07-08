# Comandos utilizados no desenvolvimento do Projeto

## Card 1

git flow feature start Card_1

git flow feature finish Card_1

Inseri esse trecho apenas para ilustrar como seriam os inicios e terminos de branch com Git Flow

## Card 2

git flow feature start Card_2

Criei um novo banco de dados no PG para diferenciar os exercícios

O comando para criar o novo banco de dados foi:

CREATE DATABASE miniprojeto
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LOCALE_PROVIDER = 'libc'
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

COMMENT ON DATABASE miniprojeto
    IS 'Banco de dados para miniprojeto';

Criei uma conexão com o banco via VS Code assim consigo rodar os comandos SQL dentro do proprio VS, facilitando as tarefas

1 - Criação da tabela clients

CREATE TABLE clients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    cpf VARCHAR(50) UNIQUE NOT NULL,
    contact VARCHAR(20) NOT NULL
);

2 - Rota POST para cadastrar um cliente:

const express = require('express');
const router = express.Router();
const ClientController = require('./ClientController');

// Rota para cadastrar um cliente
router.post('/clients', ClientController.createClient);

module.exports = router;

----

const { Pool } = require('pg');
const pool = new Pool({
    user: 'usuario',
    host: 'localhost',
    database: 'nome_do_banco',
    password: 'senha',
    port: 5432,
});

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

## Card 3

1 - Criação da tabela categories:

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL
);

-- Inserir 10 categorias
INSERT INTO categories (name) VALUES
('eletronicos'),
('roupas'),
('alimentos'),
('moveis'),
('livros'),
('brinquedos'),
('ferramentas'),
('automoveis'),
('cosmeticos'),
('esportes');

2 - Criação da tabela products:

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    amount VARCHAR(150) DEFAULT '0',
    color VARCHAR(50),
    voltage VARCHAR(4) CHECK (voltage IN ('110', '220')),
    description TEXT,
    category_id INTEGER NOT NULL REFERENCES categories(id)
);

3 - Rota para cadastrar um produto:

const express = require('express');
const router = express.Router();
const ProductController = require('./ProductController');

// Rota para cadastrar um produto
router.post('/products', ProductController.createProduct);

module.exports = router;

----

const { Pool } = require('pg');
const pool = new Pool({
    user: 'usuario',
    host: 'localhost',
    database: 'nome_do_banco',
    password: 'senha',
    port: 5432,
});

const createProduct = async (req, res) => {
    const { name, amount, color, voltage, description, category_id } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO products (name, amount, color, voltage, description, category_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [name, amount, color, voltage, description, category_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { createProduct };

## Card 4

Rota para listar todos os produtos

const express = require('express');
const router = express.Router();
const ProductController = require('./ProductController');

// Rota para listar todos os produtos
router.get('/products', ProductController.getAllProducts);

module.exports = router;

## Card 5

Rota para listar um produto com detalhes

const express = require('express');
const router = express.Router();
const ProductController = require('./ProductController');

// Rota para listar um produto com detalhes
router.get('/products/:id', ProductController.getProductDetails);

module.exports = router;

## Card 6

Tabelas orders e orders_items

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    client_id INTEGER REFERENCES clients(id),
    total DECIMAL(10, 2),
    address TEXT,
    observations TEXT
);

CREATE TABLE orders_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id),
    product_id INTEGER REFERENCES products(id),
    amount INTEGER,
    price DECIMAL(10, 2)
);

Rota para cadastrar um pedido:

const express = require('express');
const router = express.Router();
const OrderController = require('./OrderController');

// Rota para cadastrar um pedido
router.post('/orders', OrderController.createOrder);

module.exports = router;
