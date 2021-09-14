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
  const [Counter, setCounter] = useState(JSON.parse(localStorage.getItem('Counter')))
  const [Question, setQuestion] = useState('')
  const [QuestionId, setQuestionId] = useState(JSON.parse(localStorage.getItem('QuestionId')))
  const [AnswerCounter, setAnswerCounter] = useState(JSON.parse(localStorage.getItem('AnswerCounter')))

  if (localStorage.getItem('Counter') === null && localStorage.getItem('QuestionId') === null) {
    localStorage.setItem('Counter', 0)
    localStorage.setItem('QuestionId', 1)
  }
  if (localStorage.getItem('AnswerCounter') === null) {
    localStorage.setItem('AnswerCounter', JSON.stringify({}))
  }

  const reset = () => {
    localStorage.setItem('Counter', 0)
    localStorage.setItem('QuestionId', 1)
    localStorage.setItem('AnswerCounter', JSON.stringify({}))
    setQuestion(quizQuestions[Counter].question)
    renderQuestion()
  }

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
      const real = JSON.stringify(AnswerCounter)
      localStorage.setItem('AnswerCounter', real)
    } else {
      AnswerCounter[answer] = AnswerCounter[answer] + 1
      const real = JSON.stringify(AnswerCounter)
      localStorage.setItem('AnswerCounter', real)
    }
  }

  const nexQuestion = () => {
    const counter = Counter + 1;
    const questionId = QuestionId + 1;
    localStorage.setItem('Counter', `${counter}`)
    localStorage.setItem('QuestionId', `${questionId}`)
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
    } else {
      setResult('Undetermined')
    }
    reset()
  }

  const renderAnswer = () => {
    const answersCount = AnswerCounter
    const answersCountKeys = Object.keys(answersCount)
    return answersCountKeys.map(key => {
      return (<div>{`${key}:${answersCount[key]}`}</div>)
    })
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
      <>
        <div>you prefer {Result}!</div>
        <div>{renderAnswer()}</div>
        <button className="btn btn-success" onClick={()=>window.location.reload()}>TRY AGAIN!</button>
      </>
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
