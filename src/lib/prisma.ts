import { PrismaClient } from "@/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function isConfigured(url: string | undefined): url is string {
  if (!url) return false;
  if (url.includes("USER:PASSWORD") || url.includes("ep-xxx")) return false;
  return url.startsWith("postgres://") || url.startsWith("postgresql://");
}

function createPrismaClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL;
  if (!isConfigured(connectionString)) {
    throw new Error(
      "DATABASE_URL is not configured. Edit .env.local with your Neon connection string, then run `npx prisma db push` and restart the dev server."
    );
  }
  const adapter = new PrismaNeon({ connectionString });
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
