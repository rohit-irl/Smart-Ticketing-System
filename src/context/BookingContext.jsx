import { createContext, useContext, useState } from 'react'
import {
  DEFAULT_AVAILABLE_TICKETS,
  EVENT_NAME,
  PRICE_PER_TICKET,
} from '../constants/bookingConfig'

const BookingContext = createContext(null)

export function BookingProvider({ children }) {
  const [availableTickets, setAvailableTickets] = useState(
    DEFAULT_AVAILABLE_TICKETS,
  )
  const [bookingData, setBookingData] = useState(null)

  /**
   * Applies a successful booking: stores summary and reduces inventory.
   * Call only after client-side validation passes.
   */
  function completeBooking({ name, email, department, tickets }) {
    const ticketCount = Number(tickets)
    const totalAmount = ticketCount * PRICE_PER_TICKET

    setAvailableTickets((prev) => prev - ticketCount)
    setBookingData({
      name: name.trim(),
      email: email.trim(),
      department,
      ticketCount,
      eventName: EVENT_NAME,
      pricePerTicket: PRICE_PER_TICKET,
      totalAmount,
    })
  }

  /** Sets the remaining ticket count (e.g. admin reset or sync). */
  function updateTickets(nextCount) {
    setAvailableTickets(Math.max(0, Number(nextCount) || 0))
  }

  /** Clears the last booking summary (e.g. before a new session). */
  function clearBookingData() {
    setBookingData(null)
  }

  const value = {
    availableTickets,
    bookingData,
    completeBooking,
    updateTickets,
    clearBookingData,
    eventName: EVENT_NAME,
    pricePerTicket: PRICE_PER_TICKET,
  }

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components -- hook colocated with provider
export function useBooking() {
  const ctx = useContext(BookingContext)
  if (!ctx) {
    throw new Error('useBooking must be used within a BookingProvider')
  }
  return ctx
}
