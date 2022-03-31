const errorLogger = require('../data/errorLogger')

//const web = new web3(getWeb3Url());

/*web.eth.net.getId()
.then(async (result)=>{
    console.log(result, 'result')

    const transaction = {
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
})
.catch(err=>{
    console.log(err,'err') 
})*/



//var ac = web.eth.accounts.create()
//console.log(ac, "account")
/*
    {
  address: '0x412f2d3e68153FCed6e1a54A8bc7f015b3AF401B',
  privateKey: '0x02cf38e42116f3a7e0a6fc5f3921d1350df8a54d003eaa9fa90375826a85777d',
  signTransaction: [Function: signTransaction],
  sign: [Function: sign],
  encrypt: [Function: encrypt]
} account
*/

console.log(web3.utils.toWei("1",'ether'), "web3")

/*web.eth.sendTransaction({
    from: 0x8B33D5952aF610545311f33C62F55a11623B46CB,
    to: getContractAddress(),
    value: web3.utils.toWei("1",ether)
})*/


 
//const ct = new web.eth.Contract(getContractInfo().abi, getContractAddress());

class AccountController{

    static registerUser = async (userObject)=>{
           
    }

    static loginUser = async (userObject)=>{
        
    }
}

module.exports = AccountController;