import { getCookie } from "cookies-next";
import { GetServerSideProps } from "next";
import React from "react";
import { COOKIE_KEY } from "../../constants";
import { IUser } from "../../interfaces";
import { redirectHome } from "../../utils/redirectHome";

const Question = () => {
  return <div>Question</div>;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookieUser = getCookie(COOKIE_KEY.USER, ctx);
  if (!cookieUser) {
    return redirectHome();
  }

  const user: IUser = JSON.parse(cookieUser.toString());

  if (!user.name || !user.email) {
    return redirectHome();
  }

  return {
    props: {},
  };
};

export default Question;
