import { Stack } from "@chakra-ui/react";
import { getCookie, removeCookies } from "cookies-next";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import AppContainer from "../../components/common/AppContainer";
import EnterGameBox from "../../components/pages/quiz/EnterGameBox";
import WelcomeText from "../../components/pages/quiz/WelcomeText";
import { COOKIE_KEY } from "../../constants";
import { IUser } from "../../interfaces";
import { redirectHome } from "../../utils/redirectHome";

const Quiz: NextPage<{ user: IUser }> = (props) => {
  const { user } = props;
  const router = useRouter();

  const handleExit = () => {
    router.push("/");
    removeCookies(COOKIE_KEY.USER);
  };

  const handleStart = () => {
    router.push("/quiz/1");
  };

  return (
    <AppContainer>
      <Stack spacing="8" alignItems="center">
        <WelcomeText name={user.name} />
        <EnterGameBox handleExit={handleExit} handleStart={handleStart} />
      </Stack>
    </AppContainer>
  );
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
    props: {
      user,
    },
  };
};

export default Quiz;
