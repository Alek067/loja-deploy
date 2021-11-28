const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const address = require('./address')(sequelize, Sequelize.DataTypes);
const customer = require('./customer')(sequelize, Sequelize.DataTypes);
const order = require('./order')(sequelize, Sequelize.DataTypes);
const product = require('./product')(sequelize, Sequelize.DataTypes);

address.hasOne(customer);
customer.belongsTo(address, { foreignKey: 'address_id'});
customer.hasMany(order);
order.belongsTo(customer, { foreignKey: 'customer_id'});
product.hasOne(order);
order.belongsTo(product, { foreignKey: 'product_id'});

const db = {
    address,
    customer,
    order,
    product,
    sequelize
};

module.exports = db;