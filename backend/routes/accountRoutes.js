const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyJwtToken')
const accountController = require('../controllers/accountController');

router.post('/login',(req,res)=>{
    accountController.login(req.body)
    .then(result=>res.send(result))
})

router.post('/register',(req,res)=>{
    accountController.register(req.body)
    .then(result=>res.send(result))
}) 

router.post('transfer-ether',verifyToken, (req,res)=>{
    req.body.user_id = req.data.user.id;
    accountController.transferEther(req.body)
    .then(result=>res.send(result));
})

module.exports = router;