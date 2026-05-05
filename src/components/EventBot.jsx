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
        isHtml: response.isHtml,
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
        // Fetch live availability to combine with events
        const availability = await fetchTicketAvailability().catch(() => null);
        
        const eventList = SAMPLE_EVENTS.map(event => {
          const avail = availability?.availableTickets ?? event.availableTickets;
          return `• **${event.name}**\n  📅 ${event.date}\n  💰 Starting at $${event.price}\n  🎟️ ${avail} tickets left`;
        }).join('\n\n');

        return {
          text: `Here are the upcoming events:\n\n${eventList}\n\nWhich one would you like to know more about?`,
          isHtml: false
        };
      } catch (error) {
        return { text: 'I am having trouble fetching events right now. Please try again later.' };
      }
    }

    // 4. TICKET PRICING
    if (/price|cost|how much|fee|charges|rate/.test(text)) {
      const pricingList = SAMPLE_EVENTS.map(event => 
        `• **${event.name}**: $${event.price}`
      ).join('\n');
      
      return {
        text: `Here is the current pricing for our events:\n\n${pricingList}\n\nPrices are subject to change based on availability.`,
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
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <div>
            <h3>EventBot</h3>
            <span className="status-online">Online</span>
          </div>
        </div>
        <button className="close-btn" onClick={() => setIsOpen(false)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <div className="eventbot-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.sender}`}>
            <div className="message-content">
              {msg.text.split('\n').map((line, i) => (
                <p key={i}>
                  {line.startsWith('•') || line.startsWith('✓') ? (
                    <span className="bullet-line">{line}</span>
                  ) : (
                    line.split('**').map((part, j) => 
                      j % 2 === 1 ? <strong key={j}>{part}</strong> : part
                    )
                  )}
                </p>
              ))}
            </div>
            <span className="timestamp">
              {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        ))}
        {isTyping && (
          <div className="message bot">
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
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
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend(input)}
          />
          <button className="send-btn" onClick={() => handleSend(input)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
