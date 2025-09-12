import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import { fetchRecipeByCode } from "../lib/api.js";

export default function RecipeDetail() {
  const params = useParams();
  const code = params.code;
  const routeQuoteId = params.quoteId || params.qid;
  const [searchParams] = useSearchParams();

  const [data, setData] = useState(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  const TABS = [
    { id: "overview", label: "Overview" },
    { id: "ingredients", label: "Ingredients" },
    { id: "specifications", label: "Specs" },
  ];
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const sectionsRef = useRef({});

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setErr("");
        const res = await fetchRecipeByCode(code);
        setData(res);
        window.scrollTo({ top: 0, behavior: "smooth" });
        if (res?.recipe?.name) document.title = `${res.recipe.name} • Recipe`;
      } catch (e) {
        setErr(e?.message || "Failed to load recipe");
      } finally {
        setLoading(false);
      }
    })();
  }, [code]);

  const r = data?.recipe;
  const ing = data?.ingredients || [];
  const parsedBaseL = useMemo(
    () => Number(r?.base_volume_l ?? 0) || 1,
    [r?.base_volume_l]
  );

  // auto-open quote via URL (?quote=, ?quoteId= or route param)
  const urlQuoteParam =
    searchParams.get("quote") || searchParams.get("quoteId");
  const quoteIdFromUrl = routeQuoteId || urlQuoteParam;
  const openedByUrlRef = useRef(false);
  useEffect(() => {
    if (openedByUrlRef.current) return;
    if (!quoteIdFromUrl) return;
    openedByUrlRef.current = true;
    window.dispatchEvent(
      new CustomEvent("cpq:open", {
        detail: { route: "view-quote", quoteId: quoteIdFromUrl },
      })
    );
  }, [quoteIdFromUrl]);

  // scroll-spy
  useEffect(() => {
    const ids = TABS.map((t) => t.id);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveTab(visible[0].target.id.replace("sec-", ""));
      },
      { rootMargin: "-48% 0px -48% 0px", threshold: [0.1, 0.25, 0.5, 0.75] }
    );
    ids.forEach((id) => {
      const el = document.getElementById(`sec-${id}`);
      if (el) {
        sectionsRef.current[id] = el;
        observer.observe(el);
      }
    });
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const scrollToTab = (id) => {
    const el = document.getElementById(`sec-${id}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  /* ----------------- Pricing helpers ----------------- */
  const toMs = (d) => (d ? new Date(d).getTime() : null);
  const pricePhase = (valid_from, valid_to) => {
    const now = Date.now();
    const from = toMs(valid_from);
    const to = toMs(valid_to);
    if (from && now < from) return "upcoming";
    if (to && now > to) return "expired";
    return "active";
  };
  const fmtMoney = (val, currency = "USD", opts = {}) => {
    if (!Number.isFinite(val)) return "—";
    try {
      return new Intl.NumberFormat(undefined, {
        style: "currency",
        currency,
        maximumFractionDigits: opts.maxFrac ?? 2,
        minimumFractionDigits: opts.minFrac ?? 0,
      }).format(val);
    } catch {
      return `${currency} ${val.toFixed(opts.maxFrac ?? 2)}`;
    }
  };
  const fmtUnitPrice = (ppu, currency) =>
    fmtMoney(ppu, currency, { minFrac: 4, maxFrac: 6 });

  // derive totals by currency
  const totalsByCurrency = useMemo(() => {
    const totals = {};
    for (const row of ing) {
      const qty = Number(row.qty_per_base);
      const ppu = Number(row.price_per_uom);
      const cur = row.currency || "USD";
      if (Number.isFinite(qty) && Number.isFinite(ppu) && qty > 0 && ppu >= 0) {
        totals[cur] = (totals[cur] || 0) + qty * ppu;
      }
    }
    return totals;
  }, [ing]);

  const estCostDisplay = useMemo(() => {
    const entries = Object.entries(totalsByCurrency);
    if (!entries.length) return "—";
    return entries
      .map(([cur, amt]) => fmtMoney(amt, cur, { maxFrac: 2 }))
      .join(" + ");
  }, [totalsByCurrency]);

  const estCostPerLDisplay = useMemo(() => {
    const entries = Object.entries(totalsByCurrency);
    if (!entries.length || !parsedBaseL) return "";
    return entries
      .map(([cur, amt]) => fmtMoney(amt / parsedBaseL, cur, { maxFrac: 2 }))
      .join(" + ");
  }, [totalsByCurrency, parsedBaseL]);

  const missingPriceCount = useMemo(
    () =>
      ing.filter((row) => !Number.isFinite(Number(row.price_per_uom))).length,
    [ing]
  );

  // Loading skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <div className="h-[22rem] md:h-[28rem] w-full bg-neutral-200 animate-pulse" />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="h-28 bg-neutral-200 rounded-xl animate-pulse" />
            <div className="h-28 bg-neutral-200 rounded-xl animate-pulse" />
            <div className="h-28 bg-neutral-200 rounded-xl animate-pulse" />
          </div>
          <div className="mt-8 h-64 bg-neutral-200 rounded-2xl animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Error */}
      {err && (
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <p className="text-red-800 font-medium">{err}</p>
          </div>
        </div>
      )}

      {!loading && !err && r && (
        <>
          {/* HERO */}
          <div className="relative h-[22rem] md:h-[28rem] w-full">
            <img
              src={r.image_url}
              alt={r.name}
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => {
                e.target.src =
                  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI2MDAiIHZpZXdCb3g9IjAgMCAxMjAwIDYwMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI2MDAiIGZpbGw9IiNFQkVCRUQiLz48dGV4dCB4PSI2MDAiIHk9IjMwMCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSIjNjY3IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5JbWFnZSBub3QgYXZhaWxhYmxlPC90ZXh0Pjwvc3ZnPg==";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent" />
            <div className="absolute inset-x-0 bottom-0">
              <div className="max-w-6xl mx-auto px-4 pb-6">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-white/85 mb-2">
                  <Link to="/" className="hover:text-white">
                    Recipes
                  </Link>
                  <span className="opacity-70">/</span>
                  <span className="font-medium text-white">{r.name}</span>
                </div>

                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                  <div>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-sm">
                      {r.name}
                    </h1>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-white/15 text-white border border-white/20">
                        #{r.code}
                      </span>
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-white/15 text-white border border-white/20">
                        Base: {r.base_volume_l || "—"}L
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pb-1">
                    <button
                      className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-gray-900 font-semibold hover:bg-white/90 transition"
                      onClick={() =>
                        navigator
                          .share?.({ title: r.name, url: window.location.href })
                          .catch(() => {})
                      }
                    >
                      <ShareIcon />
                      Share
                    </button>

                    <button
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-600 text-white font-semibold hover:bg-orange-700 transition"
                      onClick={() => {
                        window.dispatchEvent(
                          new CustomEvent("cpq:open", {
                            detail: {
                              route: "create",
                              recipeCode: r.code,
                              defaults: { targetVolumeL: parsedBaseL },
                            },
                          })
                        );
                      }}
                    >
                      <PlusIcon />
                      Create Quote
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Tab Bar */}
          <div className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-neutral-200">
            <div className="max-w-6xl mx-auto px-4">
              <nav className="flex gap-1">
                {TABS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setActiveTab(t.id);
                      const el = document.getElementById(`sec-${t.id}`);
                      if (el)
                        el.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                    }}
                    className={`px-4 py-3 text-sm font-semibold transition rounded-t-xl
                      ${
                        activeTab === t.id
                          ? "text-orange-600 border-b-2 border-orange-600"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                  >
                    {t.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* CONTENT */}
          <div className="max-w-6xl mx-auto px-4 py-8 space-y-12">
            {/* OVERVIEW */}
            <section id="sec-overview" className="scroll-mt-20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard label="Ingredients" value={ing.length} />
                <StatCard
                  label="Base Volume"
                  value={`${r.base_volume_l || "—"} L`}
                  tone="emerald"
                />
                <StatCard label="Est. Cost (per base)" value={estCostDisplay} />
              </div>

              {estCostPerLDisplay ? (
                <div className="mt-3 text-xs text-neutral-600">
                  ≈ {estCostPerLDisplay} per liter
                </div>
              ) : null}

              {r.notes && (
                <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-5">
                  <h3 className="font-semibold text-amber-800 mb-1">Notes</h3>
                  <p className="text-amber-800">{r.notes}</p>
                </div>
              )}
            </section>

            {/* INGREDIENTS (with pricing) */}
            <section id="sec-ingredients" className="scroll-mt-20">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  Ingredients
                </h2>
                <p className="text-sm text-gray-600">
                  Based on {r.base_volume_l}L
                </p>
              </div>

              <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden">
                {/* Header row (responsive-friendly) */}
                <div className="hidden md:grid grid-cols-12 gap-4 px-5 py-3 bg-neutral-50 border-b border-neutral-200 text-xs font-semibold text-neutral-600">
                  <div className="col-span-4">Ingredient</div>
                  <div className="col-span-2">Qty / UOM</div>
                  <div className="col-span-2">Unit Price</div>
                  <div className="col-span-2">Line Cost</div>
                  <div className="col-span-2 text-right">Price Status</div>
                </div>

                {ing.map((row) => {
                  const qty = Number(row.qty_per_base);
                  const ppu = Number(row.price_per_uom);
                  const hasPrice =
                    Number.isFinite(qty) &&
                    Number.isFinite(ppu) &&
                    qty > 0 &&
                    ppu >= 0;
                  const line = hasPrice ? qty * ppu : null;
                  const phase = pricePhase(row.valid_from, row.valid_to);
                  const currency = row.currency || "USD";

                  return (
                    <div
                      key={row.ingredient_id}
                      className="p-5 md:grid md:grid-cols-12 md:items-center md:gap-4 border-b last:border-b-0 hover:bg-neutral-50 transition"
                    >
                      {/* Ingredient */}
                      <div className="md:col-span-4 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-700 grid place-items-center font-bold shadow-sm">
                          {row.ingredient?.[0]?.toUpperCase() || "I"}
                        </div>
                        <div>
                          <div className="text-base font-semibold text-gray-900">
                            {row.ingredient}
                          </div>
                          <div className="mt-1 flex items-center gap-2 text-xs text-gray-600">
                            <span className="px-2 py-0.5 rounded bg-neutral-100 font-mono">
                              {row.sku || "—"}
                            </span>
                            <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                              {row.uom}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Qty/UOM */}
                      <div className="md:col-span-2 mt-3 md:mt-0">
                        <div className="text-lg font-bold text-gray-900">
                          {row.qty_per_base}
                        </div>
                        <div className="text-xs text-gray-500">
                          per {r.base_volume_l}L base
                        </div>
                      </div>

                      {/* Unit Price */}
                      <div className="md:col-span-2 mt-3 md:mt-0">
                        <div className="text-sm font-semibold text-gray-900">
                          {hasPrice
                            ? `${fmtUnitPrice(ppu, currency)} / ${row.uom}`
                            : "—"}
                        </div>
                        <div className="text-xs text-gray-500">
                          {row.currency || "USD"}
                          {row.valid_from
                            ? ` • from ${new Date(
                                row.valid_from
                              ).toLocaleDateString()}`
                            : ""}
                          {row.valid_to
                            ? ` • to ${new Date(
                                row.valid_to
                              ).toLocaleDateString()}`
                            : ""}
                        </div>
                      </div>

                      {/* Line Cost */}
                      <div className="md:col-span-2 mt-3 md:mt-0">
                        <div className="text-base font-extrabold text-gray-900">
                          {line !== null ? fmtMoney(line, currency) : "—"}
                        </div>
                        <div className="text-xs text-gray-500">
                          {hasPrice
                            ? `${qty} × ${fmtUnitPrice(ppu, currency)}`
                            : ""}
                        </div>
                      </div>

                      {/* Status */}
                      <div className="md:col-span-2 mt-3 md:mt-0 md:text-right">
                        <PriceBadge phase={phase} />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-3 text-xs text-neutral-600">
                {missingPriceCount > 0 ? (
                  <span>
                    {missingPriceCount} ingredient
                    {missingPriceCount > 1 ? "s" : ""} have no active price —
                    those lines show as "—" and are excluded from totals.
                  </span>
                ) : (
                  <span>Pricing shown for current validity windows.</span>
                )}
              </div>
            </section>

            {/* SPECS */}
            <section id="sec-specifications" className="scroll-mt-20">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Specifications
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SpecCard label="Recipe Code" value={r.code} mono />
                <SpecCard
                  label="Base Volume"
                  value={`${r.base_volume_l} Liters`}
                />
                <SpecCard
                  label="Total Ingredients"
                  value={`${ing.length} items`}
                />
                {r.id ? (
                  <SpecCard label="Recipe ID" value={r.id} small mono />
                ) : null}
              </div>
            </section>
          </div>

          {/* Sticky Bottom CTA */}
          <div className="sticky bottom-0 z-30 border-t border-neutral-200 bg-white/95 backdrop-blur">
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
              <button
                className="flex-1 md:flex-none md:px-5 md:py-2.5 px-4 py-3 rounded-xl border border-neutral-300 text-gray-800 font-semibold hover:bg-neutral-50 transition"
                onClick={() =>
                  navigator
                    .share?.({ title: r.name, url: window.location.href })
                    .catch(() => {})
                }
              >
                Share
              </button>
              <button
                className="flex-1 px-4 py-3 md:px-5 md:py-2.5 rounded-xl bg-orange-600 text-white font-semibold hover:bg-orange-700 transition"
                onClick={() => {
                  window.dispatchEvent(
                    new CustomEvent("cpq:open", {
                      detail: {
                        route: "create",
                        recipeCode: r.code,
                        defaults: { targetVolumeL: parsedBaseL },
                      },
                    })
                  );
                }}
              >
                Create Quote for {r.base_volume_l}L
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/* ---------- UI helpers ---------- */

function PriceBadge({ phase }) {
  if (phase === "active")
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
        Active
      </span>
    );
  if (phase === "upcoming")
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
        Upcoming
      </span>
    );
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">
      Expired
    </span>
  );
}

function StatCard({ label, value, tone = "blue" }) {
  const tones = {
    blue: ["bg-blue-50", "text-blue-700", "border-blue-100"],
    emerald: ["bg-emerald-50", "text-emerald-700", "border-emerald-100"],
  }[tone] || ["bg-neutral-50", "text-neutral-700", "border-neutral-200"];

  return (
    <div className={`rounded-xl border ${tones[2]} p-5 ${tones[0]} shadow-sm`}>
      <div className="text-sm text-gray-600">{label}</div>
      <div className={`mt-1 text-2xl font-extrabold ${tones[1]}`}>{value}</div>
    </div>
  );
}

function SpecCard({ label, value, mono, small }) {
  return (
    <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm">
      <dt className="text-sm font-medium text-gray-600">{label}</dt>
      <dd
        className={`mt-1 ${
          small ? "text-sm" : "text-lg"
        } font-semibold text-gray-900`}
      >
        <span className={mono ? "font-mono" : ""}>{value}</span>
      </dd>
    </div>
  );
}

function ShareIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
      />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
      />
    </svg>
  );
}
