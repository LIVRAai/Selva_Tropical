import { productsApiUrl } from "@/lib/env";
import { Product } from "@/lib/types";

export async function getProducts(): Promise<Product[]> {
  if (!productsApiUrl) throw new Error("Falta configurar NEXT_PUBLIC_PRODUCTS_API_URL");
  const res = await fetch(productsApiUrl, { next: { revalidate: 300 } });
  if (!res.ok) throw new Error("No fue posible cargar los productos en este momento.");
  const data = (await res.json()) as Product[];
  return data
    .filter((p) => p.active)
    .sort((a, b) => Number(b.featured) - Number(a.featured) || a.name.localeCompare(b.name));
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find((item) => item.slug === slug);
}
