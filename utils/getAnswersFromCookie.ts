import { getCookie } from "cookies-next";
import { GetServerSidePropsContext } from "next";
import { COOKIE_KEY } from "../constants";

export const getAnswersFromCookies = (ctx?: GetServerSidePropsContext) => {
  const cookieAnswers = getCookie(COOKIE_KEY.ANSWERS, ctx);
  const answers: string[] = JSON.parse(cookieAnswers?.toString() || "[]");
  return answers;
};
