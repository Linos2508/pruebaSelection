import React, { Component } from "react";
import Navegacion from "../components/navegacion.jsx";
import "../styles/formulario.css";
import swal from 'sweetalert';

export default class Inicio extends Component {
    constructor() {
        super();
        this.state ={
            skills:['','',''],
        }
    }
    subirEmpleado = e => {
        e.preventDefault();
        let data = {
            nombre: document.getElementById("nombre").value,
            email: document.getElementById("email").value,
            fecha: document.getElementById("fechaNacimiento").value,
            calle: document.getElementById("calleNumero").value,
            colonia: document.getElementById("colonia").value,
            estado: document.getElementById("estado").value,
            skills: []
        }
        for (let i = 0; i < this.state.skills.length; i++) {
            data.skills.push(document.getElementById("skill" + i).value);
        }
        fetch("https://www.linos2508.com/api/insertEmpleado.php",{
            method:"POST",
            body: JSON.stringify(data),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res => res.json())
        .then(result => {
            if (result.result === 1 && result.error === ""){
                swal({
                    title: "Insertado!",
                    text: "El empleado y sus skills han sido insertados!",
                    icon: "success",
                    button: "ok"
                });
            }
            else if(result.result === 1 && result.error === "Algunos skills no fueron insertados"){
                swal({
                    title: "Insertado!",
                    text: "El empleado fue insertado pero algunos skills no han sido insertados :(",
                    icon: "warning",
                    button: "ok"
                });
            }
            else {
                swal({
                    title: "Ooops!",
                    text: result.error,
                    icon: "error",
                    button: "ok"
                });
            }
        })
    }
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
                            <div>
                                <label htmlFor="nombre">
                                Nombre
                                </label><br/>
                                <input type="text" id="nombre" maxLength={150} required/>
                            </div>
                            <div>
                                <label htmlFor="email">
                                Email
                                </label><br/>
                                <input type="email" id="email" maxLength={60} required/>
                            </div>
                            <div>
                                <label htmlFor="fechaNacimiento">
                                Fecha de nacimiento
                                </label><br/>
                                <input type="date" id="fechaNacimiento" data-date-format="DD/MMMM/YYYY" required/>
                            </div>
                            <div>
                                <label htmlFor="calleNumero">
                                Calle y numero
                                </label><br/>
                                <input type="text" id="calleNumero" maxLength={60} required/>
                            </div>
                            <div>
                                <label htmlFor="colonia">
                                Colonia
                                </label><br/>
                                <input type="text" id="colonia" maxLength={60} required/>
                            </div>
                            <div>
                                <label htmlFor="estado">
                                Estado
                                </label><br/>
                                <input type="text" id="estado" maxLength={60} required/>
                            </div>
                            <div>
                                <div>{this.renderSkills()}</div>
                                <button
                                    type="button"
                                    onClick={(e) => this.addSkill()}
                                    className="botonPrincipal"
                                >Agregar Skill</button>
                            </div>
                            <div>
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