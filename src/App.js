import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import WelcomeScreen from './components/WelcomeScreen';
import Question from './components/Question'
import NextButton from './components/NextButton'


const initialState = {
    questions: [],

    status:'loading',
    index: 0,
    answer: null,
    points: 0
}

function reducer(state, action) {
 switch(action.type) {
    case "dataReceived":
        return {
            ...state,
            questions: action.payload,
            status: "ready",
        }
    case "dataFailed":
        return {
            ...state,
            status: "error",
        }
    case "start":
        return {
            ...state,
            status: "active",
        }
    case "newAnswer":
        const currentQuestion = state.questions.at(state.index)
        return {
            ...state,
            answer: action.payload,
            points: action.payload === currentQuestion.correctOption ? state.points + currentQuestion.points  : currentQuestion.points,
        }
    case "nextQuestion":
        return {
            ...state,
            index: state.index + 1,
            answer: null,
        }
     default:
        throw new Error('Action unkown')   
 }

}
function App() {
const [{status, questions, index, answer, points}, dispatch] = useReducer( reducer, initialState);


const numQuestions = questions.length

const maxPoint = questions.reduce((prev, curr) => prev + curr.points, 0)

  useEffect(function () {
    fetch("http://localhost:8000/questions")
    .then((res) => res.json())
    .then((data) => dispatch({type: 'dataReceived', payload: data }))
    .catch((err) => dispatch({type: 'dataFailed' }))
  }, []);
  return (
    <div>
      <Header />
      <Main>
         {status === 'loading' && <Loader/>}  
         {status === 'error' && <Error/>}  
         {status === 'ready' && <WelcomeScreen numQuestions = {numQuestions} dispatch = {dispatch}/>}  
         {status === 'active' &&
         <> <Question  question = {questions[index]} dispatch = {dispatch} answer = {answer} numQuestions = {numQuestions} index = {index} points= {points} maxPoint = {maxPoint}/>
         <NextButton dispatch = {dispatch} answer = {answer} />
         </>}  
        
      </Main>
    </div>
  );
}

export default App;
