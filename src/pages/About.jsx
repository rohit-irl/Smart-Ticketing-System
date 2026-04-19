function About() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
          About this system
        </h1>
        <p className="mt-4 text-lg text-slate-600 leading-relaxed">
          The Internal Department Event Ticket Booking System is a web app for
          staff to discover internal events and reserve tickets. This build is
          a structural foundation: routing, layout, and UI placeholders only.
        </p>

        <section className="mt-10 space-y-4 text-slate-600 leading-relaxed">
          <h2 className="text-xl font-semibold text-slate-900">
            Department events
          </h2>
          <p>
            Replace this paragraph with your department mission, event charter,
            or contact information. The layout supports multiple sections as you
            expand the page.
          </p>
        </section>

        <section className="mt-10 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            What comes next
          </h2>
          <ul className="mt-4 list-inside list-disc space-y-2 text-slate-600">
            <li>Form validation and secure submission</li>
            <li>Authentication and role-based access (if required)</li>
            <li>API integration for events and ticket inventory</li>
            <li>Email confirmations and calendar invites</li>
          </ul>
        </section>
      </div>
    </div>
  )
}

export default About
