import { Stack } from "@chakra-ui/react";
import { deleteCookie } from "cookies-next";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import AppContainer from "../../components/common/AppContainer";
import EnterGameBox from "../../components/pages/quiz/EnterGameBox";
import WelcomeText from "../../components/pages/quiz/WelcomeText";
import { COOKIE_KEY } from "../../constants";
import { useTranslations } from "../../hooks";
import { IUser } from "../../interfaces";
import { useAlert } from "../../providers";
import { getUserFromCookie } from "../../utils";

const Quiz: NextPage<{ user: IUser }> = (props) => {
  const { user } = props;
  const router = useRouter();
  const { alert } = useAlert();
  const t = useTranslations();

  const handleAlertExit = () => {
    alert({
      header: t.header.exit.label,
      body: t.header.exit.message,
      onConfirm: () => {
        deleteCookie(COOKIE_KEY.ANSWERS);
        deleteCookie(COOKIE_KEY.USER);
        router.push("/");
      },
    });
  };

  const handleStart = async () => {
    router.push("/quiz/0");
  };

  return (
    <AppContainer isQuizPage>
      <Stack spacing="8" alignItems="center">
        <WelcomeText name={user.name} />
        <EnterGameBox handleExit={handleAlertExit} handleStart={handleStart} />
      </Stack>
    </AppContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const user = getUserFromCookie(ctx);

  return {
    props: {
      user,
    },
  };
};

export default Quiz;
