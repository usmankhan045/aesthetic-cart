import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PATCH(req: NextRequest, ctx: RouteContext) {
  const { id } = await ctx.params;
  let body: { published?: boolean };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }
  const updated = await prisma.product.update({
    where: { id },
    data: { published: !!body.published },
    include: { category: true },
  });
  revalidatePath("/");
  revalidatePath("/catalogue");
  revalidatePath(`/products/${updated.slug}`);
  return NextResponse.json({ success: true, product: updated });
}

export async function DELETE(_req: NextRequest, ctx: RouteContext) {
  const { id } = await ctx.params;
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  await prisma.product.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/catalogue");
  revalidatePath(`/products/${product.slug}`);
  return NextResponse.json({ success: true });
}
