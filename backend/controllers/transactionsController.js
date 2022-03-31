const web3 = require('web3');
const {getContractInfo, getContractAddress,getCurrentDateTimeInDatabaseFormat, getWeb3Url} = require('../config/config');
const filename = "userController.js";

class TransactionsController{
    static transferEther = async (userObject)=>{
        const web = new web3(getWeb3Url());
        //const networkId = await web.eth.net.getId();

        const transaction = {
            from: userObject.address,
            to: getContractAddress(),
            value: web3.utils.toWei(userObject.value,'ether'),
            //chainId: result,
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
}

module.exports = TransactionsController;