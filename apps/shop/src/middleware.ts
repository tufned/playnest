import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import routes from "~/constants/routes";

export function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get("refreshToken");

  if (!refreshToken) {
    if (request.nextUrl.pathname.startsWith(routes.dashboard)) {
      return NextResponse.redirect(new URL(routes.login, request.url));
    }
  } else {
    if (
      request.nextUrl.pathname.startsWith(routes.login) ||
      request.nextUrl.pathname.startsWith(routes.signup)
    ) {
      return NextResponse.redirect(new URL(routes.index, request.url));
    }
  }
}
