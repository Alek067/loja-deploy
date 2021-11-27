const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Address = require('./address');
const Costumer = require('./costumer');
const Order = require('./order');
const Product = require('./product');

const address = Address(sequelize, Sequelize.DataTypes);
const costumer = Costumer(sequelize, Sequelize.DataTypes);
const order = Order(sequelize, Sequelize.DataTypes);
const product = Product(sequelize, Sequelize.DataTypes);

const db = {
    address,
    costumer,
    order,
    product,
    sequelize    
};

module.exports = db;