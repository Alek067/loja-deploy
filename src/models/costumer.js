module.exports = (sequelize, DataTypes) => {
    const Costumer = sequelize.define('Costumer', {
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
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cpf: {
            type: DataTypes.STRING,
            allowNull: false
        },
        birthdate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        address_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: { tableName: 'addresses' },
                key: 'id'
            }
        },
    }, {
        tableName: 'costumers',
        underscored: true,
        paranoid: true
    });

    Costumer.associate = function (models) {
        Costumer.belongsTo(models.Address, {
            foreignKey: 'address_id',
            as: 'address'
        });
        Costumer.hasMany(models.Order, {
            foreignKey: 'id',
            as: 'order'
        });
    }

    return Costumer;
};