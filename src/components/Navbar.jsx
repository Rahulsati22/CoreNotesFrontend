// app/components/Navbar.jsx
"use client";

import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { useEffect, useRef, useState } from "react";

const SUBJECTS = [
  "Electronics",
  "Chemical",
  "Computer Science",
  "Mechanical",
  "Electrical",
  "Civil",
];

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const drawerRef = useRef(null);
  const firstFocusableRef = useRef(null);

  // Close on Escape and move focus into the drawer when opened
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") {
        setDrawerOpen(false);
        setMobileMenuOpen(false);
      }
    }
    if (drawerOpen || mobileMenuOpen) {
      document.addEventListener("keydown", onKeyDown);
      const id = setTimeout(() => firstFocusableRef.current?.focus(), 0);
      return () => {
        clearTimeout(id);
        document.removeEventListener("keydown", onKeyDown);
      };
    }
    return undefined;
  }, [drawerOpen, mobileMenuOpen]); // attach only while open [3][4]

  // Click outside to close drawer
  useEffect(() => {
    function onClick(e) {
      if (!drawerRef.current) return;
      if (drawerOpen && !drawerRef.current.contains(e.target)) {
        setDrawerOpen(false);
      }
    }
    if (drawerOpen) {
      document.addEventListener("mousedown", onClick);
      return () => document.removeEventListener("mousedown", onClick);
    }
    return undefined;
  }, [drawerOpen]); // cleanup to avoid duplicate listeners [3][4]

  return (
    <>
      {/* Top Navbar */}
      <header className="fixed inset-x-0 top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Left: brand + hamburger */}
          <div className="flex items-center gap-3">
            <button
              aria-label="Open menu"
              className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400"
              onClick={() => setMobileMenuOpen((v) => !v)}
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            <Link href="/" className="font-semibold text-xl tracking-tight">
              Core Notes
            </Link>
          </div>

          {/* Center: desktop links */}
          <div className="hidden lg:flex items-center gap-6">
            <Link
              href="/"
              className="px-3 py-2 rounded-md text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400"
            >
              Home
            </Link>
            <button
              onClick={() => setDrawerOpen(true)}
              className="px-3 py-2 rounded-md text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400"
            >
              Notes
            </button>
            <Link
              href="/contact"
              className="px-3 py-2 rounded-md text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400"
            >
              Contact Us
            </Link>
          </div>

          {/* Right: auth controls */}
          <div className="flex items-center gap-3">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="px-3 py-2 rounded-md text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm h-10 px-4 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#6c47ff]/60">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </nav>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white">
            <div className="px-4 py-3 flex flex-col gap-2">
              <button
                onClick={() => {
                  setDrawerOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="px-3 py-2 rounded-md text-slate-700 hover:bg-slate-100 text-left"
              >
                Notes
              </button>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md text-slate-700 hover:bg-slate-100"
              >
                Contact Us
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Drawer overlay */}
      <div
        aria-hidden={!drawerOpen}
        className={`fixed inset-0 z-40 transition-colors ${drawerOpen ? "bg-black/30" : "pointer-events-none bg-transparent"}`}
        onClick={() => setDrawerOpen(false)}
      />

      {/* Side Drawer */}
      <aside
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        className={`fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw] transform bg-white shadow-xl border-r border-slate-200 transition-transform duration-300 ease-in-out ${drawerOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200">
          <h2 className="font-semibold text-lg">Subjects</h2>
          <button
            ref={firstFocusableRef}
            onClick={() => setDrawerOpen(false)}
            className="p-2 rounded-md text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400"
            aria-label="Close subjects drawer"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="p-4">
          <ul className="space-y-2">
            {SUBJECTS.map((s) => (
              <li key={s}>
                <Link
                  href={`/notes/${s.toLowerCase().replace(/\s+/g, "-")}`}
                  onClick={() => setDrawerOpen(false)}
                  className="block rounded-md px-3 py-2 text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400"
                >
                  {s}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
}
