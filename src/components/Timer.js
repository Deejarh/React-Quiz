import { useEffect } from "react";


function Timer({ dispatch, secondsRemaining }) {
    const minute = Math.floor(secondsRemaining / 60)
    const sec = secondsRemaining % 60

    useEffect(function () {
        const id = setInterval(() => {
            dispatch({ type: 'tick' })
        }, 1000);

        return () => clearInterval(id);

    }, [dispatch])
    return (
        <button className="btn btn-ui">
            {minute < 10 ? '0' : ''}{minute} : {sec < 10 ? '0' : ''}{sec}
        </button>
    );


}

export default Timer;