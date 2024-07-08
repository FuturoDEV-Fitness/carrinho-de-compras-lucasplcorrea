# Comandos utilizados no desenvolvimento do Projeto

## Card 1 📝

### Git Flow

 - Iniciar uma nova branch:
```bash
git flow feature start Card_XXX
```
 - Finaliza a branch
```bash
git flow feature finish Card_XXX
```
## Card 2 🛠️
### Configuração do Banco de Dados PostgreSQL

- Criação do banco de dados miniprojeto:

```SQL
CREATE DATABASE miniprojeto
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LOCALE_PROVIDER = 'libc'
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

COMMENT ON DATABASE miniprojeto
    IS 'Banco de dados para miniprojeto';
```
- Criação da Tabela clients e Rota POST para Cadastrar um Cliente

```SQL
CREATE TABLE clients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    cpf VARCHAR(50) UNIQUE NOT NULL,
    contact VARCHAR(20) NOT NULL
);
```

## Card 3 📦
- Criação da Tabela categories e Inserção de Categorias
```SQL
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
```
 - Criação da Tabela products e Rota para Cadastrar um Produto
 ```SQL
 CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    amount VARCHAR(150) DEFAULT '0',
    color VARCHAR(50),
    voltage VARCHAR(4) CHECK (voltage IN ('110', '220')),
    description TEXT,
    category_id INTEGER NOT NULL REFERENCES categories(id)
);
```
## Card 4 📋
- Rota para Listar Todos os Produtos
```js
const express = require('express');
const router = express.Router();
const ProductController = require('./ProductController');

// Rota para listar todos os produtos
router.get('/products', ProductController.getAllProducts);

module.exports = router;
```

## Card 5 📄
- Rota para listar um produto com detalhes
```js
const express = require('express');
const router = express.Router();
const ProductController = require('./ProductController');

// Rota para listar um produto com detalhes
router.get('/products/:id', ProductController.getProductDetails);

module.exports = router;
```

## Card 6📦🛒

 - Criação das tabelas orders e orders_items e rota para cadastrar um pedido

```SQL
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
```
