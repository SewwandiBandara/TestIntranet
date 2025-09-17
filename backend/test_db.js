const sql = require('mssql/msnodesqlv8');

const dbConfig = {
    server: 'SRI-ITSW-PC01\\SQLEXPRESS',
    database: 'intranet_db',
    driver: 'msnodesqlv8',
    options: {
        trustedConnection: true
    }
};

sql.connect(dbConfig, err => {
    if (err) {
        console.error('Connection failed:', err);
    } else {
        console.log('Connection successful!');
    }
    sql.close();
});