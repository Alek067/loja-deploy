const express = require('express');
const router = express.Router();
const db = require('../models'); // importa todos os models
const Product = db.products; // pega o model de produtos

// GET /produtos -> lista do banco
router.get('/produtos', async (req, res) => {
  try {
    const produtos = await Product.findAll(); // busca todos
    res.json(produtos);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
});

module.exports = router;
