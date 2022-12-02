import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import { getAnswersFromCookies } from "../utils";

export const useAnswer = (questionId: number) => {
  const router = useRouter();
  const [selectedAnswer, setSelectedAnswer] = useState("");

  useEffect(() => {
    const answers = getAnswersFromCookies();
    const answer = answers[questionId];

    if (!answer) return;
    setSelectedAnswer(answer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath]);

  const handleChangeAnswer = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSelectedAnswer(e.target.value);
  };

  const handleClearAnswer = () => setSelectedAnswer("");

  return { selectedAnswer, handleClearAnswer, handleChangeAnswer };
};
