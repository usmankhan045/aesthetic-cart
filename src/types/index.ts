export interface AmazonReview {
  author: string;
  rating: number;
  title: string;
  body: string;
  date?: string;
}

export interface ScrapedProduct {
  asin: string;
  title: string;
  description: string;
  bullets: string[];
  imageUrls: string[];
  rating: number | null;
  reviewCount: number | null;
  reviews: AmazonReview[];
  price: string | null;
}

export interface CategoryDTO {
  id: string;
  name: string;
  slug: string;
  emoji: string | null;
  imageUrl: string | null;
  sortOrder: number;
}

export interface ProductDTO {
  id: string;
  slug: string;
  asin: string;
  title: string;
  description: string;
  bullets: string[];
  imageUrls: string[];
  rating: number | null;
  reviewCount: number | null;
  reviews: AmazonReview[];
  price: string | null;
  published: boolean;
  categoryId: string;
  category?: CategoryDTO;
  createdAt: Date;
  updatedAt: Date;
}
