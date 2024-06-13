import Options from './Options'

function Question({question, dispatch, answer, numQuestions,index, points, maxPoint}) {
  
    return (
      <div>
        <div>
            <progress max={numQuestions} value={index + Number (answer !== null)}></progress>
            <div className=" flex justify-between my-6 text-3xl">
            <p className=''> Question  <strong>{index+1}</strong>/{numQuestions}</p>
            <p className=''><strong>{points}</strong>/{maxPoint} points</p>
            </div>
            
        </div>
        <h4 className="">{question.question}</h4>

        <Options question = {question} dispatch ={dispatch} answer ={answer}/>
      </div>
    );
  }
  
  export default Question;