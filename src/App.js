import React, { useState, useEffect } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import QuestionQuiz from './Component/QuestionQuiz';
import CounterQuiz from './Component/CounterQuiz';
import AnswerQuiz from './Component/AnswerQuiz';
import quizQuestions from './api/Questions';
import logo from './logo.svg';
import './App.css';

const App = () => {
  const [total, settotal] = useState()
  const [Result, setResult] = useState('')
  const [Answer, setAnswer] = useState('')
  const [Counter, setCounter] = useState(0)
  const [Question, setQuestion] = useState('')
  const [QuestionId, setQuestionId] = useState(1)
  const [AnswerCounter, setAnswerCounter] = useState({})

  useEffect(() => {
    // setAnswer(quizQuestions[Counter].answers)
    settotal(quizQuestions.length)
    setQuestion(quizQuestions[Counter].question)
  }, [])

  const handleAnswerSelect = (e) => {
    setUserAnswer(e.currentTarget.value);
    if (QuestionId < quizQuestions.length) {
      setTimeout(() => nexQuestion(), 300)
    } else {
      setTimeout(() => setResults(getResult()), 300)
    }
  }

  const setUserAnswer = (answer) => {
    if (!AnswerCounter[answer]) {
      AnswerCounter[answer] = 1
    } else {
      AnswerCounter[answer] = AnswerCounter[answer] + 1
    }
  }

  const nexQuestion = () => {
    const counter = Counter + 1;
    const questionId = QuestionId + 1;

    setCounter(counter)
    setQuestionId(questionId)
    setQuestion(quizQuestions[counter].question)
    setAnswer('')
  }

  const getResult = () => {
    const answersCount = AnswerCounter
    const answersCountKeys = Object.keys(answersCount)
    const answersCountValues = answersCountKeys.map(key => answersCount[key]);
    const maxAnswerCount = Math.max.apply(null, answersCountValues);
    return answersCountKeys.filter(key => answersCount[key] === maxAnswerCount);
  }

  const setResults = (result) => {
    if (result.length === 1) {
      setResult(result[0])
      // console.log(result[0]);
    } else {
      setResult('Undetermined')
      // console.log('Undetermined');
    }
  }


  const renderQuestion = () => {
    return (
      <div className="test">
        <TransitionGroup>
            <CounterQuiz questionId={QuestionId} total={total} />
            <QuestionQuiz question={Question} />
            <AnswerQuiz counter={Counter} answer={Answer} handleAnswerSelect={handleAnswerSelect} />
        </TransitionGroup>
      </div>
    )
  }

  const renderResult = () => {
    return (
      <div>you prefer {Result}!</div>
    )
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Mirza Quiz</p>
      </header>
      <div className="q-body">
        {Result ? renderResult() : renderQuestion()}
      </div>
    </div>
  );
}

export default App;
