import { NextResponse, type NextRequest } from "next/server";
import { auth } from "./auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const session = await auth();

  const protectedRoutes = ["/", "/freelance-request", "/catalog-management", "/membership"];

  if (!session && protectedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL(`/login?redirect=${pathname}`, request.url));
  }

  if (session && pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/freelance-request",
    "/catalog-management",
    "/membership",
  ],
};
