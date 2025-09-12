// src/components/AppNav.jsx
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ChefHat,
  Search,
  Plus,
  ChevronDown,
  X,
  Trash2,
  Upload,
  Image as ImageIcon,
  RefreshCcw,
} from "lucide-react";
import { createRecipe, fetchAllIngredients } from "../lib/api.js";

/* ==========================================================
   Top Navigation
========================================================== */
export default function AppNav({ userName = "User", userAvatarUrl = "" }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    const onDocClick = (e) => {
      if (!menuRef.current?.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  return (
    <header className="sticky top-0 z-40">
      {/* subtle accent bar */}
      <div className="h-[3px] w-full bg-gradient-to-r from-orange-500/80 via-orange-400/60 to-transparent" />
      <nav className="backdrop-blur bg-white/70 supports-[backdrop-filter]:bg-white/60 border-b border-neutral-200">
        <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
          {/* Brand */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-semibold text-neutral-900"
          >
            <span
              className="grid place-items-center size-7 rounded-xl shadow-[0_6px_18px_rgba(234,88,12,0.25)]"
              style={{ background: "linear-gradient(180deg,#fb923c,#ea580c)" }}
            >
              <ChefHat className="w-4 h-4 text-white" />
            </span>
            <span className="tracking-tight">CPQ Recipes</span>
          </Link>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* (decorative) Search */}
            <div className="hidden md:flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 h-9">
              <Search className="w-4 h-4 text-neutral-400" />
              <input
                type="search"
                placeholder="Search recipes…"
                className="w-52 bg-transparent text-sm outline-none placeholder:text-neutral-400"
              />
            </div>

            {/* New Recipe */}
            <button className="hidden md:inline-flex items-center gap-2 h-9 px-3 rounded-full bg-orange-600 text-white text-sm font-semibold hover:bg-orange-700">
              <Link to="/recipe/new" className="inline-flex items-center gap-2">
                <Plus className="w-4 h-4" />
                New Recipe
              </Link>
            </button>
          </div>
        </div>
      </nav>

      {/* Drawer mount */}
    </header>
  );
}
