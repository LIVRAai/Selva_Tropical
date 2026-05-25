"use client";
import Link from "next/link";
import { useState } from "react";
import { brandName } from "@/lib/env";
import { buildWhatsappMessage, createWhatsappLink } from "@/lib/whatsapp";
import { useCart } from "@/components/cart-context";

export function Header() {
  const { items } = useCart();
  const [open, setOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const count = items.reduce((a, b) => a + b.quantity, 0);
  return <header className="sticky top-0 z-40 border-b border-oliveDeep/10 bg-ivoryWarm/85 backdrop-blur-md">
    <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
      <Link href="/" className="text-lg font-semibold leading-tight md:text-xl">Selva Tropical <span className="block text-xs font-medium uppercase tracking-[0.15em] text-mossSoft">Cuidado Artesanal</span></Link>
      <nav className="hidden items-center gap-7 text-sm md:flex"><Link href="/" className="hover:text-earthCoffee">Home</Link><Link href="/catalogo" className="hover:text-earthCoffee">Catálogo</Link><a href="/#esencia" className="hover:text-earthCoffee">Esencia</a></nav>
      <div className="flex items-center gap-2">
        <button onClick={() => setOpen(true)} className="rounded-full border border-oliveDeep/20 bg-white/70 px-4 py-2 text-sm font-semibold transition hover:bg-white">Mi selección ({count})</button>
        <button onClick={() => setMobileMenu((v) => !v)} className="rounded-full border border-oliveDeep/20 p-2 md:hidden" aria-label="Abrir menú">☰</button>
      </div>
    </div>
    {mobileMenu ? <nav className="border-t border-oliveDeep/10 bg-ivoryWarm px-4 py-3 md:hidden"><div className="flex flex-col gap-3 text-sm"><Link href="/" onClick={() => setMobileMenu(false)}>Home</Link><Link href="/catalogo" onClick={() => setMobileMenu(false)}>Catálogo</Link><a href="/#esencia" onClick={() => setMobileMenu(false)}>Esencia</a></div></nav> : null}
    <CartDrawer open={open} onClose={() => setOpen(false)} />
  </header>;
}

export function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, removeItem, updateQty, clear } = useCart();
  const subtotal = items.reduce((acc, it) => acc + it.price * it.quantity, 0);
  return <>
    <div className={`fixed inset-0 z-40 bg-oliveDeep/25 transition duration-300 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`} onClick={onClose} />
    <aside className={`fixed right-0 top-0 z-50 h-full w-full max-w-md bg-ivoryWarm p-5 shadow-boutique transition duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}>
      <div className="flex items-center justify-between"><h3 className="text-3xl">Mi selección</h3><button onClick={onClose} className="rounded-full border border-oliveDeep/20 px-3 py-1 text-sm">Cerrar</button></div>
      <p className="mt-1 text-sm text-oliveMid">Tu carrito artesanal listo para finalizar.</p>
      <div className="mt-5 space-y-3 overflow-y-auto max-h-[62vh] pr-1">
        {items.length === 0 ? <div className="card p-5 text-center"><p className="text-lg">Tu selección está vacía</p><p className="mt-1 text-sm text-oliveMid">Cuando agregues productos aparecerán aquí para cerrar tu pedido.</p></div> : items.map((item, i) => <div key={`${item.productId}-${i}`} className="card flex gap-3 p-3 text-sm">
          <img src={item.image} alt={item.name} className="h-16 w-16 rounded-2xl object-cover" />
          <div className="flex-1"><p className="font-semibold">{item.name}</p><p className="text-xs uppercase tracking-wide text-mossSoft">{item.reference}</p>
            <div className="mt-2 flex items-center gap-2"><button onClick={() => updateQty(i, item.quantity - 1)} className="rounded-full border px-2">-</button><span>{item.quantity}</span><button onClick={() => updateQty(i, item.quantity + 1)} className="rounded-full border px-2">+</button><button onClick={() => removeItem(i)} className="ml-auto text-xs font-semibold text-macawOrange">Eliminar</button></div>
          </div>
        </div>)}
      </div>
      <p className="mt-4 text-lg font-semibold">Subtotal: {subtotal.toLocaleString("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 })}</p>
      <a href={createWhatsappLink(buildWhatsappMessage(items, brandName))} target="_blank" className="btn-primary mt-4 w-full">Finalizar por WhatsApp</a>
      {items.length > 0 ? <button onClick={clear} className="mt-2 w-full text-sm text-oliveMid">Limpiar selección</button> : null}
    </aside>
  </>;
}
