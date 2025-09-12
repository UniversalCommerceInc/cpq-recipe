import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Recipes from "./pages/Recipes.jsx";
import RecipeDetail from "./pages/RecipeDetail.jsx";
import ChatCPQ from "./components/ChatCPQ.jsx";
import AppNav from "./components/Header.jsx";
import CreateRecipe from "./pages/CreateRecipe.jsx";

export default function App() {
  return (
    <div className="min-h-dvh text-slate-900 bg-[radial-gradient(80%_80%_at_100%_0%,rgba(99,102,241,0.08),transparent),radial-gradient(60%_60%_at_0%_100%,rgba(20,184,166,0.08),transparent)]">
      {/* Nav */}
      <AppNav />

      {/* Content */}
      <main className="mx-auto max-w-6xl px-4 py-6 pb-28">
        <Routes>
          <Route path="/" element={<Recipes />} />
          <Route path="/recipe/new" element={<CreateRecipe />} />
          <Route path="/recipe/:code" element={<RecipeDetail />} />
        </Routes>
      </main>

      <ChatCPQ />
    </div>
  );
}
