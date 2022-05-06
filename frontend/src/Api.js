class restApi{
    //Set domain name here
    static domain = process.env.BACKEND_URL;
    //static domain = "http://localhost:8000"
    static domainState = true;

    static PostApi(url, requestObject, shouldAddAuthorization=false, isDomainUsed=restApi.domainState){   
        if(!navigator.onLine){alert("You are offline"); return}
        if(!isDomainUsed){
            url = restApi.domain + url;
        }
       // console.log(requestObject)
        return fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: shouldAddAuthorization ? {
                'Authorization': 'Bearer ' + sessionStorage.getItem('eduplus_tkn'),
                'Content-Type': 'application/json'
            } : {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestObject)
        });
    }
    
    static getApi(url,authorizationString=false,isDomainUsed = restApi.domainState){
        if(!isDomainUsed){
            url = restApi.domain + url;
        }

        return fetch(url,{
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            headers: authorizationString && {
                'Authorization': 'Bearer ' + sessionStorage.getItem('eduplus_tkn'),
            }
        })
    }

    static PostFormData(url, requestObject, shouldAddAuthorization=false, isDomainUsed=restApi.domainState){
        if(!isDomainUsed){
            url = restApi.domain + url;
        }

        return new Promise((resolve,reject)=>{
            let xhhtp = new XMLHttpRequest();
            xhhtp.onreadystatechange = function(){   
                console.log(`state: ${this.readyState} | status: ${this.status}`)               
                if (this.readyState == 4 && this.status == 200){
                    let res = JSON.parse(xhhtp.responseText)
                    //console.log(res)  
                        resolve(res)                          
                }
                else if(this.status == 403){
                    resolve({
                        isSuccessful: false
                    })
                }
            }
            xhhtp.open("POST", url, true); 
            if(shouldAddAuthorization){
                xhhtp.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem('eduplus_tkn'));
            }
            xhhtp.send(requestObject);
        })

    }

    static PostFormData2(url, requestObject, shouldAddAuthorization=false, isDomainUsed=restApi.domainState){
        if(!isDomainUsed){
            url = restApi.domain + url;
        }

        return fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: shouldAddAuthorization ? {
                'Authorization': 'Bearer ' + sessionStorage.getItem('eduplus_tkn'),
                'Content-Type': 'multipart/form-data'
            } : {
                //'Content-Type': 'application/json'
            },
            body: requestObject
        });

        /*return new Promise((resolve,reject)=>{
            let xhhtp = new XMLHttpRequest();
            xhhtp.onreadystatechange = function(){                  
                if (this.readyState == 4 && this.status == 200){
                    let res = JSON.parse(xhhtp.responseText)
                    //console.log(res)  
                    if(res.isSuccessful){
                        resolve(res)                        
                    }    
                }
                else if(this.status == 403){
                    resolve({
                        isSuccessful: false
                    })
                }
            }
            xhhtp.open("POST", url, true); 
            if(shouldAddAuthorization){
                xhhtp.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem('eduplus_tkn'));
            }
            xhhtp.send(requestObject);
        })*/

    }
}
export default restApi;