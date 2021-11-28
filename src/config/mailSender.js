const nodemailer = require('nodemailer');
const dotEnv = require('dotenv');

dotEnv.config();

const sender = nodemailer.createTransport({
    host: process.env.MAIL_SMTP,
    port: process.env.MAIL_PORT,
    secure: false,
    secureConnection: false,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PWD
    }
});

module.exports = sender;