require('dotenv').config();
const express = require('express');
const { sequelize } = require('./src/models');
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

// Rota de teste para listar produtos (exemplo)
app.get('/produtos', (req, res) => {
  res.json([
    { id: 1, nome: 'Tênis', preco: 199.99 },
    { id: 2, nome: 'Camiseta', preco: 59.90 },
  ]);
});

// Conecta com o banco
sequelize.sync().then(() => {
  console.log('Successfully connected to the database');
});

// Sobe o servidor
app.listen(port, () => {
  console.log(`Connected server on port: ${port}`);
});
