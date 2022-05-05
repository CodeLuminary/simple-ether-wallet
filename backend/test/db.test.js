const {syncDatabase} = require('../models/tables');

test('Connect to db',async ()=>{
    const result = await syncDatabase();

    expect(result).toBe('Tables created successfully');
})