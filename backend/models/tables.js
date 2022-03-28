const Sequelize = require("sequelize");
const {connectToDB} = require("../models/dbConnect");

const db = connectToDB();

const Users = db.define('users',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    email:{
        type: Sequelize.STRING(100),
        allowNull: false
    },
    password: {
        type: Sequelize.STRING(200),
        allowNull: false
    },
    wallet: {
        type: Sequelize.TEXT
    }
})

module.exports = {
    db,
    Users
}