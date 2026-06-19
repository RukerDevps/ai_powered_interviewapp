import { NextResponse, type NextRequest } from "next/server";
import { validateActiveSession } from "@/lib/session";

const protectedRoutes = [
  "/dashboard",
  "/interview",
  "/history",
  "/analytics",
  "/resources",
  "/settings",
];

const authRoutes = ["/login", "/register"];

async function getSessionFromRequest(request: NextRequest) {
  const url = new URL("/api/auth/get-session", request.url);
  const response = await fetch(url, {
    headers: {
      cookie: request.headers.get("cookie") ?? "",
    },
  });

  if (!response.ok) {
    return null;
  }

  return response.json() as Promise<{
    session?: {
      id: string;
      userId: string;
      expiresAt: string;
      token?: string | null;
    } | null;
    user?: { id: string; email: string; name?: string | null } | null;
  } | null>;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
  const isAuthRoute = authRoutes.some((route) => pathname === route);

  if (!isProtectedRoute && !isAuthRoute) {
    return NextResponse.next();
  }

  const sessionPayload = await getSessionFromRequest(request);
  const isAuthenticated =
    !!sessionPayload?.session &&
    !!sessionPayload?.user &&
    (await validateActiveSession(sessionPayload));

  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthRoute && isAuthenticated) {
    const dashboardUrl = new URL("/dashboard", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  runtime: "nodejs",
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)",
  ],
};
