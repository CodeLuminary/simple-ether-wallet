const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyJwtToken')
const transactionsController = require('../controllers/transactionsController'); 

router.post('/transfer-ether',verifyToken, (req,res)=>{
    req.body.userId = req.data.user.id;
    transactionsController.transferEther(req.body)
    .then(result=>res.send(result));
})
router.post('/get-ether-balance', verifyToken, (req,res)=>{
    req.body.userId = req.data.user.id;
    transactionsController.getEtherWalletBalance(req.body)
    .then(result=>res.send(result));
})
router.post('/create-ether-wallet', verifyToken, (req,res)=>{
    req.body.userId = req.data.user.id;
    transactionsController.createEtherAccount(req.body)
    .then(result=>res.send(result))
})
router.post('/transfer-ether-to-user', verifyToken, (req,res)=>{
    req.body.userId = req.data.user.id;
    transactionsController.transferEtherFromContractToUser(req.body)
    .then(result=>res.send(result));
})
router.get('/get-contract-balance', verifyToken, (req,res)=>{
    transactionsController.getContractBalance()
    .then(result=>res.send(result));
})

module.exports = router;