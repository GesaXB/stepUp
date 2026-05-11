import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const items = await prisma.cartItem.findMany({
      where: { userId: session.userId },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json({ items });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch cart" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { sku, size = "42", quantity = 1 } = body;

    if (!sku) return NextResponse.json({ error: "SKU is required" }, { status: 400 });

    const existing = await prisma.cartItem.findUnique({
      where: {
        userId_sku_size: {
          userId: session.userId,
          sku,
          size
        }
      }
    });

    if (existing) {
      const updated = await prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + quantity }
      });
      return NextResponse.json(updated);
    }

    const newItem = await prisma.cartItem.create({
      data: {
        userId: session.userId,
        sku,
        size,
        quantity
      }
    });

    return NextResponse.json(newItem);
  } catch (error) {
    console.error("Cart POST error", error);
    return NextResponse.json({ error: "Failed to add to cart" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { sku, size, quantity } = await req.json();

    const existing = await prisma.cartItem.findUnique({
      where: { userId_sku_size: { userId: session.userId, sku, size } }
    });

    if (!existing) return NextResponse.json({ error: "Item not found" }, { status: 404 });

    if (quantity <= 0) {
      await prisma.cartItem.delete({ where: { id: existing.id } });
      return NextResponse.json({ message: "Removed" });
    }

    const updated = await prisma.cartItem.update({
      where: { id: existing.id },
      data: { quantity }
    });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update quantity" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { searchParams } = new URL(req.url);
    const sku = searchParams.get("sku");
    const size = searchParams.get("size");

    if (!sku || !size) return NextResponse.json({ error: "SKU and size required" }, { status: 400 });

    await prisma.cartItem.deleteMany({
      where: {
        userId: session.userId,
        sku,
        size
      }
    });

    return NextResponse.json({ message: "Item removed from cart" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
