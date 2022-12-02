import { getCookie } from "cookies-next";
import { COOKIE_KEY } from "../constants";

export const getAnswersFromCookies = () => {
  const cookieAnswers = getCookie(COOKIE_KEY.ANSWERS);
  const answers: string[] = JSON.parse(cookieAnswers?.toString() || "[]");
  return answers;
};
