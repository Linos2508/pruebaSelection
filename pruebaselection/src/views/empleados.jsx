import React, { Component } from "react";
import Navegacion from "../components/navegacion.jsx";
import Griddle, { plugins, RowDefinition, ColumnDefinition} from 'griddle-react';
import "../styles/empleados.css";
import swal from "sweetalert";

export default class Inicio extends Component {
    constructor() {
        super();
        this.state ={
            empleados:[],
        }
    }
    obtenerEmpleados = () => {}
    componentDidMount(){
        fetch("https://www.linos2508.com/api/getEmpleados.php",{
            method: "GET"
        }).then(res => res.json())
        .then( result => {
            if( result.result === 1){
                this.setState({empleados: result.data});
            }
            else{
                swal({
                    title: "Ooops!",
                    text: result.error,
                    icon: "error",
                    button: "ok"
                });
            }
        })
    }
    render(){
        const layoutTablas = ({ Table, Pagination, Filter }) => (
            <div className="tablaGriddle">
              <Filter />
              <div
                className="contenedorTablaGriddle"
                style={{
                  overflowX: "auto",
                  width: "100%",
                }}
              >
                <Table />
              </div>
              <Pagination />
            </div>
          );
        const CustomColumnLeft = ({ value }) => (
            <span className="celdaIzquierda"> {value}</span>
        );
        const CustomColumnCenter = ({ value }) => (
            <span className="celdaCentro"> {value}</span>
        );
        return (
            <>
                <Navegacion></Navegacion>
                <section className="contenedorGeneral">
                    <div className="contenedorTabla">
                        <h2>Listado de Empleados</h2>
                        <Griddle
                            data={this.state.empleados}
                            components={{
                                Layout: layoutTablas,
                            }}
                            plugins={[plugins.LocalPlugin]}
                        >
                            <RowDefinition>
                            <ColumnDefinition id="nombre" customComponent={CustomColumnLeft}/>
                            <ColumnDefinition id="email" customComponent={CustomColumnLeft}/>
                            <ColumnDefinition id="fecha" customComponent={CustomColumnCenter}/>
                            <ColumnDefinition id="calle" customComponent={CustomColumnCenter}/>
                            <ColumnDefinition id="colonia" customComponent={CustomColumnCenter}/>
                            <ColumnDefinition id="estado" customComponent={CustomColumnCenter}/>
                            <ColumnDefinition id="skills" customComponent={CustomColumnCenter}/>
                            </RowDefinition>
                        </Griddle>
                    </div>
                </section>
            </>
        );
    }
}