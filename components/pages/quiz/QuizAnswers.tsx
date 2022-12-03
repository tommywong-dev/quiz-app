import { Radio, RadioGroup, Stack } from "@chakra-ui/react";
import React, { ChangeEvent } from "react";
import { usePageLoading } from "../../../hooks";
import { IClientQuiz } from "../../../interfaces";

interface Props {
  quiz: IClientQuiz["quiz"];
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  selectedAnswer: string;
}
const QuizAnswers = (props: Props) => {
  const { quiz, handleChange, selectedAnswer } = props;
  const loading = usePageLoading();

  return (
    <RadioGroup
      name={`Q${quiz.question.id}`}
      value={selectedAnswer}
      isDisabled={loading}
    >
      <Stack>
        {quiz.answers.map((answer) => (
          <Radio
            aria-label={`answer-${answer.value}`}
            value={answer.value}
            key={answer.value}
            onChange={handleChange}
            checked={selectedAnswer === answer.value}
          >
            {answer.label}
          </Radio>
        ))}
      </Stack>
    </RadioGroup>
  );
};

export default QuizAnswers;
