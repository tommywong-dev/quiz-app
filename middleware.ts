import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { COOKIE_KEY } from "./constants";
import { IUser } from "./interfaces";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    const cookieUser = request.cookies.get(COOKIE_KEY.USER)?.value;
    if (cookieUser) {
      return NextResponse.redirect(new URL("/quiz", request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith("/quiz")) {
    const cookieUser = request.cookies.get(COOKIE_KEY.USER)?.value;

    if (!cookieUser) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    const user: IUser = JSON.parse(cookieUser.toString());

    if (!user.name || !user.email) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}

export const config = {
  matcher: ["/", "/quiz/:id*"],
};
