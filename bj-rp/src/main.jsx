import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Blackjack from "./components/Blackjack.jsx";
import RockPaperScissors from "./components/RockPaperScissors.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="/blackjack" element={<Blackjack />} />
        <Route path="/rock-paper-scissors" element={<RockPaperScissors />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
