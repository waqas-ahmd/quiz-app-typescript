import React, { useState } from "react";
import "./App.css";
import QuestionCard from "./components/QuestionCard";
import { fetchQuestions, QuestionState } from "./API";

const totalNum = 10;
const difficulties = ["easy", "medium", "hard"];

function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [ended, setEnded] = useState(false);
  const [difficulty, setDifficulty] = useState("easy");
  const [again, setAgain] = useState(false);

  const startQuiz = async () => {
    setEnded(false);
    setScore(0);
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuestions(totalNum, difficulty);
    setQuestions(newQuestions);
    setNumber(0);
    setLoading(false);
    setAgain(true);
  };
  const nextQuestion = () => {
    const nextQuestion = number + 1;
    const correct = currentAnswer === questions[number].correct_answer;
    if (correct) setScore(score + 1);
    if (nextQuestion === totalNum) {
      setGameOver(true);
      setEnded(true);
    } else setNumber(nextQuestion);
    setCurrentAnswer("");
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    setCurrentAnswer(e.currentTarget.value);
  };
  return (
    <div className="App">
      <div className="QuizCard">
        <div className="bgImage">
          <img alt="background" src="https://i.imgur.com/B0Oe4nB.png" />
        </div>

        <div className="QuizTitle">Quiz App</div>

        {ended && (
          <div className="EndBox">
            <div>YOU SCORED</div>
            <div className="Score">
              {score} / {totalNum}
            </div>
          </div>
        )}

        {gameOver && (
          <div className="StartBox">
            <div className="diffSelection">
              <label htmlFor="difficulty">Difficulty:</label>

              <select
                onChange={(e) => setDifficulty(e.target.value)}
                name="difficulty"
                id="difficulty"
                defaultValue={difficulty}
              >
                {difficulties.map((level) => (
                  <option key={level} value={level}>
                    {level.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <button className="startBtn" onClick={startQuiz}>
                Start {again && "Again"}
              </button>
            </div>
          </div>
        )}

        {!gameOver && !loading && <div className="Score">Score: {score}</div>}

        {loading && <div className="loading">Loading Quiz.. </div>}

        {!loading && !gameOver && (
          <div className="QuestionBox">
            <QuestionCard
              currentAnswer={currentAnswer}
              question={questions[number].question}
              answers={questions[number].answers}
              callBack={checkAnswer}
              questionNumber={number + 1}
              totalQuestions={totalNum}
            />
          </div>
        )}

        {!gameOver && !loading && number !== totalNum && currentAnswer !== "" && (
          <button className="nextBtn" onClick={nextQuestion}>
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
