const Sequelize = require("sequelize");
const connectToDB = require("./dbConnect");

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
    is_verified:{
        type: Sequelize.BOOLEAN,
        default: false
    },
    is_enabled:{
        type: Sequelize.BOOLEAN,
        default: true
    }
})

const Wallet = db.define('wallet',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    public_key:{type: Sequelize.TEXT, allowNull: false},
    private_key: {type: Sequelize.TEXT, allowNull: false},
    balance: {type: Sequelize.INTEGER}
})

Users.hasMany(Wallet)

const Transactions = db.define('transactions',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    hash: {type: Sequelize.TEXT, allowNull: false}
})

Users.hasMany(Transactions);

const syncDatabase= async()=>{
    return new Promise((resolve, reject)=>{
        db.sync().then(result=>{
            resolve('Tables created successfully')
        })
        .catch(err=>{
            //Resolve to avoid errors
            resolve(err)
        })
    })
}

module.exports = {
    db,
    Users,
    Transactions,
    Wallet,
    syncDatabase 
}