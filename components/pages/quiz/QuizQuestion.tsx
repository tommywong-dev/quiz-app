import { Box } from "@chakra-ui/react";
import React from "react";
import { IClientQuiz } from "../../../interfaces";
import AppText from "../../common/AppText";

interface Props {
  question: IClientQuiz["quiz"]["question"];
}
const QuizQuestion = (props: Props) => {
  const { question } = props;

  return (
    <AppText as="div" fontSize="sm">
      <Box as="span" fontWeight="bold">
        {`Q${question.id + 1}: `}
      </Box>
      {question.title}
    </AppText>
  );
};

export default QuizQuestion;
