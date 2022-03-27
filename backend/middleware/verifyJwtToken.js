const jwt = require('jsonwebtoken');
const {getSecretKey} = require('../config/config');
const errorLogger = require('../data/errorLogger');

const filename="verifyJwtToken"

const verifyToken = (req,res,next)=>{
    const bearerHeader = req.headers["authorization"];
    
    if(bearerHeader !== undefined){
        const bearer = bearerHeader.split(' ');
        //Get token from array
        const bearerToken = bearer[1];

        if(bearerToken !=null){
            jwt.verify(bearerToken, getSecretKey(), (err, data)=>{
                if(err){
                   // errorLogger.constructDetailedError(filename, 'verifyToken', err);
                    res.send({
                        isSuccessful: false,
                        status: 403,
                        message: 'User could not be verify'
                    })
                }

                req.data = data;
                //Next middleware
                next();
            })
        }
        //req.token = bearerToken;   
    }
    else{
        res.sendStatus(403);
    }
}
module.exports = verifyToken;