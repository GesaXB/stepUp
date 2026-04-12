import { notFound } from "next/navigation";
import ProductDetailClient from "@/components/products/product-detail-client";
import { PRODUCTS } from "@/lib/products";

export default async function ProductDetailPage({ params }: { params: Promise<{ sku: string }> }) {
  const resolvedParams = await params;
  const product = PRODUCTS.find(p => p.sku === resolvedParams.sku);

  if (!product) return notFound();

  return (
    <div className="min-h-screen bg-white selection:bg-black selection:text-white flex flex-col">
      <main className="flex-1 pt-[100px] md:pt-[140px] pb-32">
        <ProductDetailClient product={product} />
      </main>
    </div>
  );
}
