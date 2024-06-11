import { forwardRef, useImperativeHandle, useRef } from "react";
import {createPortal} from "react-dom";

const ResultModal = forwardRef(function ResultModal(
    { targetTime, remainingTime, onReset },
    ref
) {
    const dialog = useRef();

    const userLost = remainingTime <= 0;
    const formattedRemainingTime = (remainingTime / 1000).toFixed(2);

    const score = Math.abs(
        Math.round(1 - (remainingTime / (targetTime * 1000)) * 100)
    );

    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
            },
        };
    });
    return createPortal(
        <dialog className="result-modal" ref={dialog}>
            {userLost && <h2>You Lost</h2>}
            {!userLost && <h2> You Scored: {score}</h2>}
            <p>
                The Target time was <strong> {targetTime} seconds</strong>
            </p>
            <p>
                You stopped the timer with{" "}
                <strong>{formattedRemainingTime} seconds</strong>
            </p>
            <form method="dialog" onClose={onReset}>
                <button>Close</button>
            </form>
        </dialog>, document.getElementById("modal")
    );
});

export default ResultModal;
