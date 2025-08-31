// app/components/Navbar.jsx
"use client";

import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { useEffect, useRef, useState } from "react";
import { BookOpen, Home, Mail, Settings, X, Menu } from "lucide-react";

const SUBJECTS = [
  { name: "Electronics", icon: "💡" },
  { name: "Chemical", icon: "⚗️" },
  { name: "Computer Science", icon: "💻" },
  { name: "Mechanical", icon: "⚙️" },
  { name: "Electrical", icon: "🔌" },
  { name: "Civil", icon: "🏗️" },
];

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const drawerRef = useRef(null);
  const firstFocusableRef = useRef(null);

  // Escape close
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
  }, [drawerOpen, mobileMenuOpen]);

  // Outside click close
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
  }, [drawerOpen]);

  const { user } = useUser();
  const email =
    user?.primaryEmailAddress?.emailAddress ||
    user?.emailAddresses?.[0]?.emailAddress ||
    null;

  return (
    <>
      {/* Top Navbar */}
      <header className="fixed inset-x-0 top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200 shadow-sm">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Left: logo + brand */}
          <div className="flex items-center gap-3">
            <button
              aria-label="Open menu"
              className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              onClick={() => setMobileMenuOpen((v) => !v)}
            >
              <Menu className="h-6 w-6" />
            </button>

            <Link
              href="/"
              className="flex items-center gap-2 font-semibold text-xl tracking-tight text-indigo-700 hover:scale-105 transition-transform"
            >
              <BookOpen className="h-6 w-6 text-indigo-600" />
              Core Notes
            </Link>
          </div>

          {/* Center: desktop links */}
          <div className="hidden lg:flex items-center gap-6">
            <Link
              href="/"
              className="px-3 py-2 rounded-md text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              Home
            </Link>
            <button
              onClick={() => setDrawerOpen(true)}
              className="px-3 py-2 rounded-md text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              Notes
            </button>
            <Link
              href="/contact"
              className="px-3 py-2 rounded-md text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              Contact Us
            </Link>

            {email === "rahulsati9969@gmail.com" && (
              <Link
                href="/adminsuperduper"
                className="px-3 py-2 rounded-md text-red-600 hover:bg-red-50 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                Admin
              </Link>
            )}
          </div>

          {/* Right: auth controls */}
          <div className="flex items-center gap-3">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="px-3 py-2 rounded-md text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-medium text-sm h-10 px-4 shadow-md hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-indigo-400">
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
          <div className="lg:hidden border-t border-slate-200 bg-white animate-slide-down">
            <div className="px-4 py-3 flex flex-col gap-2">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md text-slate-700 hover:bg-indigo-50 hover:text-indigo-700"
              >
                Home
              </Link>
              <button
                onClick={() => {
                  setDrawerOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="px-3 py-2 rounded-md text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 text-left"
              >
                Notes
              </button>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md text-slate-700 hover:bg-indigo-50 hover:text-indigo-700"
              >
                Contact Us
              </Link>
              {email === "rahulsati9969@gmail.com" && (
                <Link
                  onClick={() => setMobileMenuOpen(false)}
                  href="/adminsuperduper"
                  className="px-3 py-2 rounded-md text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                  Admin
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Drawer overlay */}
      <div
        aria-hidden={!drawerOpen}
        className={`fixed inset-0 z-40 transition-colors ${
          drawerOpen ? "bg-black/40 backdrop-blur-sm" : "pointer-events-none bg-transparent"
        }`}
        onClick={() => setDrawerOpen(false)}
      />

      {/* Side Drawer */}
      <aside
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        className={`fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw] transform bg-white shadow-xl border-r border-slate-200 transition-transform duration-300 ease-in-out ${
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <h2 className="font-semibold text-lg flex items-center gap-2">
            📚 Subjects
          </h2>
          <button
            ref={firstFocusableRef}
            onClick={() => setDrawerOpen(false)}
            className="p-2 rounded-md hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Close subjects drawer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4">
          <ul className="space-y-2">
            {SUBJECTS.map((s) => (
              <li key={s.name}>
                <Link
                  href={`/notes/${s.name.toLowerCase().replace(/\s+/g, "-")}`}
                  onClick={() => setDrawerOpen(false)}
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 transition-all"
                >
                  <span className="text-lg">{s.icon}</span>
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
}
