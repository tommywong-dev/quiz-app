import { HStack } from "@chakra-ui/react";
import React from "react";
import { useTranslations } from "../../../hooks";
import QuizButton from "./QuizButton";

interface Props {
  isNotFirst: boolean;
  handleBack: () => void;
  handleNext: () => void;
  disabled: boolean;
}
const QuizActionButtons = (props: Props) => {
  const { isNotFirst, handleBack, handleNext, disabled } = props;
  const t = useTranslations();

  return (
    <HStack justifyContent="flex-end">
      {isNotFirst ? (
        <QuizButton variant="outline" onClick={handleBack}>
          {t.quiz.question.back}
        </QuizButton>
      ) : null}

      <QuizButton onClick={handleNext} disabled={disabled}>
        {t.quiz.question.next}
      </QuizButton>
    </HStack>
  );
};

export default QuizActionButtons;
