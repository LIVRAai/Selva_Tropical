import { getProducts } from "@/lib/products";
import CatalogClient from "./view";

export const dynamic = "force-dynamic";

export default async function CatalogPage() {
  try {
    const products = await getProducts();
    return <CatalogClient products={products} />;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error inesperado";
    return <main className="mx-auto max-w-5xl px-4 py-20"><div className="card p-8 text-center"><h1 className="text-2xl">No pudimos abrir la boutique</h1><p className="mt-2 text-earthCoffee">{message}</p></div></main>;
  }
}
