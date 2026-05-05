import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [step, setStep] = useState(1); // 1: Contact, 2: OTP
  const [contact, setContact] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const from = location.state?.from?.pathname || '/';

  // Handle Resend Timer
  useEffect(() => {
    let interval;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const validateContact = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    
    if (emailRegex.test(value)) return 'email';
    if (phoneRegex.test(value)) return 'mobile';
    return null;
  };

  const handleSendOtp = () => {
    setError('');
    const type = validateContact(contact);
    
    if (!type) {
      setError('Please enter a valid 10-digit mobile number or email address.');
      return;
    }

    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(newOtp);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 15000);
      console.log(`[AUTH] OTP for ${contact}: ${newOtp}`); // Log for demo purposes
      setStep(2);
      setTimer(30);
      setCanResend(false);
      setLoading(false);
    }, 1200);
  };

  const handleVerifyOtp = () => {
    setError('');
    
    if (!otp) {
      setError('Please enter the OTP');
      return;
    }

    if (otp !== generatedOtp) {
      setError('Incorrect OTP. Please try again.');
      setOtp('');
      return;
    }

    setLoading(true);
    // Simulate background account creation/login
    setTimeout(() => {
      login({
        contact,
        id: Date.now(),
        role: 'user',
        name: contact.split('@')[0] // Mock name
      });
      setIsSuccess(true);
      setLoading(false);
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 1500);
    }, 1000);
  };

  const handleResend = () => {
    if (!canResend) return;
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 15000);
    console.log(`[AUTH] New OTP for ${contact}: ${newOtp}`);
    setOtp('');
    setTimer(30);
    setCanResend(false);
    setError('');
  };

  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (generatedOtp && step === 2) {
      setShowNotification(true);
      const timer = setTimeout(() => setShowNotification(false), 15000);
      return () => clearTimeout(timer);
    }
  }, [generatedOtp, step]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-12 relative overflow-hidden bg-slate-100">
      {/* Animated Background Blobs (Slightly Darker for Contrast) */}
      <div className="absolute top-[-10%] -left-[10%] w-[50%] h-[50%] bg-emerald-500/10 rounded-full mix-blend-multiply filter blur-[120px] animate-blob"></div>
      <div className="absolute top-[-10%] -right-[10%] w-[50%] h-[50%] bg-teal-500/10 rounded-full mix-blend-multiply filter blur-[120px] animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-[10%] left-[20%] w-[60%] h-[60%] bg-cyan-500/10 rounded-full mix-blend-multiply filter blur-[120px] animate-blob animation-delay-4000"></div>
      
      {/* Subtle Noise Texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.2] brightness-90 contrast-125 pointer-events-none"></div>

      {/* Mock SMS Notification */}
      {showNotification && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-2.5rem)] max-w-sm animate-slide-down">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-4 flex items-start gap-4">
            <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shrink-0 shadow-lg">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em]">Security Alert</span>
                <span className="text-[10px] font-bold text-slate-500">Just Now</span>
              </div>
              <p className="text-sm text-slate-200 leading-tight font-medium">
                Your login code is <span className="font-black text-emerald-400 text-lg tracking-wider bg-white/5 px-2 py-0.5 rounded-md border border-white/10">{generatedOtp}</span>
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-md animate-fade-in relative z-10">
        {/* Branding (Static) */}
        <div className="mb-10 text-center">
          <div className="inline-flex h-24 w-24 items-center justify-center rounded-[2.5rem] bg-white shadow-xl border border-slate-200 mb-8 group transition-all duration-500 hover:scale-110 hover:rotate-3">
             <div className="h-16 w-16 rounded-[1.8rem] bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center shadow-inner">
                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 012-2h10a2 2 0 012 2v14a2 2 0 01-2 2H7a2 2 0 01-2-2V5z" />
                </svg>
             </div>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter sm:text-5xl">Secure Login</h1>
          <p className="mt-3 text-emerald-700 font-black tracking-[0.3em] text-[11px] uppercase">Department Gateway System</p>
        </div>

        {/* Login Card */}
        <div className="relative group">
          <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-[3rem] blur-2xl opacity-10"></div>
          <div className="relative bg-white rounded-[3rem] shadow-[0_40px_80px_rgba(0,0,0,0.1)] border border-slate-200 overflow-hidden">
            <div className="p-10 sm:p-14">
              {isSuccess ? (
                <div className="text-center py-10">
                  <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-emerald-50 mb-8 border border-emerald-200 relative">
                    <div className="absolute inset-0 rounded-full animate-ping bg-emerald-500/20"></div>
                    <svg className="h-12 w-12 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">Access Granted</h3>
                  <p className="mt-3 text-slate-600 font-bold leading-relaxed">Entering secure ticketing zone...</p>
                </div>
              ) : (
                <>
                  {step === 1 ? (
                    <div className="space-y-8">
                      <div className="group/input">
                        <label className="block text-[11px] font-black text-slate-700 mb-3 uppercase tracking-[0.2em] group-focus-within/input:text-emerald-700 transition-colors">
                          Identity Reference
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Email or 10-digit mobile"
                            className="w-full bg-slate-50 px-6 py-5 rounded-2xl border-2 border-slate-100 focus:bg-white focus:border-emerald-500/50 focus:outline-none focus:ring-4 focus:ring-emerald-500/5 transition-all text-slate-900 placeholder-slate-400 font-bold text-lg"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendOtp()}
                          />
                        </div>
                        {error && (
                          <div className="mt-4 p-4 rounded-xl bg-red-50 border-2 border-red-100 flex items-start gap-3 animate-shake">
                            <svg className="h-5 w-5 text-red-600 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                            <p className="text-xs font-black text-red-600 leading-tight">{error}</p>
                          </div>
                        )}
                      </div>

                      <button
                        onClick={handleSendOtp}
                        disabled={loading}
                        className="group relative w-full overflow-hidden rounded-2xl bg-slate-900 p-px font-black tracking-tight text-white transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70"
                      >
                        <div className="relative flex items-center justify-center gap-3 px-8 py-5">
                          {loading ? (
                            <svg className="animate-spin h-6 w-6 text-emerald-500" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                          ) : (
                            <>
                              <span className="text-lg">Authorize Access</span>
                              <svg className="h-5 w-5 text-emerald-500 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                            </>
                          )}
                        </div>
                      </button>
                      
                      <div className="flex items-center justify-center gap-3">
                         <div className="h-px w-6 bg-slate-200"></div>
                         <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em]">Secure Verification</p>
                         <div className="h-px w-6 bg-slate-200"></div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-8">
                      <div>
                        <div className="flex justify-between items-center mb-4">
                          <label className="text-[11px] font-black text-slate-700 uppercase tracking-[0.2em]">
                            Security Key
                          </label>
                          <button 
                            onClick={() => setStep(1)}
                            className="text-[10px] font-black text-emerald-700 hover:text-emerald-800 uppercase tracking-widest border-b-2 border-emerald-700/30 transition-colors"
                          >
                            Modify
                          </button>
                        </div>
                        <input
                          type="text"
                          maxLength="6"
                          placeholder="••••••"
                          className="w-full bg-slate-50 px-6 py-6 rounded-3xl border-2 border-slate-100 focus:bg-white focus:border-emerald-500/50 focus:outline-none transition-all text-center text-5xl font-black tracking-[0.4em] text-slate-900 placeholder-slate-300"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                          onKeyPress={(e) => e.key === 'Enter' && handleVerifyOtp()}
                        />
                        
                        <div className="mt-8 flex flex-col items-center gap-4 p-8 rounded-[2rem] bg-emerald-50 border-2 border-emerald-100/50">
                          <p className="text-xs text-slate-700 font-bold text-center leading-relaxed">
                            A unique code was dispatched to <br/><span className="text-slate-950 font-black">{contact}</span>
                          </p>
                          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full shadow-md border border-emerald-100">
                             <div className="h-2.5 w-2.5 bg-emerald-600 rounded-full animate-pulse"></div>
                             <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">Verify Top Notification</span>
                          </div>
                        </div>

                        {error && <p className="mt-4 text-xs font-black text-red-600 text-center">{error}</p>}
                      </div>

                      <button
                        onClick={handleVerifyOtp}
                        disabled={loading}
                        className="group w-full rounded-2xl bg-emerald-600 text-white py-5 font-black text-xl shadow-xl shadow-emerald-200 transition-all hover:bg-emerald-700 active:scale-[0.98] disabled:opacity-50"
                      >
                        {loading ? 'Processing...' : 'Confirm Login'}
                      </button>

                      <div className="text-center pt-2">
                        {canResend ? (
                          <button 
                            onClick={handleResend}
                            className="text-[10px] font-black text-slate-500 hover:text-emerald-700 uppercase tracking-widest transition-colors"
                          >
                            Resend Code
                          </button>
                        ) : (
                          <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest">
                            New code available in <span className="text-emerald-700 font-black">{timer}s</span>
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* Footer info */}
        <p className="mt-12 text-center text-[10px] font-black text-slate-500 uppercase tracking-[0.5em]">
          Secure Gateway System • v2.4.0
        </p>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(40px, -60px) scale(1.1); }
          66% { transform: translate(-30px, 30px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 10s infinite alternate ease-in-out;
        }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        
        @keyframes slide-down {
          0% { transform: translate(-50%, -100%); opacity: 0; }
          100% { transform: translate(-50%, 0); opacity: 1; }
        }
        .animate-slide-down {
          animation: slide-down 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .animate-float {
          animation: float 6s infinite ease-in-out;
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-6px); }
          75% { transform: translateX(6px); }
        }
        .animate-shake {
          animation: shake 0.2s ease-in-out 0s 2;
        }

        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default Login;
