import { Divider, Progress, Stack } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import AppContainer from "../../components/common/AppContainer";
import QuizBox from "../../components/pages/quiz/QuizBox";
import { IClientQuiz, IResponse } from "../../interfaces";
import QuizQuestion from "../../components/pages/quiz/QuizQuestion";
import QuizAnswers from "../../components/pages/quiz/QuizAnswers";
import QuizActionButtons from "../../components/pages/quiz/QuizActionButtons";
import { setCookie } from "cookies-next";
import { useAnswer } from "../../hooks";

interface Props {
  quizData: IClientQuiz;
}

const Question: NextPage<Props> = (props: Props) => {
  const { quizData } = props;
  const { quiz, totalQuiz } = quizData;
  const router = useRouter();
  const { selectedAnswer, handleClearAnswer, handleChangeAnswer } = useAnswer(
    quiz.question.id
  );

  const handleBack = () => {
    if (quiz.question.id === 0) return;
    router.push(`/quiz/${quiz.question.id - 1}`);
    handleClearAnswer();
  };

  const handleNext = () => {
    setCookie(`Q${quiz.question.id}`, selectedAnswer);
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
    <AppContainer>
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
  const { id } = ctx.query;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/quiz/${id}`);
  const quiz: IResponse<IClientQuiz> = await res.json();

  return {
    props: {
      quizData: quiz.data,
    },
  };
};

export default Question;
