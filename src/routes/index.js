const express = require('express');

const customerRouter = require('./customer');
const orderRouter = require('./order');
const productRouter = require('./product');

const router = express.Router();

router.get("/", function (req, res) {
    res.status(200).send({
        title: "API Vaccination Control",
        version: "1.0.0"
    });
});

router.use('/customer', customerRouter);
router.use('/order', orderRouter);
router.use('/product', productRouter);

module.exports = router;