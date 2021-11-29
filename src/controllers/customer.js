const { address } = require('../models');
const AddressController = require('./address');
const Op = require('sequelize').Op;

const addressController = new AddressController(address);

class CustomerController {
    constructor(CustomerModel) {
        this.customer = CustomerModel;
    }

    async getAll() {
        return await this.customer.findAll({ include: address });
    }

    async getById(id) {
        const customer = await this.customer.findByPk(id, { include: address });

        if (customer == null) {
            return [];
        }
        return customer;
    }

    async create(customerData) {
        const { cpf, email, address } = customerData;
        const customer = await this.customer.findOne({
            where: {
                [Op.or]: [
                    { cpf },
                    { email }
                ]
            },
            paranoid: false
        });

        if (customer) {
            throw new Error(JSON.stringify({ message: 'Email or CPF is already in use, try with another one.' }));
        }

        const addressData = await addressController.create(address);

        if (!addressData.id) {
            throw new Error(JSON.stringify({ message: 'Something wrong, try again later.' }));
        }

        customerData.address_id = addressData.id;
        return await this.customer.create(customerData);
    }

    async update(id, customerData) {
        const { cpf, address } = customerData;

        if (cpf) {
            throw new Error(JSON.stringify({ message: 'CPF cannot be changed' }));
        }

        if (address) {
            const addressData = await addressController.updateOrCreate(address);
            customerData.address_id = addressData.id;
        }

        const customer = await this.customer.update(customerData, { where: { id: id } });

        if (customer[0] === 0) {
            throw new Error(JSON.stringify({ message: 'Customer not found' }));
        }
        return customer;
    }

    async delete(id) {
        const customer = await this.getById(id)
        if (customer.length === 0) {
            throw new Error(JSON.stringify({ message: 'Customer not found' }));
        }

        return await this.customer.destroy({ where: { id: id } });
    }

    async getDeletedCustomers() {
        const customer = await this.customer.findAll({
            where: { deletedAt: { [Op.not]: null } },
            include: [{ all: true }],
            paranoid: false
        });
        return customer;
    }

    async restoreDeletedCustomer(id) {
        return await this.customer.restore({ where: { id: id } });
    }
}

module.exports = CustomerController;