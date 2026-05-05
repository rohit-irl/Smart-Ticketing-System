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
import Login from './pages/Login'
import { AuthProvider, useAuth } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

function AppContent() {
  const [isBotOpen, setIsBotOpen] = useState(false)
  const { user } = useAuth()

  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col bg-slate-50">
        {user && <Navbar isBotOpen={isBotOpen} setIsBotOpen={setIsBotOpen} />}
        <main className={`flex-1 ${!user ? 'flex items-center justify-center bg-slate-100' : ''}`}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/event" element={<ProtectedRoute><EventDetails /></ProtectedRoute>} />
            <Route path="/booking" element={<ProtectedRoute><Booking /></ProtectedRoute>} />
            <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
            <Route path="/confirmation" element={<ProtectedRoute><Confirmation /></ProtectedRoute>} />
            <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
          </Routes>
        </main>
        {user && <EventBot isOpen={isBotOpen} setIsOpen={setIsBotOpen} />}
        {user && <Footer />}
      </div>
    </BrowserRouter>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
