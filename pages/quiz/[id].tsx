import { Divider, Progress, Stack } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import AppContainer from "../../components/common/AppContainer";
import QuizBox from "../../components/pages/quiz/QuizBox";
import { IClientQuiz, IResponse } from "../../interfaces";
import QuizQuestion from "../../components/pages/quiz/QuizQuestion";
import QuizAnswers from "../../components/pages/quiz/QuizAnswers";
import QuizActionButtons from "../../components/pages/quiz/QuizActionButtons";
import { getCookie, setCookie } from "cookies-next";

interface Props {
  quizData: IClientQuiz;
}

const Question: NextPage<Props> = (props: Props) => {
  const { quizData } = props;
  const { quiz, totalQuiz } = quizData;
  const router = useRouter();

  // answer handlers
  const [selected, setSelected] = useState("");

  useEffect(() => {
    const cookie = getCookie(`Q${quiz.question.id}`);
    if (!cookie) return;
    setSelected(cookie.toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSelected((selected) =>
      selected === e.target.value ? "" : e.target.value
    );
  };

  const handleBack = () => {
    if (quiz.question.id === 0) return;
    router.push(`/quiz/${quiz.question.id - 1}`);
  };

  const handleNext = () => {
    if (quiz.question.id >= totalQuiz - 1) return;
    router.push(`/quiz/${quiz.question.id + 1}`);
    setCookie(`Q${quiz.question.id}`, selected);
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
            handleChange={handleChange}
            selected={selected}
          />
          <Divider />
          <QuizActionButtons
            isNotFirst={quiz.question.id !== 0}
            handleBack={handleBack}
            handleNext={handleNext}
            disabled={!Boolean(selected)}
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
