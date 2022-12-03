import { CircularProgress, HStack, useMediaQuery } from "@chakra-ui/react";
import React from "react";
import { usePageLoading, useTranslations } from "../../../hooks";
import AppLoading from "../../common/AppLoading";
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
  const [isLargerThan350] = useMediaQuery("(min-width: 350px)", {
    ssr: true,
    fallback: false,
  });

  return (
    <HStack justifyContent="flex-end">
      {loading && isLargerThan350 ? <AppLoading /> : null}

      {isNotFirst ? (
        <QuizButton
          id="back-btn"
          variant="outline"
          disabled={loading}
          onClick={handleBack}
        >
          {t.quiz.question.back}
        </QuizButton>
      ) : null}

      <QuizButton
        id="next-btn"
        onClick={handleNext}
        disabled={disabled || loading}
      >
        {t.quiz.question.next}
      </QuizButton>
    </HStack>
  );
};

export default QuizActionButtons;
