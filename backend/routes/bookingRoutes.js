const express = require('express')
const {
  createBooking,
  getBookings,
  getAvailableTickets,
} = require('../controllers/bookingController')

const router = express.Router()

router.post('/book', createBooking)
router.get('/bookings', getBookings)
router.get('/tickets', getAvailableTickets)

module.exports = router
