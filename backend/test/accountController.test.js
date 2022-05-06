const account = require('../controllers/accountController')

test('Register a user', async ()=>{
    const result = await account.registerUser({
        email: 'johndoe@gmail.com',
        password: 'password'
    })
    expect(result.message).toBe('User registration successful.');
})