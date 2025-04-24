import React, { useState } from "react";

function RockPaperScissors() {
  const [playerChoice, setPlayerChoice] = useState("");
  const [aiChoice, setAiChoice] = useState("");
  const [result, setResult] = useState("");

  const choices = ["rock", "paper", "scissors"];

  const handleChoice = (choice) => {
    const aiRandomChoice = choices[Math.floor(Math.random() * choices.length)];
    setPlayerChoice(choice);
    setAiChoice(aiRandomChoice);
    determineWinner(choice, aiRandomChoice);
  };

  const determineWinner = (player, ai) => {
    if (player === ai) {
      setResult("It's a tie!");
    } else if (
      (player === "rock" && ai === "scissors") ||
      (player === "paper" && ai === "rock") ||
      (player === "scissors" && ai === "paper")
    ) {
      setResult("You win!");
    } else {
      setResult("AI wins!");
    }
  };

  return (
    <div>
      <h2>Kő-Papír-Olló</h2>
      <div>
        <button onClick={() => handleChoice("rock")}>Rock</button>
        <button onClick={() => handleChoice("paper")}>Paper</button>
        <button onClick={() => handleChoice("scissors")}>Scissors</button>
      </div>
      <div>
        <h3>Your Choice: {playerChoice}</h3>
        <h3>AI's Choice: {aiChoice}</h3>
        <h3>{result}</h3>
      </div>
    </div>
  );
}

export default RockPaperScissors;
