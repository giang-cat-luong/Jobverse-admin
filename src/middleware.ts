import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

const secret = "keFM/VZT0Vs85k0f1kPm3xWZGJVW2sANB05l6QC4IOE="

const roleBasedRoutes: Record<"employer" | "freelancer", string[]> = {
  employer: ["/employer/jobs", "/employer/applicants"],
  freelancer: ["/freelancer/jobs", "/freelancer/proposals"],
};

const protectedRoutes = Object.values(roleBasedRoutes).flat();

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Nếu route không được bảo vệ, cho phép truy cập
  if (!protectedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  if (!secret) {
    console.error("❌ AUTH_SECRET is missing!");
    throw new Error("Authentication secret is not configured");
  }

  const token = await getToken({ req: request, secret });

  if (!token) {
    const callbackUrl = encodeURIComponent(request.nextUrl.pathname);
    return NextResponse.redirect(
      new URL(`/login?redirect=${callbackUrl}`, request.url)
    );
  }

  const userRoles = token.role as string[]; // mảng role

  // Nếu user vào /seller nhưng không có role freelancer → redirect
  if (pathname.startsWith("/seller") && !userRoles.includes("freelancer")) {
    return NextResponse.redirect(new URL("/start-selling", request.url));
  }

  console.log("Token:", token);
  console.log("Pathname:", pathname);
  console.log("Role:", token?.role);
  console.log("key:", secret);

  // Kiểm tra xem user có quyền truy cập route hiện tại không
  const isAuthorized = userRoles.some((role) => {
    const allowedRoutes = roleBasedRoutes[role as "employer" | "freelancer"];
    return allowedRoutes?.some((route) => pathname.startsWith(route));
  });

  if (!isAuthorized) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
