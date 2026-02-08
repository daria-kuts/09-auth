import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL + "/api";

export async function proxy(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const isAuthPage =
    request.nextUrl.pathname.startsWith("/sign-in") ||
    request.nextUrl.pathname.startsWith("/sign-up");

  const isPrivatePage =
    request.nextUrl.pathname.startsWith("/notes") ||
    request.nextUrl.pathname.startsWith("/profile");

  let isAuthenticated = !!accessToken;
  const response = NextResponse.next();

  if (!accessToken && refreshToken) {
    try {
      const apiResponse = await fetch(`${API_URL}/auth/session`, {
        method: "GET",
        headers: {
          Cookie: request.headers.get("cookie") ?? "",
        },
        credentials: "include",
      });

      if (apiResponse.ok) {
        isAuthenticated = true;

 
        const setCookie = apiResponse.headers.get("set-cookie");
        if (setCookie) {
          response.headers.set("set-cookie", setCookie);
        }
      } else {
        isAuthenticated = false;
      }
    } catch {
      isAuthenticated = false;
    }
  }

  if (!isAuthenticated && isPrivatePage) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (isAuthenticated && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/notes/:path*", "/profile/:path*", "/sign-in", "/sign-up"],
};
