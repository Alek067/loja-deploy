<h1 align="center"> Api Rest Clientes, Produtos e Pedidos - Nodejs </h1>

<h2>Índice</h2>

- <a href="#sobre">Sobre
    - <a href="#funcionalidades">Funcionalidades da API
- <a href="#tecnologias">Tecnologias
- <a href="#iniciando-projeto">Iniciando o Projeto
    - <a href="#requisitos">Pré-requisitos
    - <a href="#instalacao">Instalação
    - <a href="#uso">Uso
- <a href="#rotas">Rotas
- <a href="#contato">Contato

<hr>

<h2 id="sobre">Sobre</h2>

<p align="left">API Rest em Node.js, com banco de dados SQLite. Possui CRUD de clientes, produtos e pedidos. Possui registro de vendas, envia email ao comprador com as informações da compra e remove a quantidade de produtos comprados do estoque.
</p>

<p align="center">
<img src="http://img.shields.io/static/v1?label=STATUS&message= EM%20DESENVOLVIMENTO &color=&style=for-the-badge"/>
</p>

<hr>

<h3 id="funcionalidades">Funcionalidades da API:</h3>

- [x] cadastro de clientes, endereços e produtos
- [x] lista todos os clientes, produtos e pedidos
- [x] lista cliente e produtos por ID
- [x] atualiza cliente e produto
- [x] deleta cliente e produto
- [x] lista clientes inativos
- [x] reativa cliente inativo
- [x] adiciona produto no pedido
- [x] lista pedido por ID e status
- [x] atualiza quantidades de itens no pedido
- [x] finaliza pedido e envia email ao cliente
- [x] deleta produto do pedido

<hr>

<!-- TECHNOLOGIES -->

<h2 id="tecnologias">Tecnologias</h2>
  
  - [Javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
  - [NodeJS](https://nodejs.org/en/)
  - [SQLite3](https://www.sqlite.org/index.html)
  - [Framework Express](https://expressjs.com/pt-br/)
  - [ORM Sequelize](https://sequelize.org/)
  - [Nodemailer](https://nodemailer.com/about/)

<hr>

<h2 id="iniciando-projeto">Iniciando o Projeto</h2>

<h3 id="requisitos">Pré-requisitos</h3>

1. Node JS

  ```sh
  https://nodejs.org/en/
  ```

2. Npm ou Yarn

  ```sh
  https://www.npmjs.com/
  ```

3. SQLite3
  ```sh
  https://www.sqlite.org/index.html
  ```

<hr>


<h3 id="instalacao">Instalação</h3>

1. Clonar o repositório:

   ```sh
   git clone https://github.com/LaomaNogueira/api-store-nodejs-sqlite.git
   ```
   ```
   cd api-store-nodejs-sqlite
   ```

2. Instalar os pacotes:

   ```sh
   npm install
   ```
<hr>

<h3 id="uso">Uso</h3>

1. Copie o arquivo `.env.example`, renomeie para `.env`, crie suas variáveis de ambiente e substitua-as.


2. Subir o servidor:

   ```sh
   npm run dev
   ```


3. Rodar os testes conforme indicado abaixo.

<hr>

<h2 id="rotas">Rotas</h2>

Com a API em funcionamento, vamos rodar os testes via [Insomnia](https://insomnia.rest/download) (ou algum similar). Seguem os testes:


#### *POST*:

- __<u>Cadastrar novo cliente</u>__ - rota: *http://localhost:3001/customer*
  Preencher o JSON, conforme exemplo:

  ```
  {
    "name": "Ada Lovelace",                       |  Required   |   String   |
    "email": "ada_lovelace@bagy.com",             |  Required   |   String   |   Formato: email@corp.com. Email que não exista na base de dados
    "cpf": "061.354.777-22",                      |  Required   |   String   |   CPF válido e que não exista na base de dados
    "birthdate": "1815-12-10",                    |  Required   |   Date     |   Formato: YYYY-MM-DD
    "address":                                                  
      {
        "street": "Rua dos Programadores",        |  Required   |   String   |   
        "number": 842,                            |  Required   |   Integer  |
        "neighborhood": "Bairro",                 |  Required   |   String   |   
        "city": "Florianópolis",                  |  Required   |   String   |   
        "state": "Santa Catarina",                |  Required   |   String   |   
        "country": "Brasil",                      |  Required   |   String   |   
        "cep": 88676-230                          |  Required   |   String   |   8 ou 9 dígitos
      }
  }
  ```

  RETORNO:

  ```
  {
    "id": 1,
    "name": "Ada Lovelace",                         
    "email": "ada_lovelace@bagy.com",            
    "cpf": "061.354.777-22",                     
    "birthdate": "1815-12-10",               
    "address_id": 8,
    "updatedAt": "2021-11-28T21:35:01.931Z",
    "createdAt": "2021-11-28T21:35:01.931Z",                                               
  }
  ```


- __<u>Cadastrar novo produto</u>__ - rota: *http://localhost:3001/product*

  Preencher o JSON, conforme exemplo:

  ```
  {
    "name": "Notebook Acer Aspire 3",             |  Required   |   String   |
    "image": "https://amazon.com/images/5_.jpg",  |             |   String   |
    "description": "Notebook Acer Aspire 3",      |  Required   |   String   |
    "weight": 1500,                               |  Required   |   Integer  |
    "price": 2279.35,                             |  Required   |   Double   |
    "stock": 250                                  |  Required   |   Integer  |
  }
  ```

  RETORNO:

  ```
  {
    "id": 7,
    "name": "Notebook Acer Aspire 3",
    "image": "https://amazon.com/images/5_.jpg",
    "description": "Notebook Acer Aspire 3",
    "weight": 1500,
    "price": 2279.35,
    "stock": 250,
    "updatedAt": "2021-11-28T06:40:28.248Z",
    "createdAt": "2021-11-28T06:40:28.248Z"
  }
  ```


- __<u>Adicionar produto no pedido(criar pedido)</u>__ - rota: *http://localhost:3001/order*
  - Caso seja informado o mesmo ID de produto e de cliente, soma a quantidade no pedido aberto existente.
  
  Preencher o JSON, conforme exemplo:

  ```
  {
      "quantity": 1,                              |  Required   |   Integer  |
      "customer_id": 8,                           |  Required   |   Integer  |
      "product_id": 1                             |  Required   |   Integer  |
  }
  ```

  RETORNO:

  ```
  {
    "installments": 1,
    "status": "opened",
    "id": 8,
    "quantity": 1,
    "customer_id": 8,
    "product_id": 1,
    "updatedAt": "2021-11-28T21:35:38.026Z",
    "createdAt": "2021-11-28T21:35:38.026Z",
  }
  ```
  <hr>

#### *GET*:

- __<u>Listar clientes</u>__ - rota: *http://localhost:3000/customer*
  - Retornos JSON possíveis:
    - Caso seja informado o ID do cliente na query, retorna os dados do cliente específico;
    - Caso não, retorna todos os clientes;
    - Caso seja informado um ID inválido, retorna um array vazio.
  - Query:  id = INT
  
  RETORNO:
  
  ```
  [
    {
      "id": 1,
      "name": "Lourdes Suarez",
      "email": "lourdessuarez@dogtown.com",
      "cpf": "878.959.450-92",
      "birthdate": "1968-07-10T00:00:00.000Z",
      "createdAt": "2021-11-28T06:28:36.300Z",
      "updatedAt": "2021-11-28T06:28:36.300Z",
      "deletedAt": null,
      "AddressId": 1,
      "address_id": 1,
      "Address": {
        "id": 1,
        "street": "Rua Montauk Avenue",
        "number": 357,
        "neighborhood": "laborum sunt",
        "city": "Trinway",
        "state": "New Mexico",
        "country": "Greece",
        "cep": "33405-800",
        "createdAt": "2021-11-28T06:28:36.284Z",
        "updatedAt": "2021-11-28T06:28:36.284Z",
        "deletedAt": null
      }
    }
  ]
  ```

- __<u>Listar clientes inativos</u>__ - rota: *http://localhost:3000/customer/deleted*
  - Retorna JSON com todos os clientes inativos (deleted_at != null)
  
  RETORNO:

  ```
  [
    {
      "id": 1,
      "name": "Lourdes Suarez",
      "email": "lourdessuarez@dogtown.com",
      "cpf": "878.959.450-92",
      "birthdate": "1968-07-10T00:00:00.000Z",
      "createdAt": "2021-11-28T06:28:36.300Z",
      "updatedAt": "2021-11-28T06:28:36.300Z",
      "deletedAt": "2021-11-28T14:46:57.680Z"
    }
  ]
  ```

- __<u>Listar produtos</u>__ - rota: *http://localhost:3000/product*
  - Retornos JSON possíveis:
    - Caso seja informado o ID do produto na query, retorna os dados do produto específico;
    - Caso não, retorna todos os produtos;
    - Caso seja informado um ID inválido, retorna um array vazio.
  - Query:  id = INT

  RETORNO:

  ```
  [
    {
      "id": 1,
      "name": "Notebook Acer Aspire 3",
      "image": "https://m.media-amazon.com/images/I/51WT3cE89OS._AC_UL480_FMwebp_QL65_.jpg",
      "description": "Notebook Acer Aspire 3 A315-23-R6DJ AMD Ryzen 3 1TB HD 8GB RAM Windows 10",
      "weight": 1500,
      "price": 2279.35,
      "stock": 250,
      "createdAt": "2021-11-28T03:40:39.915Z",
      "updatedAt": "2021-11-28T03:40:39.915Z"
    }
  ]
  ```

- __<u>Listar todos os pedidos</u>__ - rota: *http://localhost:3000/order*
  - Retorna JSON com todos os pedidos cadastrados.
  
  RETORNO:

  ```
  [
    {
      "id": 1,
      "installments": 1,
      "status": "closed",
      "quantity": 15,
      "createdAt": "2021-11-28T20:21:21.527Z",
      "updatedAt": "2021-11-28T20:38:51.739Z",
      "customer_id": 3,
      "product_id": 4,
      "Product": {
        "id": 4,
        "name": "Notebook LG gram",
        "image": "https://m.media-amazon.com/images/I/61RImRBgXdS._AC_UL480_FMwebp_QL65_.jpg",
        "description": "Notebook LG gram, 1.130g, Intel Core i5-1035G7, 8GB DDR4, SSD 256GB, Windows 10 Home, IPS FHD 15,6\", TitÃƒÂ¢nio, 15Z90N-V.BJ51P1",
        "weight": 2300,
        "price": 1789.6,
        "stock": 65,
        "createdAt": "2021-11-28T03:45:00.479Z",
        "updatedAt": "2021-11-28T20:38:51.721Z"
      }
    }
    ```

- __<u>Listar pedido por cliente ou por status do pedido</u>__ - rota: *http://localhost:3000/order/{customerId}*
  - Retornos JSON possíveis:
    - Caso seja informado apenas o ID do cliente no parâmetro, retorna os pedidos do cliente específico;
    - Caso seja informado também o status do pedido na query, retorna todos os pedidos cliente específico, conforme o status informado;
    - Caso seja informado um ID inválido, retorna um array vazio.
  - Query: status = opened   ||   status = closed 
  
  RETORNO:

  ```
  [
    {
      "id": 1,
      "installments": 1,
      "status": "closed",
      "quantity": 15,
      "createdAt": "2021-11-28T20:21:21.527Z",
      "updatedAt": "2021-11-28T20:38:51.739Z",
      "customer_id": 3,
      "product_id": 4,
      "Product": {
        "id": 4,
        "name": "Notebook LG gram",
        "image": "https://m.media-amazon.com/images/I/61RImRBgXdS._AC_UL480_FMwebp_QL65_.jpg",
        "description": "Notebook LG gram, 1.130g, Intel Core i5-1035G7, 8GB DDR4, SSD 256GB, Windows 10 Home, IPS FHD 15,6\", TitÃƒÂ¢nio, 15Z90N-V.BJ51P1",
        "weight": 2300,
        "price": 1789.6,
        "stock": 65,
        "createdAt": "2021-11-28T03:45:00.479Z",
        "updatedAt": "2021-11-28T20:38:51.721Z"
      }
    }
    ```
  <hr>

#### *PUT*:

- __<u>Atualizar um cliente</u>__ - rota: *http://localhost:3001/customer/{customerId}*
  - Informar o ID do cliente a ser atualizado no parâmetro.
  - CPF não pode ser atualizado no cadastro, caso seja informado no corpo da requisição, retorna o erro: <code>400 { "message":"CPF cannot be changed" }</code>

  Preencher o JSON, conforme exemplo:

  ```
  {
    "name": "Ada Lovelace",                       |  Required   |   String   |
    "email": "ada_lovelace@bagy.com",             |  Required   |   String   |   Formato: email@corp.com. Email que não exista na base de dados
    "birthdate": "1815-12-10",                    |  Required   |   Date     |   Formato: YYYY-MM-DD
    "address":                                                  
      {
        "id": 8
        "street": "Rua dos Programadores",        |  Required   |   String   |   
        "number": 842,                            |  Required   |   Integer  |
        "neighborhood": "Bairro",                 |  Required   |   String   |   
        "city": "Florianópolis",                  |  Required   |   String   |   
        "state": "Santa Catarina",                |  Required   |   String   |   
        "country": "Brasil",                      |  Required   |   String   |   
        "cep": 88676-230                          |  Required   |   String   |   8 ou 9 dígitos
      }
  }
  ```

  RETORNO:

  ```
  {
    "id": 1,
    "name": "Ada Lovelace",                         
    "email": "ada_lovelace@bagy.com",            
    "cpf": "061.354.777-22",                     
    "birthdate": "1815-12-10",               
    "address_id": 8,
    "updatedAt": "2021-11-28T21:35:01.931Z",
    "createdAt": "2021-11-28T21:35:01.931Z",                                               
  }
  ```


- __<u>Reativar um cliente inativo (deleted_at != null)</u>__ - rota: *http://localhost:3001/customer/deleted/{customerId}*
  - Informar o ID do cliente a ser reativado no parâmetro da requisição.
  
  RETORNO:

  ```
  User successfully updated
  ```

- __<u>Atualizar produto</u>__ - rota: *http://localhost:3001/product/{productId}*

  Preencher o JSON, conforme exemplo:

  ```
  {
    "name": "Notebook Acer Aspire 3",             |  Required   |   String   |
    "image": "https://amazon.com/images/5_.jpg",  |             |   String   |
    "description": "Notebook Acer Aspire 3",      |  Required   |   String   |
    "weight": 1500,                               |  Required   |   Integer  |
    "price": 2279.35,                             |  Required   |   Double   |
    "stock": 250                                  |  Required   |   Integer  |
  }
  ```

  RETORNO:

  ```
  {
    "message": "Product successfully updated"
  }
  ```

- __<u>Finalizar pedido</u>__ - rota: *http://localhost:3001/order/finish-order/{customerId}*
  - Informar o ID do cliente a ser finalizado pedido, no parâmetro da requisição;
  - Retorna o número do pedido e o valor total do pedido;
  - Envia um email ao cliente com informações da compra;
  - Remove a quantidade de produtos comprados do estoque.
  
  RETORNO:

  ```
  {
    "order_number": 486778,
    "total_order": 4165.48,
    "message": "Order successfully closed"
  }
  ```
<hr>

#### *PATCH*:
- __<u>Atualizar quantidade de itens no pedido</u>__ - rota: *http://localhost:3001/order/{id}*
    - Informar o ID do pedido no parâmetro da requisição;
    - Caso seja informado um pedido com status *closed*, retorna: <code>400 { "message":"Order closed" }</code>
    
    Preencher o JSON com a nova quantidade do produto, conforme exemplo:

    ```
    {
      "quantity": 10
    }
    ```

    RETORNO:

    ```
    {
      "id": 5,
      "installments": 1,
      "status": "opened",
      "quantity": 10,
      "createdAt": "2021-11-28T20:22:34.111Z",
      "updatedAt": "2021-11-28T21:18:14.421Z",
      "customer_id": 5,
      "product_id": 7
    }
    ```
<hr>

#### *DELETE*:
- __<u>Deletar um cliente</u>__ - rota: *http://localhost:3001/customer/{customerId}*
  - Informar o ID do cliente a ser inativado (utilizado *soft delete*), no parâmetro da requisição.
  - Caso seja informado um ID que não existe na base de dados, retorna: 
  <code>400  {"message":"Customer not found"}</code>
  
  RETORNO:

  ```
  {
    "message": "Customer successfully deleted"
  }
  ```

- __<u>Deletar um produto</u>__ - rota: *http://localhost:3001/product/{productId}*
  - Informar o ID do produto a ser deletado, no parâmetro da requisição.
  - Caso seja informado um ID que não existe na base de dados, retorna: 
  <code>400  {"message":"Product not found"}</code>
  
  RETORNO:

  ```
  {
    "message": "Product successfully deleted"
  }
  ```

- __<u>Deletar produto do pedido</u>__ - rota: *http://localhost:3001/order{id}*
  - Informar o ID do pedido a ser deletado, no parâmetro da requisição.
  - Caso seja informado um pedido com status *closed*, retorna: 
  <code>400 {"message":"Isn't possible to exclude product from a completed order"}</code>
  
  RETORNO:

  ```
  {
    "message": "Order ID successfully deleted"
  }
  ```

<hr>

<!-- CONTACT -->

<h2 id="contato">Contato</h2>

#### Laoma Nogueira

<p align="left"> 🤝 Se tiver interesse em conversar comigo, será ótimo trocar uma ideia com você! Estes são os meus contatos: </p>

[![Github Badge](https://img.shields.io/badge/-Github-000?style=flat-square&logo=Github&logoColor=white&link=https://github.com/LaomaNogueira)](https://github.com/LaomaNogueira)
[![Linkedin Badge](https://img.shields.io/badge/-LinkedIn-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/laoma-nogueira/)](https://www.linkedin.com/in/laoma-nogueira/)
<a href="mailto:laomanogueira@gmail.com" alt="gmail" target="_blank">
<img src="https://img.shields.io/badge/-Gmail-FF0000?style=flat-square&labelColor=FF0000&logo=gmail&logoColor=white&link=mailto:laomanogueira@gmail.com" /></a>

<hr>
