import React from 'react'
import { useEffect, useState } from 'react'
import Question from './Components/Question'
import Starter from './Components/Starter'
import { nanoid } from 'nanoid'
import he from 'he'

function App() {
  // State for handling the Starter screen
  const [startGame, setStartGame] = useState(false)

  // State for starting a new game
  const [newGame, setNewGame] = useState(false)

  // State with fetched data
  const [quiz, setQuiz] = useState([])

  // State for the results screen
  const [check, setCheck] = useState(false)

  // State for calculating the score
  const [score, setScore] = useState(0)

  // Function for the start button
  function handleStartGame () {
    setStartGame(prev => !prev)
  }

  function handleNewGame() {
    setStartGame(prev => !prev)
    setNewGame(prev => !prev)
    if(check) {
      setCheck(prevCheck => !prevCheck)
    }
    setScore(0)
  }

  // Once the start button is clicked this fetch function should run 

  useEffect(()=> {
   
      fetch('https://opentdb.com/api.php?amount=5')
        .then(res => res.json())
        .then(data => {
          setQuiz(data.results.map(each => {
            const id = nanoid()
            const sortedAnswers = [ ...each.incorrect_answers, each.correct_answer ].sort()
            const correctAnswer = each.correct_answer

            const answerObject = sortedAnswers.map((answer, index) => {
              return {
                option: he.decode(answer),
                answerId: id + index,
                isCorrect: answer === correctAnswer ? true : false,
                isSelected: false,
                score: 0
              }
            })

            return {
              question: he.decode(each.question),
              answers: answerObject,
              id: id,
            }

          }))  
        }) 
        return () => console.log('cleaned')
  }, [newGame])

  function handleAnswers(questionId, id) {
    setQuiz(prevQuiz => {
      return prevQuiz.map(x => {
        if(x.id === questionId) {
          return {
            ...x,
            answers: x.answers.map(y => {
              if(y.answerId === id) {
                return {
                  ...y,
                  isSelected: !y.isSelected,
                } 
                }
                else {
                  return {
                    ...y,
                    isSelected: false
                  }
              }
            })
          }
        }
        else {
          return {...x}
        }
      })
    })
  }

  function handleCheck(e) {
    setCheck(prevState => !prevState)
    quiz.map(question => {
      return question.answers.map(answer => {
        if(answer.isCorrect && answer.isSelected) {
          setScore(prevScore => prevScore + 1)
        }
      })
    }) 
  }

  const questionEl = quiz.map(q => {
    
    return <Question 
            key={ q.id }
            question={ q.question }
            answers={ q.answers }
            id={ q.id }
            handleSelection={ handleAnswers }
            checked={ check }
            />
  })

  return (
    <div className='container'>

      {
        !startGame 
        ? 
        <Starter 
          isStarted={ startGame }
          handleStartBtn={ handleStartGame }
        /> 
        :
        questionEl
      }

      <div className="check-btn--container">

      { 
        startGame && !check 
        ?
        <button className="check-btn" onClick={ handleCheck }>Check answers</button>
        : 
        startGame && check ?
        <div className="play-btn--container">
          <p><b>You scored { score }/5 correct answers</b></p>
          <button className="check-btn" onClick={ handleNewGame }>Play again</button>
        </div>
        :

        ''
      }

      </div>
    </div>
  )
}

export default App
