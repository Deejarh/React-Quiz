function Options({question}) {
  
    return (
     <div>
     <div className="options">
        {question.options.map((option) =>(
            <btn className="btn btn-option" key={option}>{option}</btn>))}
    </div>
    </div>
    );
  }
  
  export default Options;