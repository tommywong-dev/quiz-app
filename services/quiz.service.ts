import { NextApiResponse } from "next";
import { PASS_SCORE } from "../constants";
import { IClientQuiz } from "../interfaces";
import { mockQuizzes } from "../mocks";
import { makeResponse } from "../utils";
import { throwBadRequest } from "./error.service";

export const getQuiz = (
  reqId: string | string[] | undefined,
  res: NextApiResponse
) => {
  if (reqId === undefined) {
    return throwBadRequest(res);
  }

  const id = parseInt(Array.isArray(reqId) ? reqId[0] : reqId, 10);
  const totalQuiz = mockQuizzes.length;
  if (id >= mockQuizzes.length) {
    return throwBadRequest(res);
  }

  const quiz = { ...mockQuizzes[id] };
  delete quiz.correctAnswer;

  res.status(200).json(makeResponse<IClientQuiz>(200, "", { totalQuiz, quiz }));
};

export const calculateResult = (answers: string[], res: NextApiResponse) => {
  if (answers.length !== mockQuizzes.length) {
    return throwBadRequest(res);
  }

  const totalQuiz = mockQuizzes.length;
  const corrects = answers.reduce((prev, curr, index) => {
    if (mockQuizzes[index].correctAnswer === curr) {
      return prev + 1;
    }
    return prev;
  }, 0);

  const passed = corrects / totalQuiz > PASS_SCORE;
  res.status(201).json(makeResponse(200, "", { passed, totalQuiz }));
};
