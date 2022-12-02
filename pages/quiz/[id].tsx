import {
  Box,
  Divider,
  HStack,
  Progress,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import { getCookie } from "cookies-next";
import { GetServerSideProps } from "next";
import React from "react";
import AppContainer from "../../components/common/AppContainer";
import AppText from "../../components/common/AppText";
import QuizButton from "../../components/common/QuizButton";
import QuizBox from "../../components/pages/quiz/QuizBox";
import { COOKIE_KEY } from "../../constants";
import { IUser } from "../../interfaces";
import { redirectHome } from "../../utils/redirectHome";

const Question = () => {
  return (
    <AppContainer>
      <Stack width="full">
        <Progress value={50} colorScheme="brand" />
        <QuizBox stackSpacing="4">
          <AppText as="div" fontSize="sm">
            <Box as="span" fontWeight="bold">
              {"Q3:"}
            </Box>
            {"A car engine job is to"}
          </AppText>
          <Divider />
          <RadioGroup>
            <Stack>
              <Radio value="1">convert fuel into heat</Radio>
              <Radio value="2">convert fuel into heat</Radio>
              <Radio value="3">convert fuel into heat</Radio>
              <Radio value="4">convert fuel into heat</Radio>
            </Stack>
          </RadioGroup>
          <Divider />
          <HStack justifyContent="flex-end">
            <QuizButton variant="outline">Back</QuizButton>
            <QuizButton>Next</QuizButton>
          </HStack>
        </QuizBox>
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
    props: {},
  };
};

export default Question;
