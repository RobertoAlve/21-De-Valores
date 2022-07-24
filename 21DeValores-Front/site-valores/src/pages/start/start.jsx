import api from "../../api";
import "./start.css";

export function Start() {
  function iniciarJogo() {
    api.post("").then((res) => {
      if (res.status === 200) {
        window.location.href = "/game";
      }
    });
  }

  return (
    <div className="corpo-start">
      <div>
        <h1>21 De Valores</h1>
      </div>
      <button onClick={iniciarJogo} className="btn-jogar">
        Jogar
      </button>
    </div>
  );
}
