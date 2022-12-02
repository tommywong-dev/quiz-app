export interface IQuiz {
  question: {
    id: number;
    title: string;
  };
  answers: [IAnswer, IAnswer, IAnswer, IAnswer];
  correctAnswer?: string;
}

export interface IClientQuiz {
  totalQuiz: number;
  quiz: Omit<IQuiz, "correctAnswer">;
}

export interface IAnswer {
  value: string;
  label: string;
}
