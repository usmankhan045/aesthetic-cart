import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const ADMIN_COOKIE = "ac_admin_token";

function getSecret(): Uint8Array | null {
  const secret = process.env.ADMIN_SECRET_KEY;
  if (!secret || secret.length < 32) return null;
  return new TextEncoder().encode(secret);
}

async function isAuthenticated(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const secret = getSecret();
  if (!secret) return false;
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload.role === "admin";
  } catch {
    return false;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isAdminLogin = pathname === "/admin/login";
  const isAdminPage =
    !isAdminLogin && (pathname === "/admin" || pathname.startsWith("/admin/"));
  const isProtectedApi =
    pathname.startsWith("/api/import") ||
    pathname.startsWith("/api/categories") ||
    pathname.startsWith("/api/products");
  const isProductPage = pathname.startsWith("/products/");

  if (isAdminPage || isProtectedApi) {
    const token = req.cookies.get(ADMIN_COOKIE)?.value;
    const ok = await isAuthenticated(token);
    if (!ok) {
      if (isProtectedApi) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  if (isProductPage) {
    const country =
      req.headers.get("x-vercel-ip-country") ??
      req.headers.get("cf-ipcountry") ??
      "US";
    const res = NextResponse.next();
    res.headers.set("x-user-country", country);
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin",
    "/admin/:path*",
    "/api/import/:path*",
    "/api/categories/:path*",
    "/api/products/:path*",
    "/products/:path*",
  ],
};
