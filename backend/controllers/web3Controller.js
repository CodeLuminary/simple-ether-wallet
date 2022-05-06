const web3 = require('web3');
const {getContractInfo, getSecretKey, getContractAddress,getCurrentDateTimeInDatabaseFormat, getWeb3Url} = require('../config/config');
const filename = "userController.js";
const {Wallet} = require("../models/tables");
const errorLogger = require('../data/errorLogger.js')

class Web3Controller{
    static transferEther = async (userObject)=>{
        const web = new web3(getWeb3Url());
        //const networkId = await web.eth.net.getId();


        const transaction = {
            from: userObject.address,
            to: userObject.reciever_address,
            value: web3.utils.toWei(userObject.value,'ether'),
            //chainId: networkId,
            gas: 500000,
            nonce: await web.eth.getTransactionCount(userObject.address, 'latest')
        } 

        return new Promise((resolve,reject)=>{
            web.eth.accounts.signTransaction(transaction, userObject.private_key)
            .then(result=>{
                //console.log(result,"result");

                web.eth.sendSignedTransaction(result.rawTransaction,(error,hash)=>{
                        if(error){                         
                            errorLogger.constructDetailedError(filename, 'transferEther', error);
                            resolve({
                                isSuccessful: false,
                                message: 'Server error',
                                status_code: 510
                            })
                        }
                        else{
                            resolve({
                                isSuccessful: true,
                                status_code: 200,
                                message: 'Ether sent successfully',
                                hash
                            })
                        }
                    })
            })
            .catch(error=>{
                errorLogger.constructDetailedError(filename, 'transferEther', error);
                resolve({
                    isSuccessful: false,
                    message: 'Server error',
                    status_code: 509
                })
            })
        })
    }

    static getEtherWalletBalance = async(userObject)=>{
        return new Promise(async (resolve, reject)=>{
            try{
                const web = new web3(getWeb3Url());
                const result = await web.eth.getBalance(userObject.address);    
                        //console.log(web3.utils.fromWei(result), "user Balance")
                resolve({
                    isSuccessful: true,
                    message: 'User balance gotten successfully',
                    status_code: 200,
                    balance: web3.utils.fromWei(result)
                })
                    

            }
            catch(error){
                errorLogger.constructDetailedError(filename, 'getEtherWalletBalance', error);
                resolve({
                    isSuccessful: false,
                    message: 'server error',
                    data: error
                })
            }
        })
    }

    static createEtherAccount = async (userObject) =>{
        
        return new Promise((resolve,reject)=>{
            try{
                const web = new web3(getWeb3Url());
                const newAccount = web.eth.accounts.create();

                Wallet.create({
                    userId: userObject.userId,
                    public_key: newAccount.address,
                    private_key: JSON.stringify(web.eth.accounts.encrypt(newAccount.privateKey, getSecretKey()))
                })
                .then(result=>{
                    resolve({
                        isSuccessful: true,
                        status_code: 200,
                        message: 'Account created successfully',
                        data: 'Successful',
                        account: {
                            key: newAccount.privateKey,
                            public_key: newAccount.address,
                            balance: '0'
                        }
                    })
                })
                .catch(error=>{
                    resolve({
                        isSuccessful: false,
                        message: 'server error',
                        data: error
                    })
                })
            }
            catch(error){
                errorLogger.constructDetailedError(filename, 'createEtherAccount', error);
                resolve({
                    isSuccessful: false,
                    message: 'server error',
                    data: error
                })
            }
        })

            /* FORMAT OF THE ACCOUNT (the newAccount variable)
                {
                    address: '0x412f2d3e68153FCed6e1a54A8bc7f015b3AF401B',
                    privateKey: '0x02cf38e42116f3a7e0a6fc5f3921d1350df8a54d003eaa9fa90375826a85777d',
                    signTransaction: [Function: signTransaction],
                    sign: [Function: sign],
                    encrypt: [Function: encrypt]
                } 
            */
    }

    static getUserWallets = async (userObject)=>{
        return new Promise((resolve, reject)=>{
            try{
                const web = new web3(getWeb3Url());
                Wallet.findAll({where:{userId: userObject.userId}})
                .then(async (result)=>{
                    const resultLength = result.length;
                    const finalResult = result;
                    console.log(resultLength,'length')
                    for(let i = 0; i < resultLength; i++){
                        const encryptKey = JSON.parse(result[i].private_key)
                        const decryptKey = await web.eth.accounts.decrypt(encryptKey, getSecretKey()).privateKey
                        //finalResult[i].key = decryptKey;
                        const balance = await Web3Controller.getEtherWalletBalance({address: result[i].public_key});

                        result[i].dataValues.balance = balance.balance;
                        result[i].dataValues.key = decryptKey
                        
                    }
                    resolve({
                        isSuccessful: true,
                        message:'Successful',
                        data: result
                    })
                })
                .catch(error=>{
                    errorLogger.constructDetailedError(filename, 'getUserWallets', error);
                    resolve({
                        isSuccessful: false,
                        message: error,
                        data: error
                    })
                })
            }
            catch(error){
                errorLogger.constructDetailedError(filename, 'getUserWallets', error);
                resolve({
                    isSuccessful: false,
                    message: error, 
                    data: error
                })
            }
        })  
    }

    static transferEtherFromContractToUser = async (userObject)=>{
        const contractInfo = getContractInfo();
        const web = new web3(getWeb3Url());
        const smartContract = new web.eth.Contract(contractInfo.abi, getContractAddress());

        return new Promise((resolve, reject)=>{
            smartContract.methods.withdrawFromContract(userObject.value).send({
                sender: userObject.reciever_address,
                from: userObject.reciever_address
            })
            .then(result=>{
                resolve({
                    isSuccessful: true,
                    message: 'Ether transfer successful',
                    data: result
                })
            })
            .catch(error=>{
                errorLogger.constructDetailedError(filename, 'transferEtherFromContractToUser', error);
                resolve({
                    isSuccessful: false,
                    message: 'Action failed. Ether could not be transfered',
                    data:error
                });
            })
        })
    }

    static getContractBalance = async ()=>{
        const contractInfo = getContractInfo();
        const web = new web3(getWeb3Url());
        const smartContract = new web.eth.Contract(contractInfo.abi, getContractAddress());

        return new Promise((resolve, reject)=>{
            
            smartContract.methods.getContractEtherBalance().call()
            .then(result=>{
                resolve(result)
            })
            .catch(error=>{
                errorLogger.constructDetailedError(filename, 'transferEtherFromContractToUser', error);
                resolve(error);
            })
        })
    }
}

module.exports = Web3Controller;