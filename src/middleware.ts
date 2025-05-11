// middleware.ts
import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

const secret = process.env.AUTH_SECRET;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!secret) {
    console.error("NEXTAUTH_SECRET is missing!");
    throw new Error("Authentication secret is not configured");
  }

  const token = await getToken({ req: request, secret });

  if (!token && pathname === "/") {
    return NextResponse.redirect(new URL("/login?redirect=/", request.url));
  }

  if (token && pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login"],
};
