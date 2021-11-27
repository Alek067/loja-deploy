module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        weight: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.STRING,
            allowNull: false
        },
        quantity_stock: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, {
        tableName: 'products',
        underscored: true,
        paranoid: true
    });

    Product.associate = function (models) {
        Product.hasMany(models.Order, {
            foreignKey: 'id',
            as: 'order'
        });
    }

    return Product
};