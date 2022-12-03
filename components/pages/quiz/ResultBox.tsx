import { Divider, HStack, Text } from "@chakra-ui/react";
import React from "react";
import { useTranslations } from "../../../hooks";
import QuizBox from "./QuizBox";
import QuizButton from "./QuizButton";

interface Props {
  status: "passed" | "failed";
  handleRestart: () => void;
}
const ResultBox = (props: Props) => {
  const { status, handleRestart } = props;
  const t = useTranslations();

  return (
    <QuizBox spacing="4">
      <Text
        id="result-title"
        fontSize="xl"
        fontWeight="bold"
        fontFamily="Gotham-Bold"
      >
        {t.quiz.result[status].title}
      </Text>
      <Text fontSize="sm">{t.quiz.result[status].message}</Text>
      <Divider />
      <HStack justifyContent="flex-end">
        <QuizButton id="restart-btn" onClick={handleRestart}>
          {t.quiz.result.restart}
        </QuizButton>
      </HStack>
    </QuizBox>
  );
};

export default ResultBox;
