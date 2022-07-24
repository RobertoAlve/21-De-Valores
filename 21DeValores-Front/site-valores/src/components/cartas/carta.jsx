import "./carta.css";

export function Carta(props) {
    return (
        <div className="corpo-carta">
          <h1>{props.props.caracter}</h1>  
        </div>
    );
}