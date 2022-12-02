import { CircularProgress, HStack } from "@chakra-ui/react";
import React from "react";
import { usePageLoading, useTranslations } from "../../../hooks";
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
  const loading = usePageLoading();

  return (
    <HStack justifyContent="flex-end">
      {isNotFirst ? (
        <QuizButton variant="outline" disabled={loading} onClick={handleBack}>
          {t.quiz.question.back}
        </QuizButton>
      ) : null}

      <QuizButton onClick={handleNext} disabled={disabled || loading}>
        {loading ? (
          <CircularProgress isIndeterminate size="16px" color="white" mr="4" />
        ) : null}
        {t.quiz.question.next}
      </QuizButton>
    </HStack>
  );
};

export default QuizActionButtons;
