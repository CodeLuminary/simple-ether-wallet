const errorLogger = require('../data/errorLogger')
const {Users} = require('../models/tables')
const {getSecretKey, getCurrentDateTimeInDatabaseFormat} = require('../config/config');
const {hashString, compareHash} = require('../logic/security');
const jwt = require('jsonwebtoken');
//const mailer = require('../logic/email');
const Cryptr = require('cryptr');


let cryptr = new Cryptr(getSecretKey()); 


/*    const transaction = {
        from: myAddress,
        to: getContractAddress(),
        value: web3.utils.toWei("2",'ether'),
        //chainId: result,
        gas: 50000,
        nonce: await web.eth.getTransactionCount(myAddress, 'latest')
    }

    web.eth.accounts.signTransaction(transaction,'971f3a80dc7b07dc16b1f69c6094d9eb989ca8590948ffc6a97aa21054a664c1')
    .then(result=>{
        console.log(result,"result");

       web.eth.sendSignedTransaction(result.rawTransaction,(error,hash)=>{
            if(error){
                console.log(error, "inner Error")
            }
            else{
                console.log(hash, "inner result")
            }
        })
    })
    .catch(error=>{
        console.log(error, 'error')
    })
*/

//console.log(web3.utils.toWei("1",'ether'), "web3")

 
//const ct = new web.eth.Contract(getContractInfo().abi, getContractAddress());

class AccountController{
    static signToken = async (obj, secretKey, parameters) =>{
        return new Promise((resolve, reject)=>{
            jwt.sign(obj, secretKey, parameters, (err,token)=>{
                if(err){
                    errorLogger.constructDetailedError(filename, 'registerUser', errorObject);
                    reject(err);
                }
                else{
                    resolve(token);
                }
            });
        });       
    }

    static registerUser = async (userObject)=>{
        return new Promise(async (resolve,reject)=>{
            let user;
            try{                   
                user = await Users.findOne({attributes: ['email'],where: {email: userObject.email}})
                
                if(user == null){
                    
                    userObject.is_verified = 1;
                    userObject.is_enabled = 1
                    userObject.createdAt = getCurrentDateTimeInDatabaseFormat();
                    userObject.password = await hashString(userObject.password); 

                    Users.create(userObject)
                                   
                        //let encryptStr = cryptr.encrypt(userObject.email);
                        //Email data need to be setup
                       /* mailer.sendMail(userObject.email, "EMAIL VERIFICATION", `
                            Please click the link below to verify your email<br />
                            <a href="">Verify email</a>
                        `);*/
                            
                    resolve({
                        isSuccessful: true,
                        status_code: 200,
                        message: "User registration successful."
                    })       
                }
                else{
                    resolve({
                        isSuccessful:false,
                        message: 'Action Failed. Email/Phone Number Already Exist',
                        status_code: 200
                    });
                }
            }
            catch(errorObject){
                errorLogger.constructDetailedError(filename, 'registerUser', errorObject);
                resolve({
                    message: "server error",
                    status_code: 500
                });
            }
        })   
              
    }

    static loginUser = async (userObject)=>{
        return new Promise(async (resolve,reject)=>{
            let user;
            try{  
                    user = await Users.findOne({where: {email: userObject.email}})
                    if(user != null){
                        const isEqual = await compareHash(userObject.password, user.dataValues.password);  
                        if(isEqual){
                            if(user.dataValues.is_email_verified){
                                if(user.dataValues.is_enabled){
                                    const token = await AccountController.signToken({user:user.dataValues},getSecretKey(), {expiresIn: '300000'});
                                    resolve({
                                        isSuccessful: true,
                                        message: "User login successful",
                                        status_code: 200,
                                        user: {
                                            name: userObject.email
                                        },
                                        token: token
                                        
                                    });
                                }
                                else{
                                    resolve({
                                        isSuccessful: false,
                                        status_code: 403,
                                        message: "Account disabled, Please contact admin. Thanks",
                                    });
                                }
                            }
                            else{
                                resolve({
                                    isSuccessful: false,
                                    status_code: 405,
                                    message: `Login failed. Please verify your email`
                                });
                            }
                        }
                        else{
                            resolve({
                                isSuccessful:false,
                                status_code: 406,
                                message: "Wrong login details"
                            });
                        }
                    }
                    else{
                        resolve({
                            isSuccessful:false,
                            status_code: 407,
                            message: "Wrong login details"
                        });
                    }
    
                //db.closeDb();
            }
            catch(errorObject){
                errorLogger.constructDetailedError(filename, 'loginUser', errorObject);
                resolve({
                    message: "server error",
                    status_code: 500
                });
            }
        });
    }
}

module.exports = AccountController;