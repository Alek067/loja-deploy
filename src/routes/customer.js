const express = require("express");
const router = express.Router();
const { customer } = require('../models');
const { body, check, validationResult } = require('express-validator');
const CustomerController = require('../controllers/customer');
const { cpf } = require('cpf-cnpj-validator');

const customerController = new CustomerController(customer);

router.post('/',
    check('name').not().isEmpty(),
    check('email').not().isEmpty().isEmail(),
    check('cpf').not().isEmpty().trim().escape(),
    check('birthdate').not().isEmpty().isDate().withMessage('Invalid date'), //format: 'YYYY/MM/DD'
    check('address.street').not().isEmpty(),
    check('address.number').not().isEmpty(),
    check('address.neighborhood').not().isEmpty(),
    check('address.city').not().isEmpty(),
    check('address.state').not().isEmpty(),
    check('address.country').not().isEmpty(),
    check('address.cep').not().isEmpty().matches('([0-9]{5})([\-]?)([0-9]{3})'),

    async (req, res) => {
        const { body } = req;
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            console.log(errors.array())
            return res.status(400).json({ errors: errors.array() });
        }

        if (!cpf.isValid(body.cpf)) {
            return res.status(400).json("Invalid CPF");
        }

        try {
            const customerData = await customerController.create(body);
            res.status(201).send(customerData);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
)

router.get('/', async (req, res) => {
    const { id } = req.query;
    if (!id) {
        const customer = await customerController.getAll();
        res.status(200).json(customer);
    }

    const customer = await customerController.getById(id);
    res.status(200).json(customer);
})

router.get('/deleted', async (req, res) => {
    const custormer = await customerController.getDeletedCustomers();
    res.status(200).send(custormer);
})

router.put('/:id',
    check('email')
        .if(body('email').exists())
        .isEmail(),
    check('birthdate') //format: 'YYYY/MM/DD'
        .if(body('birthdate').exists())
        .isDate()
        .withMessage('Invalid date'),
    check('address.cep')
        .if(body('address.cep').exists())
        .matches('([0-9]{5})([\-]?)([0-9]{3})'),

    async (req, res) => {
        const { id } = req.params;
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const customerData = req.body;

        try {
            await customerController.update(id, customerData);
            res.status(202).send({ message: 'Customer successfully updated' });
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
)

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await customerController.delete(id);
        res.status(200).send({ message: 'Customer successfully deleted' });
    } catch (error) {
        res.status(400).send(error.message);
    }
})

router.put('/deleted/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await customerController.restoreDeletedCustomer(id);
        res.status(200).send({ message: 'Customer successfully restored' });
    } catch (error) {
        res.status(400).send(error.message);
    }
})

module.exports = router;