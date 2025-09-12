// src/components/AppNav.jsx
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChefHat, Search, Plus, X } from "lucide-react";

/* ==========================================================
   Top Navigation (responsive + animated brand)
========================================================== */
export default function AppNav({ userName = "User", userAvatarUrl = "" }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const panelRef = useRef(null);

  // close mobile search when clicking outside
  useEffect(() => {
    const onDocClick = (e) => {
      if (searchOpen && !panelRef.current?.contains(e.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [searchOpen]);

  return (
    <header className="sticky top-0 z-40">
      {/* subtle accent bar */}
      <div className="h-[3px] w-full bg-gradient-to-r from-orange-500/80 via-orange-400/60 to-transparent" />

      <nav className="backdrop-blur bg-white/70 supports-[backdrop-filter]:bg-white/60 border-b border-neutral-200">
        <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
          {/* Brand: animated mark + shimmering title */}
          <Link to="/" className="group inline-flex items-center gap-3">
            <span className="relative grid place-items-center">
              {/* rotating conic ring */}
              {/* <span className="absolute -inset-1 rounded-2xl opacity-70 blur-[1px] animate-[spinSlow_8s_linear_infinite] bg-[conic-gradient(at_50%_50%,#fb923c_0deg,#ea580c_120deg,#f59e0b_240deg,#fb923c_360deg)]" /> */}
              {/* soft glow */}
              <span className="absolute inset-0 rounded-2xl bg-orange-400/30 blur-xl opacity-70 group-hover:opacity-90 transition-opacity" />
              {/* logo tile */}
              <span
                className="relative grid size-9 place-items-center rounded-2xl shadow-[0_8px_24px_rgba(234,88,12,0.30)] animate-[floatY_3s_ease-in-out_infinite]"
                style={{
                  background: "linear-gradient(180deg,#fb923c,#ea580c)",
                }}
              >
                <ChefHat className="w-4.5 h-4.5 text-white drop-shadow" />
                {/* sparkle */}
                {/* <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-white/90 animate-ping" /> */}
              </span>
            </span>

            <span className="relative">
              {/* shimmering gradient title */}
              <span className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-orange-700 to-amber-500 bg-clip-text text-transparent [background-size:200%_100%] animate-[shine_4s_ease-in-out_infinite]">
                CPQ Recipes
              </span>
              {/* animated underline */}
              <span className="pointer-events-none absolute -bottom-1 left-0 h-[3px] w-full origin-left scale-x-50 rounded-full bg-gradient-to-r from-orange-500 via-amber-400 to-transparent opacity-80 transition-transform duration-500 group-hover:scale-x-100" />
            </span>
          </Link>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Desktop search */}
            <div className="hidden md:flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 h-9">
              <Search className="w-4 h-4 text-neutral-400" />
              <input
                type="search"
                placeholder="Search recipes…"
                className="w-52 bg-transparent text-sm outline-none placeholder:text-neutral-400"
              />
            </div>

            {/* Desktop: New Recipe */}
            <Link
              to="/recipe/new"
              className="hidden md:inline-flex items-center gap-2 h-9 px-3 rounded-full bg-orange-600 text-white text-sm font-semibold hover:bg-orange-700"
            >
              <Plus className="w-4 h-4" />
              New Recipe
            </Link>

            {/* Mobile icons */}
            <button
              aria-label="Search"
              className="md:hidden grid place-items-center size-9 rounded-full border border-neutral-200 bg-white"
              onClick={() => setSearchOpen((v) => !v)}
            >
              {searchOpen ? (
                <X className="w-4 h-4 text-neutral-600" />
              ) : (
                <Search className="w-4 h-4 text-neutral-600" />
              )}
            </button>

            <Link
              to="/recipe/new"
              aria-label="New Recipe"
              className="md:hidden grid place-items-center size-9 rounded-full bg-orange-600 text-white hover:bg-orange-700"
            >
              <Plus className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Mobile slide-down search panel */}
        <div
          ref={panelRef}
          className={`md:hidden overflow-hidden border-t border-neutral-200 transition-[max-height,opacity] duration-200 ${
            searchOpen ? "max-h-24 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 py-3 bg-white/80 backdrop-blur">
            <label className="flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-3 py-2">
              <Search className="w-4 h-4 text-neutral-400" />
              <input
                type="search"
                placeholder="Search recipes…"
                className="w-full bg-transparent text-sm outline-none placeholder:text-neutral-400"
                autoFocus
              />
            </label>
          </div>
        </div>
      </nav>

      {/* keyframes for animations */}
      <style>{`
        @keyframes shine {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes floatY {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-1.5px); }
        }
      `}</style>
    </header>
  );
}
