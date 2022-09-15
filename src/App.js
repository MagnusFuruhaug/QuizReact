
import './App.css';
import React from 'react'
import { nanoid } from 'nanoid'
import StartPage from './components/StartPage';
import Question from './components/Questions';
import Blobs from './components/Blobs';
import GameOptions from './components/GameOptions';


const App = () => {

  const [gameOptionPage, setGameOptionPage] = React.useState(false)
  const [Questions, setQuestions] = React.useState([])
  const [checkAnswers, setCheckAnswers] = React.useState(false)
  const [points,setPoints] = React.useState(0)
  const [gameStart, setGameStart] = React.useState(false)
  const [gameOptions, setGameOptions] = React.useState({
    category: '',
    difficulty: '',
    type:'',
  })

  React.useEffect(() => {
    fetch(`https://opentdb.com/api.php?amount=5&category=${gameOptions.category}&difficulty=${gameOptions.difficulty}&type=${gameOptions.type}`)
    .then(res => res.json())
    .then(data => setQuestions(data.results.map((questions) => {
        shuffleArray(questions.incorrect_answers, questions.correct_answer)
        return({questions:questions.question,
                options:questions.incorrect_answers,
                correctAnswer:questions.correct_answer,
                selectedAnswer:''
                })
    })))
  }, [gameStart, gameOptions]) 
  /*Kan også bare ha gameStart i dependency array, men da får man en warning i konsollen*/

  function shuffleArray(wrong, corr){
    const randInt = Math.floor(Math.random() * 4);
    wrong.splice(randInt,0,corr)
  }

  const toggle = () => {
    setGameOptionPage(prevOption => !prevOption)
  }   

  function handleClick(e,Quest_id,answers){
    e.preventDefault()
    setQuestions(oldQuest => oldQuest.map((Quest, Qid) => {
      return Quest_id === Qid ? 
          {...Quest, selectedAnswer: answers} :
          Quest
  }))
  }

  function toggleCheckAnswers(){
    setCheckAnswers(!checkAnswers)
    let points = 0;
    Questions.forEach(quest => {
      if(quest.correctAnswer===quest.selectedAnswer){
        points++;
      } 
      setPoints(points)
    })
  }

  function playAgian(){
    setGameOptionPage(true)
    setCheckAnswers(false)
    setGameStart(false)
  }

  const handleChange = event => {
    const { name, value } = event.target;

		setGameOptions(prevGameOptions => {
			return {
				...prevGameOptions,
				[name]: value
			}
		});
	}

  function handleSubmit(event) {
    event.preventDefault()
    setGameStart(gamestart => !gamestart)
}

  const quests = Questions.map((item,index) => {
    return(
      <Question 
      key = {nanoid()}
      Questions={item.questions}
      Options={item.options}
      correctAnswer = {item.correctAnswer}
      handleClick= {handleClick}
      selectedAnswer={item.selectedAnswer}
      id={index}
      checkAnswers={checkAnswers}
      />
    )
  })



  return (
    <div>
      <Blobs/>
      {!gameOptionPage && <StartPage toggle={toggle} />}
      {!gameStart && gameOptionPage && <GameOptions 
        handleChange={handleChange} 
        handleSubmit={handleSubmit} 
        gameOptions={gameOptions}/>}
      
      {gameStart && 
      <>
        {gameOptionPage && quests }
        {!checkAnswers ? (<button className='btn cursor-pointer' 
        onClick={toggleCheckAnswers}>Check answers</button>) : 
        (<button className='btn cursor-pointer'
        onClick={playAgian}>Play again</button>)}

        {checkAnswers && <p className='score-text'>{`${points}/5 correct answers`}</p>}
      </>}
    </div>
  )
}

export default App;
