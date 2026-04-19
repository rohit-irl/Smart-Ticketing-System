require('dotenv').config()

const express = require('express')
const cors = require('cors')
const pool = require('./config/db')
const bookingRoutes = require('./routes/bookingRoutes')

const PORT = process.env.PORT || 5000

const app = express()

app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://127.0.0.1:5173',
      'http://localhost:4173',
      'http://127.0.0.1:4173',
    ],
    credentials: true,
  }),
)
app.use(express.json())

app.use('/api', bookingRoutes)

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server is running' })
})

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Not found' })
})

app.use((err, req, res, _next) => {
  console.error(err)
  res.status(500).json({
    success: false,
    message: err.message || 'Internal server error',
  })
})

async function start() {
  try {
    await pool.query('SELECT 1')
    console.log('MySQL connected')
  } catch (err) {
    console.error('MySQL connection error:', err.message)
    process.exit(1)
  }

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
  })
}

start()
