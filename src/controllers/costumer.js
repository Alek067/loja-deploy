const { address } = require('../models');
const AddressController = require('./address');
const Op = require('sequelize').Op;

const addressController = new AddressController(address);

class CostumerController {
    constructor(CostumerModel) {
        this.costumer = CostumerModel;
    }

    async getAll() {
        const costumer = await this.costumer.findAll({ include: [{all: true}] });
        return costumer;
    }

    async getById(id) {
        return await this.costumer.findByPk(id, { include: [{all: true}] });
    }
  
    async create(costumerData) {
        const { cpf, email, address } = costumerData;
        const costumer = await this.costumer.findOne({
            where: {
                [Op.or]: [
                    { cpf },
                    { email }
                ]
            },
            paranoid: false  //busca independente de ter sido deletado
        });

        if(costumer) {
            throw new Error(JSON.stringify( { message: 'Email or CPF is already in use, try with another one.' } ));
        }
        
        const addressData = await addressController.create(address);

        if(!addressData.id) {
            throw new Error(JSON.stringify( { message: 'Something wrong, try again later.' } ));
        }
    
        costumerData.address_id = addressData.id;

        return await this.costumer.create(costumerData);
    }

    async update(id, costumerData) {
        const { cpf, address } = costumerData;

        if(cpf) {
            throw new Error(JSON.stringify( { message: 'CPF cannot be changed' } ));
        }

        if(address) {
            const addressData = await addressController.updateOrCreate(address);
            costumerData.address_id = addressData.id;
        }
        
        const costumer = await this.costumer.update(costumerData, { where: { id: id } });
        
        if(costumer[0] === 0) {
            throw new Error(JSON.stringify( { message: 'User not found' } ));
        }
        return costumer;
    }

    async delete(id) {
        if( !(await this.getById(id)) ) {
            throw new Error(JSON.stringify( { message: 'User not found' } ));
        }

        return await this.costumer.destroy({ where: { id: id } });
    }

    async getDeletedsCostumers() {
        const costumer = await this.costumer.findAll({ 
            where: {
                deletedAt: {[Op.not]: null}
            },
            include: [{all: true}], 
            paranoid: false 
        });
        return costumer;
    }

    async restoreDeletedCostumer(id) {
        return await this.costumer.restore({ where: { id: id } });
    }
}

module.exports = CostumerController;