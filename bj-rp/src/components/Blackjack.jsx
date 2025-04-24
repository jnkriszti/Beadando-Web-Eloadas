import React, { useState } from "react";

const suits = ["♠", "♥", "♦", "♣"];
const values = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];

const getDeck = () => {
  let deck = [];
  for (let suit of suits) {
    for (let value of values) {
      deck.push({ suit, value });
    }
  }
  return deck.sort(() => Math.random() - 0.5);
};

const calculateScore = (hand) => {
  let score = 0;
  let aces = 0;
  for (let card of hand) {
    if (card.value === "A") {
      aces++;
      score += 11;
    } else if (["K", "Q", "J"].includes(card.value)) {
      score += 10;
    } else {
      score += parseInt(card.value);
    }
  }
  while (score > 21 && aces) {
    score -= 10;
    aces--;
  }
  return score;
};

export default function Blackjack() {
  const [deck, setDeck] = useState(getDeck());
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");

  const dealInitial = () => {
    const newDeck = [...deck];
    const player = [newDeck.pop(), newDeck.pop()];
    const dealer = [newDeck.pop(), newDeck.pop()];
    setDeck(newDeck);
    setPlayerHand(player);
    setDealerHand(dealer);
    setMessage("");
    setGameOver(false);
  };

  const hit = () => {
    const newDeck = [...deck];
    const newCard = newDeck.pop();
    const newHand = [...playerHand, newCard];
    setPlayerHand(newHand);
    setDeck(newDeck);

    if (calculateScore(newHand) > 21) {
      setMessage("You busted!");
      setGameOver(true);
    }
  };

  const stay = () => {
    let newDeck = [...deck];
    let newDealerHand = [...dealerHand];

    while (calculateScore(newDealerHand) < 17) {
      newDealerHand.push(newDeck.pop());
    }

    const playerScore = calculateScore(playerHand);
    const dealerScore = calculateScore(newDealerHand);

    let result = "";
    if (dealerScore > 21 || playerScore > dealerScore) {
      result = "You win!";
    } else if (dealerScore === playerScore) {
      result = "It's a tie!";
    } else {
      result = "Dealer wins!";
    }

    setDealerHand(newDealerHand);
    setMessage(result);
    setGameOver(true);
  };

  return (
    <div>
      <h1>Blackjack</h1>

      <div>
        <h2>Dealer's Hand</h2>
        <p>
          {dealerHand.map((card, idx) => (
            <span key={idx}>
              {card.value}
              {card.suit}{" "}
            </span>
          ))}
        </p>
        <p>Score: {calculateScore(dealerHand)}</p>
      </div>

      <div>
        <h2>Your Hand</h2>
        <p>
          {playerHand.map((card, idx) => (
            <span key={idx}>
              {card.value}
              {card.suit}{" "}
            </span>
          ))}
        </p>
        <p>Score: {calculateScore(playerHand)}</p>
      </div>

      <div>
        <button onClick={dealInitial}>Deal</button>
        <button onClick={hit} disabled={gameOver || playerHand.length === 0}>
          Hit
        </button>
        <button onClick={stay} disabled={gameOver || playerHand.length === 0}>
          Stay
        </button>
      </div>

      {message && <p>{message}</p>}
    </div>
  );
}
