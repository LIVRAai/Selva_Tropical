"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Product } from "@/lib/types";

export default function CatalogClient({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todas");
  const categories = ["Todas", ...Array.from(new Set(products.map((p) => p.category)))];
  const filtered = useMemo(() => products.filter((p) => (category === "Todas" || p.category === category) && `${p.name} ${p.description} ${p.category}`.toLowerCase().includes(query.toLowerCase())), [products, query, category]);
  return <main className="mx-auto max-w-6xl px-4 py-10">
    <h1 className="text-3xl font-semibold">Catálogo boutique</h1>
    <div className="mt-4 flex flex-col gap-3 md:flex-row"><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar por nombre, descripción o categoría" className="w-full rounded-full border px-4 py-3" /><select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-full border px-4 py-3">{categories.map((c) => <option key={c}>{c}</option>)}</select></div>
    {filtered.length === 0 ? <div className="card mt-8 p-8 text-center">No encontramos productos para esa búsqueda. Prueba otro término o categoría.</div> : <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{filtered.map((p) => <Link key={p.id} href={`/catalogo/${p.slug}`} className="card overflow-hidden transition hover:-translate-y-1"><img src={p.image} alt={p.name} className="h-48 w-full object-cover"/><div className="p-4"><p className="text-xs uppercase text-mossSoft">{p.category}</p><h3 className="font-semibold">{p.name}</h3><p className="mt-2 text-sm line-clamp-2">{p.description}</p></div></Link>)}</section>}
  </main>;
}
