const crypt = require('bcryptjs');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit')

    const symbols = [';','=','"',"'",'<','>','.']
    const hashString = async (str) =>{
        return new Promise((resolve,reject)=>{
            crypt.hash(str,10, (err,hash)=>{
                if(err){
                    reject(err);
                }
                else{
                    resolve(hash)
                }
            });
        }) 
    }
    const compareHash = async (str,hash) =>{
        return new Promise((resolve, reject)=>{
            crypt.compare(str, hash, (err,result)=>{
                if(err){
                    reject(err);
                }
                else{
                    resolve(result)
                }
            });
        });
    }
    const scanText = (str)=>{ //This method need to be refactored
        for(let i = 0; i < str.length; i++){
            for(let k = 0; k < this.symbols.length; k++){
                if(str[i] === symbols[k]){
                    return str.split(symbols[k])[0];
                }
            }
        }
        return str;
    }
    const limitRequest = (app,dur,maxNumber)=>{
        const limiter = rateLimit({
            windowMs: dur*60*1000,
            max: maxNumber
        });
        app.use(helmet());
        app.use(limiter)
    }

module.exports = {
    hashString,
    compareHash,
    scanText,
    limitRequest
}