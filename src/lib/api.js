const BASE_URL = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/+$/, "");

// GET: /?type=recipe   -> returns array
export async function fetchAllRecipes() {
  const res = await fetch(`${BASE_URL}?type=recipe`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json(); // array of { id, code, name, notes, base_volume_l, image_url }
}

// GET: /?type=recipe-code&params=CODE -> { recipe: {...}, ingredients: [...] }
export async function fetchRecipeByCode(code) {
  const res = await fetch(
    `${BASE_URL}?type=recipe-code&params=${encodeURIComponent(code)}`
  );
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json(); // { recipe, ingredients }
}

/* Quotes used in ChatCPQ */
export async function fetchAllQuotes() {
  const res = await fetch(`${BASE_URL}?type=quotes`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function fetchQuoteById(id) {
  const res = await fetch(
    `${BASE_URL}?type=quote-id&params=${encodeURIComponent(id)}`
  );
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function createQuote(payload) {
  const res = await fetch(`${BASE_URL}?type=create-quote&params=abc`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload || {}),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function createRecipe(payload) {
  const directUrl = (import.meta.env.VITE_CREATE_RECIPE_URL || "").replace(
    /\/+$/,
    ""
  );
  const target = directUrl || `${BASE_URL}?type=create-recipe`;

  const res = await fetch(target, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload || {}),
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

// src/lib/api.js
export async function fetchAllIngredients() {
  const directUrl = (import.meta.env.VITE_CREATE_RECIPE_URL || "").replace(
    /\/+$/,
    ""
  );
  const target = directUrl
    ? `${directUrl}?type=ingredients`
    : `${(import.meta.env.VITE_API_BASE_URL || "").replace(
        /\/+$/,
        ""
      )}?type=ingredients`;
  const res = await fetch(target);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
