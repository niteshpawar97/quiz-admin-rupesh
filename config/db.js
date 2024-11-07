const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Check connection at startup
db.getConnection()
    .then(() => console.log('Connected to MySQL database'))
    .catch((err) => console.error('MySQL connection error:', err));
    
module.exports = db;