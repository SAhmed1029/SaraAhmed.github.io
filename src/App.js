import './App.css';
import {useCallback, useState} from 'react'
import StopWatch from './/components/StopWatch';

const MENU_SCREEN = "menu"
const EXERCISE_SCREEN = "exercise"
const DURATION_EXERCISE = "duration"
const REPTITION_EXERCISE = "reptition"

function DurationExercise({exercise, setMenuScreen}){
  let {name} = exercise
  return <div>
    <p>{name}</p>
    <StopWatch/>
    <button onClick={setMenuScreen}>Back</button>
  </div>
}

function ReptitionExercise(exercise, setMenuScreen){
  let [count, setCount] = useState(0)
  return <div>
    <p>{exercise.name}</p>
    <p style={{fontSize:"6em"}}>{count}</p>
    <button style={{fontSize:"4em"}} onClick={()=> setCount(count=>count+1)}>Increment</button> 
    <button style={{fontSize:"4em"}} onClick={()=> setCount(0)}>Reset</button>
    <br/>
    <button style={{fontSize:"4em"}} onClick={setMenuScreen}>Return</button>
    </div>
}

let exerciseList = [
  {type: DURATION_EXERCISE, name:"Running"},
  {type: DURATION_EXERCISE, name:"Rowing"},
  {type: DURATION_EXERCISE, name:"Swimming"},
  {type: DURATION_EXERCISE, name:"Hiking"},
  {type: REPTITION_EXERCISE, name:"Push-Ups"}
  {type: REPTITION_EXERCISE, name:"Bench Press"}
  {type: REPTITION_EXERCISE, name:"Squatting"}
]

function App() {
let [currentScreen, setCurrentScreen] = useState(MENU_SCREEN)
let [currentExercise, setCurrentExercise] = useState({})
let screenComponent = undefined
let buttonClick = useCallback((exercise)=> {
  setCurrentExercise(exercise)
  setCurrentScreen(EXERCISE_SCREEN)
})

if (currentScreen === MENU_SCREEN){
  screenComponent = <div>
    <p>Exercise Menu</p>
  <ul>
    {exerciseList.map((exercise)=> {
      return<li key={exercise.name}>
      <button onClick={() => buttonClick(exercise)}>{exercise.name}</button>
    </li>
      })}

  </ul>
  </div>
} 
else if (currentScreen === EXERCISE_SCREEN){
  switch(currentExercise.type){
    case DURATION_EXERCISE:
      screenComponent = <DurationExercise 
      setMenuScreen={()=> setCurrentExercise(MENU_SCREEN)} 
      exercise={currentExercise}/> 
    break;
    case REPTITION_EXERCISE:
      screenComponent = <ReptitionExercise 
      setMenuScreen={()=> setCurrentExercise(MENU_SCREEN)} 
      exercise={currentExercise}/>
      break;
      default:
        screenComponent = undefined
  }
  
  }
return (
    <div className="App">
      <header className="App-header">
      <p>{screenComponent}</p>
     
      
         
      </header>
    </div>
  );
}

export default App;
