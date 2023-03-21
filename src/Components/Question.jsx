import React from 'react'
import { nanoid } from 'nanoid'

export default function Question(props) {


 
  const answers = props.answers.map((answer, index) => {

    const styles = {
      backgroundColor: props.checked && answer.isCorrect
      ?
      "#94D7A2"
      :
      props.checked && answer.isSelected && !answer.isCorrect
      ?
      "#F8BCBC"
      :
      answer.isSelected ? "#D6DBF5" : "white",

      opacity: props.checked && !answer.isSelected && !answer.isCorrect ? ".5" : "1"
    }

    return <button
              key={index}
              className="q--btn"
              onClick={ () => props.handleSelection(props.id, answer.answerId) }
              style={ styles }
              >{ answer.option }
            </button>
  })

  return (
    <div className="q--question-wrapper">
      <h5 className='q--question'>{props.question}</h5>
      <div className="q--btn-wrapper">
          { answers }
      </div>
    </div>
  )

}