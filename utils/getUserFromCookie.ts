import { getCookie } from "cookies-next";
import { GetServerSidePropsContext } from "next";
import { COOKIE_KEY } from "../constants";
import { IUser } from "../interfaces";
import { redirectHome } from "./redirect";

export const getUserFromCookie = (ctx: GetServerSidePropsContext) => {
  const cookieUser = getCookie(COOKIE_KEY.USER, ctx);
  if (!cookieUser) {
    return redirectHome();
  }

  const user: IUser = JSON.parse(cookieUser.toString());

  return user;
};
