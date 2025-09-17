const sql = require('mssql');

async function testConnection() {
    const config = {
        server: 'IT-SOFTWARE1\\SOFTWARE1',
        user: 'SOFTWARE1',
        password: 'sof123',
        options: { encrypt: false, trustServerCertificate: true }
    };

    try {
        console.log('Testing connection to master database...');
        await sql.connect(config);
        const result = await sql.query`SELECT name FROM sys.databases WHERE name = 'intranet_db'`;
        
        if (result.recordset.length > 0) {
            console.log('✅ intranet_db database exists!');
        } else {
            console.log('❌ intranet_db database does not exist');
        }
        
        await sql.close();
    } catch (err) {
        console.error('Connection failed:', err.message);
    }
}

testConnection();