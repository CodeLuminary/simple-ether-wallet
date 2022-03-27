const dotenv = require('dotenv');

dotenv.config();

const getDbData = () =>{
    return {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD.toString(),
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

const getSecretKey = () =>{
    return process.env.SECRET_KEY
}

const getTimeZone = () =>{
    return process.env.TIME_ZONE;
}

//timezone should be in this format 1, -2
const getCurrentDateTime = (timezone) =>{
    const date = new Date();
    var newDate = new Date(timezone*60 * 60000 + date.valueOf() + (date.getTimezoneOffset()*60000))
    return newDate;
}

const getCurrentDateTimeInDatabaseFormat = () =>{
    let currentTime = getCurrentDateTime(getTimeZone());
    const dateTimeInDatabaseFormat = currentTime.toISOString().split('T')[0] + " " + currentTime.toString().split(' ')[4];
    return dateTimeInDatabaseFormat;
}

module.exports = {
    getDbData,
    getEmailData,
    getSecretKey,
    getTimeZone,
    getCurrentDateTime,
    getCurrentDateTimeInDatabaseFormat
}