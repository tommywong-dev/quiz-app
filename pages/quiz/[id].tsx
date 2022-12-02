import {
  Box,
  Divider,
  HStack,
  Progress,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import React, {
  ChangeEvent,
  ReactElement,
  ReactEventHandler,
  useMemo,
  useState,
} from "react";
import AppContainer from "../../components/common/AppContainer";
import AppText from "../../components/common/AppText";
import QuizButton from "../../components/common/QuizButton";
import QuizBox from "../../components/pages/quiz/QuizBox";
import { useTranslations } from "../../hooks";
import { IClientQuiz, IResponse, IUser } from "../../interfaces";
import { getUserFromCookie } from "../../utils";

interface Props {
  user: IUser;
  quizData: IClientQuiz;
}

const Question: NextPage<Props> = (props: Props) => {
  const { user, quizData } = props;
  const { quiz, totalQuiz } = quizData;
  const t = useTranslations();
  const router = useRouter();

  const [selected, setSelected] = useState("");
  const handleSelect = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSelected((selected) =>
      selected === e.target.value ? "" : e.target.value
    );
  };

  const handleBack = () => {
    if (quiz.question.id === 0) return;
    router.push(`/quiz/${quiz.question.id - 1}`);
    setSelected("");
  };

  const handleNext = () => {
    if (quiz.question.id >= totalQuiz - 1) return;
    router.push(`/quiz/${quiz.question.id + 1}`);
    setSelected("");
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
          <AppText as="div" fontSize="sm">
            <Box as="span" fontWeight="bold">
              {`Q${quiz.question.id + 1}: `}
            </Box>
            {quiz.question.title}
          </AppText>
          <Divider />
          <RadioGroup>
            <Stack>
              {quiz.answers.map((answer) => (
                <Radio
                  value={answer.value}
                  key={answer.value}
                  onChange={handleSelect}
                  checked={selected === answer.value}
                >
                  {answer.label}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
          <Divider />
          <HStack justifyContent="flex-end">
            {quiz.question.id !== 0 ? (
              <QuizButton variant="outline" onClick={handleBack}>
                {t.quiz.question.back}
              </QuizButton>
            ) : null}

            <QuizButton onClick={handleNext} disabled={!selected}>
              {t.quiz.question.next}
            </QuizButton>
          </HStack>
        </QuizBox>
      </Stack>
    </AppContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const user = getUserFromCookie(ctx);

  const { id } = ctx.query;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/quiz/${id}`);
  const quiz: IResponse<IClientQuiz> = await res.json();

  return {
    props: {
      user,
      quizData: quiz.data,
    },
  };
};

export default Question;
