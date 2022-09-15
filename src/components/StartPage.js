import React from 'react'

const Body = (props) => {

  return (
    <div className='center'>
      <div>
        <h1>Quizzical</h1>
        <p>Trivia Game for all ages</p>
        <button className='btn cursor-pointer' onClick={props.toggle}>Start quiz</button>
      </div>
    </div>
  )
}

export default Body