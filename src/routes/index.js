const express = require('express');

const customerRouter = require('./customer');
const orderRouter = require('./order');
const productRouter = require('./product');

const router = express.Router();

router.use('/customer', customerRouter);
router.use('/order', orderRouter);
router.use('/product', productRouter);

module.exports = router;