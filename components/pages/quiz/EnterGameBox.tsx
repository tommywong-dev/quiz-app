import { SimpleGrid, Stack } from "@chakra-ui/react";
import React from "react";
import { useTranslations } from "../../../hooks";
import AppText from "../../common/AppText";
import QuizButton from "./QuizButton";
import QuizBox from "./QuizBox";

interface Props {
  handleExit: () => void;
  handleStart: () => void;
}
const EnterGameBox = (props: Props) => {
  const { handleExit, handleStart } = props;
  const t = useTranslations();

  return (
    <QuizBox spacing="4">
      <AppText color="blackAlpha.800">{t.quiz.welcome.message}</AppText>
      <SimpleGrid columns={2} spacing="4">
        <QuizButton variant="outline" onClick={handleExit}>
          {t.quiz.welcome.exit}
        </QuizButton>
        <QuizButton onClick={handleStart}>{t.quiz.welcome.enter}</QuizButton>
      </SimpleGrid>
    </QuizBox>
  );
};

export default EnterGameBox;
