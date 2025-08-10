import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

console.log('Database configuration:', {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'root',
  database: process.env.DB_NAME || 'jinjoo_travel'
});

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'jinjoo_travel',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;
