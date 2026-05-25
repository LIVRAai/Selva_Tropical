"use client";
import { useState } from "react";
import { useCart } from "@/components/cart-context";
import { brandName } from "@/lib/env";
import { Product } from "@/lib/types";
import { buildWhatsappMessage, createWhatsappLink } from "@/lib/whatsapp";

export default function ProductDetail({ product }: { product: Product }) {
  const [reference, setReference] = useState(product.references[0] ?? "Estándar");
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  return <main className="mx-auto grid max-w-5xl gap-6 px-4 py-10 md:grid-cols-2">
    <img src={product.image} alt={product.name} className="w-full rounded-3xl object-cover" />
    <article className="card p-6"><p className="text-xs uppercase text-mossSoft">{product.category}</p><h1 className="mt-2 text-3xl font-semibold">{product.name}</h1><p className="mt-3 text-earthCoffee">{product.description}</p><p className="mt-4 text-2xl font-semibold">{product.price.toLocaleString("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 })}</p>
      <div className="mt-4"><label className="text-sm">Referencia</label><select className="mt-2 w-full rounded-xl border px-3 py-2" value={reference} onChange={(e) => setReference(e.target.value)}>{product.references.map((r) => <option key={r}>{r}</option>)}</select></div>
      <div className="mt-4"><label className="text-sm">Cantidad</label><div className="mt-2 flex items-center gap-3"><button onClick={() => setQuantity((v) => Math.max(1, v - 1))}>-</button><span>{quantity}</span><button onClick={() => setQuantity((v) => v + 1)}>+</button></div></div>
      <button className="btn-primary mt-6 w-full" onClick={() => addItem({ productId: product.id, name: product.name, image: product.image, reference, price: product.price }, quantity)}>Añadir al carrito</button>
      <a className="mt-3 inline-flex w-full justify-center rounded-full border border-oliveDeep px-5 py-3 font-semibold" href={createWhatsappLink(buildWhatsappMessage([{ productId: product.id, name: product.name, image: product.image, reference, price: product.price, quantity }], brandName))} target="_blank">Comprar por WhatsApp</a>
    </article>
  </main>;
}
