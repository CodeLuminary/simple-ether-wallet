const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

router.post('/login',(req,res)=>{
    accountController.loginUser(req.body)
    .then(result=>res.send(result))
})

router.post('/register',(req,res)=>{
    accountController.registerUser(req.body)
    .then(result=>res.send(result))
}) 

module.exports = router;