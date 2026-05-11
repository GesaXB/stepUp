import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

// GET /api/admin/products - List all products for admin
export async function GET() {
  try {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const products = await prisma.product.findMany({
      include: {
        category: true,
        variants: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ products });
  } catch (error) {
    console.error("Admin Products GET Error:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

// POST /api/admin/products - Create new product
export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { 
      name, 
      slug, 
      description, 
      price, 
      sku, 
      categoryId, 
      images,
      status,
      type,
      isNewDrop,
      isCollab,
      variants // [{ size: "40", stock: 10 }, ...]
    } = body;

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        price: parseFloat(price),
        sku,
        categoryId,
        images,
        status: status || "IN_STOCK",
        type: type || "CORE",
        isNewDrop: isNewDrop || false,
        isCollab: isCollab || false,
        variants: {
          create: variants.map((v: any) => ({
            size: v.size,
            stock: parseInt(v.stock),
            sku: `${sku}-${v.size}`,
          })),
        },
      },
      include: {
        variants: true,
      },
    });

    return NextResponse.json({ product, message: "Product created successfully" });
  } catch (error: any) {
    console.error("Admin Products POST Error:", error);
    if (error.code === 'P2002') {
      return NextResponse.json({ error: "Slug or SKU already exists" }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
