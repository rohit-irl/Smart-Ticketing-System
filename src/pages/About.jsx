import { Link } from 'react-router-dom'

function About() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50/50 pb-20">
      {/* Hero Ambient Background Blobs */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 flex justify-center overflow-hidden">
        <div className="flex w-full opacity-60 mix-blend-multiply blur-3xl filter lg:opacity-80">
          <div className="h-72 w-72 rounded-full bg-emerald-200/60 lg:h-96 lg:w-96"></div>
          <div className="h-72 w-72 -translate-x-32 translate-y-12 rounded-full bg-teal-200/50 lg:h-96 lg:w-96"></div>
          <div className="h-72 w-72 -translate-x-64 translate-y-24 rounded-full bg-cyan-100/40 lg:h-96 lg:w-96"></div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8 lg:pt-32 animate-fade-in-up">
        
        {/* 1️⃣ HERO / INTRO SECTION */}
        <div className="text-center mx-auto max-w-3xl">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl mb-6">
            <span className="block">About Our</span>
            <span className="block bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-600 bg-clip-text text-transparent pb-2">
              Platform
            </span>
          </h1>
          <p className="mt-4 text-xl leading-relaxed text-slate-600 font-medium">
            A modern, high-performance solution for managing, discovering, and securely booking internal department events seamlessly.
          </p>
        </div>

        {/* 2️⃣ FEATURE CARDS SECTION */}
        <div className="mt-24 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          
          <div className="group relative rounded-3xl border border-slate-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-emerald-100">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 transition-colors group-hover:bg-emerald-500 group-hover:text-white">
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Easy Ticket Booking</h3>
            <p className="text-slate-500 font-medium leading-relaxed">Reserve your spot at premier events with a beautiful, friction-free checkout experience.</p>
          </div>

          <div className="group relative rounded-3xl border border-slate-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-emerald-100">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-teal-600 transition-colors group-hover:bg-teal-500 group-hover:text-white">
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Real-time Availability</h3>
            <p className="text-slate-500 font-medium leading-relaxed">Instant live synchronization prevents overbooking and guarantees valid entry allocation.</p>
          </div>

          <div className="group relative rounded-3xl border border-slate-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-emerald-100">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 transition-colors group-hover:bg-cyan-500 group-hover:text-white">
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Multi-Event Support</h3>
            <p className="text-slate-500 font-medium leading-relaxed">Scale across departments seamlessly, managing distinct workloads under unified dashboards.</p>
          </div>

          <div className="group relative rounded-3xl border border-slate-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-emerald-100">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 transition-colors group-hover:bg-emerald-500 group-hover:text-white">
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Secure System</h3>
            <p className="text-slate-500 font-medium leading-relaxed">Hardened validations and robust local architectures keep departmental workflows resilient.</p>
          </div>

        </div>

        {/* 3️⃣ SYSTEM OVERVIEW (2-COLUMN) */}
        <div className="mt-32 lg:flex lg:items-center lg:gap-16">
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-bold text-emerald-800 uppercase tracking-widest mb-6 border border-emerald-200">
              System Overview
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl leading-tight">
              A smarter way to attend <span className="text-emerald-600">institutional chapters</span>.
            </h2>
            <p className="mt-6 text-lg text-slate-600 leading-relaxed font-medium">
              We eliminated bureaucratic forms and legacy mail-threads. Our scalable ecosystem accelerates participation by centralizing catalogs, deploying rapid secure checkout sequences, and distributing real-time attendance availability back to eager communities.
            </p>
          </div>

          <div className="mt-12 lg:mt-0 lg:w-1/2">
            {/* Glassmorphism Highlight Box */}
            <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/50 p-8 sm:p-10 shadow-2xl backdrop-blur-xl ring-1 ring-slate-900/5">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5" />
              <div className="relative space-y-8">
                 
                 <div className="flex items-start gap-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-lg shadow-emerald-200 font-bold text-xl">1</div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900">Users can browse events</h4>
                      <p className="mt-1 text-slate-500 font-medium">Explore high-fidelity landing catalogs populated instantly with fresh departmental calendars.</p>
                    </div>
                 </div>

                 <div className="flex items-start gap-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 text-white shadow-lg shadow-teal-200 font-bold text-xl">2</div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900">Select tickets</h4>
                      <p className="mt-1 text-slate-500 font-medium">Verify quotas live alongside automated contextual pricing tables natively inside the system.</p>
                    </div>
                 </div>

                 <div className="flex items-start gap-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-emerald-500 text-white shadow-lg shadow-cyan-200 font-bold text-xl">3</div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900">Book instantly</h4>
                      <p className="mt-1 text-slate-500 font-medium">Confirm registration securely hitting centralized MySQL networks to drop attendance receipts locally.</p>
                    </div>
                 </div>

              </div>
            </div>
          </div>
        </div>

        {/* 4️⃣ FUTURE SCOPE (TIMELINE / CARDS) */}
        <div className="mt-32 border-t border-slate-200/60 pt-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900">What comes next</h2>
            <p className="mt-4 text-lg text-slate-600 font-medium max-w-2xl mx-auto">
              Our architecture leverages scalable foundations designed specifically to accommodate robust roadmap upgrades.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
             {/* decorative line behind steps on lg screens */}
             <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2 -z-10 rounded-full" />
             
             {[
               { title: 'Authentication', text: 'Granular role-based access logic mapping profiles securely.', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' },
               { title: 'API Integration', text: 'Expanding native inventories seamlessly across global sub-departments.', icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' },
               { title: 'Email Alerts', text: 'Automated receipt dispatch with integrated calendar native bindings.', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
               { title: 'Data Dashboard', text: 'Administrative metric tracking, heatmaps, and financial metrics.', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' }
             ].map((phase, i) => (
                <div key={i} className="bg-white border text-center border-slate-100 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 relative group overflow-hidden">
                  <div className="absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r from-emerald-400 to-teal-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 mb-6 shadow-inner ring-1 ring-emerald-100">
                     <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={phase.icon} /></svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{phase.title}</h3>
                  <p className="text-slate-500 font-medium text-sm leading-relaxed">{phase.text}</p>
                </div>
             ))}
          </div>
        </div>

        {/* 5️⃣ CTA SECTION */}
        <div className="mt-32 relative overflow-hidden rounded-3xl bg-slate-900 px-6 py-20 shadow-2xl sm:px-12 sm:py-28 text-center animate-fade-in">
          {/* subtle inside glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-900/40 via-transparent to-teal-900/40" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-full opacity-30 blur-[100px] bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full pointer-events-none" />
          
          <div className="relative z-10">
            <h2 className="text-3xl font-black text-white sm:text-5xl tracking-tight">
              Ready to Book Your Event?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-slate-300 font-medium">
              Join thousands of professionals already scaling their department footprints utilizing our premium attendance framework.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row sm:gap-6">
              <Link
                to="/"
                className="inline-flex items-center justify-center rounded-xl bg-white/10 border border-white/20 px-8 py-4 text-lg font-bold text-white transition-all hover:bg-white/20 hover:scale-[1.03] backdrop-blur-md"
              >
                Explore Events
              </Link>
              <Link
                to="/booking"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-emerald-500/30 transition-all hover:from-emerald-400 hover:to-teal-400 hover:scale-[1.03]"
              >
                Book Now
                <svg className="ml-2 -mr-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default About
