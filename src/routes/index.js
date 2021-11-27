const express = require('express');

const costumerRouter = require('./costumer');
//const orderRouter = require('./order');
//const productRouter = require('./product');

const router = express.Router();

router.use('/costumer', costumerRouter);
// router.use('/order', orderRouter);
// router.use('/product', productRouter);

module.exports = router;