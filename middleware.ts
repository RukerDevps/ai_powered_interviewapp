import { NextResponse, type NextRequest } from "next/server";

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
    session?: { id: string; userId: string; expiresAt: string } | null;
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

  const session = await getSessionFromRequest(request);
  const isAuthenticated = !!session?.session && !!session?.user;

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
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)",
  ],
};
