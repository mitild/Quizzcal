import React from 'react'
import App from '../App'

export default function Starter(props) {

  return (
    <div className="starter--container">
      <h1 className="starter--h1">ExQuizz Me?</h1>
      <p className="starter--p">Trivia made fun</p>
      <button className="starter--button" onClick={ props.handleStartBtn }>Start quiz</button>
    </div>
  )
}