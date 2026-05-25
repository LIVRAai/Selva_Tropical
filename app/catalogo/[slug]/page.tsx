import { notFound } from "next/navigation";
import ProductDetail from "./view";
import { getProductBySlug } from "@/lib/products";

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}
