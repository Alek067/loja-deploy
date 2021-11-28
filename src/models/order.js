module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        installments: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: "opened"
        },
        quantity: {
            type: DataTypes.INTEGER,
        },
    }, {
        underscored: true,
    });

    return Order;
};