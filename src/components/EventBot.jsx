import React, { useState, useEffect, useRef } from 'react';
import './EventBot.css';
import { SAMPLE_EVENTS } from '../constants/bookingConfig';
import { fetchTicketAvailability } from '../services/bookingApi';

const EventBot = ({ isOpen, setIsOpen }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Welcome to EventBot! I can help you with booking tickets, upcoming events, cancellations, payments, and more. What do you need help with?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const quickReplies = [
    'Upcoming events',
    'How to book?',
    'Ticket prices',
    'Refund policy',
    'Any offers?',
    'Payment options',
  ];

  const handleSend = async (text) => {
    if (!text.trim()) return;

    const userMessage = {
      id: Date.now(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate bot thinking
    setTimeout(async () => {
      const response = await processIntent(text.toLowerCase());
      const botMessage = {
        id: Date.now() + 1,
        text: response.text,
        sender: 'bot',
        timestamp: new Date(),
        type: response.type,
        data: response.data,
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const processIntent = async (text) => {
    // 1. GREETING
    if (/hi|hello|hey|help|start/.test(text)) {
      return {
        text: 'Welcome to EventBot! I can help you with booking tickets, upcoming events, cancellations, payments, and more. What do you need help with?',
      };
    }

    // 2. BOOK A TICKET
    if (/book|buy|purchase|reserve|get ticket/.test(text)) {
      return {
        text: 'To book a ticket:\n1. Browse events on our homepage\n2. Select your preferred date and seat category\n3. Enter your details and complete payment\n4. You will receive your e-ticket via email instantly!\n\nWant to see what events are currently available?',
      };
    }

    // 3. AVAILABLE EVENTS
    if (/events|show events|upcoming|what is on|concert|match|festival|movie/.test(text)) {
      try {
        const availability = await fetchTicketAvailability().catch(() => null);
        const events = SAMPLE_EVENTS.map(event => ({
          ...event,
          availableTickets: availability?.availableTickets ?? event.availableTickets
        }));

        return {
          text: 'Here are the upcoming events I found for you:',
          type: 'events',
          data: events
        };
      } catch (error) {
        return { text: 'I am having trouble fetching events right now. Please try again later.' };
      }
    }

    // 4. TICKET PRICING
    if (/price|cost|how much|fee|charges|rate/.test(text)) {
      return {
        text: 'Here is the current pricing for our events:',
        type: 'pricing',
        data: SAMPLE_EVENTS
      };
    }

    // 5. CANCEL / REFUND
    if (/cancel|refund|money back|cancellation/.test(text)) {
      return {
        text: 'Our cancellation policy:\n• 48+ hours before event → Full refund\n• 24 to 48 hours before → 50% refund\n• Within 24 hours → No refund\n\nGo to My Bookings and click Cancel. Refunds take 5 to 7 business days.',
      };
    }

    // 6. BOOKING STATUS
    if (/status|check booking|confirm|booking id|where is my ticket/.test(text)) {
      return {
        text: 'To check your booking status:\n1. Go to the My Bookings section\n2. Enter your Booking ID or registered email\n3. View your real-time booking status\n\nYou will also receive updates via SMS and email automatically.',
      };
    }

    // 7. PAYMENT OPTIONS
    if (/payment|pay|upi|card|net banking|wallet|gpay|phonepe|paytm/.test(text)) {
      return {
        text: 'We accept all major payment methods:\n✓ UPI — GPay, PhonePe, Paytm\n✓ Credit and Debit Cards\n✓ Net Banking\n✓ Wallets — Paytm, Amazon Pay\n\nAll transactions are 100% secure and encrypted.',
      };
    }

    // 8. CONTACT / HUMAN SUPPORT
    if (/contact|support|agent|human|phone|email/.test(text)) {
      return {
        text: 'Need further help? Reach our support team:\n📧 Email: support@eventbook.in\n📞 Phone: 1800-XXX-XXXX (9 AM to 9 PM)\n💬 Live Chat available on the website\n\nWe typically respond within 2 hours.',
      };
    }

    // 9. JOKE (NEW)
    if (/joke|funny|laugh/.test(text)) {
      const jokes = [
        "Why did the ticket go to school? Because it wanted to be a 'pass'-port!",
        "Why don't scientists trust atoms in concerts? Because they make up everything!",
        "What's a ghost's favorite event? A 'boo'-concert!",
        "Why was the stadium so cool? Because it was full of fans!"
      ];
      return {
        text: jokes[Math.floor(Math.random() * jokes.length)],
      };
    }

    // 10. OFFERS / PROMO (NEW)
    if (/offer|promo|discount|coupon|deal|code/.test(text)) {
      return {
        text: '🔥 **EXCLUSIVE OFFERS** 🔥\n• Use code **FIRSTBOOK** for 10% off your first ticket!\n• Students get a flat $5 discount with ID.\n• Group booking (5+ people) gets 15% off!\n\nApply codes at the checkout page.',
      };
    }

    // 11. VENUE INFO (NEW)
    if (/venue|location|where|address|place/.test(text)) {
      return {
        text: 'Our events take place at premium venues including:\n📍 **Main Auditorium** — Central Campus\n📍 **Open Air Theater** — North Wing\n📍 **Innovation Hub** — Tech Park\n\nSpecific venue details are always mentioned on your e-ticket!',
      };
    }

    // 12. THANKS (NEW)
    if (/thank|thanks|thx|great|good job|awesome/.test(text)) {
      return {
        text: 'You are very welcome! 😊 Is there anything else I can assist you with today?',
      };
    }

    // FALLBACK
    return {
      text: 'I did not quite understand that. You can ask me about:\n• Booking a ticket\n• Upcoming events\n• Cancellations and refunds\n• Payment options\n• Checking your booking status\n\nType "help" to see all options.',
    };
  };

  if (!isOpen) return null;

  return (
    <div className="eventbot-container">
      <div className="eventbot-header">
        <div className="eventbot-title">
          <div className="eventbot-avatar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 5H18C19.1046 5 20 5.89543 20 7V10C20 11.1046 19.1046 12 18 12H15" />
              <path d="M9 5H6C4.89543 5 4 5.89543 4 7V10C4 11.1046 4.89543 12 6 12H9" />
              <path d="M4 12V17C4 18.1046 4.89543 19 6 19H18C19.1046 19 20 18.1046 20 17V12" />
              <path d="M9 19V21L12 19" />
              <circle cx="9" cy="9" r="1" fill="currentColor" />
              <circle cx="15" cy="9" r="1" fill="currentColor" />
            </svg>
          </div>
          <div>
            <h3>EventBot</h3>
            <span className="status-online">Online</span>
          </div>
        </div>
        <button className="close-btn" onClick={() => setIsOpen(false)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <div className="eventbot-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`message-wrapper ${msg.sender}`}>
            <div className={`message ${msg.sender}`}>
              <div className="message-content">
                {msg.text.split('\n').map((line, i) => (
                  <p key={i}>
                    {line.startsWith('•') || line.startsWith('✓') ? (
                      <span className="bullet-line">{line.substring(2)}</span>
                    ) : (
                      line.split('**').map((part, j) => 
                        j % 2 === 1 ? <strong key={j}>{part}</strong> : part
                      )
                    )}
                  </p>
                ))}
              </div>
              
              {/* Specialized data rendering */}
              {msg.type === 'events' && msg.data && (
                <div className="event-cards-container">
                  {msg.data.map((event, idx) => (
                    <div key={idx} className="event-card-compact">
                      <div className="event-card-header">
                        <span className="event-card-name">{event.name}</span>
                        <span className="event-card-price">${event.price}</span>
                      </div>
                      <div className="event-card-meta">
                        <span>📅 {event.date}</span>
                        <span>🎟️ {event.availableTickets} left</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {msg.type === 'pricing' && msg.data && (
                <div className="pricing-list">
                  {msg.data.map((event, idx) => (
                    <div key={idx} className="pricing-item" style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
                      <span style={{ fontWeight: 600 }}>{event.name}</span>
                      <span style={{ color: '#10b981', fontWeight: 800 }}>${event.price}</span>
                    </div>
                  ))}
                </div>
              )}

              <span className="timestamp">
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="message bot">
            <div className="typing-indicator">
              <span></span><span></span><span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="eventbot-footer">
        <div className="quick-replies">
          {quickReplies.map((reply, i) => (
            <button key={i} className="quick-reply-chip" onClick={() => handleSend(reply)}>
              {reply}
            </button>
          ))}
        </div>
        <div className="input-area">
          <input
            type="text"
            placeholder="Ask me anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend(input)}
          />
          <button className="send-btn" onClick={() => handleSend(input)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventBot;
