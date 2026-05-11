import { notFound } from "next/navigation";
import ProductDetailClient from "@/components/products/product-detail-client";
import { prisma } from "@/lib/prisma";

export default async function ProductDetailPage({ params }: { params: Promise<{ sku: string }> }) {
  const resolvedParams = await params;
  
  const product = await prisma.product.findUnique({
    where: { sku: resolvedParams.sku },
    include: {
      variants: true,
      category: true,
    }
  });

  if (!product) return notFound();

  // Format product for UI
  const formattedProduct = {
    ...product,
    price: `$${parseFloat(product.price.toString()).toLocaleString()}`,
    image: product.images[0] || "/placeholder-shoe.png",
    type: product.type.charAt(0) + product.type.slice(1).toLowerCase(),
    status: product.status === "IN_STOCK" ? "In Stock" : 
            product.status === "SOLD_OUT" ? "Sold Out" : 
            product.status.replace("_", " "),
  };

  return (
    <div className="min-h-screen bg-white selection:bg-black selection:text-white flex flex-col">
      <main className="flex-1 pt-[100px] md:pt-[140px] pb-32">
        <ProductDetailClient product={formattedProduct as any} />
      </main>
    </div>
  );
}
