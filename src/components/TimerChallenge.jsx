import { useState, useRef } from "react";
import ResultModal from "./ResultsModal";

export default function TimerChallenge({ title, targetTime }) {
    const timer = useRef();
    const dialog = useRef();

    const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

    const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

    if (timeRemaining <= 0) {
        clearInterval(timer.current);
        dialog.current.open();
    }

    function handleStart() {
        timer.current = setInterval(() => {
            setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10);
        }, 10);
    }

    function handleStop() {
        clearInterval(timer.current);
        dialog.current.open()
    }

    return (
        <>
            <ResultModal ref={dialog} result="lost" targetTime={targetTime} />
            <section className="challenge">
                <h2>{title}</h2>
                <p className="challenge-time">
                    {targetTime} second{targetTime > 1 ? "s" : null}
                </p>
                <p>
                    <button onClick={timerIsActive ? handleStop : handleStart}>
                        {timerIsActive ? "Stop" : "Start"} Challenge
                    </button>
                </p>
                <p className={timerIsActive ? "active" : undefined}>
                    {timerIsActive ? "Time is running..." : "Time Inactive"}
                </p>
            </section>
        </>
    );
}
