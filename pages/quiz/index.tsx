import { Box, Heading, SimpleGrid, Stack } from "@chakra-ui/react";
import { getCookie, removeCookies } from "cookies-next";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import AppContainer from "../../components/common/AppContainer";
import AppText from "../../components/common/AppText";
import QuizButton from "../../components/common/QuizButton";
import { COOKIE_KEY } from "../../constants";
import { useTranslations } from "../../hooks";
import { IUser } from "../../interfaces";
import { redirectHome } from "../../utils/redirectHome";

const Quiz: NextPage<{ user: IUser }> = (props) => {
  const { user } = props;
  const t = useTranslations();
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
        <Heading>
          {t.quiz.welcome.title} {user.name}!
        </Heading>
        <Box
          sx={{
            border: "1px solid",
            borderColor: "blackAlpha.300",
            padding: "1rem",
          }}
        >
          <Stack>
            <AppText color="blackAlpha.800">{t.quiz.welcome.message}</AppText>
            <SimpleGrid columns={2} spacing="4">
              <QuizButton variant="outline" onClick={handleExit}>
                {t.quiz.welcome.exit}
              </QuizButton>
              <QuizButton onClick={handleStart}>
                {t.quiz.welcome.enter}
              </QuizButton>
            </SimpleGrid>
          </Stack>
        </Box>
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
