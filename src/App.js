import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import WelcomeScreen from './components/WelcomeScreen';
import Question from './components/Question'
import NextButton from './components/NextButton'
import Timer from './components/Timer'
import FinishScreen from "./components/FinishScreen"
import { getQuestions } from './service/question.js'

const SECS = 30;
const initialState = {
    questions: [],

    status: 'loading',
    index: 0,
    answer: null,
    points: 0,
    secondsRemaining: 10,
}

function reducer(state, action) {
    switch (action.type) {
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
                secondsRemaining: state.questions.length * SECS,
            }
        case "newAnswer":
            const currentQuestion = state.questions.at(state.index)
            return {
                ...state,
                answer: action.payload,
                points: action.payload === currentQuestion.correctOption ? state.points + currentQuestion.points : currentQuestion.points,
            }
        case "nextQuestion":
            return {
                ...state,
                index: state.index + 1,
                answer: null,
            }
        case "tick":
            return {
                ...state,
                secondsRemaining: state.secondsRemaining - 1,
                status: state.secondsRemaining === 0 ? 'finish' : state.status
            }
        case "finish":
            return {
                ...state,
                status: 'finish'
            }
        case "reset":
            return {
                ...initialState,
                questions: state.questions,
                status: 'ready'
            }
        default:
            throw new Error('Action unkown')
    }

}
function App() {
    const [{ status, questions, index, answer, points, secondsRemaining }, dispatch] = useReducer(reducer, initialState);


    const numQuestions = questions.length

    const maxPoint = questions.reduce((prev, curr) => prev + curr.points, 0)

    useEffect(function () {
        getQuestions().then((data) => dispatch({ type: 'dataReceived', payload: data }))
       .catch((err) => dispatch({ type: 'dataFailed' }))
   
    }, []);
    return (
        <div>
            <Header />
            <Main>
                {status === 'loading' && <Loader />}
                {status === 'error' && <Error />}
                {status === 'ready' && <WelcomeScreen numQuestions={numQuestions} dispatch={dispatch} />}
                {status === 'active' &&
                    <> <Question question={questions[index]} dispatch={dispatch} answer={answer} numQuestions={numQuestions} index={index} points={points} maxPoint={maxPoint} />
                    <footer className=" flex justify-between ">
                        <Timer dispatch={dispatch} secondsRemaining={secondsRemaining}/>
                    <NextButton dispatch={dispatch} answer={answer} numQuestions={numQuestions} index={index} />
                    </footer>
                        
                    </>}
                {status === 'finish' && <FinishScreen points={points} maxPoint={maxPoint} dispatch={dispatch} />}

            </Main>
        </div>
    );
}

export default App;
