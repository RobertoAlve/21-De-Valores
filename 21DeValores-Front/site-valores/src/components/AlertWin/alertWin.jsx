import { useState } from "react";
import { useEffect } from "react";
import "./alertWin.css";

export function AlertWin(props) {
  let [vencedor, setVencedor] = useState("");

  useEffect(() => {
    setVencedor(props.vencedor);
  }, [props.vencedor, vencedor]);

  function off() {
    document.querySelector(".container").classList.remove("on");
    document.querySelector(".vencedor").classList.remove("on");
    props.f();
  }

  useEffect(() => {
    if (props.active) {
      document.querySelector(".container").classList.add("on");
      document.querySelector(".vencedor").classList.add("on");
    }
  });

  return (
    <div className="container" onClick={off}>
      <div className="vencedor">
        <h1>{vencedor}</h1>
      </div>
    </div>
  );
}
