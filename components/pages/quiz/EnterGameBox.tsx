import { SimpleGrid } from "@chakra-ui/react";
import React from "react";
import { usePageLoading, useTranslations } from "../../../hooks";
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
  const loading = usePageLoading();

  return (
    <QuizBox spacing="4">
      <AppText>{t.quiz.welcome.message}</AppText>
      <SimpleGrid columns={2} spacing="4">
        <QuizButton
          id="exit-btn"
          variant="outline"
          onClick={handleExit}
          disabled={loading}
        >
          {t.quiz.welcome.exit}
        </QuizButton>
        <QuizButton id="enter-btn" onClick={handleStart} disabled={loading}>
          {t.quiz.welcome.enter}
        </QuizButton>
      </SimpleGrid>
    </QuizBox>
  );
};

export default EnterGameBox;
