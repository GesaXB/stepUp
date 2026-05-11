import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const items = await prisma.wishlistItem.findMany({
      where: { userId: session.userId },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json({ items });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch wishlist" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { sku } = body;

    if (!sku) return NextResponse.json({ error: "SKU is required" }, { status: 400 });

    const existing = await prisma.wishlistItem.findUnique({
      where: {
        userId_sku: {
          userId: session.userId,
          sku
        }
      }
    });

    // Toggle behavior: remove if it exists, add if it doesn't
    if (existing) {
      await prisma.wishlistItem.delete({ where: { id: existing.id } });
      return NextResponse.json({ message: "Removed from wishlist", status: "removed" });
    }

    const newItem = await prisma.wishlistItem.create({
      data: {
        userId: session.userId,
        sku
      }
    });

    return NextResponse.json({ item: newItem, status: "added" });
  } catch (error) {
    console.error("Wishlist POST error", error);
    return NextResponse.json({ error: "Failed to update wishlist" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { searchParams } = new URL(req.url);
    const sku = searchParams.get("sku");

    if (!sku) return NextResponse.json({ error: "SKU is required" }, { status: 400 });

    await prisma.wishlistItem.deleteMany({
      where: {
        userId: session.userId,
        sku
      }
    });

    return NextResponse.json({ message: "Item removed from wishlist" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete from wishlist" }, { status: 500 });
  }
}
