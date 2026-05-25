import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/components/cart-context";
import { Header } from "@/components/ui";
import { brandName } from "@/lib/env";

export const metadata: Metadata = {
  title: `${brandName} | Tienda Boutique`,
  description: "Tienda artesanal premium inspirada en el cuidado natural tropical.",
  openGraph: {
    title: `${brandName} | Cuidado Artesanal`,
    description: "Compra productos artesanales con una experiencia elegante y fluida."
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <CartProvider>
          <Header />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
