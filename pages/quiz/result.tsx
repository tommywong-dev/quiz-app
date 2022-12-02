import { Divider, HStack, Progress, Stack, Text } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import React from "react";
import AppContainer from "../../components/common/AppContainer";
import QuizBox from "../../components/pages/quiz/QuizBox";
import QuizButton from "../../components/pages/quiz/QuizButton";
import { useTranslations } from "../../hooks";
import { useWindowSize } from "../../hooks/useWindowSize";
import Confetti from "react-confetti";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/router";

interface Props {
  passed: boolean;
  totalQuiz: number;
}
const QuizResult = (props: Props) => {
  const { passed, totalQuiz } = props;
  const t = useTranslations();
  const { width, height } = useWindowSize();
  const router = useRouter();

  const status = passed ? "passed" : "failed";

  const handleRestart = () => {
    [...Array(totalQuiz)].map((_, index) => {
      deleteCookie(`Q${index}`);
    });
    router.push("/quiz");
  };

  return (
    <AppContainer>
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
        <QuizBox spacing="4">
          <Text fontSize="xl" fontWeight="bold" fontFamily="Gotham-Bold">
            {t.quiz.result[status].title}
          </Text>
          <Text fontSize="sm">{t.quiz.result[status].message}</Text>
          <Divider />
          <HStack justifyContent="flex-end">
            <QuizButton onClick={handleRestart}>
              {t.quiz.result.restart}
            </QuizButton>
          </HStack>
        </QuizBox>
      </Stack>
    </AppContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      passed: true,
      totalQuiz: 5,
    },
  };
};

export default QuizResult;
