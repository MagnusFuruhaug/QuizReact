import React from 'react'
import { decode } from 'html-entities'

const Question = (props) => {

  function styles(answers,index) {
    if(props.checkAnswers){
      return props.correctAnswer === answers ? 'option-corr' : 
        ((props.selectedAnswer===answers) ? 'option-wrng' : '')
      
    }
    if(props.selectedAnswer===answers){
      return 'option-selected'
    }
  } 

  const options = props.Options.map((answers,index) => {
    return <button className={`option ${styles(answers,index)} cursor-pointer`}
    key = {answers} 
    onClick = {(e)=>props.handleClick(e,props.id,answers)}
    >{decode(answers)}</button>
  })

  return(
    <div>
      <div>
        <p className = "question-container">{decode(props.Questions)}</p>
        {options}          
      </div>
    </div> 
  )  

}

export default Question