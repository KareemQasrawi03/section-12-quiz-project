import React, { useCallback, useState } from "react";
import QUESTIONS from "../questions";
import quizCompleteImg from "../assets/quiz-complete.png"
import QuestionTimer from "./QuestionTimer";

function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex = userAnswers.length;
  const quizIsCompolete = activeQuestionIndex == QUESTIONS.length

  const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
    console.log(selectedAnswer);
    setUserAnswers((prevUserAnswers) => {
      return [...prevUserAnswers, selectedAnswer];
    });
  },[])

  const handleSkipAnswer = useCallback(() => {
    handleSelectAnswer(null);
  },[handleSelectAnswer]);

  if (quizIsCompolete){
    return <div id="summary">
        <img src={quizCompleteImg} alt="Complete Imge"/>
        <h2>Quiz Completed!</h2>
    </div>
  }
    const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
    shuffledAnswers.sort((a, b) => Math.random() - 0.5);
    return (
      <div id="quiz">
        <div id="question">
        <QuestionTimer timeout={10000} onTimeout={handleSkipAnswer}/>
          <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
          <ul id="answers">
            {shuffledAnswers.map((answer) => (
              <li key={answer} className="answer">
                <button onClick={() => handleSelectAnswer(answer)}>
                  {answer}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
}

export default Quiz;
