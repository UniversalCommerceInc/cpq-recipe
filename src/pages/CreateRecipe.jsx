// import React, { useEffect, useMemo, useRef, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   ArrowLeft,
//   Check,
//   ChevronDown,
//   DollarSign,
//   Image as ImageIcon,
//   Loader2,
//   Plus,
//   RefreshCcw,
//   Save,
//   Search,
//   Upload,
//   Wand2,
//   AlertTriangle,
// } from "lucide-react";
// import { createRecipe, fetchAllIngredients } from "../lib/api.js";

// /* ============================================================
//    ✨ Friendly Samples (no cryptic #5/#6, no JSON shown here)
//    ============================================================ */
// const SAMPLE_LIBRARY = [
//   {
//     key: "garlicky_mango_pickle",
//     title: "Garlicky Mango Pickle",
//     tagline: "Mango • Garlic • Mustard • Chili",
//     image: "https://www.seema.com/wp-content/uploads/2022/01/mango-pickle1.jpg",
//     payload: {
//       name: "Garlicky Mango Pickle",
//       base_volume_l: 1,
//       notes:
//         "Classic North Indian style: mango, garlic, mustard, chili, vinegar.",
//       image_url:
//         "https://www.seema.com/wp-content/uploads/2022/01/mango-pickle1.jpg",
//       ingredients: [
//         { id: "2b373834-07bb-446e-9a9c-8b01f48d5b51", qty_per_base: 500 }, // Mango
//         { id: "3ab94370-5958-4368-8f26-e8b62ffdca51", qty_per_base: 60 }, // Garlic
//         { id: "c2438b60-ba2a-4043-9e8b-fc607767c6ea", qty_per_base: 20 }, // Mustard Seeds
//         { id: "47c4227c-323a-4e13-ba8d-d8659572fe71", qty_per_base: 25 }, // Chili Powder
//         { id: "a0a2449f-486f-4002-b9b9-139cadbf6497", qty_per_base: 40 }, // Salt
//         { id: "a32b5bd0-2f70-400b-a875-8a4d34c20708", qty_per_base: 80 }, // Vinegar (ml)
//       ],
//       allowUpdate: true,
//       replaceIngredientsOnUpdate: true,
//       allowCreateIngredients: false,
//     },
//   },
//   {
//     key: "spicy_tomato_chili_sauce",
//     title: "Spicy Tomato Chili Sauce",
//     tagline: "Tomato • Chili • Garlic • Vinegar",
//     image:
//       "https://www.ohmyfoodrecipes.com/wp-content/uploads/2017/03/garlic-chili-sauce-on-spoon-horizontal2.jpg",
//     payload: {
//       name: "Spicy Tomato Chili Sauce",
//       base_volume_l: 1,
//       notes: "Smooth tomato base with garlic heat and a vinegar bite.",
//       image_url:
//         "https://www.ohmyfoodrecipes.com/wp-content/uploads/2017/03/garlic-chili-sauce-on-spoon-horizontal2.jpg",
//       ingredients: [
//         { id: "2e475db5-dc5e-4c57-8fdb-036593755912", qty_per_base: 600 }, // Tomato
//         { id: "3ab94370-5958-4368-8f26-e8b62ffdca51", qty_per_base: 30 }, // Garlic
//         { id: "47c4227c-323a-4e13-ba8d-d8659572fe71", qty_per_base: 40 }, // Chili Powder
//         { id: "a32b5bd0-2f70-400b-a875-8a4d34c20708", qty_per_base: 90 }, // Vinegar (ml)
//         { id: "a0a2449f-486f-4002-b9b9-139cadbf6497", qty_per_base: 10 }, // Salt
//         { id: "d1581f69-6dcd-476b-8a7f-eb0a00f71949", qty_per_base: 60 }, // Sugar
//       ],
//       allowUpdate: true,
//       replaceIngredientsOnUpdate: true,
//       allowCreateIngredients: false,
//     },
//   },
//   {
//     key: "pineapple_ginger_jam",
//     title: "Pineapple Ginger Jam",
//     tagline: "Pineapple • Ginger • Sugar",
//     image: "https://source.unsplash.com/1200x800/?pineapple,jam",
//     payload: {
//       name: "Pineapple Ginger Jam",
//       base_volume_l: 1,
//       notes: "Bright tropical jam with a gentle ginger warmth.",
//       image_url: "https://source.unsplash.com/1200x800/?pineapple,jam",
//       ingredients: [
//         { id: "6e468eac-e8c8-47a9-b4bb-fce87a9169fc", qty_per_base: 700 }, // Pineapple
//         { id: "f0c73258-c435-45d0-9bde-31d1247de0e7", qty_per_base: 30 }, // Ginger
//         { id: "d1581f69-6dcd-476b-8a7f-eb0a00f71949", qty_per_base: 250 }, // Sugar
//         { id: "7f763aa6-69cd-4804-a7ab-0ec76b0f7f6f", qty_per_base: 20 }, // Apple Cider Vinegar (ml)
//         { id: "a0a2449f-486f-4002-b9b9-139cadbf6497", qty_per_base: 5 }, // Salt
//       ],
//       allowUpdate: true,
//       replaceIngredientsOnUpdate: true,
//       allowCreateIngredients: false,
//     },
//   },
//   {
//     key: "tomato_garlic_salsa_fresca",
//     title: "Tomato Garlic Salsa Fresca",
//     tagline: "Tomato • Garlic • Chili • ACV",
//     image:
//       "https://www.inspiredtaste.net/wp-content/uploads/2020/01/Easy-Salsa-Recipe-1200.jpg",
//     payload: {
//       name: "Tomato Garlic Salsa Fresca",
//       base_volume_l: 1,
//       notes: "Chunky, fresh-style salsa with a touch of heat and tang.",
//       image_url:
//         "https://www.inspiredtaste.net/wp-content/uploads/2020/01/Easy-Salsa-Recipe-1200.jpg",
//       ingredients: [
//         { id: "2e475db5-dc5e-4c57-8fdb-036593755912", qty_per_base: 650 }, // Tomato
//         { id: "3ab94370-5958-4368-8f26-e8b62ffdca51", qty_per_base: 25 }, // Garlic
//         { id: "47c4227c-323a-4e13-ba8d-d8659572fe71", qty_per_base: 15 }, // Chili Powder
//         { id: "7f763aa6-69cd-4804-a7ab-0ec76b0f7f6f", qty_per_base: 15 }, // Apple Cider Vinegar (ml)
//         { id: "a0a2449f-486f-4002-b9b9-139cadbf6497", qty_per_base: 8 }, // Salt
//         { id: "d1581f69-6dcd-476b-8a7f-eb0a00f71949", qty_per_base: 20 }, // Sugar
//       ],
//       allowUpdate: true,
//       replaceIngredientsOnUpdate: true,
//       allowCreateIngredients: false,
//     },
//   },
//   {
//     key: "mango_papaya_chutney",
//     title: "Mango Papaya Chutney",
//     tagline: "Mango • Papaya • Ginger • Chili",
//     image: "https://source.unsplash.com/1200x800/?mango,chutney",
//     payload: {
//       name: "Mango Papaya Chutney",
//       base_volume_l: 1,
//       notes: "Sweet-tangy chutney with tropical fruit and gentle heat.",
//       image_url: "https://source.unsplash.com/1200x800/?mango,chutney",
//       ingredients: [
//         { id: "2b373834-07bb-446e-9a9c-8b01f48d5b51", qty_per_base: 300 }, // Mango
//         { id: "260b336f-7c6d-4f20-87d3-7874ce75b6cf", qty_per_base: 300 }, // Papaya
//         { id: "f0c73258-c435-45d0-9bde-31d1247de0e7", qty_per_base: 15 }, // Ginger
//         { id: "47c4227c-323a-4e13-ba8d-d8659572fe71", qty_per_base: 10 }, // Chili Powder
//         { id: "a32b5bd0-2f70-400b-a875-8a4d34c20708", qty_per_base: 60 }, // Vinegar (ml)
//         { id: "d1581f69-6dcd-476b-8a7f-eb0a00f71949", qty_per_base: 120 }, // Sugar
//         { id: "a0a2449f-486f-4002-b9b9-139cadbf6497", qty_per_base: 8 }, // Salt
//         { id: "c2438b60-ba2a-4043-9e8b-fc607767c6ea", qty_per_base: 10 }, // Mustard Seeds
//       ],
//       allowUpdate: true,
//       replaceIngredientsOnUpdate: true,
//       allowCreateIngredients: false,
//     },
//   },
//   {
//     key: "spiced_apple_jam",
//     title: "Spiced Apple Jam",
//     tagline: "Apple • Sugar • Brown Sugar • ACV",
//     image: "https://source.unsplash.com/1200x800/?apple,jam",
//     payload: {
//       name: "Spiced Apple Jam",
//       base_volume_l: 1,
//       notes: "Comforting apple preserve with balanced sweetness and tang.",
//       image_url: "https://source.unsplash.com/1200x800/?apple,jam",
//       ingredients: [
//         { id: "9f8cd922-d640-4fbd-a25a-59bebee32b9c", qty_per_base: 700 }, // Apple
//         { id: "d1581f69-6dcd-476b-8a7f-eb0a00f71949", qty_per_base: 180 }, // Sugar
//         { id: "7bec4b0e-7435-4ca2-8333-1274a2304162", qty_per_base: 40 }, // Brown Sugar
//         { id: "7f763aa6-69cd-4804-a7ab-0ec76b0f7f6f", qty_per_base: 15 }, // Apple Cider Vinegar (ml)
//         { id: "a0a2449f-486f-4002-b9b9-139cadbf6497", qty_per_base: 5 }, // Salt
//       ],
//       allowUpdate: true,
//       replaceIngredientsOnUpdate: true,
//       allowCreateIngredients: false,
//     },
//   },
//   {
//     key: "cranberry_holiday_relish",
//     title: "Cranberry Holiday Relish",
//     tagline: "Cranberry • Sugar • ACV",
//     image: "https://source.unsplash.com/1200x800/?cranberry,sauce",
//     payload: {
//       name: "Cranberry Holiday Relish",
//       base_volume_l: 1,
//       notes: "Classic tangy-sweet relish.",
//       image_url: "https://source.unsplash.com/1200x800/?cranberry,sauce",
//       ingredients: [
//         { id: "e09311d8-08bd-4556-9a87-d2d73b1211dd", qty_per_base: 200 }, // Cranberry
//         { id: "d1581f69-6dcd-476b-8a7f-eb0a00f71949", qty_per_base: 180 }, // Sugar
//         { id: "7f763aa6-69cd-4804-a7ab-0ec76b0f7f6f", qty_per_base: 20 }, // Apple Cider Vinegar (ml)
//         { id: "a0a2449f-486f-4002-b9b9-139cadbf6497", qty_per_base: 3 }, // Salt
//       ],
//       allowUpdate: true,
//       replaceIngredientsOnUpdate: true,
//       allowCreateIngredients: false,
//     },
//   },
//   {
//     key: "garlic_chili_pickle",
//     title: "Garlic Chili Pickle",
//     tagline: "Garlic • Mustard Seeds • Chili • Vinegar",
//     image: "https://source.unsplash.com/1200x800/?garlic,pickle",
//     payload: {
//       name: "Garlic Chili Pickle",
//       base_volume_l: 1,
//       notes: "Punchy, spicy pickle with garlic chunks and mustard seeds.",
//       image_url: "https://source.unsplash.com/1200x800/?garlic,pickle",
//       ingredients: [
//         { id: "3ab94370-5958-4368-8f26-e8b62ffdca51", qty_per_base: 120 }, // Garlic
//         { id: "c2438b60-ba2a-4043-9e8b-fc607767c6ea", qty_per_base: 20 }, // Mustard Seeds
//         { id: "47c4227c-323a-4e13-ba8d-d8659572fe71", qty_per_base: 30 }, // Chili Powder
//         { id: "a32b5bd0-2f70-400b-a875-8a4d34c20708", qty_per_base: 80 }, // Vinegar (ml)
//         { id: "a0a2449f-486f-4002-b9b9-139cadbf6497", qty_per_base: 15 }, // Salt
//         { id: "d1581f69-6dcd-476b-8a7f-eb0a00f71949", qty_per_base: 10 }, // Sugar
//       ],
//       allowUpdate: true,
//       replaceIngredientsOnUpdate: true,
//       allowCreateIngredients: false,
//     },
//   },
//   {
//     key: "banana_milkshake",
//     title: "Banana Milkshake",
//     tagline: "Banana • Milk • Vanilla",
//     image:
//       "https://imgs.search.brave.com/0UTaxMXAAts2vlf7rlAQFbueMtkmARvcsZaQuaeAAJw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzEyLzUyLzI5Lzk1/LzM2MF9GXzEyNTIy/OTk1NjZfWDZFS2Nj/Y3J6azh1VUU4ZzRu/RkYxZHE0aHRWUkNO/cXYuanBn",
//     payload: {
//       name: "Banana Milkshake",
//       base_volume_l: 1,
//       notes:
//         "Creamy classic milkshake—sweet, thick, and kid-friendly. Adjust milk for thickness; sugar/honey for sweetness.",
//       image_url:
//         "https://imgs.search.brave.com/0UTaxMXAAts2vlf7rlAQFbueMtkmARvcsZaQuaeAAJw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzEyLzUyLzI5Lzk1/LzM2MF9GXzEyNTIy/OTk1NjZfWDZFS2Nj/Y3J6azh1VUU4ZzRu/RkYxZHE0aHRWUkNO/cXYuanBn",
//       ingredients: [
//         {
//           name: "Banana (ripe)",
//           uom: "g",
//           qty_per_base: 350,
//           price: { currency: "USD", price_per_uom: 0.002 },
//         },
//         {
//           name: "Milk (chilled)",
//           uom: "ml",
//           qty_per_base: 650,
//           price: { currency: "USD", price_per_uom: 0.0012 },
//         },
//         {
//           // Sugar exists in your catalog
//           id: "d1581f69-6dcd-476b-8a7f-eb0a00f71949",
//           qty_per_base: 30,
//         },
//         {
//           name: "Vanilla extract",
//           uom: "ml",
//           qty_per_base: 5,
//           price: { currency: "USD", price_per_uom: 0.04 },
//         },
//         {
//           name: "Ice cubes (optional)",
//           uom: "g",
//           qty_per_base: 120,
//           price: { currency: "USD", price_per_uom: 0.0002 },
//         },
//       ],
//       allowUpdate: true,
//       replaceIngredientsOnUpdate: true,
//       allowCreateIngredients: true,
//     },
//   },
// ];

// /* ======================
//    Helpers / UX Utilities
//    ====================== */
// function autoCode(name = "") {
//   const base = (name || "Recipe").trim();
//   const token = base
//     .split(/\s+/)[0]
//     .replace(/[^A-Za-z]/g, "")
//     .slice(0, 4)
//     .toUpperCase()
//     .padEnd(4, "X");
//   const rnd = Math.floor(100 + Math.random() * 900);
//   return `${token}-${rnd}`;
// }
// function isActivePrice(valid_from, valid_to) {
//   const now = Date.now();
//   const from = valid_from ? new Date(valid_from).getTime() : null;
//   const to = valid_to ? new Date(valid_to).getTime() : null;
//   return (from === null || from <= now) && (to === null || now <= to);
// }
// function currencySym(c = "USD") {
//   return c === "USD" ? "$" : c;
// }

// /* ======================
//    Main Component
//    ====================== */
// export default function CreateRecipe() {
//   const navigate = useNavigate();

//   // Stepper
//   const steps = ["Basics", "Ingredients", "Review"];
//   const [step, setStep] = useState(0);

//   // Catalog
//   const [catalog, setCatalog] = useState({
//     loading: false,
//     error: "",
//     items: [],
//   });
//   const [catalogQuery, setCatalogQuery] = useState("");
//   const [openPickerIdx, setOpenPickerIdx] = useState(-1);
//   const pickerRef = useRef(null);

//   // Form
//   const [form, setForm] = useState({
//     code: "",
//     name: "",
//     base_volume_l: 1,
//     notes: "",
//     image_url: "",
//     ingredients: [
//       {
//         mode: "existing",
//         id: "",
//         name: "",
//         uom: "g",
//         qty_per_base: "",
//         priceEnabled: false,
//         price: {
//           currency: "USD",
//           price_per_uom: "",
//           valid_from: "",
//           valid_to: "",
//         },
//       },
//     ],
//     allowUpdate: true,
//     replaceIngredientsOnUpdate: true,
//     allowCreateIngredients: true,
//   });

//   const codePreview = useMemo(
//     () => form.code?.trim() || autoCode(form.name),
//     [form.code, form.name]
//   );

//   // Catalog fetch
//   useEffect(() => {
//     (async () => {
//       try {
//         setCatalog((c) => ({ ...c, loading: true, error: "" }));
//         const rows = await fetchAllIngredients();
//         setCatalog({
//           loading: false,
//           error: "",
//           items: Array.isArray(rows) ? rows : [],
//         });
//       } catch (e) {
//         setCatalog({
//           loading: false,
//           error: e?.message || "Failed to load ingredients",
//           items: [],
//         });
//       }
//     })();
//   }, []);

//   // Close combobox on outside click
//   useEffect(() => {
//     const onDoc = (e) => {
//       if (pickerRef.current && !pickerRef.current.contains(e.target)) {
//         setOpenPickerIdx(-1);
//       }
//     };
//     document.addEventListener("mousedown", onDoc);
//     return () => document.removeEventListener("mousedown", onDoc);
//   }, []);

//   // Derived
//   const filteredCatalog = useMemo(() => {
//     const q = catalogQuery.trim().toLowerCase();
//     if (!q) return catalog.items;
//     return catalog.items.filter((it) => {
//       const hay = `${it.name || ""} ${it.sku || ""} ${it.uom || ""} ${
//         it.id || ""
//       }`.toLowerCase();
//       return hay.includes(q);
//     });
//   }, [catalog.items, catalogQuery]);

//   const estimated = useMemo(() => {
//     let sum = 0;
//     let currency = "USD";
//     let missing = 0;
//     for (const row of form.ingredients) {
//       if (row.mode === "existing" && row.id && row.qty_per_base) {
//         const it = catalog.items.find((x) => x.id === row.id);
//         if (!it) continue;
//         const active = isActivePrice(it.valid_from, it.valid_to);
//         if (active && it.price_per_uom) {
//           const p = Number(it.price_per_uom);
//           const qty = Number(row.qty_per_base);
//           if (Number.isFinite(p) && Number.isFinite(qty)) {
//             sum += p * qty;
//             currency = it.currency || currency;
//           }
//         } else {
//           missing += 1;
//         }
//       }
//     }
//     return { sum, currency, missing };
//   }, [form.ingredients, catalog.items]);

//   // Update helpers
//   const updateField = (patch) => setForm((f) => ({ ...f, ...patch }));
//   const updateIngredient = (idx, patch) =>
//     setForm((f) => {
//       const copy = [...f.ingredients];
//       copy[idx] = { ...copy[idx], ...patch };
//       return { ...f, ingredients: copy };
//     });
//   const addIngredient = () =>
//     setForm((f) => ({
//       ...f,
//       ingredients: [
//         ...f.ingredients,
//         {
//           mode: "existing",
//           id: "",
//           name: "",
//           uom: "g",
//           qty_per_base: "",
//           priceEnabled: false,
//           price: {
//             currency: "USD",
//             price_per_uom: "",
//             valid_from: "",
//             valid_to: "",
//           },
//         },
//       ],
//     }));
//   const removeIngredient = (idx) =>
//     setForm((f) => ({
//       ...f,
//       ingredients: f.ingredients.filter((_, i) => i !== idx),
//     }));

//   // File to dataURL
//   const onSelectFile = (file) => {
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onload = () =>
//       updateField({ image_url: String(reader.result || "") });
//     reader.readAsDataURL(file);
//   };

//   // Validation
//   const validate = () => {
//     if (!form.name?.trim()) return "Name is required.";
//     const vol = Number(form.base_volume_l);
//     if (!Number.isFinite(vol) || vol <= 0)
//       return "Base volume must be a positive number.";
//     if (!form.ingredients.length) return "Add at least one ingredient.";
//     for (let i = 0; i < form.ingredients.length; i++) {
//       const row = form.ingredients[i];
//       const qty = Number(row.qty_per_base);
//       if (!Number.isFinite(qty) || qty <= 0)
//         return `Ingredient #${i + 1}: quantity must be > 0.`;
//       if (row.mode === "existing") {
//         if (!row.id?.trim())
//           return `Ingredient #${i + 1}: choose an ingredient from catalog.`;
//       } else {
//         if (!form.allowCreateIngredients)
//           return `Ingredient #${i + 1}: creating new ingredient disabled.`;
//         if (!row.name?.trim() || !row.uom?.trim())
//           return `Ingredient #${i + 1}: new ingredient requires name & UOM.`;
//         if (row.priceEnabled) {
//           const p = Number(row.price.price_per_uom);
//           if (!Number.isFinite(p) || p <= 0)
//             return `Ingredient #${i + 1}: price_per_uom must be positive.`;
//         }
//       }
//     }
//     return "";
//   };

//   // Build payload
//   const buildPayload = () => {
//     const codeFinal = form.code?.trim() || autoCode(form.name);
//     return {
//       code: codeFinal,
//       name: form.name.trim(),
//       base_volume_l: Number(form.base_volume_l),
//       ...(form.notes?.trim() ? { notes: form.notes.trim() } : {}),
//       ...(form.image_url?.trim() ? { image_url: form.image_url.trim() } : {}),
//       ingredients: form.ingredients.map((row) => {
//         if (row.mode === "existing") {
//           return { id: row.id.trim(), qty_per_base: Number(row.qty_per_base) };
//         }
//         const out = {
//           name: row.name.trim(),
//           uom: row.uom.trim(),
//           qty_per_base: Number(row.qty_per_base),
//         };
//         if (row.priceEnabled) {
//           const price = {
//             currency: row.price.currency || "USD",
//             price_per_uom: Number(row.price.price_per_uom),
//           };
//           if (row.price.valid_from) price.valid_from = row.price.valid_from;
//           if (row.price.valid_to) price.valid_to = row.price.valid_to;
//           out.price = price;
//         }
//         return out;
//       }),
//       allowUpdate: !!form.allowUpdate,
//       replaceIngredientsOnUpdate: !!form.replaceIngredientsOnUpdate,
//       allowCreateIngredients: !!form.allowCreateIngredients,
//     };
//   };

//   // Submit
//   const [serverMsg, setServerMsg] = useState({ type: "", text: "" });
//   const [submitting, setSubmitting] = useState(false);
//   const onSubmit = async () => {
//     setServerMsg({ type: "", text: "" });
//     const err = validate();
//     if (err) {
//       setServerMsg({ type: "error", text: err });
//       return;
//     }
//     const payload = buildPayload();
//     try {
//       setSubmitting(true);
//       const res = await createRecipe(payload);
//       const code = res?.code || payload.code;
//       setServerMsg({
//         type: "success",
//         text: `Created/updated recipe: ${code}`,
//       });
//       setTimeout(() => navigate(`/recipe/${encodeURIComponent(code)}`), 650);
//     } catch (e) {
//       setServerMsg({
//         type: "error",
//         text: e?.message || "Create recipe failed.",
//       });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // UI atoms
//   const StepBadge = ({ i, label }) => (
//     <div className="flex items-center">
//       <div
//         className={`h-7 w-7 rounded-full grid place-items-center text-xs font-bold ${
//           step > i
//             ? "bg-emerald-500 text-white"
//             : step === i
//             ? "bg-orange-600 text-white"
//             : "bg-neutral-200 text-neutral-700"
//         }`}
//       >
//         {step > i ? <Check className="w-4 h-4" /> : i + 1}
//       </div>
//       <div
//         className={`ml-2 text-sm ${
//           step === i ? "text-orange-600" : "text-neutral-600"
//         }`}
//       >
//         {label}
//       </div>
//     </div>
//   );

//   // Ingredient picker dropdown (combobox)
//   const renderPicker = (idx) => {
//     const open = openPickerIdx === idx;
//     const row = form.ingredients[idx];
//     const selected = row.id ? catalog.items.find((x) => x.id === row.id) : null;
//     return (
//       <div className="relative" ref={pickerRef}>
//         <button
//           type="button"
//           onClick={() => setOpenPickerIdx(open ? -1 : idx)}
//           className="w-full flex items-center justify-between rounded-xl border border-neutral-300 bg-white px-3 py-2 text-left hover:bg-neutral-50"
//         >
//           <div className="truncate">
//             {selected ? (
//               <div className="flex items-center gap-2">
//                 <span className="font-semibold">{selected.name}</span>
//                 <span className="text-xs text-neutral-500">
//                   • {selected.uom}
//                 </span>
//                 <span className="text-xs text-neutral-500">
//                   • {selected.sku || "—"}
//                 </span>
//               </div>
//             ) : (
//               <span className="text-neutral-500">Select ingredient…</span>
//             )}
//           </div>
//           <ChevronDown className="w-4 h-4 text-neutral-500" />
//         </button>

//         {open && (
//           <div className="absolute z-[100] mt-2 w-full rounded-xl border border-neutral-200 bg-white shadow-lg">
//             <div className="flex items-center gap-2 p-2 border-b">
//               <Search className="w-4 h-4 text-neutral-400" />
//               <input
//                 value={catalogQuery}
//                 onChange={(e) => setCatalogQuery(e.target.value)}
//                 placeholder="Search name, SKU, ID…"
//                 className="w-full bg-transparent text-sm outline-none"
//               />
//               <button
//                 className="text-xs px-2 py-1 border rounded-lg hover:bg-neutral-50"
//                 onClick={async () => {
//                   try {
//                     setCatalog((c) => ({ ...c, loading: true }));
//                     const rows = await fetchAllIngredients();
//                     setCatalog({
//                       loading: false,
//                       error: "",
//                       items: Array.isArray(rows) ? rows : [],
//                     });
//                   } catch (e) {
//                     setCatalog((c) => ({
//                       ...c,
//                       loading: false,
//                       error: e?.message || "Refresh failed",
//                     }));
//                   }
//                 }}
//                 type="button"
//               >
//                 <RefreshCcw className="w-3.5 h-3.5 inline -mt-0.5" /> Refresh
//               </button>
//             </div>
//             <div className="max-h-72 overflow-auto">
//               {catalog.loading ? (
//                 <div className="p-4 text-sm text-neutral-500">Loading…</div>
//               ) : filteredCatalog.length ? (
//                 filteredCatalog.map((it) => {
//                   const active = isActivePrice(it.valid_from, it.valid_to);
//                   return (
//                     <button
//                       key={it.id}
//                       onClick={() => {
//                         updateIngredient(idx, {
//                           id: it.id,
//                           uom: it.uom || row.uom,
//                         });
//                         setOpenPickerIdx(-1);
//                       }}
//                       className="w-full text-left px-3 py-2 hover:bg-neutral-50"
//                       type="button"
//                     >
//                       <div className="flex items-center justify-between">
//                         <div className="truncate">
//                           <div className="font-medium truncate">{it.name}</div>
//                           <div className="text-xs text-neutral-500 truncate">
//                             {it.sku || "—"} • {String(it.id).slice(0, 8)}… •{" "}
//                             {it.uom}
//                           </div>
//                         </div>
//                         <div className="text-right">
//                           <div
//                             className={`text-xs ${
//                               active ? "text-emerald-600" : "text-amber-600"
//                             }`}
//                           >
//                             {active ? "Active" : "Future/Closed"}
//                           </div>
//                           {it.price_per_uom ? (
//                             <div className="text-xs text-neutral-600">
//                               {currencySym(it.currency)}{" "}
//                               {Number(it.price_per_uom).toFixed(4)}/{it.uom}
//                             </div>
//                           ) : null}
//                         </div>
//                       </div>
//                     </button>
//                   );
//                 })
//               ) : (
//                 <div className="p-4 text-sm text-neutral-500">No matches.</div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   };

//   // Build “friendly issues” for review
//   const issues = useMemo(() => {
//     const list = [];
//     if (!form.name?.trim()) list.push("Add a recipe name.");
//     const vol = Number(form.base_volume_l);
//     if (!Number.isFinite(vol) || vol <= 0)
//       list.push("Base volume must be a positive number.");
//     if (!form.ingredients.length) list.push("Add at least one ingredient.");
//     form.ingredients.forEach((row, i) => {
//       if (row.mode === "existing") {
//         if (!row.id?.trim())
//           list.push(`Ingredient #${i + 1}: choose an ingredient from catalog.`);
//       } else {
//         if (!row.name?.trim() || !row.uom?.trim())
//           list.push(
//             `Ingredient #${i + 1}: new ingredient requires name & UOM.`
//           );
//       }
//       const qty = Number(row.qty_per_base);
//       if (!Number.isFinite(qty) || qty <= 0)
//         list.push(`Ingredient #${i + 1}: quantity must be > 0.`);
//     });
//     if (estimated.missing)
//       list.push(
//         `${estimated.missing} catalog ingredient(s) have no active price; estimate excludes them.`
//       );
//     return list;
//   }, [form, estimated.missing]);

//   // Page
//   return (
//     <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-50 via-white to-white">
//       {/* Sticky header with stepper */}
//       <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-neutral-200">
//         <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
//           <Link
//             to="/"
//             className="inline-flex items-center gap-2 text-sm text-neutral-700 hover:text-neutral-900"
//           >
//             <ArrowLeft className="w-4 h-4" />
//             Back to Recipes
//           </Link>

//           <div className="ml-auto flex items-center gap-3">
//             <div className="hidden md:flex items-center gap-5">
//               {steps.map((s, i) => (
//                 <StepBadge key={s} i={i} label={s} />
//               ))}
//             </div>

//             <div className="hidden md:flex items-center gap-2 rounded-xl border px-3 py-1.5 text-xs text-neutral-700 bg-white">
//               <Wand2 className="w-4 h-4 text-orange-600" />
//               Code (auto):
//               <span className="ml-1 font-mono rounded bg-neutral-100 px-2 py-0.5">
//                 {codePreview}
//               </span>
//             </div>

//             <button
//               onClick={onSubmit}
//               disabled={submitting}
//               className="inline-flex items-center gap-2 rounded-xl bg-orange-600 text-white px-4 py-2 font-semibold hover:bg-orange-700 disabled:opacity-60"
//             >
//               {submitting ? (
//                 <Loader2 className="w-4 h-4 animate-spin" />
//               ) : (
//                 <Save className="w-4 h-4" />
//               )}
//               {submitting ? "Saving…" : "Save"}
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Inline banner messages */}
//       {serverMsg.text ? (
//         <div
//           className={`max-w-6xl mx-auto mt-3 px-4 ${
//             serverMsg.type === "error"
//               ? "text-red-700"
//               : serverMsg.type === "success"
//               ? "text-emerald-700"
//               : "text-blue-700"
//           }`}
//         >
//           <div
//             className={`rounded-xl border px-4 py-3 text-sm ${
//               serverMsg.type === "error"
//                 ? "bg-red-50 border-red-200"
//                 : serverMsg.type === "success"
//                 ? "bg-emerald-50 border-emerald-200"
//                 : "bg-blue-50 border-blue-200"
//             }`}
//           >
//             {serverMsg.text}
//           </div>
//         </div>
//       ) : null}

//       {/* Content */}
//       <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
//         {/* STEP 1 — BASICS */}
//         {step === 0 && (
//           <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             {/* Cover card */}
//             <div className="lg:col-span-2 rounded-2xl border border-neutral-200 bg-white/70 backdrop-blur shadow-sm overflow-hidden">
//               <div className="p-4 border-b">
//                 <h2 className="text-lg font-semibold">Cover</h2>
//                 <p className="text-xs text-neutral-500">
//                   Add an eye-catching image (16:9 recommended)
//                 </p>
//               </div>
//               <div className="relative group aspect-[16/9]">
//                 {form.image_url ? (
//                   // eslint-disable-next-line
//                   <img
//                     src={form.image_url}
//                     alt=""
//                     className="w-full h-full object-cover"
//                     onError={() =>
//                       updateField({
//                         image_url:
//                           "data:image/svg+xml;utf8," +
//                           encodeURIComponent(
//                             `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='675'><rect width='100%' height='100%' fill='#f1f5f9'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#475569' font-family='Inter, system-ui' font-size='22'>Image not available</text></svg>`
//                           ),
//                       })
//                     }
//                   />
//                 ) : (
//                   <div className="absolute inset-0 grid place-items-center text-center">
//                     <div className="grid place-items-center size-14 rounded-full bg-white shadow">
//                       <ImageIcon className="w-6 h-6 text-neutral-500" />
//                     </div>
//                     <p className="mt-3 text-neutral-700 font-medium">
//                       Add a beautiful cover
//                     </p>
//                     <p className="text-xs text-neutral-500">
//                       Upload a file or paste a URL below
//                     </p>
//                   </div>
//                 )}
//                 <div className="absolute bottom-3 right-3 left-3 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-end">
//                   <label className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/95 backdrop-blur border border-neutral-200 text-sm cursor-pointer hover:bg-white">
//                     <Upload className="w-4 h-4" />
//                     Upload image
//                     <input
//                       type="file"
//                       accept="image/*"
//                       className="hidden"
//                       onChange={(e) => onSelectFile(e.target.files?.[0])}
//                     />
//                   </label>
//                   <div className="flex-1 sm:flex-none sm:w-[380px] bg-white/95 backdrop-blur border border-neutral-200 rounded-xl px-2 py-1.5">
//                     <input
//                       type="url"
//                       placeholder="Paste image URL…"
//                       value={form.image_url}
//                       onChange={(e) =>
//                         updateField({ image_url: e.target.value })
//                       }
//                       className="w-full bg-transparent text-sm outline-none"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Basics card */}
//             <div className="rounded-2xl border border-neutral-200 bg-white/70 backdrop-blur shadow-sm p-4 space-y-3">
//               <h2 className="text-lg font-semibold">Recipe Basics</h2>

//               <Field label="Name *">
//                 <input
//                   value={form.name}
//                   onChange={(e) => updateField({ name: e.target.value })}
//                   placeholder="e.g., Holiday Chili Sauce"
//                   className="w-full rounded-xl border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-orange-300"
//                 />
//               </Field>

//               <Field label="Base Volume (L) *">
//                 <input
//                   type="number"
//                   min="0"
//                   step="0.01"
//                   value={form.base_volume_l}
//                   onChange={(e) =>
//                     updateField({ base_volume_l: e.target.value })
//                   }
//                   className="w-full rounded-xl border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-orange-300"
//                 />
//               </Field>

//               <Field label="Notes">
//                 <textarea
//                   rows={4}
//                   value={form.notes}
//                   onChange={(e) => updateField({ notes: e.target.value })}
//                   placeholder="Optional notes..."
//                   className="w-full rounded-xl border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-orange-300"
//                 />
//               </Field>

//               {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
//                 <Toggle
//                   label="Allow Update"
//                   checked={form.allowUpdate}
//                   onChange={(v) => updateField({ allowUpdate: v })}
//                 />
//                 <Toggle
//                   label="Replace BOM on Update"
//                   checked={form.replaceIngredientsOnUpdate}
//                   onChange={(v) =>
//                     updateField({ replaceIngredientsOnUpdate: v })
//                   }
//                 />
//                 <Toggle
//                   label="Allow Create Ingredients"
//                   checked={form.allowCreateIngredients}
//                   onChange={(v) => updateField({ allowCreateIngredients: v })}
//                 />
//               </div> */}

//               <div className="pt-2 flex items-center justify-between">
//                 <div className="text-xs text-neutral-600">
//                   <span className="font-semibold">Code (auto):</span>{" "}
//                   <span className="font-mono bg-neutral-100 px-2 py-0.5 rounded">
//                     {codePreview}
//                   </span>
//                 </div>
//                 <button
//                   type="button"
//                   onClick={() => setStep(1)}
//                   className="inline-flex items-center gap-2 rounded-xl bg-neutral-900 text-white px-4 py-2 text-sm font-semibold hover:bg-neutral-800"
//                 >
//                   Next: Ingredients
//                 </button>
//               </div>
//             </div>
//           </section>
//         )}

//         {/* STEP 2 — INGREDIENTS */}
//         {step === 1 && (
//           <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             {/* Ingredients editor */}
//             <div className="lg:col-span-2 rounded-2xl border border-neutral-200 bg-white/70 backdrop-blur shadow-sm p-4">
//               <div className="flex items-center justify-between">
//                 <h2 className="text-lg font-semibold">Ingredients</h2>
//                 <div className="flex items-center gap-2">
//                   <button
//                     className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border hover:bg-neutral-50 text-sm"
//                     onClick={async () => {
//                       try {
//                         setCatalog((c) => ({ ...c, loading: true, error: "" }));
//                         const rows = await fetchAllIngredients();
//                         setCatalog({
//                           loading: false,
//                           error: "",
//                           items: Array.isArray(rows) ? rows : [],
//                         });
//                       } catch (e) {
//                         setCatalog({
//                           loading: false,
//                           error: e?.message || "Failed to refresh",
//                           items: [],
//                         });
//                       }
//                     }}
//                     type="button"
//                   >
//                     <RefreshCcw className="w-4 h-4" />
//                     Refresh
//                   </button>
//                   <button
//                     className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-neutral-900 text-white text-sm hover:bg-neutral-800"
//                     onClick={addIngredient}
//                     type="button"
//                   >
//                     <Plus className="w-4 h-4" />
//                     Add Ingredient
//                   </button>
//                 </div>
//               </div>

//               {catalog.error ? (
//                 <div className="mt-2 text-xs text-red-600">
//                   Error: {catalog.error}
//                 </div>
//               ) : null}

//               <div className="mt-3 space-y-3">
//                 {form.ingredients.map((row, idx) => {
//                   const it = row.id
//                     ? catalog.items.find((x) => x.id === row.id)
//                     : null;
//                   const price = it?.price_per_uom
//                     ? Number(it.price_per_uom)
//                     : null;
//                   const qty = Number(row.qty_per_base);
//                   const lineCost =
//                     row.mode === "existing" && price && Number.isFinite(qty)
//                       ? price * qty
//                       : null;
//                   const lineCurrency = it?.currency || "USD";

//                   return (
//                     <div
//                       key={idx}
//                       className="rounded-xl border border-neutral-200 bg-white p-3 shadow-sm"
//                     >
//                       <div className="flex items-center justify-between">
//                         <div className="font-medium text-sm">
//                           Ingredient #{idx + 1}
//                         </div>
//                         <div className="flex items-center gap-2">
//                           {lineCost ? (
//                             <div className="text-xs px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
//                               <DollarSign className="w-3 h-3 inline -mt-0.5" />{" "}
//                               {currencySym(lineCurrency)} {lineCost.toFixed(2)}
//                             </div>
//                           ) : null}
//                           <button
//                             className="p-1.5 rounded hover:bg-neutral-100"
//                             onClick={() => removeIngredient(idx)}
//                             title="Remove"
//                             type="button"
//                           >
//                             <svg
//                               viewBox="0 0 24 24"
//                               className="w-4 h-4 text-neutral-500"
//                             >
//                               <path
//                                 d="M3 6h18M9 6v12m6-12v12M4 6l1 14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2l1-14M8 6V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 strokeWidth="1.5"
//                               />
//                             </svg>
//                           </button>
//                         </div>
//                       </div>

//                       <div className="mt-2 grid grid-cols-1 gap-2">
//                         {/* mode toggle */}
//                         <div className="flex flex-wrap gap-4 text-sm">
//                           <label className="inline-flex items-center gap-2">
//                             <input
//                               type="radio"
//                               checked={row.mode === "existing"}
//                               onChange={() =>
//                                 updateIngredient(idx, {
//                                   mode: "existing",
//                                   id: "",
//                                   name: "",
//                                 })
//                               }
//                             />
//                             Existing (catalog)
//                           </label>
//                           <label className="inline-flex items-center gap-2">
//                             <input
//                               type="radio"
//                               checked={row.mode === "new"}
//                               onChange={() =>
//                                 updateIngredient(idx, { mode: "new", id: "" })
//                               }
//                             />
//                             New (name + UOM)
//                           </label>
//                         </div>

//                         {row.mode === "existing" ? (
//                           <>
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
//                               <div>{renderPicker(idx)}</div>
//                               <div>
//                                 <label className="text-sm block">
//                                   <div className="mb-1 text-neutral-600">
//                                     Qty per Base *
//                                   </div>
//                                   <input
//                                     type="number"
//                                     min="0"
//                                     step="0.01"
//                                     value={row.qty_per_base}
//                                     onChange={(e) =>
//                                       updateIngredient(idx, {
//                                         qty_per_base: e.target.value,
//                                       })
//                                     }
//                                     className="w-full rounded-xl border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-orange-300"
//                                   />
//                                 </label>
//                               </div>
//                             </div>
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
//                               <Field label="UOM (optional)">
//                                 <input
//                                   value={row.uom}
//                                   onChange={(e) =>
//                                     updateIngredient(idx, {
//                                       uom: e.target.value,
//                                     })
//                                   }
//                                   placeholder="g / ml / kg…"
//                                   className="w-full rounded-xl border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-orange-300"
//                                 />
//                               </Field>
//                               {it ? (
//                                 <div className="text-xs text-neutral-600 self-end">
//                                   Catalog: {currencySym(it.currency)}{" "}
//                                   {Number(it.price_per_uom || 0).toFixed(4)}/
//                                   {it.uom} •{" "}
//                                   {isActivePrice(it.valid_from, it.valid_to) ? (
//                                     <span className="text-emerald-600">
//                                       Active
//                                     </span>
//                                   ) : (
//                                     <span className="text-amber-600">
//                                       Future/Closed
//                                     </span>
//                                   )}
//                                 </div>
//                               ) : (
//                                 <div />
//                               )}
//                             </div>
//                           </>
//                         ) : (
//                           <>
//                             <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
//                               <Field label="Name *">
//                                 <input
//                                   value={row.name}
//                                   onChange={(e) =>
//                                     updateIngredient(idx, {
//                                       name: e.target.value,
//                                     })
//                                   }
//                                   placeholder="e.g., Cranberry"
//                                   className="w-full rounded-xl border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-orange-300"
//                                 />
//                               </Field>
//                               <Field label="UOM *">
//                                 <input
//                                   value={row.uom}
//                                   onChange={(e) =>
//                                     updateIngredient(idx, {
//                                       uom: e.target.value,
//                                     })
//                                   }
//                                   placeholder="g / ml / kg…"
//                                   className="w-full rounded-xl border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-orange-300"
//                                 />
//                               </Field>
//                               <Field label="Qty per Base *">
//                                 <input
//                                   type="number"
//                                   min="0"
//                                   step="0.01"
//                                   value={row.qty_per_base}
//                                   onChange={(e) =>
//                                     updateIngredient(idx, {
//                                       qty_per_base: e.target.value,
//                                     })
//                                   }
//                                   className="w-full rounded-xl border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-orange-300"
//                                 />
//                               </Field>
//                             </div>

//                             <label className="mt-1 inline-flex items-center gap-2 text-sm">
//                               <input
//                                 type="checkbox"
//                                 checked={row.priceEnabled}
//                                 onChange={(e) =>
//                                   updateIngredient(idx, {
//                                     priceEnabled: e.target.checked,
//                                   })
//                                 }
//                               />
//                               Include price row
//                             </label>

//                             {row.priceEnabled ? (
//                               <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
//                                 <Field label="Currency">
//                                   <input
//                                     value={row.price.currency}
//                                     onChange={(e) =>
//                                       updateIngredient(idx, {
//                                         price: {
//                                           ...row.price,
//                                           currency: e.target.value,
//                                         },
//                                       })
//                                     }
//                                     className="w-full rounded-xl border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-orange-300"
//                                   />
//                                 </Field>
//                                 <Field label="Price per UOM">
//                                   <input
//                                     type="number"
//                                     min="0"
//                                     step="0.0001"
//                                     value={row.price.price_per_uom}
//                                     onChange={(e) =>
//                                       updateIngredient(idx, {
//                                         price: {
//                                           ...row.price,
//                                           price_per_uom: e.target.value,
//                                         },
//                                       })
//                                     }
//                                     className="w-full rounded-xl border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-orange-300"
//                                   />
//                                 </Field>
//                                 <Field label="Valid From">
//                                   <input
//                                     type="date"
//                                     value={
//                                       row.price.valid_from
//                                         ? String(row.price.valid_from).slice(
//                                             0,
//                                             10
//                                           )
//                                         : ""
//                                     }
//                                     onChange={(e) =>
//                                       updateIngredient(idx, {
//                                         price: {
//                                           ...row.price,
//                                           valid_from: e.target.value,
//                                         },
//                                       })
//                                     }
//                                     className="w-full rounded-xl border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-orange-300"
//                                   />
//                                 </Field>
//                                 <Field label="Valid To">
//                                   <input
//                                     type="date"
//                                     value={
//                                       row.price.valid_to
//                                         ? String(row.price.valid_to).slice(
//                                             0,
//                                             10
//                                           )
//                                         : ""
//                                     }
//                                     onChange={(e) =>
//                                       updateIngredient(idx, {
//                                         price: {
//                                           ...row.price,
//                                           valid_to: e.target.value,
//                                         },
//                                       })
//                                     }
//                                     className="w-full rounded-xl border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-orange-300"
//                                   />
//                                 </Field>
//                               </div>
//                             ) : null}
//                           </>
//                         )}
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>

//               <div className="mt-4 flex items-center justify-between">
//                 <button
//                   onClick={() => setStep(0)}
//                   className="rounded-xl border px-4 py-2 text-sm hover:bg-neutral-50"
//                   type="button"
//                 >
//                   Back
//                 </button>
//                 <button
//                   onClick={() => setStep(2)}
//                   className="rounded-xl bg-neutral-900 text-white px-4 py-2 text-sm font-semibold hover:bg-neutral-800"
//                   type="button"
//                 >
//                   Next: Review
//                 </button>
//               </div>
//             </div>

//             {/* Summary & Samples */}
//             <aside className="space-y-6">
//               {/* Live estimate card */}
//               <div className="rounded-2xl border border-neutral-200 bg-white/80 backdrop-blur shadow-sm p-4">
//                 <div className="flex items-center justify-between">
//                   <h3 className="font-semibold">Estimate</h3>
//                   <span className="text-xs text-neutral-500">
//                     Based on active catalog prices
//                   </span>
//                 </div>
//                 <div className="mt-3 grid grid-cols-3 gap-2">
//                   <Stat label="Ingredients" value={form.ingredients.length} />
//                   <Stat
//                     label="Base Volume"
//                     value={`${form.base_volume_l || "—"} L`}
//                   />
//                   <Stat
//                     label="Est. Cost"
//                     value={
//                       estimated.sum
//                         ? `${currencySym(
//                             estimated.currency
//                           )} ${estimated.sum.toFixed(2)}`
//                         : "—"
//                     }
//                   />
//                 </div>
//                 {estimated.missing ? (
//                   <p className="mt-2 text-xs text-amber-600">
//                     {estimated.missing} item(s) have no active price.
//                   </p>
//                 ) : null}
//               </div>

//               {/* Friendly samples */}
//               <div className="rounded-2xl border border-neutral-200 bg-white/80 backdrop-blur shadow-sm p-4">
//                 <div className="flex items-center justify-between mb-2">
//                   <h3 className="font-semibold">Quick Start Samples</h3>
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                   {SAMPLE_LIBRARY.map((s) => (
//                     <div
//                       key={s.key}
//                       className="group overflow-hidden rounded-xl border border-neutral-200 bg-white hover:shadow-sm transition"
//                     >
//                       <div className="relative aspect-[16/9]">
//                         {/* eslint-disable-next-line */}
//                         <img
//                           src={s.image}
//                           alt=""
//                           className="w-full h-full object-cover"
//                         />
//                         <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
//                         <div className="absolute bottom-2 left-2 right-2">
//                           <div className="text-white drop-shadow font-semibold truncate">
//                             {s.title}
//                           </div>
//                           <div className="text-[11px] text-white/90 truncate">
//                             {s.tagline}
//                           </div>
//                         </div>
//                       </div>
//                       <div className="p-3">
//                         <button
//                           className="text-xs px-3 py-1.5 rounded-lg bg-neutral-900 text-white hover:bg-neutral-800"
//                           onClick={() => {
//                             setForm(toFormShape(s.payload));
//                             setServerMsg({
//                               type: "success",
//                               text: `Loaded sample: ${s.title}`,
//                             });
//                           }}
//                           type="button"
//                         >
//                           Load Sample
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </aside>
//           </section>
//         )}

//         {/* STEP 3 — REVIEW (No JSON for end users) */}
//         {step === 2 && (
//           <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             {/* Friendly preview */}
//             <div className="lg:col-span-2 rounded-2xl border border-neutral-200 bg-white/80 backdrop-blur shadow-sm overflow-hidden">
//               <div className="p-4 border-b">
//                 <h2 className="text-lg font-semibold">Review & Confirm</h2>
//                 <p className="text-xs text-neutral-500">
//                   Check everything looks right, then Save.
//                 </p>
//               </div>

//               {/* Header preview */}
//               <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div className="md:col-span-2">
//                   <div className="aspect-video rounded-xl overflow-hidden border border-neutral-200 bg-neutral-100">
//                     {form.image_url ? (
//                       // eslint-disable-next-line
//                       <img
//                         src={form.image_url}
//                         alt=""
//                         className="w-full h-full object-cover"
//                       />
//                     ) : (
//                       <div className="w-full h-full grid place-items-center text-neutral-400">
//                         <ImageIcon className="w-8 h-8" />
//                       </div>
//                     )}
//                   </div>
//                 </div>
//                 <div className="space-y-2">
//                   <div className="text-xs text-neutral-500">Name</div>
//                   <div className="text-lg font-semibold">
//                     {form.name || "—"}
//                   </div>

//                   <div className="grid grid-cols-2 gap-2 mt-3">
//                     <Stat
//                       label="Base Volume"
//                       value={`${form.base_volume_l || "—"} L`}
//                     />
//                     <Stat label="Auto Code" value={codePreview} mono />
//                     <Stat
//                       label="Est. Cost"
//                       value={
//                         estimated.sum
//                           ? `${currencySym(
//                               estimated.currency
//                             )} ${estimated.sum.toFixed(2)}`
//                           : "—"
//                       }
//                     />
//                     <Stat label="Ingredients" value={form.ingredients.length} />
//                   </div>

//                   {form.notes?.trim() ? (
//                     <div className="mt-3 text-sm">
//                       <div className="text-neutral-600 mb-1">Notes</div>
//                       <div className="rounded-lg border border-neutral-200 p-2 text-neutral-800 bg-white">
//                         {form.notes}
//                       </div>
//                     </div>
//                   ) : null}
//                 </div>
//               </div>

//               {/* Ingredient table */}
//               <div className="px-4 pb-4">
//                 <div className="text-sm font-semibold mb-2">Ingredients</div>
//                 <div className="overflow-hidden rounded-xl border border-neutral-200">
//                   <table className="w-full text-sm">
//                     <thead className="bg-neutral-50">
//                       <tr className="text-left">
//                         <th className="px-3 py-2 font-medium text-neutral-700">
//                           Item
//                         </th>
//                         <th className="px-3 py-2 font-medium text-neutral-700">
//                           Qty / Base
//                         </th>
//                         <th className="px-3 py-2 font-medium text-neutral-700">
//                           Price Status
//                         </th>
//                         <th className="px-3 py-2 font-medium text-neutral-700 text-right">
//                           Est. Line
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y">
//                       {form.ingredients.map((row, i) => {
//                         if (row.mode === "existing") {
//                           const it = row.id
//                             ? catalog.items.find((x) => x.id === row.id)
//                             : null;
//                           const active = it
//                             ? isActivePrice(it.valid_from, it.valid_to)
//                             : false;
//                           const p = it?.price_per_uom
//                             ? Number(it.price_per_uom)
//                             : null;
//                           const qty = Number(row.qty_per_base);
//                           const line =
//                             p && Number.isFinite(qty)
//                               ? (p * qty).toFixed(2)
//                               : null;
//                           return (
//                             <tr key={i} className="hover:bg-neutral-50">
//                               <td className="px-3 py-2">
//                                 <div className="font-medium">
//                                   {it?.name || "—"}
//                                 </div>
//                                 <div className="text-[11px] text-neutral-500">
//                                   {it?.sku || "—"} • {it?.uom || "—"}
//                                 </div>
//                               </td>
//                               <td className="px-3 py-2">
//                                 {row.qty_per_base} {row.uom || it?.uom || ""}
//                               </td>
//                               <td className="px-3 py-2">
//                                 {it ? (
//                                   <span
//                                     className={`px-2 py-0.5 rounded-full text-[11px] ${
//                                       active
//                                         ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
//                                         : "bg-amber-50 text-amber-700 border border-amber-200"
//                                     }`}
//                                   >
//                                     {active ? "Active" : "Future/Closed"}
//                                   </span>
//                                 ) : (
//                                   "—"
//                                 )}
//                               </td>
//                               <td className="px-3 py-2 text-right">
//                                 {line
//                                   ? `${currencySym(it?.currency)} ${line}`
//                                   : "—"}
//                               </td>
//                             </tr>
//                           );
//                         }
//                         // New ingredient row
//                         return (
//                           <tr key={i} className="hover:bg-neutral-50">
//                             <td className="px-3 py-2">
//                               <div className="font-medium">
//                                 {row.name || "New ingredient"}
//                               </div>
//                               <div className="text-[11px] text-neutral-500">
//                                 {row.uom}
//                               </div>
//                             </td>
//                             <td className="px-3 py-2">
//                               {row.qty_per_base} {row.uom}
//                             </td>
//                             <td className="px-3 py-2">
//                               {row.priceEnabled ? (
//                                 <span className="px-2 py-0.5 rounded-full text-[11px] bg-blue-50 text-blue-700 border border-blue-200">
//                                   Price provided
//                                 </span>
//                               ) : (
//                                 <span className="px-2 py-0.5 rounded-full text-[11px] bg-neutral-100 text-neutral-700 border border-neutral-200">
//                                   No price in payload
//                                 </span>
//                               )}
//                             </td>
//                             <td className="px-3 py-2 text-right">—</td>
//                           </tr>
//                         );
//                       })}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>

//               {/* Actions */}
//               <div className="p-4 border-t flex items-center justify-between">
//                 <button
//                   onClick={() => setStep(1)}
//                   className="rounded-xl border px-4 py-2 text-sm hover:bg-neutral-50"
//                   type="button"
//                 >
//                   Back
//                 </button>
//                 <button
//                   onClick={onSubmit}
//                   disabled={submitting}
//                   className="inline-flex items-center gap-2 rounded-xl bg-orange-600 text-white px-4 py-2 font-semibold hover:bg-orange-700 disabled:opacity-60"
//                 >
//                   {submitting ? (
//                     <Loader2 className="w-4 h-4 animate-spin" />
//                   ) : (
//                     <Save className="w-4 h-4" />
//                   )}
//                   {submitting ? "Saving…" : "Save Recipe"}
//                 </button>
//               </div>
//             </div>

//             {/* Friendly Issues & Tips */}
//             <aside className="space-y-6">
//               {/* Issues */}
//               {issues.length ? (
//                 <div className="rounded-2xl border border-amber-200 bg-amber-50 shadow-sm p-4">
//                   <div className="flex items-start gap-2">
//                     <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
//                     <div>
//                       <h3 className="font-semibold text-amber-800">
//                         Things to review
//                       </h3>
//                       <ul className="mt-2 list-disc pl-5 text-sm text-amber-800 space-y-1">
//                         {issues.map((m, i) => (
//                           <li key={i}>{m}</li>
//                         ))}
//                       </ul>
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="rounded-2xl border border-emerald-200 bg-emerald-50 shadow-sm p-4">
//                   <h3 className="font-semibold text-emerald-800">
//                     Looks good!
//                   </h3>
//                   <p className="text-sm text-emerald-800">
//                     You can save this recipe now.
//                   </p>
//                 </div>
//               )}

//               {/* Small Advanced toggle (hidden by default for non-tech users) */}
//               <details className="rounded-2xl border border-neutral-200 bg-white/80 backdrop-blur shadow-sm p-4">
//                 <summary className="cursor-pointer text-sm text-neutral-700">
//                   {/* Advanced (for admins) */}
//                   JSON View
//                 </summary>
//                 <p className="mt-2 text-xs text-neutral-500">
//                   Technical payload shown below for troubleshooting or
//                   integrations.
//                 </p>
//                 <pre className="mt-2 text-xs bg-neutral-950 text-neutral-100 rounded-xl p-3 overflow-auto max-h-[240px]">
//                   {JSON.stringify(buildPayload(), null, 2)}
//                 </pre>
//               </details>
//             </aside>
//           </section>
//         )}
//       </main>
//     </div>
//   );
// }

// /* =============== Atoms / Small components =============== */
// function Field({ label, children }) {
//   return (
//     <label className="text-sm block">
//       <div className="mb-1 text-neutral-600">{label}</div>
//       {children}
//     </label>
//   );
// }
// function Toggle({ label, checked, onChange }) {
//   return (
//     <label className="flex items-center gap-3 text-sm px-2 py-1 rounded-lg hover:bg-neutral-50">
//       <input
//         type="checkbox"
//         checked={checked}
//         onChange={(e) => onChange(e.target.checked)}
//       />
//       {label}
//     </label>
//   );
// }
// function Stat({ label, value, mono }) {
//   return (
//     <div className="rounded-xl border border-neutral-200 bg-white p-3">
//       <div className="text-xs text-neutral-500">{label}</div>
//       <div
//         className={`mt-1 text-base font-semibold ${mono ? "font-mono" : ""}`}
//       >
//         {value}
//       </div>
//     </div>
//   );
// }

// /* =============== Transform: API payload -> form model =============== */
// function toFormShape(apiPayload) {
//   return {
//     code: apiPayload.code || "",
//     name: apiPayload.name || "",
//     base_volume_l: apiPayload.base_volume_l ?? 1,
//     notes: apiPayload.notes || "",
//     image_url: apiPayload.image_url || "",
//     ingredients: (apiPayload.ingredients || []).map((row) => ({
//       mode: row.id ? "existing" : "new",
//       id: row.id || "",
//       name: row.name || "",
//       uom: row.uom || "g",
//       qty_per_base: row.qty_per_base ?? "",
//       priceEnabled: !!row.price,
//       price: {
//         currency: row.price?.currency || "USD",
//         price_per_uom: row.price?.price_per_uom ?? "",
//         valid_from: row.price?.valid_from || "",
//         valid_to: row.price?.valid_to || "",
//       },
//     })),
//     allowUpdate: apiPayload.allowUpdate ?? true,
//     replaceIngredientsOnUpdate: apiPayload.replaceIngredientsOnUpdate ?? true,
//     allowCreateIngredients: apiPayload.allowCreateIngredients ?? true,
//   };
// }

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  DollarSign,
  Image as ImageIcon,
  Loader2,
  Plus,
  RefreshCcw,
  Save,
  Search,
  Upload,
  Wand2,
  AlertTriangle,
} from "lucide-react";
import { createRecipe, fetchAllIngredients } from "../lib/api.js";

/* ============================================================
   Quick Start Samples (end-user friendly, no JSON exposed here)
   ============================================================ */
const SAMPLE_LIBRARY = [
  {
    key: "garlicky_mango_pickle",
    title: "Garlicky Mango Pickle",
    tagline: "Mango • Garlic • Mustard • Chili",
    image: "https://www.seema.com/wp-content/uploads/2022/01/mango-pickle1.jpg",
    payload: {
      name: "Garlicky Mango Pickle",
      base_volume_l: 1,
      notes:
        "Classic North Indian style: mango, garlic, mustard, chili, vinegar.",
      image_url:
        "https://www.seema.com/wp-content/uploads/2022/01/mango-pickle1.jpg",
      ingredients: [
        { id: "2b373834-07bb-446e-9a9c-8b01f48d5b51", qty_per_base: 500 },
        { id: "3ab94370-5958-4368-8f26-e8b62ffdca51", qty_per_base: 60 },
        { id: "c2438b60-ba2a-4043-9e8b-fc607767c6ea", qty_per_base: 20 },
        { id: "47c4227c-323a-4e13-ba8d-d8659572fe71", qty_per_base: 25 },
        { id: "a0a2449f-486f-4002-b9b9-139cadbf6497", qty_per_base: 40 },
        { id: "a32b5bd0-2f70-400b-a875-8a4d34c20708", qty_per_base: 80 },
      ],
      allowUpdate: true,
      replaceIngredientsOnUpdate: true,
      allowCreateIngredients: false,
    },
  },
  {
    key: "cranberry_apple_relish",
    title: "Cranberry–Apple Relish",
    tagline: "Cranberry • Apple • Ginger • ACV",
    image:
      "https://v.cdn.ww.com/media/system/wine/585ad0515e361a4fef734f36/c97d1f72-4d82-4ec4-812f-c6c2af7e0ee4/pyox6m9pdxeb0ughvuse.jpg?fit=crop&height=800&width=800&enable=upscale&quality=80&auto=webp&optimize=medium",
    payload: {
      name: "Cranberry–Apple Relish",
      base_volume_l: 1,
      notes:
        "Bright, tart relish that bridges American & European tables—cranberries, apples, ginger, and apple cider vinegar. Great with roasts, cheese boards, or sandwiches.",
      image_url:
        "https://v.cdn.ww.com/media/system/wine/585ad0515e361a4fef734f36/c97d1f72-4d82-4ec4-812f-c6c2af7e0ee4/pyox6m9pdxeb0ughvuse.jpg?fit=crop&height=800&width=800&enable=upscale&quality=80&auto=webp&optimize=medium",
      ingredients: [
        // Cranberry (seasonal pricing window in catalog)
        { id: "e09311d8-08bd-4556-9a87-d2d73b1211dd", qty_per_base: 400 }, // g
        // Apple
        { id: "9f8cd922-d640-4fbd-a25a-59bebee32b9c", qty_per_base: 250 }, // g
        // Sugar
        { id: "d1581f69-6dcd-476b-8a7f-eb0a00f71949", qty_per_base: 220 }, // g
        // Apple Cider Vinegar
        { id: "7f763aa6-69cd-4804-a7ab-0ec76b0f7f6f", qty_per_base: 90 }, // ml
        // Ginger
        { id: "f0c73258-c435-45d0-9bde-31d1247de0e7", qty_per_base: 10 }, // g
        // Salt
        { id: "a0a2449f-486f-4002-b9b9-139cadbf6497", qty_per_base: 4 }, // g
        // Chili Powder (optional warmth)
        { id: "47c4227c-323a-4e13-ba8d-d8659572fe71", qty_per_base: 2 }, // g
      ],
      allowUpdate: true,
      replaceIngredientsOnUpdate: true,
      allowCreateIngredients: false,
    },
  },

  {
    key: "spicy_tomato_chili_sauce",
    title: "Spicy Tomato Chili Sauce",
    tagline: "Tomato • Chili • Garlic • Vinegar",
    image:
      "https://www.ohmyfoodrecipes.com/wp-content/uploads/2017/03/garlic-chili-sauce-on-spoon-horizontal2.jpg",
    payload: {
      name: "Spicy Tomato Chili Sauce",
      base_volume_l: 1,
      notes: "Smooth tomato base with garlic heat and a vinegar bite.",
      image_url:
        "https://www.ohmyfoodrecipes.com/wp-content/uploads/2017/03/garlic-chili-sauce-on-spoon-horizontal2.jpg",
      ingredients: [
        { id: "2e475db5-dc5e-4c57-8fdb-036593755912", qty_per_base: 600 },
        { id: "3ab94370-5958-4368-8f26-e8b62ffdca51", qty_per_base: 30 },
        { id: "47c4227c-323a-4e13-ba8d-d8659572fe71", qty_per_base: 40 },
        { id: "a32b5bd0-2f70-400b-a875-8a4d34c20708", qty_per_base: 90 },
        { id: "a0a2449f-486f-4002-b9b9-139cadbf6497", qty_per_base: 10 },
        { id: "d1581f69-6dcd-476b-8a7f-eb0a00f71949", qty_per_base: 60 },
      ],
      allowUpdate: true,
      replaceIngredientsOnUpdate: true,
      allowCreateIngredients: false,
    },
  },
  {
    key: "pineapple_ginger_jam",
    title: "Pineapple Ginger Jam",
    tagline: "Pineapple • Ginger • Sugar",
    image:
      "https://i0.wp.com/caribbeanpot.com/wp-content/uploads/2020/10/pineapple-jam-8.jpg?resize=1080%2C600&ssl=1",
    payload: {
      name: "Pineapple Ginger Jam",
      base_volume_l: 1,
      notes: "Bright tropical jam with a gentle ginger warmth.",
      image_url:
        "https://i0.wp.com/caribbeanpot.com/wp-content/uploads/2020/10/pineapple-jam-8.jpg?resize=1080%2C600&ssl=1",
      ingredients: [
        { id: "6e468eac-e8c8-47a9-b4bb-fce87a9169fc", qty_per_base: 700 },
        { id: "f0c73258-c435-45d0-9bde-31d1247de0e7", qty_per_base: 30 },
        { id: "d1581f69-6dcd-476b-8a7f-eb0a00f71949", qty_per_base: 250 },
        { id: "7f763aa6-69cd-4804-a7ab-0ec76b0f7f6f", qty_per_base: 20 },
        { id: "a0a2449f-486f-4002-b9b9-139cadbf6497", qty_per_base: 5 },
      ],
      allowUpdate: true,
      replaceIngredientsOnUpdate: true,
      allowCreateIngredients: false,
    },
  },
  {
    key: "tomato_garlic_salsa_fresca",
    title: "Tomato Garlic Salsa Fresca",
    tagline: "Tomato • Garlic • Chili • ACV",
    image:
      "https://www.inspiredtaste.net/wp-content/uploads/2020/01/Easy-Salsa-Recipe-1200.jpg",
    payload: {
      name: "Tomato Garlic Salsa Fresca",
      base_volume_l: 1,
      notes: "Chunky, fresh-style salsa with a touch of heat and tang.",
      image_url:
        "https://www.inspiredtaste.net/wp-content/uploads/2020/01/Easy-Salsa-Recipe-1200.jpg",
      ingredients: [
        { id: "2e475db5-dc5e-4c57-8fdb-036593755912", qty_per_base: 650 },
        { id: "3ab94370-5958-4368-8f26-e8b62ffdca51", qty_per_base: 25 },
        { id: "47c4227c-323a-4e13-ba8d-d8659572fe71", qty_per_base: 15 },
        { id: "7f763aa6-69cd-4804-a7ab-0ec76b0f7f6f", qty_per_base: 15 },
        { id: "a0a2449f-486f-4002-b9b9-139cadbf6497", qty_per_base: 8 },
        { id: "d1581f69-6dcd-476b-8a7f-eb0a00f71949", qty_per_base: 20 },
      ],
      allowUpdate: true,
      replaceIngredientsOnUpdate: true,
      allowCreateIngredients: false,
    },
  },
  {
    key: "mango_papaya_chutney",
    title: "Mango Papaya Chutney",
    tagline: "Mango • Papaya • Ginger • Chili",
    image:
      "https://realfood.tesco.com/media/images/RFO-1400x919-Papaya--Mango-chutney-5aaf4cd2-898a-4565-84e0-2f014929d9d7-0-1400x919.jpg",
    payload: {
      name: "Mango Papaya Chutney",
      base_volume_l: 1,
      notes: "Sweet-tangy chutney with tropical fruit and gentle heat.",
      image_url:
        "https://realfood.tesco.com/media/images/RFO-1400x919-Papaya--Mango-chutney-5aaf4cd2-898a-4565-84e0-2f014929d9d7-0-1400x919.jpg",
      ingredients: [
        { id: "2b373834-07bb-446e-9a9c-8b01f48d5b51", qty_per_base: 300 },
        { id: "260b336f-7c6d-4f20-87d3-7874ce75b6cf", qty_per_base: 300 },
        { id: "f0c73258-c435-45d0-9bde-31d1247de0e7", qty_per_base: 15 },
        { id: "47c4227c-323a-4e13-ba8d-d8659572fe71", qty_per_base: 10 },
        { id: "a32b5bd0-2f70-400b-a875-8a4d34c20708", qty_per_base: 60 },
        { id: "d1581f69-6dcd-476b-8a7f-eb0a00f71949", qty_per_base: 120 },
        { id: "a0a2449f-486f-4002-b9b9-139cadbf6497", qty_per_base: 8 },
        { id: "c2438b60-ba2a-4043-9e8b-fc607767c6ea", qty_per_base: 10 },
      ],
      allowUpdate: true,
      replaceIngredientsOnUpdate: true,
      allowCreateIngredients: false,
    },
  },
  {
    key: "spiced_apple_jam",
    title: "Spiced Apple Jam",
    tagline: "Apple • Sugar • Brown Sugar • ACV",
    image:
      "https://therecipemaster.com/wp-content/uploads/2024/12/Apple-Jam-Recipe3.webp",
    payload: {
      name: "Spiced Apple Jam",
      base_volume_l: 1,
      notes: "Comforting apple preserve with balanced sweetness and tang.",
      image_url:
        "https://therecipemaster.com/wp-content/uploads/2024/12/Apple-Jam-Recipe3.webp",
      ingredients: [
        { id: "9f8cd922-d640-4fbd-a25a-59bebee32b9c", qty_per_base: 700 },
        { id: "d1581f69-6dcd-476b-8a7f-eb0a00f71949", qty_per_base: 180 },
        { id: "7bec4b0e-7435-4ca2-8333-1274a2304162", qty_per_base: 40 },
        { id: "7f763aa6-69cd-4804-a7ab-0ec76b0f7f6f", qty_per_base: 15 },
        { id: "a0a2449f-486f-4002-b9b9-139cadbf6497", qty_per_base: 5 },
      ],
      allowUpdate: true,
      replaceIngredientsOnUpdate: true,
      allowCreateIngredients: false,
    },
  },
  {
    key: "banana_milkshake",
    title: "Banana Milkshake",
    tagline: "Banana • Milk • Vanilla",
    image:
      "https://imgs.search.brave.com/0UTaxMXAAts2vlf7rlAQFbueMtkmARvcsZaQuaeAAJw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzEyLzUyLzI5Lzk1/LzM2MF9GXzEyNTIy/OTk1NjZfWDZFS2Nj/Y3J6azh1VUU4ZzRu/RkYxZHE0aHRWUkNO/cXYuanBn",
    payload: {
      name: "Banana Milkshake",
      base_volume_l: 1,
      notes:
        "Creamy classic milkshake—sweet, thick, and kid-friendly. Adjust milk for thickness; sugar/honey for sweetness.",
      image_url:
        "https://imgs.search.brave.com/0UTaxMXAAts2vlf7rlAQFbueMtkmARvcsZaQuaeAAJw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzEyLzUyLzI5Lzk1/LzM2MF9GXzEyNTIy/OTk1NjZfWDZFS2Nj/Y3J6azh1VUU4ZzRu/RkYxZHE0aHRWUkNO/cXYuanBn",
      ingredients: [
        // Banana (ripe) — 350 g
        { id: "cd842f5b-23e0-4401-aad9-719c79bf7303", qty_per_base: 350 },

        // Milk (chilled) — 650 ml
        { id: "92e3f0c9-af26-411a-9080-865d66a8715e", qty_per_base: 650 },

        // Sugar — 30 g
        { id: "d1581f69-6dcd-476b-8a7f-eb0a00f71949", qty_per_base: 30 },

        // Vanilla extract — 5 ml
        { id: "c564b7df-7d96-402f-b1ab-5214d00e580b", qty_per_base: 5 },

        // Ice cubes (optional) — 120 g
        { id: "6d42137d-2641-4d34-86bf-f533b9de8d1b", qty_per_base: 120 },
      ],
      allowUpdate: true,
      replaceIngredientsOnUpdate: true,
      allowCreateIngredients: true, // fine to keep; all items are catalog-backed now
    },
  },

  {
    key: "smoky_tomato_apple_chutney",
    title: "Smoky Tomato-Apple Chutney",
    tagline: "Tomato • Apple • Brown Sugar • Cider Vinegar",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/TomatoChutney.jpg/1280px-TomatoChutney.jpg",
    payload: {
      name: "Smoky Tomato-Apple Chutney",
      base_volume_l: 1,
      notes:
        "Anglo-European style chutney: slow-cooked tomatoes and sharp apples with cider vinegar, brown sugar, garlic/ginger and a touch of chili. Great with cheese boards, cold cuts or sandwiches.",
      image_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/TomatoChutney.jpg/1280px-TomatoChutney.jpg",
      ingredients: [
        { id: "2e475db5-dc5e-4c57-8fdb-036593755912", qty_per_base: 650 },
        { id: "9f8cd922-d640-4fbd-a25a-59bebee32b9c", qty_per_base: 250 },
        { id: "7bec4b0e-7435-4ca2-8333-1274a2304162", qty_per_base: 150 },
        { id: "7f763aa6-69cd-4804-a7ab-0ec76b0f7f6f", qty_per_base: 120 },
        { id: "3ab94370-5958-4368-8f26-e8b62ffdca51", qty_per_base: 20 },
        { id: "f0c73258-c435-45d0-9bde-31d1247de0e7", qty_per_base: 10 },
        { id: "47c4227c-323a-4e13-ba8d-d8659572fe71", qty_per_base: 6 },
        { id: "c2438b60-ba2a-4043-9e8b-fc607767c6ea", qty_per_base: 8 },
        { id: "a0a2449f-486f-4002-b9b9-139cadbf6497", qty_per_base: 8 },
      ],
      allowUpdate: true,
      replaceIngredientsOnUpdate: true,
      allowCreateIngredients: false,
    },
  },
];

/* ======================
   Helpers / UX utilities
   ====================== */
function toFormShape(apiPayload) {
  return {
    code: apiPayload.code || "",
    name: apiPayload.name || "",
    base_volume_l: apiPayload.base_volume_l ?? 1,
    notes: apiPayload.notes || "",
    image_url: apiPayload.image_url || "",
    ingredients: (apiPayload.ingredients || []).map((row) => ({
      mode: row.id ? "existing" : "new",
      id: row.id || "",
      name: row.name || "",
      uom: row.uom || "g",
      qty_per_base: row.qty_per_base ?? "",
      priceEnabled: !!row.price,
      price: {
        currency: row.price?.currency || "USD",
        price_per_uom: row.price?.price_per_uom ?? "",
        valid_from: row.price?.valid_from || "",
        valid_to: row.price?.valid_to || "",
      },
    })),
    allowUpdate: apiPayload.allowUpdate ?? true,
    replaceIngredientsOnUpdate: apiPayload.replaceIngredientsOnUpdate ?? true,
    allowCreateIngredients: apiPayload.allowCreateIngredients ?? true,
  };
}
function autoCode(name = "") {
  const base = (name || "Recipe").trim();
  const token = base
    .split(/\s+/)[0]
    .replace(/[^A-Za-z]/g, "")
    .slice(0, 4)
    .toUpperCase()
    .padEnd(4, "X");
  const rnd = Math.floor(100 + Math.random() * 900);
  return `${token}-${rnd}`;
}
function isActivePrice(valid_from, valid_to) {
  const now = Date.now();
  const from = valid_from ? new Date(valid_from).getTime() : null;
  const to = valid_to ? new Date(valid_to).getTime() : null;
  return (from === null || from <= now) && (to === null || now <= to);
}
function currencySym(c = "USD") {
  return c === "USD" ? "$" : c;
}
function asNumber(x) {
  const n = Number(x);
  return Number.isFinite(n) ? n : null;
}
function formatCurrency(amount, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(amount);
}

/* ======================
   Main component
   ====================== */
export default function CreateRecipe() {
  const navigate = useNavigate();

  // Stepper
  const steps = ["Basics", "Ingredients", "Review"];
  const [step, setStep] = useState(0);

  // Catalog
  const [catalog, setCatalog] = useState({
    loading: false,
    error: "",
    items: [],
  });
  const [catalogQuery, setCatalogQuery] = useState("");
  const [openPickerIdx, setOpenPickerIdx] = useState(-1);
  const pickerRef = useRef(null);

  // Form model
  const [form, setForm] = useState({
    code: "",
    name: "",
    base_volume_l: 1,
    notes: "",
    image_url: "",
    ingredients: [
      {
        mode: "existing",
        id: "",
        name: "",
        uom: "g",
        qty_per_base: "",
        priceEnabled: false,
        price: {
          currency: "USD",
          price_per_uom: "",
          valid_from: "",
          valid_to: "",
        },
      },
    ],
    allowUpdate: true,
    replaceIngredientsOnUpdate: true,
    allowCreateIngredients: true,
  });

  const [serverMsg, setServerMsg] = useState({ type: "", text: "" });
  const [submitting, setSubmitting] = useState(false);
  const codePreview = useMemo(
    () => form.code?.trim() || autoCode(form.name),
    [form.code, form.name]
  );

  // Catalog fetch
  useEffect(() => {
    (async () => {
      try {
        setCatalog((c) => ({ ...c, loading: true, error: "" }));
        const rows = await fetchAllIngredients();
        setCatalog({
          loading: false,
          error: "",
          items: Array.isArray(rows) ? rows : [],
        });
      } catch (e) {
        setCatalog({
          loading: false,
          error: e?.message || "Failed to load ingredients",
          items: [],
        });
      }
    })();
  }, []);

  // Close picker outside click
  useEffect(() => {
    const onDoc = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target))
        setOpenPickerIdx(-1);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  // Derived data
  const filteredCatalog = useMemo(() => {
    const q = catalogQuery.trim().toLowerCase();
    if (!q) return catalog.items;
    return catalog.items.filter((it) => {
      const hay = `${it.name || ""} ${it.sku || ""} ${it.uom || ""} ${
        it.id || ""
      }`.toLowerCase();
      return hay.includes(q);
    });
  }, [catalog.items, catalogQuery]);

  const estimated = useMemo(() => {
    let sum = 0;
    let currency = "USD";
    let missing = 0;
    for (const row of form.ingredients) {
      if (row.mode === "existing" && row.id && row.qty_per_base) {
        const it = catalog.items.find((x) => x.id === row.id);
        if (!it) continue;
        const active = isActivePrice(it.valid_from, it.valid_to);
        if (active && it.price_per_uom) {
          const p = Number(it.price_per_uom);
          const qty = Number(row.qty_per_base);
          if (Number.isFinite(p) && Number.isFinite(qty)) {
            sum += p * qty;
            currency = it.currency || currency;
          }
        } else {
          missing += 1;
        }
      }
    }
    return { sum, currency, missing };
  }, [form.ingredients, catalog.items]);

  const catalogById = useMemo(() => {
    const idx = {};
    for (const it of catalog.items) idx[it.id] = it;
    return idx;
  }, [catalog.items]);

  // Updaters
  const updateField = (patch) => setForm((f) => ({ ...f, ...patch }));
  const updateIngredient = (idx, patch) =>
    setForm((f) => {
      const copy = [...f.ingredients];
      copy[idx] = { ...copy[idx], ...patch };
      return { ...f, ingredients: copy };
    });
  const addIngredient = () =>
    setForm((f) => ({
      ...f,
      ingredients: [
        ...f.ingredients,
        {
          mode: "existing",
          id: "",
          name: "",
          uom: "g",
          qty_per_base: "",
          priceEnabled: false,
          price: {
            currency: "USD",
            price_per_uom: "",
            valid_from: "",
            valid_to: "",
          },
        },
      ],
    }));
  const removeIngredient = (idx) =>
    setForm((f) => ({
      ...f,
      ingredients: f.ingredients.filter((_, i) => i !== idx),
    }));

  // File -> dataURL for image_url
  const onSelectFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () =>
      updateField({ image_url: String(reader.result || "") });
    reader.readAsDataURL(file);
  };

  // Validation
  const validate = () => {
    if (!form.name?.trim()) return "Name is required.";
    const vol = Number(form.base_volume_l);
    if (!Number.isFinite(vol) || vol <= 0)
      return "Base volume must be a positive number.";
    if (!form.ingredients.length) return "Add at least one ingredient.";
    for (let i = 0; i < form.ingredients.length; i++) {
      const row = form.ingredients[i];
      const qty = Number(row.qty_per_base);
      if (!Number.isFinite(qty) || qty <= 0)
        return `Ingredient #${i + 1}: quantity must be > 0.`;
      if (row.mode === "existing") {
        if (!row.id?.trim())
          return `Ingredient #${i + 1}: choose an ingredient from catalog.`;
      } else {
        if (!form.allowCreateIngredients)
          return `Ingredient #${i + 1}: creating new ingredient disabled.`;
        if (!row.name?.trim() || !row.uom?.trim())
          return `Ingredient #${i + 1}: new ingredient requires name & UOM.`;
        if (row.priceEnabled) {
          const p = Number(row.price.price_per_uom);
          if (!Number.isFinite(p) || p <= 0)
            return `Ingredient #${i + 1}: price_per_uom must be positive.`;
        }
      }
    }
    return "";
  };

  // Build payload
  const buildPayload = () => {
    const codeFinal = form.code?.trim() || autoCode(form.name);
    return {
      code: codeFinal,
      name: form.name.trim(),
      base_volume_l: Number(form.base_volume_l),
      ...(form.notes?.trim() ? { notes: form.notes.trim() } : {}),
      ...(form.image_url?.trim() ? { image_url: form.image_url.trim() } : {}),
      ingredients: form.ingredients.map((row) => {
        if (row.mode === "existing") {
          return { id: row.id.trim(), qty_per_base: Number(row.qty_per_base) };
        }
        const out = {
          name: row.name.trim(),
          uom: row.uom.trim(),
          qty_per_base: Number(row.qty_per_base),
        };
        if (row.priceEnabled) {
          const price = {
            currency: row.price.currency || "USD",
            price_per_uom: Number(row.price.price_per_uom),
          };

          if (row.price.valid_from) price.valid_from = row.price.valid_from;
          if (row.price.valid_to) price.valid_to = row.price.valid_to;
          out.price = price;
        }
        return out;
      }),
      allowUpdate: !!form.allowUpdate,
      replaceIngredientsOnUpdate: !!form.replaceIngredientsOnUpdate,
      allowCreateIngredients: !!form.allowCreateIngredients,
    };
  };

  // Submit
  const onSubmit = async () => {
    setServerMsg({ type: "", text: "" });
    const err = validate();
    if (err) {
      setServerMsg({ type: "error", text: err });
      return;
    }
    const payload = buildPayload();
    try {
      setSubmitting(true);
      const res = await createRecipe(payload);
      const code = res?.code || payload.code;
      setServerMsg({
        type: "success",
        text: `Created/updated recipe: ${code}`,
      });
      setTimeout(() => navigate(`/recipe/${encodeURIComponent(code)}`), 650);
    } catch (e) {
      setServerMsg({
        type: "error",
        text: e?.message || "Create recipe failed.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Ingredient picker popover
  const renderPicker = (idx) => {
    const open = openPickerIdx === idx;
    const row = form.ingredients[idx];
    const selected = row.id ? catalog.items.find((x) => x.id === row.id) : null;
    return (
      <div className="relative" ref={pickerRef}>
        <button
          type="button"
          onClick={() => setOpenPickerIdx(open ? -1 : idx)}
          className="w-full flex items-center justify-between rounded-xl border border-neutral-300 bg-white px-3 py-2 text-left hover:bg-neutral-50"
        >
          <div className="truncate">
            {selected ? (
              <div className="flex items-center gap-2">
                <span className="font-semibold">{selected.name}</span>
                <span className="text-xs text-neutral-500">
                  • {selected.uom}
                </span>
                <span className="text-xs text-neutral-500">
                  • {selected.sku || "—"}
                </span>
              </div>
            ) : (
              <span className="text-neutral-500">Select ingredient…</span>
            )}
          </div>
          <ChevronDown className="w-4 h-4 text-neutral-500" />
        </button>

        {open && (
          <div className="absolute z-[100] mt-2 w-full rounded-xl border border-neutral-200 bg-white shadow-lg">
            <div className="flex items-center gap-2 p-2 border-b">
              <Search className="w-4 h-4 text-neutral-400" />
              <input
                value={catalogQuery}
                onChange={(e) => setCatalogQuery(e.target.value)}
                placeholder="Search name, SKU, ID…"
                className="w-full bg-transparent text-sm outline-none"
              />
              <button
                className="text-xs px-2 py-1 border rounded-lg hover:bg-neutral-50"
                onClick={async () => {
                  try {
                    setCatalog((c) => ({ ...c, loading: true }));
                    const rows = await fetchAllIngredients();
                    setCatalog({
                      loading: false,
                      error: "",
                      items: Array.isArray(rows) ? rows : [],
                    });
                  } catch (e) {
                    setCatalog((c) => ({
                      ...c,
                      loading: false,
                      error: e?.message || "Refresh failed",
                    }));
                  }
                }}
                type="button"
              >
                <RefreshCcw className="w-3.5 h-3.5 inline -mt-0.5" /> Refresh
              </button>
            </div>
            <div className="max-h-72 overflow-auto">
              {catalog.loading ? (
                <div className="p-4 text-sm text-neutral-500">Loading…</div>
              ) : filteredCatalog.length ? (
                filteredCatalog.map((it) => {
                  const active = isActivePrice(it.valid_from, it.valid_to);
                  return (
                    <button
                      key={it.id}
                      onClick={() => {
                        updateIngredient(idx, {
                          id: it.id,
                          uom: it.uom || row.uom,
                        });
                        setOpenPickerIdx(-1);
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-neutral-50"
                      type="button"
                    >
                      <div className="flex items-center justify-between">
                        <div className="truncate">
                          <div className="font-medium truncate">{it.name}</div>
                          <div className="text-xs text-neutral-500 truncate">
                            {it.sku || "—"} • {String(it.id).slice(0, 8)}… •{" "}
                            {it.uom}
                          </div>
                        </div>
                        <div className="text-right">
                          <div
                            className={`text-xs ${
                              active ? "text-emerald-600" : "text-amber-600"
                            }`}
                          >
                            {active ? "Active" : "Future/Closed"}
                          </div>
                          {it.price_per_uom ? (
                            <div className="text-xs text-neutral-600">
                              {currencySym(it.currency)}{" "}
                              {Number(it.price_per_uom).toFixed(4)}/{it.uom}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="p-4 text-sm text-neutral-500">No matches.</div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Friendly issues for Review step
  const issues = useMemo(() => {
    const list = [];
    if (!form.name?.trim()) list.push("Add a recipe name.");
    const vol = Number(form.base_volume_l);
    if (!Number.isFinite(vol) || vol <= 0)
      list.push("Base volume must be a positive number.");
    if (!form.ingredients.length) list.push("Add at least one ingredient.");
    form.ingredients.forEach((row, i) => {
      if (row.mode === "existing") {
        if (!row.id?.trim())
          list.push(`Ingredient #${i + 1}: choose an ingredient from catalog.`);
      } else {
        if (!row.name?.trim() || !row.uom?.trim())
          list.push(
            `Ingredient #${i + 1}: new ingredient requires name & UOM.`
          );
      }
      const qty = Number(row.qty_per_base);
      if (!Number.isFinite(qty) || qty <= 0)
        list.push(`Ingredient #${i + 1}: quantity must be > 0.`);
    });
    if (estimated.missing)
      list.push(
        `${estimated.missing} catalog ingredient(s) have no active price; estimate excludes them.`
      );
    return list;
  }, [form, estimated.missing]);

  // Apply samples
  const useSample = (sample, jumpToIngredients = false) => {
    setForm(toFormShape(sample.payload));
    setServerMsg({ type: "success", text: `Loaded sample: ${sample.title}` });
    if (jumpToIngredients) setStep(1);
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 0);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-50 via-white to-white">
      {/* Sticky header with stepper */}
      <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-neutral-700 hover:text-neutral-900"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Recipes
          </Link>

          <div className="ml-auto flex items-center gap-3">
            <div className="hidden md:flex items-center gap-5">
              {["Basics", "Ingredients", "Review"].map((s, i) => (
                <StepBadge key={s} i={i} label={s} step={step} />
              ))}
            </div>

            <div className="hidden md:flex items-center gap-2 rounded-xl border px-3 py-1.5 text-xs text-neutral-700 bg-white">
              <Wand2 className="w-4 h-4 text-orange-600" />
              Code (auto):
              <span className="ml-1 font-mono rounded bg-neutral-100 px-2 py-0.5">
                {codePreview}
              </span>
            </div>

            <button
              onClick={onSubmit}
              disabled={submitting}
              className="inline-flex items-center gap-2 rounded-xl bg-orange-600 text-white px-4 py-2 font-semibold hover:bg-orange-700 disabled:opacity-60"
            >
              {submitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {submitting ? "Saving…" : "Save"}
            </button>
          </div>
        </div>
      </header>

      {/* Inline banner messages */}
      {serverMsg.text ? (
        <div
          className={`max-w-6xl mx-auto mt-3 px-4 ${
            serverMsg.type === "error"
              ? "text-red-700"
              : serverMsg.type === "success"
              ? "text-emerald-700"
              : "text-blue-700"
          }`}
        >
          <div
            className={`rounded-xl border px-4 py-3 text-sm ${
              serverMsg.type === "error"
                ? "bg-red-50 border-red-200"
                : serverMsg.type === "success"
                ? "bg-emerald-50 border-emerald-200"
                : "bg-blue-50 border-blue-200"
            }`}
          >
            {serverMsg.text}
          </div>
        </div>
      ) : null}

      {/* CONTENT */}
      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* STEP 1 — BASICS */}
        {step === 0 && (
          <>
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Cover */}
              <div className="lg:col-span-2 rounded-2xl border border-neutral-200 bg-white/70 backdrop-blur shadow-sm overflow-hidden">
                <div className="p-4 border-b">
                  <h2 className="text-lg font-semibold">Cover</h2>
                  <p className="text-xs text-neutral-500">
                    Add an eye-catching image (16:9 recommended)
                  </p>
                </div>
                <div className="relative group aspect-[16/9]">
                  {form.image_url ? (
                    // eslint-disable-next-line
                    <img
                      src={form.image_url}
                      alt=""
                      className="w-full h-full object-cover"
                      onError={() =>
                        updateField({
                          image_url:
                            "data:image/svg+xml;utf8," +
                            encodeURIComponent(
                              `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='675'><rect width='100%' height='100%' fill='#f1f5f9'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#475569' font-family='Inter, system-ui' font-size='22'>Image not available</text></svg>`
                            ),
                        })
                      }
                    />
                  ) : (
                    <div className="absolute inset-0 grid place-items-center text-center">
                      <div className="grid place-items-center size-14 rounded-full bg-white shadow">
                        <ImageIcon className="w-6 h-6 text-neutral-500" />
                      </div>
                      <p className="mt-3 text-neutral-700 font-medium">
                        Add a beautiful cover
                      </p>
                      <p className="text-xs text-neutral-500">
                        Upload a file or paste a URL below
                      </p>
                    </div>
                  )}
                  <div className="absolute bottom-3 right-3 left-3 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-end">
                    <label className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/95 backdrop-blur border border-neutral-200 text-sm cursor-pointer hover:bg-white">
                      <Upload className="w-4 h-4" />
                      Upload image
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => onSelectFile(e.target.files?.[0])}
                      />
                    </label>
                    <div className="flex-1 sm:flex-none sm:w-[380px] bg-white/95 backdrop-blur border border-neutral-200 rounded-xl px-2 py-1.5">
                      <input
                        type="url"
                        placeholder="Paste image URL…"
                        value={form.image_url}
                        onChange={(e) =>
                          updateField({ image_url: e.target.value })
                        }
                        className="w-full bg-transparent text-sm outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Basics form */}
              <div className="rounded-2xl border border-neutral-200 bg-white/70 backdrop-blur shadow-sm p-4 space-y-3">
                <h2 className="text-lg font-semibold">Recipe Basics</h2>

                <Field label="Name *">
                  <input
                    value={form.name}
                    onChange={(e) => updateField({ name: e.target.value })}
                    placeholder="e.g., Holiday Chili Sauce"
                    className="w-full rounded-xl border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-orange-300"
                  />
                </Field>

                <Field label="Base Volume (L) *">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.base_volume_l}
                    onChange={(e) =>
                      updateField({ base_volume_l: e.target.value })
                    }
                    className="w-full rounded-xl border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-orange-300"
                  />
                </Field>

                <Field label="Notes">
                  <textarea
                    rows={4}
                    value={form.notes}
                    onChange={(e) => updateField({ notes: e.target.value })}
                    placeholder="Optional notes..."
                    className="w-full rounded-xl border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-orange-300"
                  />
                </Field>

                {/* NEW: Samples dropdown on Basics */}
                <div className="pt-1">
                  <QuickSamplesDropdown
                    label="Quick Start (Samples)"
                    onPick={(s, jump) => useSample(s, jump)}
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <div className="text-xs text-neutral-600">
                    <span className="font-semibold">Code (auto):</span>{" "}
                    <span className="font-mono bg-neutral-100 px-2 py-0.5 rounded">
                      {codePreview}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="inline-flex items-center gap-2 rounded-xl bg-neutral-900 text-white px-4 py-2 text-sm font-semibold hover:bg-neutral-800"
                  >
                    Next: Ingredients
                  </button>
                </div>
              </div>
            </section>
          </>
        )}

        {/* STEP 2 — INGREDIENTS */}
        {step === 1 && (
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Editor */}
            <div className="lg:col-span-2 rounded-2xl border border-neutral-200 bg-white/70 backdrop-blur shadow-sm p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Ingredients</h2>
                <div className="flex items-center gap-2">
                  <button
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border hover:bg-neutral-50 text-sm"
                    onClick={async () => {
                      try {
                        setCatalog((c) => ({ ...c, loading: true, error: "" }));
                        const rows = await fetchAllIngredients();
                        setCatalog({
                          loading: false,
                          error: "",
                          items: Array.isArray(rows) ? rows : [],
                        });
                      } catch (e) {
                        setCatalog({
                          loading: false,
                          error: e?.message || "Failed to refresh",
                          items: [],
                        });
                      }
                    }}
                    type="button"
                  >
                    <RefreshCcw className="w-4 h-4" />
                    Refresh
                  </button>
                  <button
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-neutral-900 text-white text-sm hover:bg-neutral-800"
                    onClick={addIngredient}
                    type="button"
                  >
                    <Plus className="w-4 h-4" />
                    Add Ingredient
                  </button>
                </div>
              </div>

              {catalog.error ? (
                <div className="mt-2 text-xs text-red-600">
                  Error: {catalog.error}
                </div>
              ) : null}

              <div className="mt-3 space-y-3">
                {form.ingredients.map((row, idx) => {
                  const it = row.id
                    ? catalog.items.find((x) => x.id === row.id)
                    : null;

                  // qty normalized
                  const qty = asNumber(row.qty_per_base);

                  // choose a unit price source (existing -> catalog; new -> provided)
                  let unit = null;
                  let unitCurrency = "USD";
                  if (row.mode === "existing" && it) {
                    const p = asNumber(it?.price_per_uom);
                    if (p !== null) {
                      unit = p;
                      unitCurrency = it.currency || unitCurrency;
                    }
                  } else if (row.mode === "new" && row.priceEnabled) {
                    const p = asNumber(row.price?.price_per_uom);
                    if (p !== null) {
                      unit = p;
                      unitCurrency = row.price?.currency || unitCurrency;
                    }
                  }

                  const lineCost =
                    unit !== null && qty !== null ? unit * qty : null;

                  const lineCostDisplay =
                    lineCost !== null
                      ? lineCost > 0 && lineCost < 0.01
                        ? `< ${formatCurrency(0.01, unitCurrency)}`
                        : formatCurrency(lineCost, unitCurrency)
                      : null;

                  return (
                    <div
                      key={idx}
                      className="rounded-xl border border-neutral-200 bg-white p-3 shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-medium text-sm">
                          Ingredient #{idx + 1}
                        </div>
                        <div className="flex items-center gap-2">
                          {lineCostDisplay ? (
                            <div className="text-xs px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                              <DollarSign className="w-3 h-3 inline -mt-0.5" />{" "}
                              {lineCostDisplay}
                            </div>
                          ) : null}
                          <button
                            className="p-1.5 rounded hover:bg-neutral-100"
                            onClick={() => removeIngredient(idx)}
                            title="Remove"
                            type="button"
                          >
                            <svg
                              viewBox="0 0 24 24"
                              className="w-4 h-4 text-neutral-500"
                            >
                              <path
                                d="M3 6h18M9 6v12m6-12v12M4 6l1 14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2l1-14M8 6V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>

                      <div className="mt-2 grid grid-cols-1 gap-2">
                        <div className="flex flex-wrap gap-4 text-sm">
                          <label className="inline-flex items-center gap-2">
                            <input
                              type="radio"
                              checked={row.mode === "existing"}
                              onChange={() =>
                                updateIngredient(idx, {
                                  mode: "existing",
                                  id: "",
                                  name: "",
                                })
                              }
                            />
                            Existing (catalog)
                          </label>
                          <label className="inline-flex items-center gap-2">
                            <input
                              type="radio"
                              checked={row.mode === "new"}
                              onChange={() =>
                                updateIngredient(idx, { mode: "new", id: "" })
                              }
                            />
                            New (name + UOM)
                          </label>
                        </div>

                        {row.mode === "existing" ? (
                          <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              <div>{renderPicker(idx)}</div>
                              <div>
                                <label className="text-sm block">
                                  <div className="mb-1 text-neutral-600">
                                    Qty per Base *
                                  </div>
                                  <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={row.qty_per_base}
                                    onChange={(e) =>
                                      updateIngredient(idx, {
                                        qty_per_base: e.target.value,
                                      })
                                    }
                                    className="w-full rounded-xl border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-orange-300"
                                  />
                                </label>
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              <Field label="UOM (optional)">
                                <input
                                  value={row.uom}
                                  onChange={(e) =>
                                    updateIngredient(idx, {
                                      uom: e.target.value,
                                    })
                                  }
                                  placeholder="g / ml / kg…"
                                  className="w-full rounded-xl border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-orange-300"
                                />
                              </Field>
                              {it ? (
                                <div className="text-xs text-neutral-600 self-end">
                                  Catalog: {currencySym(it.currency)}{" "}
                                  {Number(it.price_per_uom || 0).toFixed(4)}/
                                  {it.uom} •{" "}
                                  {isActivePrice(it.valid_from, it.valid_to) ? (
                                    <span className="text-emerald-600">
                                      Active
                                    </span>
                                  ) : (
                                    <span className="text-amber-600">
                                      Future/Closed
                                    </span>
                                  )}
                                </div>
                              ) : (
                                <div />
                              )}
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                              <Field label="Name *">
                                <input
                                  value={row.name}
                                  onChange={(e) =>
                                    updateIngredient(idx, {
                                      name: e.target.value,
                                    })
                                  }
                                  placeholder="e.g., Cranberry"
                                  className="w-full rounded-xl border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-orange-300"
                                />
                              </Field>
                              <Field label="UOM *">
                                <input
                                  value={row.uom}
                                  onChange={(e) =>
                                    updateIngredient(idx, {
                                      uom: e.target.value,
                                    })
                                  }
                                  placeholder="g / ml / kg…"
                                  className="w-full rounded-xl border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-orange-300"
                                />
                              </Field>
                              <Field label="Qty per Base *">
                                <input
                                  type="number"
                                  min="0"
                                  step="0.01"
                                  value={row.qty_per_base}
                                  onChange={(e) =>
                                    updateIngredient(idx, {
                                      qty_per_base: e.target.value,
                                    })
                                  }
                                  className="w-full rounded-xl border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-orange-300"
                                />
                              </Field>
                            </div>

                            <label className="mt-1 inline-flex items-center gap-2 text-sm">
                              <input
                                type="checkbox"
                                checked={row.priceEnabled}
                                onChange={(e) =>
                                  updateIngredient(idx, {
                                    priceEnabled: e.target.checked,
                                  })
                                }
                              />
                              Include price row
                            </label>

                            {row.priceEnabled ? (
                              <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                                <Field label="Currency">
                                  <input
                                    value={row.price.currency}
                                    onChange={(e) =>
                                      updateIngredient(idx, {
                                        price: {
                                          ...row.price,
                                          currency: e.target.value,
                                        },
                                      })
                                    }
                                    className="w-full rounded-xl border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-orange-300"
                                  />
                                </Field>
                                <Field label="Price per UOM">
                                  <input
                                    type="number"
                                    min="0"
                                    step="0.0001"
                                    value={row.price.price_per_uom}
                                    onChange={(e) =>
                                      updateIngredient(idx, {
                                        price: {
                                          ...row.price,
                                          price_per_uom: e.target.value,
                                        },
                                      })
                                    }
                                    className="w-full rounded-xl border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-orange-300"
                                  />
                                </Field>
                                <Field label="Valid From">
                                  <input
                                    type="date"
                                    value={
                                      row.price.valid_from
                                        ? String(row.price.valid_from).slice(
                                            0,
                                            10
                                          )
                                        : ""
                                    }
                                    onChange={(e) =>
                                      updateIngredient(idx, {
                                        price: {
                                          ...row.price,
                                          valid_from: e.target.value,
                                        },
                                      })
                                    }
                                    className="w-full rounded-xl border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-orange-300"
                                  />
                                </Field>
                                <Field label="Valid To">
                                  <input
                                    type="date"
                                    value={
                                      row.price.valid_to
                                        ? String(row.price.valid_to).slice(
                                            0,
                                            10
                                          )
                                        : ""
                                    }
                                    onChange={(e) =>
                                      updateIngredient(idx, {
                                        price: {
                                          ...row.price,
                                          valid_to: e.target.value,
                                        },
                                      })
                                    }
                                    className="w-full rounded-xl border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-orange-300"
                                  />
                                </Field>
                              </div>
                            ) : null}
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 flex items-center justify-between">
                <button
                  onClick={() => setStep(0)}
                  className="rounded-xl border px-4 py-2 text-sm hover:bg-neutral-50"
                  type="button"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(2)}
                  className="rounded-xl bg-neutral-900 text-white px-4 py-2 text-sm font-semibold hover:bg-neutral-800"
                  type="button"
                >
                  Next: Review
                </button>
              </div>
            </div>

            {/* Sidebar: Estimate + NEW Samples dropdown */}
            <aside className="space-y-6">
              <div className="rounded-2xl border border-neutral-200 bg-white/80 backdrop-blur shadow-sm p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Estimate</h3>
                  <span className="text-xs text-neutral-500">
                    Based on active catalog prices
                  </span>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  <Stat label="Ingredients" value={form.ingredients.length} />
                  <Stat
                    label="Base Volume"
                    value={`${form.base_volume_l || "—"} L`}
                  />
                  <Stat
                    label="Est. Cost"
                    value={
                      estimated.sum
                        ? `${currencySym(
                            estimated.currency
                          )} ${estimated.sum.toFixed(2)}`
                        : "—"
                    }
                  />
                </div>
                {estimated.missing ? (
                  <p className="mt-2 text-xs text-amber-600">
                    {estimated.missing} item(s) have no active price.
                  </p>
                ) : null}
              </div>

              <div className="rounded-2xl border border-neutral-200 bg-white/80 backdrop-blur shadow-sm p-4">
                <QuickSamplesDropdown
                  label="Quick Start (Samples)"
                  compact
                  onPick={(s, jump) => useSample(s, jump)}
                />
              </div>
            </aside>
          </section>
        )}

        {/* STEP 3 — REVIEW */}
        {step === 2 && (
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 rounded-2xl border border-neutral-200 bg-white/80 backdrop-blur shadow-sm overflow-hidden">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold">Review & Confirm</h2>
                <p className="text-xs text-neutral-500">
                  Check everything looks right, then Save.
                </p>
              </div>

              <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <div className="aspect-video rounded-xl overflow-hidden border border-neutral-200 bg-neutral-100">
                    {form.image_url ? (
                      // eslint-disable-next-line
                      <img
                        src={form.image_url}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full grid place-items-center text-neutral-400">
                        <ImageIcon className="w-8 h-8" />
                      </div>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-xs text-neutral-500">Name</div>
                  <div className="text-lg font-semibold">
                    {form.name || "—"}
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <Stat
                      label="Base Volume"
                      value={`${form.base_volume_l || "—"} L`}
                    />
                    <Stat label="Auto Code" value={codePreview} mono />
                    <Stat
                      label="Est. Cost"
                      value={
                        estimated.sum
                          ? `${currencySym(
                              estimated.currency
                            )} ${estimated.sum.toFixed(2)}`
                          : "—"
                      }
                    />
                    <Stat label="Ingredients" value={form.ingredients.length} />
                  </div>

                  {form.notes?.trim() ? (
                    <div className="mt-3 text-sm">
                      <div className="text-neutral-600 mb-1">Notes</div>
                      <div className="rounded-lg border border-neutral-200 p-2 text-neutral-800 bg-white">
                        {form.notes}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="px-4 pb-4">
                {/* Review — Ingredients */}
                <section className="bg-white rounded-2xl border border-neutral-200 p-4">
                  <h2 className="text-lg font-semibold text-neutral-900">
                    Ingredients
                  </h2>

                  <div className="mt-2 overflow-hidden rounded-xl border border-neutral-200">
                    <table className="w-full text-sm">
                      <thead className="bg-neutral-50 text-neutral-700">
                        <tr>
                          <th className="px-4 py-3 text-left">Item</th>
                          <th className="px-4 py-3 text-right">Qty / Base</th>
                          <th className="px-4 py-3 text-center">
                            Price Status
                          </th>
                          <th className="px-4 py-3 text-right">Est. Line</th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-neutral-200">
                        {form.ingredients.map((row, idx) => {
                          const isExisting = row.mode === "existing";
                          const cat = isExisting ? catalogById[row.id] : null;

                          const name = isExisting
                            ? cat?.name || "(select an ingredient)"
                            : row.name || "(new ingredient)";
                          const sku = isExisting ? cat?.sku || "" : "";
                          const uom = isExisting
                            ? cat?.uom || row.uom
                            : row.uom;

                          const qty = asNumber(row.qty_per_base);

                          // UNIT PRICE SOURCE for review grid
                          let unitInfo = null;
                          if (isExisting) {
                            const unit = asNumber(cat?.price_per_uom);
                            if (unit !== null) {
                              unitInfo = {
                                unit,
                                currency: cat?.currency || "USD",
                                source: "catalog",
                              };
                            }
                          } else if (row.priceEnabled) {
                            const unit = asNumber(row.price?.price_per_uom);
                            if (unit !== null) {
                              unitInfo = {
                                unit,
                                currency: row.price?.currency || "USD",
                                source: "provided",
                              };
                            }
                          }

                          const est =
                            unitInfo && qty !== null
                              ? qty * unitInfo.unit
                              : null;

                          const chipText = unitInfo
                            ? unitInfo.source === "catalog"
                              ? "Catalog price"
                              : "Price provided"
                            : "No price";
                          const chipCls = unitInfo
                            ? "bg-blue-100 text-blue-800"
                            : "bg-neutral-100 text-neutral-800";

                          return (
                            <tr
                              key={idx}
                              className="bg-white hover:bg-neutral-50"
                            >
                              <td className="px-4 py-3">
                                <div className="font-medium text-neutral-900">
                                  {name}
                                </div>
                                <div className="text-xs text-neutral-500">
                                  {isExisting
                                    ? `${sku ? `${sku} • ` : ""}${uom || "—"}`
                                    : `${uom || "—"}`}
                                </div>
                              </td>

                              <td className="px-4 py-3 text-right">
                                {qty !== null ? `${qty} ${uom || ""}` : "—"}
                              </td>

                              <td className="px-4 py-3 text-center">
                                <span
                                  className={`px-2.5 py-1 rounded-full text-xs font-semibold ${chipCls}`}
                                >
                                  {chipText}
                                </span>
                                {/* {unitInfo ? (
                                  <div className="mt-1 text-xs text-neutral-600">
                                    {formatCurrency(
                                      unitInfo.unit,
                                      unitInfo.currency
                                    )}{" "}
                                    / {uom || "uom"}
                                  </div>
                                ) : null} */}
                              </td>

                              <td className="px-4 py-3 text-right">
                                {est !== null ? (
                                  <span className="font-semibold">
                                    {formatCurrency(
                                      est,
                                      unitInfo?.currency || "USD"
                                    )}
                                  </span>
                                ) : (
                                  <span className="text-neutral-500">—</span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </section>
              </div>

              <div className="p-4 border-t flex items-center justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="rounded-xl border px-4 py-2 text-sm hover:bg-neutral-50"
                  type="button"
                >
                  Back
                </button>
                <button
                  onClick={onSubmit}
                  disabled={submitting}
                  className="inline-flex items-center gap-2 rounded-xl bg-orange-600 text-white px-4 py-2 font-semibold hover:bg-orange-700 disabled:opacity-60"
                >
                  {submitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  {submitting ? "Saving…" : "Save Recipe"}
                </button>
              </div>
            </div>

            {/* Issues & JSON (admins) */}
            <aside className="space-y-6">
              {issues.length ? (
                <div className="rounded-2xl border border-amber-200 bg-amber-50 shadow-sm p-4">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-amber-800">
                        Things to review
                      </h3>
                      <ul className="mt-2 list-disc pl-5 text-sm text-amber-800 space-y-1">
                        {issues.map((m, i) => (
                          <li key={i}>{m}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 shadow-sm p-4">
                  <h3 className="font-semibold text-emerald-800">
                    Looks good!
                  </h3>
                  <p className="text-sm text-emerald-800">
                    You can save this recipe now.
                  </p>
                </div>
              )}

              <details className="rounded-2xl border border-neutral-200 bg-white/80 backdrop-blur shadow-sm p-4">
                <summary className="cursor-pointer text-sm text-neutral-700">
                  JSON View
                </summary>
                <p className="mt-2 text-xs text-neutral-500">
                  Technical payload shown below for troubleshooting.
                </p>
                <pre className="mt-2 text-xs bg-neutral-950 text-neutral-100 rounded-xl p-3 overflow-auto max-h-[240px]">
                  {JSON.stringify(buildPayload(), null, 2)}
                </pre>
              </details>
            </aside>
          </section>
        )}
      </main>
    </div>
  );
}

/* =========================
   Small UI atoms/components
   ========================= */
function Field({ label, children }) {
  return (
    <label className="text-sm block">
      <div className="mb-1 text-neutral-600">{label}</div>
      {children}
    </label>
  );
}
function Stat({ label, value, mono }) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-3">
      <div className="text-xs text-neutral-500">{label}</div>
      <div
        className={`mt-1 text-base font-semibold ${mono ? "font-mono" : ""}`}
      >
        {value}
      </div>
    </div>
  );
}
function StepBadge({ i, label, step }) {
  return (
    <div className="flex items-center">
      <div
        className={`h-7 w-7 rounded-full grid place-items-center text-xs font-bold ${
          step > i
            ? "bg-emerald-500 text-white"
            : step === i
            ? "bg-orange-600 text-white"
            : "bg-neutral-200 text-neutral-700"
        }`}
      >
        {step > i ? <Check className="w-4 h-4" /> : i + 1}
      </div>
      <div
        className={`ml-2 text-sm ${
          step === i ? "text-orange-600" : "text-neutral-600"
        }`}
      >
        {label}
      </div>
    </div>
  );
}

/* =========================
   NEW: Samples Thumbnail Dropdown
   ========================= */
function QuickSamplesDropdown({
  label = "Quick Start (Samples)",
  compact = false,
  onPick,
}) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return SAMPLE_LIBRARY;
    return SAMPLE_LIBRARY.filter(
      (x) =>
        x.title.toLowerCase().includes(s) ||
        (x.tagline || "").toLowerCase().includes(s)
    );
  }, [q]);

  return (
    <div className={`${compact ? "" : "mt-2"} relative`} ref={ref}>
      <div className="flex items-center gap-2">
        <div className="text-sm font-medium text-neutral-800">{label}</div>
        <div className="ml-auto" />
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-3 py-2 text-xs hover:bg-neutral-50"
        >
          <Wand2 className="w-4 h-4 text-orange-600" />
          Choose sample
          <ChevronDown className="w-4 h-4 text-neutral-500" />
        </button>
      </div>

      {open && (
        <div className="absolute z-50 mt-2 w-[min(680px,100%)] rounded-xl border border-neutral-200 bg-white shadow-xl">
          <div className="flex items-center gap-2 p-2 border-b">
            <Search className="w-4 h-4 text-neutral-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search samples…"
              className="w-full bg-transparent text-sm outline-none"
              autoFocus
            />
          </div>

          <div className="max-h-80 overflow-auto">
            {list.length ? (
              list.map((s) => (
                <div
                  key={s.key}
                  className="flex items-center gap-3 px-3 py-2 hover:bg-neutral-50"
                >
                  {/* thumb */}
                  {/* eslint-disable-next-line */}
                  <img
                    src={s.image}
                    alt=""
                    className="w-9 h-9 rounded-md object-cover border border-neutral-200"
                  />
                  {/* text */}
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-neutral-900 truncate">
                      {s.title}
                    </div>
                    {s.tagline ? (
                      <div className="text-[11px] text-neutral-500 truncate">
                        {s.tagline}
                      </div>
                    ) : null}
                  </div>

                  <div className="ml-auto flex items-center gap-2">
                    <button
                      type="button"
                      className="text-xs px-2.5 py-1 rounded-lg border hover:bg-neutral-100"
                      onClick={() => {
                        onPick && onPick(s, false);
                        setOpen(false);
                      }}
                      title="Use Sample"
                    >
                      Use
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-3 text-sm text-neutral-500">
                No samples found.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
