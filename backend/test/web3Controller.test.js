const wallet = require('../controllers/transactionsController');

test('Test creation of wallet',async ()=>{
    const result = await wallet.createEtherAccount({userId: 1})
    expect(result.data).toBe('Successful');
})