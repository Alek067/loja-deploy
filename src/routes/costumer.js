const express = require("express");
const router = express.Router();
const { costumer } = require('../models');
const { body, check, validationResult } = require('express-validator');
const CostumerController = require('../controllers/costumer');
const { cpf } = require('cpf-cnpj-validator');

const costumerController = new CostumerController(costumer);

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
            return res.status(400).json( { errors: errors.array() } );
        }

        if (!cpf.isValid(body.cpf)) {
            return res.status(400).json("Invalid CPF");
        }
        
        try {
            const usuarioCadastrado = await costumerController.create(body);
            res.status(201).send(usuarioCadastrado);
        } catch(erro) {
            res.status(400).send(erro.message);
        }  
    }
)

router.get('/', async (req, res) => {
    const { id } = req.query;

    if (!id) {
        const costumer = await costumerController.getAll();
        res.status(200).json(costumer);
    } 
    
    const costumer = await costumerController.getById(id);
    res.status(200).json(costumer);
})

router.get('/deleteds', async (req, res) => {
    const costumer = await costumerController.getDeletedsCostumers();
    res.status(200).json(costumer);
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
            return res.status(400).json( { errors: errors.array() } );
        }

        const costumerData = req.body;

        try {
            await costumerController.update(id, costumerData);
            res.status(202).send( { message: 'User successfully updated' } );
        } catch(erro) {
            res.status(400).send(erro.message);
        }
    }
)

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json( { errors: errors.array() } );
    }

    try {
        await costumerController.delete(id);
        res.status(200).send( { message: 'User successfully deleted' } );
    } catch(erro) {
        res.status(400).send(erro.message);
    }
})

router.put('/deleteds/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        await costumerController.restoreDeletedCostumer(id);
        res.status(200).send( { message: 'User successfully restored' } );
    } catch(erro) {
        res.status(400).send(erro.message);
    }
})

module.exports = router;