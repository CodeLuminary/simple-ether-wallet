const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const os = require('os');
const cluster = require('cluster');
const accountRoutes = require('./routes/accountRoutes');


const app = express();
const numCpu = os.cpus().length;

if(process.env.NODE_ENV === 'production'){
    allSettled = require('promise.allsettled');
    allSettled.shim();
    app.use(cors(
        {origin: '*'}
     ));
}
else{
    app.use(cors());
}
app.use(bodyParser.json());
app.use(express.static(__dirname));

app.use('/account',accountRoutes);

app.all('/*',(req,res)=>{
     res.status(404).send({
         404: 'Not Found!'
     })
     //res.sendFile(path.join(__dirname,'static/error-page.html'))  
 })

 if(cluster.isMaster){
    for(let i = 0; i < numCpu; i++){
        cluster.fork()
    }
 }
 else{
    if(process.env.NODE_ENV === 'production'){
        app.listen();
    }
    else{
        const port = process.env.PORT || 8000;
        app.listen(port, () =>{
            console.log(`Server ${process.pid} started on port ${port}`)
        });
    }
 }