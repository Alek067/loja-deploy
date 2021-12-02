require('dotenv').config();
const express = require('express');
const routers = require('./routes')
const { sequelize } = require('./models');
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use('/', routers)

sequelize.sync().then(() => {
    console.log('Successfully connected to the database')
})

app.listen(port, function () {
    console.log(`Connected server on port: ${port}`);
});
