const sql = require('mssql');

async function setupDatabase() {
    try {
        // Connect with Windows Authentication first (more likely to have admin rights)
        await sql.connect({
            server: 'IT-SOFTWARE1\\SOFTWARE1',
            options: { 
                encrypt: false, 
                trustServerCertificate: true,
                integratedSecurity: true 
            }
        });

        console.log('Connected with Windows Auth, setting up database...');

        // Create database if it doesn't exist
        const dbExists = await sql.query`SELECT name FROM sys.databases WHERE name = 'intranet_db'`;
        if (dbExists.recordset.length === 0) {
            await sql.query`CREATE DATABASE intranet_db`;
            console.log('✅ Created intranet_db database');
        }

        // Create login if it doesn't exist
        const loginExists = await sql.query`SELECT name FROM sys.server_principals WHERE name = 'SOFTWARE1'`;
        if (loginExists.recordset.length === 0) {
            await sql.query`CREATE LOGIN [SOFTWARE1] WITH PASSWORD = 'sof123', CHECK_POLICY = OFF`;
            console.log('✅ Created SOFTWARE1 login');
        }

        // Enable login
        await sql.query`ALTER LOGIN [SOFTWARE1] ENABLE`;

        // Grant access to database
        await sql.query`USE intranet_db`;
        await sql.query`CREATE USER [SOFTWARE1] FOR LOGIN [SOFTWARE1]`;
        await sql.query`ALTER ROLE db_owner ADD MEMBER [SOFTWARE1]`;
        
        console.log('✅ Database setup complete!');
        
    } catch (err) {
        console.error('Setup failed:', err.message);
    } finally {
        await sql.close();
    }
}

setupDatabase();