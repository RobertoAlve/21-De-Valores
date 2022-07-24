import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Game } from "./pages/game/game";
import { Start } from "./pages/start/start";

function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Rotas;
