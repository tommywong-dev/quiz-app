import { Progress, Stack } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import React, { useEffect } from "react";
import AppContainer from "../../components/common/AppContainer";
import { useError, useTranslations } from "../../hooks";
import { useWindowSize } from "../../hooks";
import Confetti from "react-confetti";
import { deleteCookie, setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { IResponse, IResult } from "../../interfaces";
import { COOKIE_KEY, TROLL_MESSAGE } from "../../constants";
import { getAnswersFromCookies, redirectQuiz } from "../../utils";
import ResultBox from "../../components/pages/quiz/ResultBox";

interface Props {
  resultData: IResult;
}
const QuizResult = (props: Props) => {
  const { resultData } = props;
  const { passed } = resultData;
  const t = useTranslations();
  const { width, height } = useWindowSize();
  const router = useRouter();
  const checkError = useError();

  useEffect(() => {
    checkError();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRestart = () => {
    deleteCookie(COOKIE_KEY.ANSWERS);
    router.push("/quiz");
  };

  const status = passed ? "passed" : "failed";

  return (
    <AppContainer isQuizPage>
      <Confetti
        width={width}
        height={height}
        gravity={0.3}
        numberOfPieces={500}
        recycle={false}
        run={passed}
      />
      <Stack width="full">
        <Progress value={100} colorScheme="brand" />
        <ResultBox status={status} handleRestart={handleRestart} />
      </Stack>
    </AppContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const answers = getAnswersFromCookies(ctx);

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/quiz/result`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ answers }),
    });

    if (res.status !== 201) {
      setCookie(COOKIE_KEY.ERROR, TROLL_MESSAGE.NOT_FINISH, ctx);
      return redirectQuiz(answers.length);
    }
    const result: IResponse<IResult> = await res.json();
    const resultData = result.data;

    return {
      props: {
        resultData,
      },
    };
  } catch (e) {
    setCookie(COOKIE_KEY.ERROR, TROLL_MESSAGE.BRUH, ctx);
    return redirectQuiz(answers.length);
  }
};

export default QuizResult;
