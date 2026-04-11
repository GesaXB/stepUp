import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { notFound } from "next/navigation";
import ProductDetailClient from "@/components/products/product-detail-client";

// Mimic database
const DATABASE = [
  { name: "Air Max SU '26 Platinum", image: "/images/sneaker-yellow.png", price: "$240", sku: "SU-V1-AMX", status: "In Stock", type: "Core", description: "High-performance urban running sneaker with adaptive cushioning." },
  { name: "Leather Heritage Classic", image: "/images/story-sneaker.png", price: "$190", sku: "SU-V1-LHC", status: "Limited", type: "Heritage", description: "Hand-finished premium leather sneakers for a timeless streetwear look." },
  { name: "Tech Performance Onyx", image: "/images/sneaker-right.png", price: "$280", sku: "SU-V1-TPO", status: "Low Stock", type: "Performance", description: "Futuristic silhouette with high-tensile mesh for daily durability." },
  { name: "Phantom Flow V2", image: "/images/hero-main.png", price: "$310", sku: "SU-V1-PF2", status: "In Stock", type: "Performance", description: "Advanced aerodynamics meets urban utility in this stealthy release." },
  { name: "Urban Recon Protocol", image: "/images/story-model.png", price: "$420", sku: "SU-V1-URB", status: "Sold Out", type: "Limited", description: "Military-grade tactical movement boots for the harshest environments." },
  { name: "Hypermesh 'Graphite'", image: "/images/sneaker-yellow.png", price: "$265", sku: "SU-V1-HCG", status: "Limited", type: "Core", description: "Breathable carbon-weave construction for lightweight agility." },
];

export default async function ProductDetailPage({ params }: { params: Promise<{ sku: string }> }) {
  const resolvedParams = await params;
  const product = DATABASE.find(p => p.sku === resolvedParams.sku);

  if (!product) return notFound();

  return (
    <div className="min-h-screen bg-white selection:bg-black selection:text-white flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-[120px] md:pt-[180px] pb-32">
        <ProductDetailClient product={product} />
      </main>

      <Footer />
    </div>
  );
}
