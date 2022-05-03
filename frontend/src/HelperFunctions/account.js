import Api from "../Api";

export const loginUser = (loginDetails) =>{
    return new Promise((resolve,reject)=>{
        Api.PostApi('/account/login', {
            email: loginDetails.email,
            password: loginDetails.password
        })
        .then(response=>response.json())
        .then(result=>{
            resolve(result)
        })
        .catch(error=>{
            reject(error);
        })
    })
    
}