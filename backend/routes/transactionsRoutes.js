const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyJwtToken')
const transactionsController = require('../controllers/transactionsController'); 

router.post('/transfer-ether',verifyToken, (req,res)=>{
    req.body.user_id = req.data.user.id;
    transactionsController.transferEther(req.body)
    .then(result=>res.send(result));
})
router.post('/get-ether-balance', verifyToken, (req,res)=>{
    req.body.user_id = req.data.user.id;
    transactionsController.getEtherWalletBalance(req.body)
    .then(result=>res.send(result));
})

module.exports = router;