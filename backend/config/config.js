const dotenv = require('dotenv');

dotenv.config();

const getDbData = () =>{
    return {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD.toString(),
        //password: '',
        database: process.env.DB_DATABASE
    }
}

const getEmailData = () =>{
    return{
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_POST,
        user: process.env.EMAIL_USER,
        password: process.env.EMAIL_PASSWORD,
        sender: process.env.EMAIL_SENDER
    }
}

module.exports = {
    getDbData,
    getEmailData
}