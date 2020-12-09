import { shuffleArray } from "./utilities";

export const fetchQuestions = async (amount: number, difficuty: string) => {
  const response = await fetch(
    `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficuty}&type=multiple`
  );
  const data = await response.json();
  return data.results.map((question: Question) => ({
    ...question,
    answers: shuffleArray([
      ...question.incorrect_answers,
      question.correct_answer,
    ]),
  }));
};

export type Question = {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  difficulty: string;
  type: string;
  category: string;
};

export type QuestionState = Question & { answers: string[] };
