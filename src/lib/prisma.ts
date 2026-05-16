import { PrismaClient } from "@/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };
const missingEnvError = new Error(
  "DATABASE_URL is not configured. Set it in your environment (e.g. Vercel) and run migrations/seed as needed."
);

function isConfigured(url: string | undefined): url is string {
  if (!url) return false;
  if (url.includes("USER:PASSWORD") || url.includes("ep-xxx")) return false;
  return url.startsWith("postgres://") || url.startsWith("postgresql://");
}

function createPrismaClient(): PrismaClient | null {
  const connectionString = process.env.DATABASE_URL;
  if (!isConfigured(connectionString)) {
    return null;
  }
  const adapter = new PrismaNeon({ connectionString });
  return new PrismaClient({ adapter });
}

const prismaInstance = globalForPrisma.prisma ?? createPrismaClient();
const missingPrismaProxy = new Proxy(
  {},
  {
    get() {
      throw missingEnvError;
    },
  }
) as PrismaClient;

export const prisma = prismaInstance ?? missingPrismaProxy;

if (process.env.NODE_ENV !== "production" && prismaInstance) {
  globalForPrisma.prisma = prismaInstance;
}
