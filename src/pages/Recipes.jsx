import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAllRecipes } from "../lib/api.js";
import SkeletonCard from "../components/SkeletonCard.jsx";

/* =========================
   Quick Filters & Sorters
========================= */
const QUICK_FILTERS = [
  { id: "all", label: "All", match: () => true },
  {
    id: "salsa",
    label: "Salsa",
    match: (r) => /salsa/i.test(r?.name) || /^SALS/i.test(r?.code),
  },
  {
    id: "pickle",
    label: "Pickle",
    match: (r) => /pickle/i.test(r?.name) || /^PICK/i.test(r?.code),
  },
  {
    id: "sauce",
    label: "Sauce",
    match: (r) => /sauce/i.test(r?.name) || /^SAUC/i.test(r?.code),
  },
  {
    id: "jam",
    label: "Jam",
    match: (r) => /jam/i.test(r?.name) || /^JAM/i.test(r?.code),
  },
];

const SORTS = [
  {
    id: "name-asc",
    label: "Name A–Z",
    cmp: (a, b) => (a.name || "").localeCompare(b.name || ""),
  },
  {
    id: "name-desc",
    label: "Name Z–A",
    cmp: (a, b) => (b.name || "").localeCompare(a.name || ""),
  },
  {
    id: "code-asc",
    label: "Code ↑",
    cmp: (a, b) => (a.code || "").localeCompare(b.code || ""),
  },
  {
    id: "code-desc",
    label: "Code ↓",
    cmp: (a, b) => (b.code || "").localeCompare(a.code || ""),
  },
];

/* =========================
   Helpers: Placeholder images
========================= */
function hashSeed(str = "") {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h << 5) - h + str.charCodeAt(i);
  return Math.abs(h);
}

function pickAccent(seed) {
  const palette = [
    "#EA302B", // brandish red
    "#0ea5e9", // sky-500
    "#22c55e", // green-500
    "#f59e0b", // amber-500
    "#6366f1", // indigo-500
    "#ef4444", // red-500
    "#14b8a6", // teal-500
  ];
  return palette[seed % palette.length];
}

function svgPlaceholder({ title = "Recipe", code = "", w = 800, h = 600 }) {
  const seed = hashSeed(`${title}-${code}`);
  const color = pickAccent(seed);
  const initial = (title?.[0] || "R").toUpperCase();
  const safe = (s) =>
    String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  const svg = `
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${w} ${h}' width='${w}' height='${h}'>
  <defs>
    <radialGradient id='g' cx='50%' cy='45%' r='70%'>
      <stop offset='0%' stop-color='${color}' stop-opacity='0.28'/>
      <stop offset='60%' stop-color='${color}' stop-opacity='0.12'/>
      <stop offset='100%' stop-color='${color}' stop-opacity='0.04'/>
    </radialGradient>
  </defs>
  <rect width='100%' height='100%' fill='#ffffff'/>
  <rect width='100%' height='100%' fill='url(#g)'/>
  <circle cx='120' cy='120' r='64' fill='${color}' fill-opacity='0.12'/>
  <text x='120' y='128' text-anchor='middle' font-family='Inter, ui-sans-serif, system-ui' font-size='48' fill='${color}' fill-opacity='0.9' dy='0'>${safe(
    initial
  )}</text>
  <text x='32' y='${
    h - 56
  }' font-family='Inter, ui-sans-serif, system-ui' font-size='28' fill='#111827' fill-opacity='0.88'>${safe(
    title
  )}</text>
  <text x='32' y='${
    h - 24
  }' font-family='ui-monospace, SFMono-Regular, Menlo, monospace' font-size='18' fill='#374151' fill-opacity='0.9'>#${safe(
    code || "N/A"
  )}</text>
</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function getImageSrc(r) {
  if (r?.image_url) return r.image_url;
  return svgPlaceholder({ title: r?.name, code: r?.code });
}

/* =========================
   Component
========================= */
export default function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const [q, setQ] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [sort, setSort] = useState("name-asc");

  // debounce search
  const [debouncedQ, setDebouncedQ] = useState(q);
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQ(q.trim().toLowerCase()), 220);
    return () => clearTimeout(t);
  }, [q]);

  // fetch on mount
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setErr("");
        const data = await fetchAllRecipes();
        setRecipes(Array.isArray(data) ? data : []);
      } catch (e) {
        setErr(e.message || "Failed to load recipes");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // filter + search + sort
  const filteredSorted = useMemo(() => {
    const base = recipes.filter((r) => {
      if (!QUICK_FILTERS.find((f) => f.id === activeFilter)?.match(r))
        return false;
      if (!debouncedQ) return true;
      const hay = `${r?.name || ""} ${r?.code || ""}`.toLowerCase();
      return hay.includes(debouncedQ);
    });
    const sorter = SORTS.find((s) => s.id === sort)?.cmp;
    return sorter ? [...base].sort(sorter) : base;
  }, [recipes, activeFilter, debouncedQ, sort]);

  // counts per filter (ignores search so chips are stable)
  const filterCounts = useMemo(() => {
    const m = {};
    for (const f of QUICK_FILTERS) m[f.id] = 0;
    for (const r of recipes) {
      for (const f of QUICK_FILTERS) if (f.match(r)) m[f.id] += 1;
    }
    return m;
  }, [recipes]);

  return (
    <section className="space-y-6">
      {/* HERO HEADER */}
      <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(65% 70% at 50% 40%, rgba(234,48,43,0.14) 0%, rgba(234,48,43,0.08) 35%, rgba(234,48,43,0.03) 75%)",
          }}
        />
        <div className="relative px-4 sm:px-6 py-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                Recipes
              </h1>
              <p className="text-gray-600">
                Explore all sauces, pickles, jams & salsas. Open a card to view
                ingredients and create quotes.
              </p>
            </div>

            <div className="flex w-full md:w-auto items-center gap-3">
              {/* Search */}
              <div className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-3 py-2 shadow-sm w-full md:w-80">
                <svg
                  className="w-4 h-4 text-gray-500"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M21 21l-4.3-4.3M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search name or code…"
                  className="w-full bg-transparent outline-none text-sm"
                />
              </div>

              {/* Sort */}
              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="appearance-none rounded-xl border border-gray-300 bg-white px-3 py-2 pr-8 text-sm shadow-sm outline-none hover:bg-gray-50"
                >
                  {SORTS.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.label}
                    </option>
                  ))}
                </select>
                <svg
                  className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Quick filters (scrollable pills) */}
          {/* <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
            {QUICK_FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-3 py-1.5 rounded-full text-sm border transition whitespace-nowrap ${
                  activeFilter === f.id
                    ? "border-orange-300 bg-orange-50 text-orange-700"
                    : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                }`}
                title={`Show ${f.label}`}
              >
                {f.label}
                <span
                  className={`ml-2 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-xs ${
                    activeFilter === f.id
                      ? "bg-orange-100 text-orange-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {filterCounts[f.id] ?? 0}
                </span>
              </button>
            ))}
          </div> */}
        </div>

        {/* Divider with counts */}
        {/* <div className="border-t border-gray-200 px-4 sm:px-6 py-2 text-sm text-gray-600 flex items-center justify-between">
          <span>
            Showing <b>{filteredSorted.length}</b> of {recipes.length} recipes
            {debouncedQ ? (
              <>
                {" "}
                for “<b>{debouncedQ}</b>”
              </>
            ) : null}
          </span>
          <span className="text-gray-500">
            Click a card to see ingredients →
          </span>
        </div> */}
      </div>

      {/* Loading */}
      {loading && (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {/* Error */}
      {err && (
        <div className="rounded-xl border border-red-200 bg-red-50 text-red-700 px-4 py-3">
          {err}
        </div>
      )}

      {/* Grid */}
      {!loading &&
        !err &&
        (filteredSorted.length > 0 ? (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4">
            {filteredSorted.map((r) => (
              <Link
                key={r.id}
                to={`/recipe/${encodeURIComponent(r.code)}`}
                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  {/* eslint-disable-next-line */}
                  <img
                    src={getImageSrc(r)}
                    alt={r.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = svgPlaceholder({
                        title: r?.name,
                        code: r?.code,
                      });
                    }}
                  />
                  {/* top-left code badge */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm rounded-full px-2.5 py-1 border border-gray-200 shadow-sm">
                    <span className="text-[11px] font-semibold tracking-wide text-gray-700">
                      #{r.code}
                    </span>
                  </div>
                  {/* bottom gradient label */}
                  <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-white/95 via-white/70 to-transparent">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-semibold text-gray-900 line-clamp-1">
                        {r.name}
                      </h3>
                      <span className="text-[11px] px-2 py-1 rounded-full border border-gray-200 bg-white text-gray-700">
                        {r.base_volume_l || "—"} L
                      </span>
                    </div>
                    {/* <p className="mt-0.5 text-[11px] text-gray-500 line-clamp-1">
                      Tap to view ingredients & create quote
                    </p> */}
                  </div>

                  {/* subtle hover scrim */}
                  <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-black/0 group-hover:bg-black/0" />
                </div>

                <div className="p-3 flex items-center justify-between">
                  <span className="text-sm text-gray-500">Open details</span>
                  <span className="text-orange-600 font-medium group-hover:translate-x-0.5 transition-transform">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center">
            <div className="mx-auto mb-3 w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-orange-600"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 9v4m0 4h.01M21 12A9 9 0 1 1 3 12a9 9 0 0 1 18 0Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <p className="text-gray-700 font-medium">No recipes found</p>
            <p className="text-sm text-gray-500">
              Try clearing filters or adjusting your search.
            </p>
          </div>
        ))}
    </section>
  );
}
