// app/page.jsx
import Link from "next/link";

const SUBJECTS = [
  { name: "Computer Science", slug: "computer-science" },
  { name: "Mathematics", slug: "mathematics" },
  { name: "Physics", slug: "physics" },
  { name: "Chemistry", slug: "chemistry" },
  { name: "Biology", slug: "biology" },
  { name: "Mechanical", slug: "mechanical" },
  { name: "Electrical", slug: "electrical" },
  { name: "Economics", slug: "economics" },
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
      <section className="pt-16 sm:pt-20 lg:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-200">
            Core Notes
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Study faster with concise, organized notes
          </h1>
          <p className="mt-4 text-base text-slate-600 sm:text-lg">
            Quickly find subjects, skim key points, and open detailed chapters in a distraction‑free layout.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Contact
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Subjects */}
      <section className="mt-16 sm:mt-20">
        <h2 className="text-xl font-semibold text-slate-900">Popular subjects</h2>
        <p className="mt-1 text-sm text-slate-600">
          Jump straight into the most requested courses.
        </p>

        <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SUBJECTS.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/notes/${s.slug}`}
                className="group block rounded-lg border border-slate-200 bg-white p-4 hover:border-indigo-300 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-900 group-hover:text-indigo-700">
                    {s.name}
                  </span>
                  <svg className="h-5 w-5 text-slate-400 group-hover:text-indigo-600" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  Open chapters and topics for {s.name}.
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Why Core Notes */}
      <section className="mt-16 sm:mt-20">
        <h2 className="text-xl font-semibold text-slate-900">Why Core Notes</h2>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.title} className="rounded-lg border border-slate-200 bg-white p-5">
              <div className="flex items-center gap-3">
                {f.icon}
                <h3 className="text-base font-semibold text-slate-900">{f.title}</h3>
              </div>
              <p className="mt-2 text-sm text-slate-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Secondary CTA */}
      <section className="mt-16 sm:mt-24 mb-20">
        <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-indigo-50 to-white px-6 py-8 sm:px-10 sm:py-10">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Ready to start studying smarter?</h3>
              <p className="mt-1 text-sm text-slate-600">Open a subject and pick a chapter to begin.</p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/notes/mathematics"
                className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Start with Math
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400"
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
