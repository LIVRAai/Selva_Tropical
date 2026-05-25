"use client";
import Link from "next/link";
import { useState } from "react";
import { brandName } from "@/lib/env";
import { buildWhatsappMessage, createWhatsappLink } from "@/lib/whatsapp";
import { useCart } from "@/components/cart-context";

export function Header() {
  const { items } = useCart();
  const [open, setOpen] = useState(false);
  const count = items.reduce((a, b) => a + b.quantity, 0);
  return <header className="sticky top-0 z-30 border-b border-oliveDeep/10 bg-ivoryWarm/90 backdrop-blur">
    <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
      <Link href="/" className="font-semibold">{brandName}</Link>
      <nav className="hidden gap-6 md:flex text-sm"><Link href="/">Home</Link><Link href="/catalogo">Catálogo</Link><a href="#esencia">Esencia</a></nav>
      <button onClick={() => setOpen(true)} className="rounded-full bg-oliveDeep px-4 py-2 text-ivoryWarm">Selección ({count})</button>
    </div>
    <CartDrawer open={open} onClose={() => setOpen(false)} />
  </header>;
}

export function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, removeItem, updateQty, clear } = useCart();
  const subtotal = items.reduce((acc, it) => acc + it.price * it.quantity, 0);
  return <aside className={`fixed right-0 top-0 h-full w-full max-w-md bg-ivoryWarm p-5 shadow-boutique transition ${open ? "translate-x-0" : "translate-x-full"}`}>
    <button onClick={onClose}>Cerrar</button>
    <h3 className="mt-2 text-xl font-semibold">Tu selección personal</h3>
    <div className="mt-4 space-y-3 overflow-y-auto max-h-[65vh]">
      {items.map((item, i) => <div key={`${item.productId}-${i}`} className="card p-3 text-sm">
        <p className="font-medium">{item.name}</p><p className="text-xs">{item.reference}</p>
        <div className="mt-2 flex items-center gap-2"><button onClick={() => updateQty(i, item.quantity - 1)}>-</button><span>{item.quantity}</span><button onClick={() => updateQty(i, item.quantity + 1)}>+</button><button onClick={() => removeItem(i)} className="ml-auto text-macawOrange">Eliminar</button></div>
      </div>)}
    </div>
    <p className="mt-4 font-semibold">Subtotal: {subtotal.toLocaleString("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 })}</p>
    <a href={createWhatsappLink(buildWhatsappMessage(items, brandName))} target="_blank" className="btn-primary mt-4 w-full">Finalizar por WhatsApp</a>
    <button onClick={clear} className="mt-2 w-full text-sm">Limpiar carrito</button>
  </aside>;
}
