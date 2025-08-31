// app/contact/page.jsx
"use client";

import { useState, useTransition } from "react";
import { CheckCircle, AlertCircle } from "lucide-react";

export default function ContactPage() {
  const [status, setStatus] = useState(null);
  const [isPending, startTransition] = useTransition();

  async function onSubmit(e) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    // basic client validation
    const name = formData.get("name")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const problem = formData.get("problem")?.toString().trim();

    // simulate API call
    startTransition(() => {
      setTimeout(() => {
        if (name && email && problem) {
          setStatus({ ok: true, message: "Thanks! We'll get back to you soon." });
        } else {
          setStatus({ ok: false, message: "Please fill in all fields properly." });
        }
      }, 1200);
    });
  }

  return (
    <main className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Heading */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Contact Us
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Have questions or feedback? We're here to help ✨
        </p>
      </div>

      {/* Status message */}
      {status && (
        <div
          className={`mb-6 flex items-center gap-2 rounded-lg p-3 text-sm ${
            status.ok
              ? "bg-green-50 text-green-800"
              : "bg-red-50 text-red-800"
          }`}
        >
          {status.ok ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
          {status.message}
        </div>
      )}

      {/* Form */}
      <form
        onSubmit={onSubmit}
        className="space-y-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Jane Doe"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="jane@example.com"
          />
        </div>

        <div>
          <label htmlFor="problem" className="block text-sm font-medium text-slate-700">
            Problem
          </label>
          <textarea
            id="problem"
            name="problem"
            rows={5}
            required
            className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Describe the issue..."
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:scale-[1.02] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-60"
        >
          {isPending ? "Sending..." : "Send Message"}
        </button>
      </form>
    </main>
  );
}
