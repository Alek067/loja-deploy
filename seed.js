const db = require('./src/models');

async function runSeed() {
  try {
    await db.sequelize.sync({ force: true });

    // Produto fictício
    const product = await db.product.create({
      name: 'Camiseta Tech',
      image: 'https://via.placeholder.com/150',
      description: 'Camiseta confortável feita com tecnologia de ponta.',
      weight: 300,
      price: 99.9,
      stock: 50,
    });

    // Endereço fictício
    const address = await db.address.create({
      street: 'Rua das Inovações',
      number: 123,
      neighborhood: 'TechVille',
      city: 'São Paulo',
      state: 'SP',
      country: 'Brasil',
      cep: '01000-000',
    });

    // Cliente fictício
    const customer = await db.customer.create({
      name: 'João Silva',
      email: 'joao@email.com',
      cpf: '123.456.789-00',
      birthdate: new Date('1990-05-15'),
      address_id: address.id,
    });

    // Pedido fictício
    await db.order.create({
      installments: 2,
      status: 'opened',
      quantity: 1,
      customer_id: customer.id,
      product_id: product.id,
    });

    console.log('✅ Seed finalizado com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao rodar o seed:', error);
  }
}

// Chamada da função async
runSeed();
