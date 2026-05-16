import { cache } from "react";
import { prisma } from "@/lib/prisma";
import type { CategoryDTO } from "@/types";

export const getCategories = cache(async (): Promise<CategoryDTO[]> => {
  try {
    const cats = await prisma.category.findMany({
      orderBy: { sortOrder: "asc" },
    });
    return cats.map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      emoji: c.emoji,
      imageUrl: c.imageUrl,
      sortOrder: c.sortOrder,
    }));
  } catch {
    return [];
  }
});

export const getCategoryBySlug = cache(async (slug: string) => {
  try {
    return await prisma.category.findUnique({ where: { slug } });
  } catch {
    return null;
  }
});

export const getProductBySlug = cache(async (slug: string) => {
  try {
    return await prisma.product.findUnique({
      where: { slug },
      include: { category: true },
    });
  } catch {
    return null;
  }
});

export const getRelatedProducts = cache(
  async (categoryId: string, excludeId: string) => {
    try {
      return await prisma.product.findMany({
        where: {
          categoryId,
          published: true,
          id: { not: excludeId },
        },
        take: 4,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          slug: true,
          title: true,
          imageUrls: true,
          rating: true,
          reviewCount: true,
        },
      });
    } catch {
      return [];
    }
  }
);

export const getPublishedProducts = cache(async (categoryId?: string) => {
  try {
    return await prisma.product.findMany({
      where: {
        published: true,
        ...(categoryId ? { categoryId } : {}),
      },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        slug: true,
        title: true,
        imageUrls: true,
        rating: true,
        reviewCount: true,
        category: { select: { id: true, name: true, slug: true } },
      },
    });
  } catch {
    return [];
  }
});
