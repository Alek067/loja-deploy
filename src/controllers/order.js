const { product } = require('../models');
const ProductController = require('./product');
const sender = require('../config/mailSender');

const productController = new ProductController(product);

class OrderController {
    constructor(OrderModel) {
        this.order = OrderModel;
    }

    async getAll() {
        return await this.order.findAll({ include: product });
    }

    async getByCustomerId(customer_id, status) {
        let filter = status ? { status } : {};

        const order = await this.order.findAll({ 
            include: product,
            where: [
                { customer_id },
                filter
            ]
        });
        return order;
    }

    async addProductsToOrder(orderData) {
        const { customer_id, product_id, quantity } = orderData;
        const order = await this.order.findOne({
            where: [
                { product_id: product_id },
                { customer_id: customer_id },
                { status: "opened" }
            ]
        });

        if (order) {
            order.quantity += quantity;
            return await order.save();
        }

        return await this.order.create(orderData);
    }

    async updateQuantity(id, quantity) {
        const order = await this.order.findByPk(id);

        if (!order) {
            throw new Error(JSON.stringify({ message: 'Order not found' }));
        }

        if (order.status == "closed") {
            throw new Error(JSON.stringify({ message: 'Order closed' }));
        }

        order.quantity = quantity;
        await order.save();
        return order;
    }

    async finishOrder(customerId) {
        let order = await this.order.findAll({
            include: [{ all: true }],
            where: [
                { customer_id: customerId },
                { status: "opened" }
            ]
        });

        if (order.length === 0) {
            throw new Error("Customer doesn't have an open list");
        }

        let totalOrder = 0;

        for (let i = 0; i < order.length; i++) {
            await productController.stockReduce(order[i].product_id, order[i].quantity);
            order[i].status = "closed";
            
            totalOrder += order[i].Product.price;
            await order[i].save();
        }

        const orderNumber = await this.orderNumberRandom(10000, 999999);

        const response = {
            "order_number": orderNumber,
            "total_order": totalOrder,
            "message": "Order successfully closed",
        };

        const email = order[0].Customer.email;
        const from = 'bagy@bagy.com';
        const subject = `Pedido n. ${orderNumber}. Sua compra foi finalizada!`;
        const body = `
        Olá, ${order[0].Customer.name}.

        Recebemos o seu pedido n. ${orderNumber}, no valor de R$ ${totalOrder}.
        Obrigada por comprar conosco! 
        Esperamos você em breve novamente. Um abraço!
        
        Equipe Bagy.
        
        ----------------------------------------------------------------
        
        Laoma Nogueira - Nova desenvolvedora backend Nodejs da Bagy com orgulho!`;

        this.sendMail(from, email, subject, body);

        return response;
    }

    async deleteProcutFromOrder(orderId) {
        const order = await this.order.findOne({
          where: [
            { id: orderId }
          ]
        });

        if(!order) {
          throw new Error(JSON.stringify({ message: 'Order ID not found' }));
        }

        if(order.status == "closed") {
          throw new Error(JSON.stringify({ message: "Isn't possible to exclude product from a completed order" }));
        }

        return order.destroy();
    }

    async orderNumberRandom(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    async sendMail(from, to, subject, body) {
        let filledMail = {
            from: from,
            to: to,
            subject: subject,
            text: body,
        }
    
        sender.sendMail(filledMail, function(error) {
            if(error) {
                console.log(`Email don't sent. Error: ${error}`);
                return;
            }
            console.log(`Email successfully sended to: ${to} `);
            return;
        });
    }
}

module.exports = OrderController;