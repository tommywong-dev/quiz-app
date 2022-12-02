import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";

export const useAnswer = (questionId: number) => {
  const router = useRouter();
  const [selectedAnswer, setSelectedAnswer] = useState("");

  useEffect(() => {
    const cookie = getCookie(`Q${questionId}`);
    if (!cookie) return;
    setSelectedAnswer(cookie.toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath]);

  const handleChangeAnswer = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSelectedAnswer(e.target.value);
  };

  const handleClearAnswer = () => setSelectedAnswer("");

  return { selectedAnswer, handleClearAnswer, handleChangeAnswer };
};
