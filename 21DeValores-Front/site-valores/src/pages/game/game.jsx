import { CartasJogador } from "../../components/cartas-jogador/cartasJogador";

import "./game.css";

export function Game() {
  return (
    <div className="corpo-game">
      <CartasJogador />
    </div>
  );
}
