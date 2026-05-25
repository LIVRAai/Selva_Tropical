"use client";
import { useState } from "react";
import { useCart } from "@/components/cart-context";
import { brandName } from "@/lib/env";
import { Product } from "@/lib/types";
import { buildWhatsappMessage, createWhatsappLink } from "@/lib/whatsapp";

export default function ProductDetail({ product }: { product: Product }) {
  const [reference, setReference] = useState(product.references[0] ?? "Estándar");
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const { addItem } = useCart();

  const onAdd = () => {
    addItem({ productId: product.id, name: product.name, image: product.image, reference, price: product.price }, quantity);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 1600);
  };

  return <main className="mx-auto grid max-w-6xl gap-6 px-4 py-10 md:grid-cols-2">
    <div className="card overflow-hidden p-2"><img src={product.image} alt={product.name} className="h-full min-h-[380px] w-full rounded-[1.2rem] object-cover" /></div>
    <article className="card p-6 md:p-8">
      <p className="text-xs uppercase tracking-[0.15em] text-mossSoft">{product.category}</p>
      <h1 className="mt-2 text-5xl leading-tight">{product.name}</h1>
      <p className="mt-4 leading-relaxed text-oliveMid">{product.description}</p>
      <p className="mt-4 text-3xl font-semibold text-earthCoffee">{product.price.toLocaleString("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 })}</p>
      <div className="mt-5 grid gap-4">
        <div><label className="text-sm font-medium">Presentación</label><select className="mt-2 w-full rounded-xl border border-oliveDeep/20 bg-white px-3 py-3" value={reference} onChange={(e) => setReference(e.target.value)}>{product.references.map((r) => <option key={r}>{r}</option>)}</select></div>
        <div><label className="text-sm font-medium">Cantidad</label><div className="mt-2 inline-flex items-center gap-3 rounded-full border border-oliveDeep/20 bg-white px-3 py-2"><button onClick={() => setQuantity((v) => Math.max(1, v - 1))} className="h-8 w-8 rounded-full border">-</button><span className="min-w-6 text-center font-semibold">{quantity}</span><button onClick={() => setQuantity((v) => v + 1)} className="h-8 w-8 rounded-full border">+</button></div></div>
      </div>
      <button className="btn-primary mt-7 w-full" onClick={onAdd}>Añadir a mi selección</button>
      <a className="btn-secondary mt-3 w-full" href={createWhatsappLink(buildWhatsappMessage([{ productId: product.id, name: product.name, image: product.image, reference, price: product.price, quantity }], brandName))} target="_blank">Comprar por WhatsApp</a>
      {showToast ? <p className="mt-3 rounded-xl bg-oliveDeep px-3 py-2 text-center text-sm text-ivoryWarm">Añadido a tu selección ✧</p> : null}
    </article>
  </main>;
}
