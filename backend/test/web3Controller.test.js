const wallet = require('../controllers/web3Controller');

/*
//This is commented out to avoid always creating a new wallet
//Uncomment to run test
test('Test creation of wallet',async ()=>{
    const result = await wallet.createEtherAccount({userId: 1})
    expect(result.data).toBe('Successful');
})*/
test('Get user wallet', async ()=>{
    const result = await wallet.getUserWallets({userId: 1});
    expect(result.message).toBe('Successful')
})
test('Get wallet balance', async ()=>{
    const result = await wallet.getEtherWalletBalance({address: '0x20c2c61f6731f9C242b90543BE7066Fb68f6dDfe'});
    expect(Number(result.balance)).toBeGreaterThanOrEqual(0);
})/*
//This is commented out in order not to drain your test account.
//Uncomment to run test
test('Test ether transfer', async ()=>{
    const result = await wallet.transferEther({
        address: '0x7862719A8354DC79B8aa9171329078e20aB2073d', //Set sender address
        reciever_address:'0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8',
        value: '5',
        private_key: '4f52923e9fd3627dde860f47c11f4f00984963558e2214d277f8e61da758f227'//Set sender private key
    })
    expect(result.message).toBe('Ether sent successfully');
})*/