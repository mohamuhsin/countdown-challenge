import { forwardRef, useImperativeHandle, useRef } from "react";

const ResultModal = forwardRef(function ResultModal(
    { targetTime, remainingTime, onReset },
    ref
) {
    const dialog = useRef();

    const userLost = remainingTime <= 0;

    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
            },
        };
    });
    return (
        <dialog className="result-modal" ref={dialog}>
            {userLost && <h2>You Lost</h2>}
            <p>
                The Target time was <strong> {targetTime} seconds</strong>
            </p>
            <p>
                You stopped the timer with <strong>{remainingTime}</strong>
            </p>
            <form method="dialog" onClose={onReset}>
                <button>Close</button>
            </form>
        </dialog>
    );
});

export default ResultModal;
