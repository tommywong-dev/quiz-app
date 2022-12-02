import { IQuiz } from "../interfaces";

export const mockQuizzes: IQuiz[] = [
  {
    question: {
      id: 1,
      title: "The largest ocean in the world is",
    },
    answers: [
      {
        value: "1",
        label: "Pacific Ocean",
      },
      {
        value: "2",
        label: "Atlantic Ocean",
      },
      {
        value: "3",
        label: "Indian Ocean",
      },
      {
        value: "4",
        label: "Arctic Ocean",
      },
    ],
    correctAnswer: "1",
  },
  {
    question: {
      id: 2,
      title: "The smallest country in the world is",
    },
    answers: [
      {
        value: "1",
        label: "Singapore",
      },
      {
        value: "2",
        label: "Monaco",
      },
      {
        value: "3",
        label: "Vatican City",
      },
      {
        value: "4",
        label: "Sri Lanka",
      },
    ],
    correctAnswer: "3",
  },
  {
    question: {
      id: 3,
      title: "The largest continent in the world is",
    },
    answers: [
      {
        value: "1",
        label: "Africa",
      },
      {
        value: "2",
        label: "Asia",
      },
      {
        value: "3",
        label: "North America",
      },
      {
        value: "4",
        label: "Antarctica",
      },
    ],
    correctAnswer: "2",
  },
  {
    question: {
      id: 4,
      title: "The country with the largest population is",
    },
    answers: [
      {
        value: "1",
        label: "India",
      },
      {
        value: "2",
        label: "United States of America",
      },
      {
        value: "3",
        label: "Indonesia",
      },
      {
        value: "4",
        label: "China",
      },
    ],
    correctAnswer: "4",
  },
  {
    question: {
      id: 5,
      title: "The river that is not crossed by any bridge is",
    },
    answers: [
      {
        value: "1",
        label: "Nile",
      },
      {
        value: "2",
        label: "Amazon River",
      },
      {
        value: "3",
        label: "Yangtze River",
      },
      {
        value: "4",
        label: "Mississippi River",
      },
    ],
    correctAnswer: "2",
  },
];
