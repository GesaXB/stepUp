import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const type = searchParams.get("type");

    const products = await prisma.product.findMany({
      where: {
        ...(category && { category: { slug: category } }),
        ...(type && type !== "All" && { type: type as any }),
      },
      include: {
        category: true,
        variants: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Transform products for the UI
    const formattedProducts = products.map(p => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      sku: p.sku,
      price: `$${parseFloat(p.price.toString()).toLocaleString()}`,
      image: p.images[0] || "/placeholder-shoe.png",
      type: p.type.charAt(0) + p.type.slice(1).toLowerCase(),
      status: p.status === "IN_STOCK" ? "In Stock" : 
              p.status === "SOLD_OUT" ? "Sold Out" : 
              p.status.replace("_", " "),
      description: p.description
    }));

    return NextResponse.json({ products: formattedProducts });
  } catch (error) {
    console.error("Products GET Error:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
