import React from "react";

type QuestionProps = {
  question: string;
  answers: string[];
  callBack: any;
  currentAnswer: string;
  questionNumber: number;
  totalQuestions: number;
};

const QuestionCard: React.FC<QuestionProps> = ({
  question,
  answers,
  callBack,
  currentAnswer,
  questionNumber,
  totalQuestions,
}) => {
  return (
    <div className="QuestionCard">
      <div className="questionNum">
        Question: {questionNumber}/{totalQuestions}
      </div>
      <div
        className="questionStatement"
        dangerouslySetInnerHTML={{ __html: question }}
      />
      <div>
        {answers.map((answer) => (
          <div key={answer} className="choiceBtn">
            <button
              value={answer}
              onClick={callBack}
              className={answer === currentAnswer ? "checkedAnswer" : ""}
            >
              <span dangerouslySetInnerHTML={{ __html: answer }}></span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
