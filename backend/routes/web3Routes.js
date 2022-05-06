const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyJwtToken')
const web3Controller = require('../controllers/web3Controller'); 

router.post('/transfer-ether',verifyToken, (req,res)=>{
    req.body.userId = req.data.user.id;
    web3Controller.transferEther(req.body)
    .then(result=>res.send(result));
})
router.post('/get-ether-balance', verifyToken, (req,res)=>{
    req.body.userId = req.data.user.id;
    web3Controller.getEtherWalletBalance(req.body)
    .then(result=>res.send(result));
})
router.post('/create-ether-wallet', verifyToken, (req,res)=>{
    req.body.userId = req.data.user.id;
    web3Controller.createEtherAccount(req.body)
    .then(result=>res.send(result))
})
router.post('/transfer-ether-to-user', verifyToken, (req,res)=>{
    req.body.userId = req.data.user.id;
    web3Controller.transferEtherFromContractToUser(req.body)
    .then(result=>res.send(result));
})
router.get('/get-contract-balance', verifyToken, (req,res)=>{
    web3Controller.getContractBalance()
    .then(result=>res.send(result));
})

module.exports = router;