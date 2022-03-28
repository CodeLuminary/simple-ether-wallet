const {getDbData}  = require("../config/config");
const Sequelize = require("sequelize");

const connectToDB = () =>{
    const db = getDbData();
    const sequelize = new Sequelize(db.database, db.user, db.password,{
        dialect: 'mysql',
        host: db.host
    });

    return sequelize;
}

module.exports = connectToDB;