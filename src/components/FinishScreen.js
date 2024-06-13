
function FinishScreen({points, maxPoint, dispatch}) {
 const percentage = (points/ maxPoint) * 100;  
 let emoji;
 if ( percentage === 100) emoji = '🎉🤦';
 if ( percentage >= 80 && percentage < 100) emoji = '🚀';
 if ( percentage >= 50 && percentage < 80) emoji = '🙂';
 if ( percentage >= 20 && percentage < 50) emoji = '🙃';
 if ( percentage >= 0 && percentage < 20) emoji = '😏';
 if ( percentage === 0) emoji = '🤦‍♀️';


    return (
      <>
     <p className=" result">
        <span> {emoji}</span>You scored <strong> {points}</strong> out of {maxPoint}  ({Math.ceil(percentage)})%
     </p>

     <button className="btn btn-ui" onClick={() => dispatch({ type: "reset"})}>
        Restart Quiz
      </button>
    
     </>
    );
  }
  
  export default FinishScreen;