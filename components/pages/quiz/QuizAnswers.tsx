import { Radio, RadioGroup, Stack } from "@chakra-ui/react";
import React, { ChangeEvent } from "react";
import { IClientQuiz } from "../../../interfaces";

interface Props {
  quiz: IClientQuiz["quiz"];
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  selected: string;
}
const QuizAnswers = (props: Props) => {
  const { quiz, handleChange, selected } = props;

  return (
    <RadioGroup name={`Q${quiz.question.id}`} value={selected}>
      <Stack>
        {quiz.answers.map((answer) => (
          <Radio
            value={answer.value}
            key={answer.value}
            onChange={handleChange}
            checked={selected === answer.value}
          >
            {answer.label}
          </Radio>
        ))}
      </Stack>
    </RadioGroup>
  );
};

export default QuizAnswers;
