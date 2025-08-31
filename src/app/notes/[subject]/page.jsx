// app/notes/[subject]/page.jsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { NOTES_BY_SUBJECT, SUBJECTS } from "../data";



export default function SubjectNotesPage({ params }) {
  const subject = params.subject;


  //make backend call here and delete data.jsx file
  const notes = NOTES_BY_SUBJECT[subject];

  if (!notes) {
    // Unknown subject slug
    return (
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <nav className="text-sm text-slate-600">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="hover:underline">Home</Link>
            </li>
            <li className="text-slate-400">/</li>
            <li>
              <Link href="/notes/mathematics" className="hover:underline">Notes</Link>
            </li>
            <li className="text-slate-400">/</li>
            <li className="text-slate-900 font-medium">{toTitleCase(subject)}</li>
          </ol>
        </nav>
      </main>
    );
  }

  const subjectTitle =
    subject.toUpperCase().charAt(0) + subject.slice(1).replace(/-/g, " ");

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb to indicate where we are */}
      <nav className="text-sm text-slate-600">
        <ol className="flex items-center gap-2">
          <li>
            <Link href="/" className="hover:underline">Home</Link>
          </li>
          <li className="text-slate-400">/</li>
          <li>
            <Link href={`/notes/${subject}`} className="hover:underline">Notes</Link>
          </li>
          <li className="text-slate-400">/</li>
          <li className="text-slate-900 font-medium">{subjectTitle}</li>
        </ol>
      </nav>

      {/* Page header makes the section obvious */}
      <header className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            {subjectTitle}
          </h1>
          <p className="text-sm text-slate-600">
            Curated notes for {subjectTitle}. Open any card to view the PDF.
          </p>
        </div>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400"
        >
          Request a topic
        </Link>
      </header>

      {/* Cards grid */}
      <section className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {notes.map((note) => (
          <article
            key={note.id}
            className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm hover:shadow transition-shadow"
          >
            {/* Image */}
            <div className="aspect-[16/9] w-full bg-slate-100">
              {/* Use next/image if you have static files; plain img for simplicity */}
              <img
                src='https://img.freepik.com/free-photo/closeup-scarlet-macaw-from-side-view-scarlet-macaw-closeup-head_488145-3540.jpg?semt=ais_hybrid&w=740&q=80'
                alt={note.title}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Body */}
            <div className="p-4">
              <h3 className="text-base font-semibold text-slate-900">
                {note.title}
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Click below to open the PDF in a new tab.
              </p>

              <div className="mt-4">
                <a
                  href={note.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  View PDF
                </a>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
