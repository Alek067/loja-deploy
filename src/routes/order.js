const express = require("express");
const router = express.Router();
const { order } = require('../models');
const { body, check, validationResult } = require('express-validator');
const OrderController = require('../controllers/order');

const orderController = new OrderController(order);

router.get('/', async (req, res) => {
    const order = await orderController.getAll();
    res.status(200).json(order);
})

router.get('/:customerId', async (req, res) => {
    const { customerId } = req.params;
    const { status } = req.query;
    const order = await orderController.getByCustomerId(customerId, status);
    res.status(200).json(order);
})

router.post('/',
    check('quantity').not().isEmpty().isInt().withMessage('Invalid number'),
    check('customer_id').not().isEmpty().isInt().withMessage('Invalid number'),
    check('product_id').not().isEmpty().isInt().withMessage('Invalid number'),

    async (req, res) => {
        const { body } = req;
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            console.log(errors.array())
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const orderData = await orderController.addProductsToOrder(body);
            res.status(201).send(orderData);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
)

router.patch('/:id',
    check('quantity').not().isEmpty().isInt().withMessage('Invalid number'),

    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            console.log(errors.array())
            return res.status(400).json({ errors: errors.array() });
        }

        const { id } = req.params;
        const { quantity } = req.body;

        try {
            const orderData = await orderController.updateQuantity(id, quantity);
            res.status(201).send(orderData);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
)

router.put('/finish-order/:customerId',
    async (req, res) => {
        const { customerId } = req.params;

        try {
            const order = await orderController.finishOrder(customerId);
            res.status(200).json(order);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
)

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await orderController.deleteProcutFromOrder(id);
        res.status(200).send( { message: 'Order ID successfully deleted' } );
    } catch(error) {
        res.status(400).send(error.message);
    }
})

module.exports = router;