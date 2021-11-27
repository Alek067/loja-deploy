module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        installments: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
        },
        costumer_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: { tableName: 'costumers' },
                key: 'id'
            }
        },
        product_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: { tableName: 'products' },
                key: 'id'
            }
        },
    }, {
        underscored: true,
        paranoid: true
    });

    Order.associate = function (models) {
        Order.belongsTo(models.Costumer, {
            foreignKey: 'costumer_id',
            as: 'costumer'
        });
        Order.belongsTo(models.Product, {
            foreignKey: 'product_id',
            as: 'product'
        });
    }

    return Order;
};