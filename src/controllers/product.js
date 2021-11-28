const Op = require('sequelize').Op;

class ProductController {
    constructor(ProductModel) {
        this.product = ProductModel;
    }

    async create(productData) {
        return await this.product.create(productData);
    }

    async getAll() {
        return await this.product.findAll();
    }

    async getById(id) {
        const product = await this.product.findByPk(id);

        if (product == null) {
            return [];
        }
        return product;
    }

    async update(id, productData) {
        const product = await this.product.update(productData, { where: { id: id } });

        if (product[0] === 0) {
            throw new Error(JSON.stringify({ message: 'Product not found' }));
        }
        return product;
    }

    async delete(id) {
        const product = await this.getById(id);
        if (product.length === 0) {
            throw new Error(JSON.stringify({ message: 'Product not found' }));
        }

        return await this.product.destroy({ where: { id: id } });
    }

    async stockReduce(id, quantity) {
        const product = await this.product.findByPk(id);
        let { stock } = product;

        if (stock === 0) {
            throw new Error('No product in stock')
        }

        if ((stock - quantity) < 0) {
            throw new Error(`Product has only ${stock} units in stock`)
        }

        product.stock -= quantity;

        const result = await product.save();

        if (!result) {
            throw new Error('Stock reduce error.')
        }
    }
}

module.exports = ProductController;