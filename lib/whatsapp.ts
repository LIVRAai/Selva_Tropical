import { whatsappNumber } from "@/lib/env";
import { CartItem } from "@/lib/types";

const money = (value: number) => new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(value);

export function buildWhatsappMessage(items: CartItem[], brand: string) {
  const lines = items.map((item) => `• ${item.name} | Ref: ${item.reference} | Cant: ${item.quantity} | ${money(item.price * item.quantity)}`);
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  return `${brand}%0A%0AMi selección personal:%0A${lines.join("%0A")}%0A%0ATotal estimado: ${money(total)}`;
}

export function createWhatsappLink(message: string) {
  const clean = message.replace(/\s+/g, " ").trim();
  return `https://wa.me/${whatsappNumber}?text=${clean}`;
}
