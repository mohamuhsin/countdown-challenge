import { useState, useRef } from "react";

export default function Player() {
  const [enteredUserName, setenteredUserName] = useState(null);

  const playerName = useRef();

  function handleClick() {
    setenteredUserName(playerName.current.value);
    playerName.current.value = "";
  }

  return (
    <section id="player">
      <h2>Welcome {enteredUserName ? enteredUserName : "unknown entity"}</h2>
      <p>
        <input type="text" ref={playerName} />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
