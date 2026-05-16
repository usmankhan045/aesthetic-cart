import { SignJWT, jwtVerify } from "jose";

const COOKIE_NAME = "ac_admin_token";

function getSecret(): Uint8Array {
  const secret = process.env.ADMIN_SECRET_KEY;
  if (!secret || secret.length < 32) {
    throw new Error("ADMIN_SECRET_KEY must be set and at least 32 chars");
  }
  return new TextEncoder().encode(secret);
}

export async function signAdminToken(): Promise<string> {
  return await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret());
}

export async function verifyAdminToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload.role === "admin";
  } catch {
    return false;
  }
}

export const ADMIN_COOKIE = COOKIE_NAME;

const attemptMap = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(ip: string, max = 5, windowMs = 15 * 60_000): boolean {
  const now = Date.now();
  const rec = attemptMap.get(ip);
  if (!rec || rec.resetAt < now) {
    attemptMap.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (rec.count >= max) return false;
  rec.count++;
  return true;
}
