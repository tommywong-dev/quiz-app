import { Divider, Progress, Stack, useToast } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useMemo } from "react";
import AppContainer from "../../components/common/AppContainer";
import QuizBox from "../../components/pages/quiz/QuizBox";
import { IClientQuiz, IResponse } from "../../interfaces";
import QuizQuestion from "../../components/pages/quiz/QuizQuestion";
import QuizAnswers from "../../components/pages/quiz/QuizAnswers";
import QuizActionButtons from "../../components/pages/quiz/QuizActionButtons";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { useAnswer, useTranslations } from "../../hooks";
import { COOKIE_KEY } from "../../constants";
import { getAnswersFromCookies } from "../../utils";

interface Props {
  quizData: IClientQuiz;
}

const Question: NextPage<Props> = (props: Props) => {
  const { quizData } = props;
  const { quiz, totalQuiz } = quizData;
  const router = useRouter();
  const toast = useToast();
  const t = useTranslations();
  const { selectedAnswer, handleClearAnswer, handleChangeAnswer } = useAnswer(
    quiz.question.id
  );

  useEffect(() => {
    const error = getCookie(COOKIE_KEY.ERROR)?.toString();
    if (error) {
      toast({
        title: t.error.forbidden,
        description: error,
        status: "error",
        duration: 5000,
        isClosable: true,
        onCloseComplete: () => {
          deleteCookie(COOKIE_KEY.ERROR);
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBack = () => {
    if (quiz.question.id === 0) return;
    router.push(`/quiz/${quiz.question.id - 1}`);
    handleClearAnswer();
  };

  const handleNext = () => {
    const newAnswers = [...getAnswersFromCookies()];
    newAnswers[quiz.question.id] = selectedAnswer;
    setCookie(COOKIE_KEY.ANSWERS, newAnswers);
    handleClearAnswer();

    if (quiz.question.id >= totalQuiz - 1) {
      return router.push("/quiz/result");
    }
    router.push(`/quiz/${quiz.question.id + 1}`);
  };

  const calculateProgress = useMemo(
    () => (quiz.question.id / totalQuiz) * 100,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [quiz.question.id]
  );

  return (
    <AppContainer isQuizPage>
      <Stack width="full">
        <Progress value={calculateProgress} colorScheme="brand" />
        <QuizBox spacing="4">
          <QuizQuestion question={quiz.question} />
          <Divider />
          <QuizAnswers
            quiz={quiz}
            handleChange={handleChangeAnswer}
            selectedAnswer={selectedAnswer}
          />
          <Divider />
          <QuizActionButtons
            isNotFirst={quiz.question.id !== 0}
            handleBack={handleBack}
            handleNext={handleNext}
            disabled={!Boolean(selectedAnswer)}
          />
        </QuizBox>
      </Stack>
    </AppContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id: reqId } = ctx.query;

  if (!reqId || typeof reqId !== "string") {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }

  //! guard invalid id requests
  const answers = getAnswersFromCookies(ctx);
  const id = parseInt(reqId, 10);
  if (isNaN(id) || id > answers.length) {
    setCookie(COOKIE_KEY.ERROR, "Don't try to cheat ya 😉", ctx);
    return {
      redirect: {
        destination: `/quiz/${answers.length}`,
        permanent: false,
        message: "",
      },
    };
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/quiz/${id}`);
  const quiz: IResponse<IClientQuiz> = await res.json();

  return {
    props: {
      quizData: quiz.data,
    },
  };
};

export default Question;
