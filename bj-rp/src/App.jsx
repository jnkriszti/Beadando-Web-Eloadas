import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function App() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/blackjack">Blackjack</Link>
          </li>
          <li>
            <Link to="/rock-paper-scissors">Kő-Papír-Olló</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default App;
