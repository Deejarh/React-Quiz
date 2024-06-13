function Options({ question, dispatch, answer }) {
  const hasAnswer = answer !== null;
  return (
    <div>
      <div className="options">
        {question.options.map((option, index) => (
          <button
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
            className={`btn btn-option ${index === answer ? "answer" : ""} ${ hasAnswer ? index === question.correctOption ? "correct" : "wrong" : ''}`}
            key={option}
            disabled={hasAnswer}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Options;
