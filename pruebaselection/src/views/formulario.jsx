import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navegacion from "../components/navegacion.jsx";
import "../styles/formulario.css";

export default class Inicio extends Component {
    constructor() {
        super();
        this.state ={
            skills:['','',''],
        }
    }
    subirEmpleado = () => {}
    renderSkills = () => {
        let renderIP = [];
        let ips = this.state.skills;
        ips.forEach((element, index) => {
            renderIP.push(
            <div key={index} className="skills">
                <input
                required
                type="text"
                defaultValue={element}
                id={"skill" + index}
                />
                <button
                type="button"
                className="botonSkills"
                onClick={(e) => this.deleteSkill(index)}
                >
                X
                </button>
            </div>
            );
        });
        return renderIP;
    };
    addSkill = () => {
        let data = this.state.skills;
        data.push("");
        this.setState({ skills: data });
    };
    deleteSkill = (a) => {
        let data = this.state.skills;
        data.splice(a, 1);
        this.setState({ skills: data });
    };
    componentDidMount(){}
    render(){
        return (
            <>
                <Navegacion></Navegacion>
                <section className="contenedorGeneral">
                    <div className="contenedorFormulario">
                        <h2>Crear Empleado</h2>
                        <form onSubmit={e => this.subirEmpleado(e)} className="formulario">
                            <div className="">
                                <label htmlFor="nombre">
                                Nombre
                                </label><br/>
                                <input type="text" id="nombre" required/>
                            </div>
                            <div className="">
                                <label htmlFor="email">
                                Email
                                </label><br/>
                                <input type="email" id="email" required/>
                            </div>
                            <div className="">
                                <label htmlFor="fechaNacimiento">
                                Fecha de nacimiento
                                </label><br/>
                                <input type="date" id="fechaNacimiento" data-date-format="DD/MMMM/YYYY" required/>
                            </div>
                            <div className="">
                                <label htmlFor="calleNumero">
                                Calle y numero
                                </label><br/>
                                <input type="text" id="calleNumero" required/>
                            </div>
                            <div className="">
                                <label htmlFor="colonia">
                                Colonia
                                </label><br/>
                                <input type="text" id="colonia" required/>
                            </div>
                            <div className="">
                                <label htmlFor="estado">
                                Estado
                                </label><br/>
                                <input type="text" id="estado" required/>
                            </div>
                            <div className="">
                                <div>{this.renderSkills()}</div>
                                <button
                                    type="button"
                                    onClick={(e) => this.addSkill()}
                                    className="botonPrincipal"
                                >Agregar Skill</button>
                            </div>
                            <div className="Addtransaction">
                                <button type="submit" className="botonPrincipal">
                                Guardar
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
            </>
        );
    }
}