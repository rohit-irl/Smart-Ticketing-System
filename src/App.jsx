import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import EventDetails from './pages/EventDetails'
import Booking from './pages/Booking'
import Confirmation from './pages/Confirmation'
import About from './pages/About'
import Payment from './pages/Payment'
import EventBot from './components/EventBot'

function App() {
  const [isBotOpen, setIsBotOpen] = useState(false)

  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col bg-slate-50">
        <Navbar isBotOpen={isBotOpen} setIsBotOpen={setIsBotOpen} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/event" element={<EventDetails />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <EventBot isOpen={isBotOpen} setIsOpen={setIsBotOpen} />
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
