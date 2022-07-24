import { useEffect, useState } from "react";
import api from "../../api";
import { Carta } from "../cartas/carta";
import "./cartasJogador.css";

export function CartasJogador() {
  const [listaDeCarta1, setListaDeCarta1] = useState([]);
  const [listaDeCarta2, setListaDeCarta2] = useState([]);

  let vezJogador = 0;
  let pontosJogador1 = 0;
  let pontosJogador2 = 0;

  useEffect(() => {
    api.get("").then((res) => {
      if (res.status === 200) {
        setListaDeCarta1(res.data[0].cartasIniciais);
        setListaDeCarta2(res.data[1].cartasIniciais);
      } else {
        console.log(res);
      }
    });
  }, []);

  function pontosJogador() {
    listaDeCarta1.forEach((item) => {
      pontosJogador1 += item.valor;
    });

    listaDeCarta2.forEach((item) => {
      pontosJogador2 += item.valor;
    });

    verificarPontos();

    document.querySelector("#pontosJogadorUm").innerHTML = pontosJogador1;
    document.querySelector("#pontosJogadorDois").innerHTML = pontosJogador2;
  }

  function pegarVez() {
    api.get("/vez").then((res) => {
      vezJogador = res.data;
      console.log(res.data + "aiiiii");
      verificarVez();
      console.log(vezJogador + " Porra");
    });
  }

  function pedirCartaUm() {
    api.get("/pedirCartaVez").then((res) => {
      if (res.status === 200) {
        setListaDeCarta1([...listaDeCarta1, res.data]);
      }
    });
  }

  function pedirCartaDois() {
    api.get("/pedirCartaVez").then((res) => {
      if (res.status === 200) {
        setListaDeCarta2([...listaDeCarta2, res.data]);
      }
    });
  }

  function verificarPontos() {
    console.log(vezJogador + "ouuu");
    if (pontosJogador1 > 21) {
      alert("Jogador 1 perdeu!");
    }

    if (pontosJogador2 > 21) {
      alert("Jogador 2 perdeu!");
    }
  }

  function passarAVez() {
    api.post("/vez").then((res) => {
      console.log(res);
      if (res.status === 200) {
        pegarVez();
      }
    });
  }

  function verificarVez() {
    if (vezJogador === 0) {
      document.getElementById("btn-pedir-dois").disabled = true;
      document.getElementById("btn-pedir-um").disabled = false;
      document.getElementById("btn-passar-um").disabled = false;
      document.getElementById("btn-passar-dois").disabled = true;
    } else if (vezJogador === 1) {
      document.getElementById("btn-pedir-um").disabled = true;
      document.getElementById("btn-passar-um").disabled = true;
      document.getElementById("btn-pedir-dois").disabled = false;
      document.getElementById("btn-passar-dois").disabled = false;
    } else {
      document.getElementById("btn-pedir-um").disabled = false;
      document.getElementById("btn-passar-um").disabled = false;
      document.getElementById("btn-pedir-dois").disabled = false;
      document.getElementById("btn-passar-dois").disabled = false;
    }
  }

  setTimeout(() => {
    pontosJogador();
    pegarVez();
  }, 200);

  return (
    <div className="container-cartas">
      <div className="cartas-jogador-um cartas">
        <div className="corpo-cartas">
          {listaDeCarta1.map((item) => (
            <Carta key={item.id} props={item} />
          ))}
        </div>
        <div className="pontos-jogador">
          Pontos: <div id="pontosJogadorUm"></div>
        </div>
        <button id="btn-pedir-um" onClick={pedirCartaUm}>
          Pedir Carta
        </button>
        <button id="btn-passar-um" onClick={passarAVez}>
          Passar a vez
        </button>
      </div>
      <div className="cartas-jogador-dois cartas">
        <div className="corpo-cartas">
          {listaDeCarta2.map((item) => (
            <Carta key={item.id} props={item} />
          ))}
        </div>
        <div className="pontos-jogador">
          Pontos: <div id="pontosJogadorDois"></div>
        </div>
        <button id="btn-pedir-dois" onClick={pedirCartaDois}>
          Pedir Carta
        </button>
        <button id="btn-passar-dois" onClick={passarAVez}>
          Passar a vez
        </button>
      </div>
    </div>
  );
}
