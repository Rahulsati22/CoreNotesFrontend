// app/page.jsx
import Link from "next/link";

const SUBJECTS = [
  { name: "Electronics", slug: "electronics" },
  { name: "Chemical", slug: "chemical" },
  { name: "Computer Science", slug: "computer-science" },
  { name: "Mechanical", slug: "mechanical" },
  { name: "Electrical", slug: "electrical" },
  { name: "Civil", slug: "civil" },
];

const FEATURES = [
  {
    title: "Organized by subjects",
    desc: "Browse notes grouped by courses and tags so finding the right chapter takes seconds.",
    icon: (
      <svg className="h-6 w-6 text-indigo-600" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 7a2 2 0 012-2h10a4 4 0 110 8H6a2 2 0 01-2-2V7z" stroke="currentColor" strokeWidth="2" />
        <path d="M6 17h10a4 4 0 100-8H6" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    title: "Fast to scan",
    desc: "Concise summaries and key formulas help revise faster before exams and interviews.",
    icon: (
      <svg className="h-6 w-6 text-indigo-600" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 5h16M4 12h10M4 19h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Accessible anywhere",
    desc: "Responsive design works on mobile and desktop so notes are always at hand.",
    icon: (
      <svg className="h-6 w-6 text-indigo-600" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M3 7a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2H7l-4 4V7z" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
];

export default function HomePage() {
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Hero */}
      <section className="relative overflow-hidden pt-16 sm:pt-20 lg:pt-24 pb-2">
        {/* background glow */}
        <div className="absolute inset-0 -z-10"></div>
        <div className="absolute left-1/2 top-0 -translate-x-1/2 blur-3xl">
          <div className="h-48 w-96 rounded-full bg-indigo-200/30"></div>
        </div>

        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-200 animate-pulse">
            🚀 Core Notes
          </span>

          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
            Study <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">faster</span> with
            <br /> concise, organized notes
          </h1>

          <p className="mt-6 text-base text-slate-600 sm:text-lg leading-relaxed">
            Quickly find subjects, skim key points, and dive into detailed chapters in a distraction-free, beautifully designed layout.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-300 transition-all duration-300 hover:scale-105 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              ✉️ Contact Us
            </Link>

            {/* Non-clickable motivational tagline */}
            <div className="rounded-full bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 px-4 py-2 text-xs font-medium text-slate-700 shadow-sm">
              ✨ “Learning made simple, one note at a time.” ✨
            </div>
          </div>
        </div>
      </section>



      {/* Popular Subjects */}
      <section className="mt-16 sm:mt-20">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
            Popular <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">Subjects</span>
          </h2>
          <p className="mt-3 text-base text-slate-600 sm:text-lg">
            🚀 Jump straight into the <span className="font-semibold text-indigo-600">most requested</span> courses and start learning smarter.
          </p>
        </div>


        <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SUBJECTS.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/notes/${s.slug}`}
                className="group block rounded-2xl border border-slate-200 bg-gradient-to-tr from-white via-slate-50 to-indigo-50 p-6 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:border-indigo-400 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <div className="flex items-center justify-between">
                  {/* Icon + Text */}
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 transition-colors group-hover:bg-indigo-600 group-hover:text-white">
                      📘
                    </div>
                    <div>
                      <span className="block text-lg font-semibold text-slate-900 transition-colors group-hover:text-indigo-700">
                        {s.name}
                      </span>
                      <p className="mt-1 text-sm text-slate-500 group-hover:text-slate-700">
                        Explore detailed notes & resources
                      </p>
                    </div>
                  </div>

                  {/* Arrow */}
                  <span className="text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-indigo-600">
                    →
                  </span>
                </div>
              </Link>
            </li>

          ))}
        </ul>
      </section>

      {/* Why Core Notes */}
      <section className="mt-20 sm:mt-28 relative">
        <div className="absolute inset-0 -z-10  "></div>

        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Why <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">Core Notes?</span>
          </h2>
          <p className="mt-4 text-base text-slate-600 sm:text-lg">
            Designed to save your time and boost your productivity — learn faster, smarter, and stress-free.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Subtle background glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50"></div>

              <div className="relative flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 group-hover:scale-110 transition-transform duration-300">
                  {f.icon}
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{f.title}</h3>
              </div>

              <p className="relative mt-3 text-sm text-slate-600 leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Secondary CTA */}
      <section className="mt-16 sm:mt-24 mb-20">
        <div className="rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-6 py-10 sm:px-12 sm:py-14 shadow-lg relative overflow-hidden">
          {/* Decorative Glow */}
          <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-indigo-200/30 blur-3xl"></div>
          <div className="absolute -bottom-12 -left-10 h-44 w-44 rounded-full bg-pink-200/30 blur-3xl"></div>

          <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Ready to <span className="bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">study smarter</span>?
              </h3>
              <p className="mt-2 text-base text-slate-600 sm:text-lg">
                🚀 Open a subject, explore chapters, and learn in a distraction-free way.
              </p>
            </div>

            <div className="flex gap-3">
              <Link
                href="/notes/mathematics"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-3 text-sm font-semibold text-white shadow-md hover:from-indigo-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Start with CSE
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400"
              >
                Get in touch
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
