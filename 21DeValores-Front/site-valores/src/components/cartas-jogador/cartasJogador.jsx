import { useEffect, useState } from "react";
import api from "../../api";
import { AlertWin } from "../AlertWin/alertWin";
import { Carta } from "../cartas/carta";
import "./cartasJogador.css";

export function CartasJogador() {
  const [listaDeCarta1, setListaDeCarta1] = useState([]);
  const [listaDeCarta2, setListaDeCarta2] = useState([]);
  const [pontosTotais1, setPontosTotais1] = useState(0);
  const [pontosTotais2, setPontosTotais2] = useState(0);
  let [vencedor, setVencedor] = useState("");
  let [active, setActive] = useState(false);

  let vezJogador = 0;
  let pontosJogador1 = 0;
  let pontosJogador2 = 0;

  function iniciarJogo() {
    verificarPontosTotais();
    api.post("").then((res) => {
      document.location.reload(true);
    });
  }

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

  useEffect(() => {
    api.get("/pontosTotais").then((res) => {
      if (res.status === 200) {
        setPontosTotais1(res.data[0]);
        setPontosTotais2(res.data[1]);
      } else {
        console.log(res);
      }
    });
  }, []);

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

  function attPontosTotais1() {
    api.post("/pontosTotais1");
  }

  function attPontosTotais2() {
    api.post("/pontosTotais2");
  }

  function pontosJogador() {
    listaDeCarta1.forEach((item) => {
      pontosJogador1 += item.valor;
    });

    listaDeCarta2.forEach((item) => {
      pontosJogador2 += item.valor;
    });

    verificarPontos();

    document.querySelector("#pontosJogadorUm").innerHTML = pontosJogador1;
    document.querySelector("#pontosTotaisJogadorUm").innerHTML = pontosTotais1;
    document.querySelector("#pontosJogadorDois").innerHTML = pontosJogador2;
    document.querySelector("#pontosTotaisJogadorDois").innerHTML =
      pontosTotais2;
  }

  function pegarVez() {
    api.get("/vez").then((res) => {
      vezJogador = res.data;
      verificarVez();
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
      setVencedor("Jogador 2 Ganhou");
      setActive(true);
    } else if (pontosJogador1 === 21) {
      setVencedor("Jogador 1 Ganhou");
      setActive(true);
    }

    if (pontosJogador2 > 21) {
      setVencedor("Jogador 1 Ganhou");
      setActive(true);
    } else if (pontosJogador2 === 21) {
      setVencedor("Jogador 2 Ganhou");
      setActive(true);
    }
  }

  function verificarPontosTotais() {
    if (pontosJogador1 > 21) {
      attPontosTotais2();
    } else if (pontosJogador1 === 21) {
      attPontosTotais1();
    }

    if (pontosJogador2 > 21) {
      attPontosTotais1();
    } else if (pontosJogador2 === 21) {
      attPontosTotais2();
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
          <br />
          Pontos Totais: <div id="pontosTotaisJogadorUm"></div>
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
          <br />
          Pontos Totais: <div id="pontosTotaisJogadorDois"></div>
        </div>
        <button id="btn-pedir-dois" onClick={pedirCartaDois}>
          Pedir Carta
        </button>
        <button id="btn-passar-dois" onClick={passarAVez}>
          Passar a vez
        </button>
      </div>

      <AlertWin f={iniciarJogo} active={active} vencedor={vencedor} />
    </div>
  );
}
