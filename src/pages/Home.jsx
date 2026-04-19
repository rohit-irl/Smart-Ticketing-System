import { Link } from 'react-router-dom'
import { EVENT_NAME, PRICE_PER_TICKET } from '../constants/bookingConfig'

function Home() {
  return (
    <div className="bg-gradient-to-b from-white to-slate-50 font-sans text-slate-800 selection:bg-emerald-200 selection:text-emerald-900">
      
      {/* 
        ====================================================
        🔥 HERO SECTION
        ==================================================== 
      */}
      <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden px-6 py-20 lg:px-12">
        {/* Background Gradients & Blurs */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 h-[500px] w-[500px] rounded-full bg-emerald-300/30 blur-[100px]" />
          <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 h-[600px] w-[600px] rounded-full bg-teal-200/40 blur-[120px]" />
        </div>

        <div className="relative z-10 w-full max-w-7xl grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
              </span>
              Registrations Open 2026
            </div>
            
            <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.1] sm:text-6xl lg:text-7xl">
              Experience the Future at <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent">
                {EVENT_NAME}
              </span>
            </h1>
            
            <p className="max-w-2xl text-xl text-slate-600 leading-relaxed">
              Connect with visionary leaders, participate in hands-on workshops, and celebrate internal milestones at our biggest showcase of the year.
            </p>
            
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                to="/booking"
                className="inline-flex h-14 items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-8 text-lg font-bold text-white shadow-lg shadow-emerald-200 transition-all duration-300 hover:scale-105 hover:shadow-emerald-300 hover:from-emerald-600 hover:to-teal-700"
              >
                Book Now
              </Link>
              <Link
                to="/event"
                className="inline-flex h-14 items-center justify-center rounded-xl border-2 border-slate-200 bg-white/50 backdrop-blur-sm px-8 text-lg font-bold text-slate-700 shadow-sm transition-all duration-300 hover:border-slate-300 hover:bg-slate-50"
              >
                Explore Event
              </Link>
            </div>
          </div>

          {/* Right Floating Glassmorphism Card */}
          <div className="relative mx-auto w-full max-w-md lg:ml-auto lg:mr-0 animate-fade-in">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-emerald-400 to-teal-300 opacity-30 blur-lg"></div>
            <div className="relative flex flex-col gap-6 rounded-3xl border border-white/40 bg-white/60 p-8 shadow-2xl backdrop-blur-xl">
              
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">Date</p>
                  <p className="text-lg font-bold text-slate-900">June 15–16, 2026</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-600">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">Venue</p>
                  <p className="text-lg font-bold text-slate-900">Main Campus Auditorium</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">Tickets</p>
                  <p className="text-lg font-bold text-slate-900">Limited Availability</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 
        ====================================================
        1️⃣ WHY ATTEND THIS EVENT
        ==================================================== 
      */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Why Attend This Event?</h2>
          <p className="mt-4 text-lg text-slate-600">Unlock your potential with immersive experiences tailored for modern professionals.</p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: 'Networking Opportunities',
              desc: 'Connect with industry leaders and build meaningful professional relationships.',
              icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            },
            {
              title: 'Expert Speakers',
              desc: 'Learn directly from top-tier executives who have built world-class products.',
              icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
            },
            {
              title: 'Hands-on Workshops',
              desc: 'Engage in deep-dive technical sessions and learn by actively doing.',
              icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            },
            {
              title: 'Certification',
              desc: 'Receive an official event certificate of completion to boost your resume.',
              icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            }
          ].map((feature, idx) => (
            <div key={idx} className="group rounded-2xl border border-slate-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-emerald-100/50">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-colors duration-300 group-hover:bg-emerald-500 group-hover:text-white">
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {feature.icon}
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900">{feature.title}</h3>
              <p className="mt-3 text-slate-600 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 
        ====================================================
        2️⃣ TICKET INFO SECTION
        ==================================================== 
      */}
      <section className="bg-slate-900 px-6 py-24 text-white">
        <div className="mx-auto max-w-7xl lg:flex lg:items-center lg:justify-between lg:gap-16">
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-extrabold sm:text-4xl">Secure Your Access</h2>
            <p className="mt-4 text-xl text-slate-300">
              Join hundreds of other professionals. Tickets are selling fast, so don't wait until the last minute.
            </p>
            <ul className="mt-8 space-y-4 text-slate-300">
              {[
                'Full access to all keynote sessions',
                'Entry to interactive workshop tracks',
                'Complimentary lunch and refreshments',
                'Exclusive swag bag & event badge'
              ].map((perk, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <svg className="h-6 w-6 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  <span className="font-medium">{perk}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-12 lg:mt-0 lg:w-5/12 shrink-0">
            <div className="relative rounded-3xl bg-slate-800 p-8 shadow-2xl overflow-hidden shadow-emerald-900/20 ring-1 ring-white/10 lg:p-10">
              <div className="absolute top-0 right-0 p-4">
                <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
                  Most Popular
                </span>
              </div>
              <h3 className="text-2xl font-bold">Standard Pass</h3>
              <p className="mt-2 text-slate-400">Everything you need for the summit.</p>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-5xl font-extrabold tracking-tight text-white">${PRICE_PER_TICKET}</span>
                <span className="text-xl font-medium text-slate-400">/ person</span>
              </div>
              <Link
                to="/booking"
                className="mt-8 block w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 py-4 text-center text-lg font-bold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-emerald-500/30"
              >
                Buy Ticket Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 
        ====================================================
        3️⃣ EVENT TIMELINE / SCHEDULE
        ==================================================== 
      */}
      <section className="mx-auto max-w-4xl px-6 py-20 lg:py-28">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Event Schedule</h2>
          <p className="mt-4 text-lg text-slate-600">A structured timeline of our dynamic 2-day summit.</p>
        </div>

        <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-emerald-400 before:to-teal-200">
          {[
            { tag: '09:00 AM', title: 'Opening Ceremony', desc: 'Welcome address and introduction by the department head.' },
            { tag: '11:00 AM', title: 'Workshops', desc: 'Industry insights and roadmap for the upcoming year.' },
            { tag: '02:00 PM', title: 'Keynote', desc: 'Deep dive into technical execution and team breakout sessions.' },
            { tag: '06:00 PM', title: 'Closing', desc: 'Closing thoughts followed by food and casual networking.' },
          ].map((item, idx) => (
            <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              {/* Icon */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white shadow-md shadow-emerald-200 ring-4 ring-white md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-transform group-hover:scale-110">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              {/* Content Card */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg hover:shadow-slate-200/50">
                <div className="mb-1 text-sm font-bold text-emerald-600 tracking-wide uppercase">{item.tag}</div>
                <h4 className="text-xl font-bold text-slate-900">{item.title}</h4>
                <p className="mt-2 text-slate-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 
        ====================================================
        4️⃣ TESTIMONIALS
        ==================================================== 
      */}
      <section className="bg-slate-50 px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">What Past Attendees Say</h2>
            <p className="mt-4 text-lg text-slate-600">Don't just take our word for it.</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: 'Sarah Jenkins',
                role: 'Senior Developer',
                feedback: 'The hands-on workshops completely changed how my team approaches testing. Worth every minute!',
                stars: 5,
              },
              {
                name: 'Marcus Thorne',
                role: 'Product Manager',
                feedback: 'Fantastic networking. I connected with leaders from 4 different departments and uncovered huge synergies.',
                stars: 5,
              },
              {
                name: 'Priya Sharma',
                role: 'Faculty Educator',
                feedback: 'The keynote was incredibly inspiring! Impeccably organized event from start to finish.',
                stars: 5,
              }
            ].map((test, idx) => (
              <div key={idx} className="rounded-2xl bg-white p-8 shadow-sm border border-slate-100 transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="flex gap-1 text-orange-400 mb-6">
                  {Array.from({ length: test.stars }).map((_, i) => (
                    <svg key={i} className="h-5 w-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                </div>
                <p className="text-lg text-slate-700 italic">"{test.feedback}"</p>
                <div className="mt-8 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-200 text-slate-500 font-bold text-xl shrink-0">
                    {test.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{test.name}</h4>
                    <p className="text-sm font-medium text-slate-500">{test.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 
        ====================================================
        5️⃣ CALL TO ACTION
        ==================================================== 
      */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-700 to-slate-900 px-6 py-24 text-center">
        <div className="absolute inset-0 opacity-10"></div>
        <div className="relative z-10 mx-auto max-w-3xl">
          <h2 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl">
            Don't miss out — book your seat now!
          </h2>
          <p className="mt-6 text-xl text-emerald-100">
            Join the top minds and transform your career. Spaces are strictly limited.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/booking"
              className="rounded-xl bg-white px-10 py-5 text-lg font-bold text-teal-800 shadow-xl transition-all hover:scale-105 hover:bg-emerald-50 hover:shadow-emerald-500/50"
            >
              Secure Your Pass
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Home
