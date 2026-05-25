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
    <p className="text-xs uppercase tracking-[0.2em] text-mossSoft">Boutique artesanal</p>
    <h1 className="mt-1 text-5xl">Catálogo</h1>
    <p className="mt-3 max-w-2xl text-oliveMid">Explora nuestras piezas naturales por categoría o encuentra tu ritual ideal con una búsqueda rápida.</p>

    <div className="mt-6 rounded-3xl border border-oliveDeep/10 bg-white/70 p-4">
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar por nombre, descripción o categoría" className="w-full rounded-full border border-oliveDeep/15 bg-ivoryWarm px-4 py-3 outline-none transition focus:border-earthCoffee" />
      <div className="mt-4 flex flex-wrap gap-2">{categories.map((c) => <button key={c} onClick={() => setCategory(c)} className={`rounded-full px-4 py-2 text-sm transition ${category === c ? "bg-oliveDeep text-ivoryWarm" : "border border-oliveDeep/20 bg-white text-oliveDeep"}`}>{c}</button>)}</div>
    </div>

    {filtered.length === 0 ? <div className="card mt-8 p-8 text-center"><h2 className="text-3xl">No encontramos resultados</h2><p className="mt-2 text-oliveMid">Prueba con otra búsqueda o cambia la categoría para descubrir nuevas piezas.</p></div> : <section className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{filtered.map((p) => <Link key={p.id} href={`/catalogo/${p.slug}`} className="card overflow-hidden hover:-translate-y-1">
      <img src={p.image} alt={p.name} className="h-56 w-full object-cover"/>
      <div className="p-4"><p className="text-xs uppercase tracking-[0.12em] text-mossSoft">{p.category}</p><h3 className="mt-1 text-2xl">{p.name}</h3><p className="mt-2 line-clamp-2 text-sm text-oliveMid">{p.description}</p><p className="mt-3 font-semibold text-earthCoffee">{p.price.toLocaleString("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 })}</p><span className="mt-3 inline-flex text-sm font-semibold text-oliveDeep underline underline-offset-4">Ver detalle</span></div>
    </Link>)}</section>}
  </main>;
}
