import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Formulario from './views/formulario.jsx';
import Empleados from './views/empleados.jsx';
import "./App.css";

class App extends Component {
  render(){
    return (
      <BrowserRouter>
          <Route path="/" exact component={Formulario} />
          <Route path="/empleados" exact component={Empleados} />
      </BrowserRouter>
    );
  }
}

export default App;
