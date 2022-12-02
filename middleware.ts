import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { COOKIE_KEY } from "./constants";
import { IUser } from "./interfaces";

export function middleware(request: NextRequest) {
  const cookieUser = request.cookies.get(COOKIE_KEY.USER)?.value;
  if (!request.cookies.has(COOKIE_KEY.USER) || !cookieUser) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const user: IUser = JSON.parse(cookieUser.toString());

  if (!user.name || !user.email) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: "/quiz/:id*",
};
