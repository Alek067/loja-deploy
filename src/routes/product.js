const express = require("express");
const router = express.Router();
const { product } = require('../models');
const { body, check, validationResult } = require('express-validator');
const ProductController = require('../controllers/product');

const productController = new ProductController(product);

router.post('/',
    check('name').not().isEmpty(),
    check('description').not().isEmpty(),
    check('weight').not().isEmpty().isInt().withMessage('Invalid number'),
    check('price').not().isEmpty().isFloat().withMessage('Invalid number'),
    check('stock').not().isEmpty().isInt().withMessage('Invalid number'),

    async (req, res) => {
        const { body } = req;
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            console.log(errors.array())
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const productData = await productController.create(body);
            res.status(201).send(productData);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
)

router.get('/', async (req, res) => {
    const { id } = req.query;

    if (!id) {
        const product = await productController.getAll();
        res.status(200).json(product);
    }

    const product = await productController.getById(id);
    res.status(200).json(product);
})

router.put('/:id',
    check('weight')
        .if(body('weight').exists())
        .isInt()
        .withMessage('Invalid number'),
    check('price')
        .if(body('price').exists())
        .isFloat()
        .withMessage('Invalid date'),
    check('stock')
        .if(body('stock').exists())
        .isInt()
        .withMessage('Invalid number'),

    async (req, res) => {
        const { id } = req.params;
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const productData = req.body;

        try {
            await productController.update(id, productData);
            res.status(202).send({ message: 'Product successfully updated' });
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
)

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        await productController.delete(id);
        res.status(200).send({ message: 'Product successfully deleted' });
    } catch (error) {
        res.status(400).send(error.message);
    }
})

module.exports = router;