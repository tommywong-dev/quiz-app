import { Button, Heading, Stack } from "@chakra-ui/react";
import { getCookie } from "cookies-next";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import AppContainer from "../../components/common/AppContainer";
import AppText from "../../components/common/AppText";
import { COOKIE_KEY } from "../../constants";
import { IUser } from "../../interfaces";

const Quiz: NextPage<{ user: IUser }> = (props) => {
  const { user } = props;
  const router = useRouter();

  const handleStart = () => {
    router.push("/quiz/1");
  };

  return (
    <AppContainer>
      <Stack>
        <Heading>Welcome {user.name}!</Heading>
        <AppText>You are about to start the quiz</AppText>
        <AppText>Click the button below whenever you are ready</AppText>
        <Button colorScheme="brand" onClick={handleStart}>
          Start
        </Button>
      </Stack>
    </AppContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookieUser = getCookie(COOKIE_KEY.USER, ctx);
  if (!cookieUser) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }

  const user: IUser = JSON.parse(cookieUser.toString());

  if (!user.name || !user.email) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }

  return {
    props: {
      user,
    },
  };
};

export default Quiz;
