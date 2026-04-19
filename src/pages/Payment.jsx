import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state?.booking;

  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
  const [transactionId, setTransactionId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null); // { type, text }
  const [isExpired, setIsExpired] = useState(false);

  const upiId = 'rohit69@fam';

  // Fixed the usage of navigator.clipboard within an iframe or local setup sometimes throwing error without secure context
  const handleCopyUpi = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(upiId);
        showToast('success', 'UPI ID copied to clipboard');
      } else {
         const textArea = document.createElement("textarea");
         textArea.value = upiId;
         // Avoid scrolling to bottom
         textArea.style.top = "0";
         textArea.style.left = "0";
         textArea.style.position = "fixed";
         document.body.appendChild(textArea);
         textArea.focus();
         textArea.select();
         document.execCommand("copy");
         document.body.removeChild(textArea);
         showToast('success', 'UPI ID copied to clipboard');
      }
    } catch (err) {
      showToast('error', 'Failed to copy UPI ID');
    }
  };

  useEffect(() => {
    if (!bookingData) {
      // If accessed directly without booking data, redirect to home or booking
      navigate('/');
      return;
    }

    if (timeLeft <= 0) {
      setIsExpired(true);
      const to = setTimeout(() => {
        navigate('/booking'); // or wherever makes sense
      }, 3000);
      return () => clearTimeout(to);
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, navigate, bookingData]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const showToast = (type, text) => {
    setStatusMessage({ type, text });
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleIHavePaidClick = () => {
    if (!transactionId.trim()) {
      showToast('error', 'Please enter Transaction ID before proceeding.');
      return;
    }
    setShowModal(true);
  };

  const handleConfirmYes = () => {
    setShowModal(false);
    // Proceed to confirmation
    navigate('/confirmation', {
      state: {
        booking: bookingData
      }
    });
  };

  if (!bookingData) return null;

  return (
    <div className="mx-auto max-w-lg px-4 py-16 animate-fade-in-up">
      <div className="rounded-3xl border border-white/60 bg-white/70 p-8 shadow-xl backdrop-blur-xl transition-all">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Complete Payment</h2>
          <p className="text-slate-600 mt-2 font-medium">Scan the QR code to proceed</p>
        </div>

        <div className="flex justify-between border-b-2 border-dashed border-slate-200 pb-6 mb-6">
          <div className="text-center flex-1">
            <span className="block text-sm font-semibold text-slate-500 mb-1">Plan</span>
            <strong className="text-lg text-slate-900 font-extrabold truncate block mx-auto max-w-[120px]">{bookingData.eventName || '--'}</strong>
          </div>
          <div className="text-center flex-1 border-x-2 border-dashed border-slate-200 px-2">
            <span className="block text-sm font-semibold text-slate-500 mb-1">Amount</span>
            <strong className="text-lg text-emerald-600 font-black">${bookingData.totalAmount || '0'}</strong>
          </div>
          <div className="text-center flex-1">
            <span className="block text-sm font-semibold text-slate-500 mb-1">User</span>
            <strong className="text-lg text-slate-900 font-extrabold max-w-[100px] inline-block truncate">{bookingData.name || '--'}</strong>
          </div>
        </div>

        <div className="text-center mb-6">
          <div className="mx-auto flex h-52 w-52 items-center justify-center rounded-2xl bg-white p-3 shadow-sm border-2 border-slate-100 mb-4 overflow-hidden relative group">
            <img 
              src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=${upiId}&pn=TicketingSystem&am=${bookingData.totalAmount}&cu=USD`} 
              alt="Payment QR Code" 
              className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <p className="text-sm font-semibold text-slate-500">Scan with any UPI app</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between rounded-xl bg-slate-50/80 p-4 mb-6 border border-slate-200 shadow-inner gap-4">
          <div className="text-center sm:text-left">
            <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Or pay to UPI ID</span>
            <span className="font-mono text-lg font-black text-emerald-700">{upiId}</span>
          </div>
          <button 
            onClick={handleCopyUpi}
            className="flex items-center justify-center gap-1.5 rounded-lg border-2 border-emerald-500 px-4 py-2 text-sm font-bold text-emerald-600 transition-all hover:bg-emerald-500 hover:text-white active:scale-95 w-full sm:w-auto"
          >
             <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
             Copy
          </button>
        </div>

        <div className="text-center mb-6">
          <span className="block text-sm font-semibold text-slate-500 mb-1">Session expires in</span>
          <div className={`text-5xl font-black font-mono tabular-nums transition-colors duration-300 ${timeLeft <= 30 ? 'text-red-500 animate-pulse' : 'text-slate-800'}`}>
            {formatTime(timeLeft)}
          </div>
        </div>

        {isExpired && (
          <div className="text-center text-red-500 font-bold mb-4 animate-fade-in bg-red-50 rounded-lg p-3 border border-red-100">
            Payment session expired. Redirecting...
          </div>
        )}

        <div className="mb-6">
          <label htmlFor="transactionId" className="block text-sm font-extrabold text-slate-800 mb-2">Enter UPI Transaction ID <span className="text-red-500">*</span></label>
          <input 
            type="text" 
            id="transactionId"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
            disabled={isExpired}
            placeholder="e.g. 308728947192" 
            className="w-full rounded-xl border-2 border-slate-200 bg-white px-5 py-4 text-base font-medium transition-all focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 disabled:opacity-50 disabled:bg-slate-50"
            required 
          />
        </div>

        <div className="min-h-[44px] text-center mb-4">
          {statusMessage && (
            <div className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 font-bold shadow-md animate-fade-in-up ${
              statusMessage.type === 'success' 
                ? 'border border-emerald-200 bg-emerald-50 text-emerald-800' 
                : 'border border-red-200 bg-red-50 text-red-800'
            }`}>
              {statusMessage.type === 'success' ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              )}
              {statusMessage.text}
            </div>
          )}
        </div>

        <button 
          onClick={handleIHavePaidClick}
          disabled={isExpired}
          className="group relative flex w-full justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-4 text-xl font-extrabold text-white shadow-xl shadow-emerald-200 transition-all duration-300 hover:scale-[1.03] hover:from-emerald-600 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:from-slate-400 disabled:to-slate-500 disabled:shadow-none"
        >
          I Have Paid
          <svg className="ml-2 h-6 w-6 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in opacity-100">
          <div className="w-full max-w-md rounded-3xl border border-white/20 bg-white p-8 text-center shadow-2xl animate-fade-in-up">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 mb-6 shadow-inner">
              <svg className="h-10 w-10 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900 mb-3 tracking-tight">Confirm Payment</h3>
            <p className="text-base text-slate-600 mb-8 font-medium leading-relaxed">Have you successfully transferred the amount to the provided exact UPI ID and entered your Transaction ID?</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => setShowModal(false)}
                className="w-full rounded-xl bg-slate-100 border-2 border-transparent px-5 py-3.5 text-base font-bold text-slate-700 transition-all hover:bg-slate-200 hover:border-slate-300"
              >
                No, wait
              </button>
              <button 
                onClick={handleConfirmYes}
                className="w-full rounded-xl bg-emerald-500 border-2 border-emerald-500 px-5 py-3.5 text-base font-bold text-white shadow-lg shadow-emerald-200 transition-all hover:bg-emerald-600 hover:border-emerald-600 hover:scale-[1.02]"
              >
                Yes, I Paid
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Payment;
