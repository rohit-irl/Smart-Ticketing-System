const mysql = require('mysql2/promise')

/**
 * Shared pool for all controllers. Uses DB_* variables from .env
 * (database: ticket_system, table: bookings).
 */
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD ?? '',
  database: process.env.DB_NAME || 'ticket_system',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

module.exports = pool
