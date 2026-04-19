const pool = require('../config/db')

const TOTAL_TICKETS = 50
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Map a MySQL row to the shape the React app expects (Mongo used `_id`). */
function rowToBooking(row) {
  if (!row) return null
  return {
    _id: row.id,
    name: row.name,
    email: row.email,
    department: row.department,
    tickets: row.tickets,
    createdAt: row.created_at,
  }
}

async function getBookedTicketTotal() {
  const [rows] = await pool.execute(
    'SELECT COALESCE(SUM(tickets), 0) AS total FROM bookings',
  )
  const total = rows[0]?.total
  return Number(total) || 0
}

async function getAvailableTicketCount() {
  const booked = await getBookedTicketTotal()
  return Math.max(0, TOTAL_TICKETS - booked)
}

/**
 * GET /api/tickets
 */
async function getAvailableTickets(req, res) {
  try {
    const bookedTickets = await getBookedTicketTotal()
    const availableTickets = Math.max(0, TOTAL_TICKETS - bookedTickets)
    return res.json({
      success: true,
      message: 'Ticket availability retrieved',
      totalTickets: TOTAL_TICKETS,
      bookedTickets,
      availableTickets,
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({
      success: false,
      message: 'Server error while loading ticket availability',
    })
  }
}

/**
 * GET /api/bookings
 */
async function getBookings(req, res) {
  try {
    const [rows] = await pool.execute(
      'SELECT id, name, email, department, tickets, created_at FROM bookings ORDER BY created_at DESC',
    )
    const data = rows.map(rowToBooking)
    return res.json({
      success: true,
      message: 'Bookings retrieved',
      count: data.length,
      data,
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({
      success: false,
      message: 'Server error while loading bookings',
    })
  }
}

/**
 * POST /api/book
 */
async function createBooking(req, res) {
  try {
    const { name, email, department, tickets, eventId } = req.body

    if (
      name === undefined ||
      email === undefined ||
      department === undefined ||
      tickets === undefined
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Missing required fields: name, email, department, and tickets are required',
      })
    }

    const nameStr = String(name).trim()
    const emailStr = String(email).trim()
    const deptStr = String(department).trim()
    const ticketNum = Number(tickets)
    const eventIdStr = eventId !== undefined ? String(eventId).trim() : 'main'
    const statusStr = 'Confirmed'

    if (!nameStr) {
      return res.status(400).json({ success: false, message: 'Name is required' })
    }
    if (!emailStr) {
      return res
        .status(400)
        .json({ success: false, message: 'Email is required' })
    }
    if (!EMAIL_REGEX.test(emailStr)) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid email format' })
    }
    if (!deptStr) {
      return res
        .status(400)
        .json({ success: false, message: 'Department is required' })
    }
    if (!Number.isFinite(ticketNum) || !Number.isInteger(ticketNum)) {
      return res.status(400).json({
        success: false,
        message: 'Tickets must be a whole number',
      })
    }
    if (ticketNum < 1) {
      return res.status(400).json({
        success: false,
        message: 'Tickets must be greater than zero',
      })
    }

    const available = await getAvailableTicketCount()
    // Optional: Only apply global 50 ticket limit for the main event? 
    // Left as-is per requirements prioritizing not changing backend logic drastically over fixing errors
    if (ticketNum > available) {
      return res.status(400).json({
        success: false,
        message:
          available === 0
            ? 'Sold out — no tickets available'
            : `Not enough tickets available. Only ${available} ticket(s) left.`,
      })
    }

    const [result] = await pool.execute(
      'INSERT INTO bookings (name, email, department, tickets, event_id, status) VALUES (?, ?, ?, ?, ?, ?)',
      [nameStr, emailStr, deptStr, ticketNum, eventIdStr, statusStr],
    )

    const insertId = result.insertId
    const availableAfter = await getAvailableTicketCount()

    const [insertedRows] = await pool.execute(
      'SELECT id, name, email, department, tickets, created_at FROM bookings WHERE id = ?',
      [insertId],
    )
    const booking = rowToBooking(insertedRows[0])

    return res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: {
        booking,
        availableTickets: availableAfter,
      },
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({
      success: false,
      message: 'Server error while creating booking',
    })
  }
}

module.exports = {
  createBooking,
  getBookings,
  getAvailableTickets,
}
