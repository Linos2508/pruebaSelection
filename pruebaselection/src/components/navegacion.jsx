import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../styles/navegacion.css";

class Navegacion extends Component {
    state = {
        //boot: getBoot()[getCookie("Orolang")],
    };
    componentDidMount() {
        switch (window.location.pathname){
            case "/":
                document.getElementById("home").classList.add("active");
                break;
            case "/empleados":
                document.getElementById("empleados").classList.add("active");
                break;
            default:
                document.getElementById("home").classList.add("active");
                break;
        }
    }
    render () { 
        return(
            <>
                <nav>
                    <div></div>
                    <div className="enlacesNavegacion">
                        <ul className="paginas">
                            <li id="home">
                                <Link to="/">Formulario</Link>
                            </li>
                            <li id="empleados">
                                <Link to="/empleados">Empleados</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </>
        );
    }
}

export default Navegacion