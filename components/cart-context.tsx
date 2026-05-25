"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { CartItem } from "@/lib/types";

type CartContextValue = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, quantity: number) => void;
  updateQty: (index: number, quantity: number) => void;
  removeItem: (index: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  useEffect(() => {
    const raw = localStorage.getItem("selva_cart");
    if (raw) setItems(JSON.parse(raw));
  }, []);
  useEffect(() => localStorage.setItem("selva_cart", JSON.stringify(items)), [items]);

  const value = useMemo(() => ({
    items,
    addItem: (item: Omit<CartItem, "quantity">, quantity: number) => setItems((prev) => {
      const index = prev.findIndex((p) => p.productId === item.productId && p.reference === item.reference);
      if (index >= 0) {
        const copy = [...prev];
        copy[index].quantity += quantity;
        return copy;
      }
      return [...prev, { ...item, quantity }];
    }),
    updateQty: (index: number, quantity: number) => setItems((prev) => prev.map((it, i) => i === index ? { ...it, quantity: Math.max(1, quantity) } : it)),
    removeItem: (index: number) => setItems((prev) => prev.filter((_, i) => i !== index)),
    clear: () => setItems([])
  }), [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
