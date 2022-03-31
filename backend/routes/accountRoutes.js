const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

router.post('/login',(req,res)=>{
    accountController.login(req.body)
    .then(result=>res.send(result))
})

router.post('/register',(req,res)=>{
    accountController.register(req.body)
    .then(result=>res.send(result))
}) 

module.exports = router;