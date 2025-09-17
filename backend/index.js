const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sql = require('mssql/msnodesqlv8');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MSSQL database connection with Windows Authentication
const dbConfig = {
    server: "SRI-ITSW-PC01\\SQLEXPRESS", // Use double backslash for escape
    database: "intranet_db",
    driver: "msnodesqlv8",
    options: { // Fixed typo: 'option' -> 'options'
        trustedConnection: true, // Set to true for Windows Authentication
        trustServerCertificate: true,
        enableArithAbort: true,
        instanceName: "SQLEXPRESS" // Fixed typo: 'instancename'
    },
    port: 1433
};

// For Windows Authentication, remove user and password
delete dbConfig.user;
delete dbConfig.password;

// Connect to MSSQL  
sql.connect(dbConfig, (err) => {
    if (err) {
        console.error('Database connection failed:', JSON.stringify(err, null, 2));
    } else {
        console.log('MSSQL database connection is successful');
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const sql = require('mssql/msnodesqlv8');

// const app = express();

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // MSSQL database connection with Windows Authentication
// const dbConfig = {
//     server: 'SRI-ITSW-PC01\\SQLEXPRESS',   //SRI-ITSW-PC01\SQLEXPRESS
//     database: 'intranet_db',
//     //driver: 'msnodesqlv8', // Specify the driver
//     options: {
//         trustedConnection: true, // Use trustedConnection for Windows Authentication
//          // Add these two lines to fix the certificate error
//         encrypt: true, // Enable encryption
//         trustServerCertificate: true // Trust the self-signed certificate
//     },
// //    port: 1433, // This port is often not needed with named pipes
// };

// // Connect to MSSQL  
// sql.connect(dbConfig, (err) => {
//     if (err) {
//         console.error('Database connection failed:', err.message);
//     } else {
//         console.log('MSSQL database connection is successful');
//     }
// });





// const PORT = 3001;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// // Change the import to use the pure JS version of the mssql driver
// const sql = require('mssql'); 

// const app = express();

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());
// app.use('/uploads', express.static('uploads'));

// // MSSQL database connection with SQL Server Authentication
// const dbConfig = {
//     server: 'SRI-ITSW-PC01\\SQLEXPRESS', // Correctly escaped backslash
//     database: 'intranet_db',
//     // user: 'test',
//     // password: '123456',
//     options: {
//         encrypt: false,
//         trustServerCertificate: true,
//     },
//     port: 1433,
// };

// // Connect to MSSQL  
// sql.connect(dbConfig, (err) => {
//     if (err) {
//         console.error('Database connection failed:', err);
//     } else {
//         console.log('MSSQL database connection is successful');
//     }
// });

// const PORT = 3001;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });