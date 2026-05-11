import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const body = await req.json();
    const { name, slug, description, price, sku, categoryId, status, type, images, isNewDrop, isCollab, variants } = body;

    // Basic Validation
    if (!name || !sku || !price) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice)) {
      return NextResponse.json({ error: "Invalid price format" }, { status: 400 });
    }

    // Use transaction to update product and variants
    const product = await prisma.$transaction(async (tx) => {
      // 1. Update main product
      const updatedProduct = await tx.product.update({
        where: { id },
        data: {
          name, 
          slug, 
          description, 
          sku, 
          categoryId: categoryId || null, 
          status, 
          type, 
          images, 
          isNewDrop: !!isNewDrop, 
          isCollab: !!isCollab,
          price: parsedPrice
        }
      });

      // 2. Handle variants (simpler approach: delete and recreate)
      if (variants) {
        await tx.productVariant.deleteMany({
          where: { productId: id }
        });

        await tx.productVariant.createMany({
          data: variants.map((v: any) => ({
            productId: id,
            size: v.size,
            stock: parseInt(v.stock)
          }))
        });
      }

      return updatedProduct;
    });

    return NextResponse.json({ product });
  } catch (error) {
    console.error("Update product error:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // Prisma will handle cascade if configured in schema, 
    // but let's be safe and delete variants first if needed.
    await prisma.$transaction([
      prisma.productVariant.deleteMany({ where: { productId: id } }),
      prisma.product.delete({ where: { id } })
    ]);

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Delete product error:", error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
