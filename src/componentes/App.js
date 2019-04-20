import React, { Component } from 'react';
import Header from './Header';
import Formulario from './Formulario';
import Resumen from './Resumen';
import Resultado from './Resultado';
import {obtenerDiferenciaAnio, calcularMarca, obtenerPlan} from '../helper.js';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      resultado: '',
      datos: {}
    };
    
  }

  cotizarSeguro = (datos) => {
    const {marca, year, plan} = datos;

    // Agregar una base de 2000 para el seguro

    let resultado = 2000;

    // Obtener diferencia de años 

    const diferenciaAnios = obtenerDiferenciaAnio(year);
    
    // por cada año restar 3% al seguro

    resultado -= ((diferenciaAnios * 3) * resultado) / 100;

    // Americano 15% Asiatico 5% Europeo 30% de incremento al valor actual
    
    resultado = calcularMarca(marca) * resultado;

    // El plan Básico incrementa el valor en 20% y el completo en 50%

    let incrementoPlan = obtenerPlan(plan);

    // dependiendo del plan incrementar el resultado

    resultado = parseFloat(incrementoPlan * resultado).toFixed(2);

    // crear objeto para datos del auto

    const datosAuto = {
      marca: marca,
      plan: plan,
      year: year
    }

    // ya tenemos el costo

    this.setState({
      resultado: resultado,
      datos: datosAuto
    });

  }

  render() {
    return (
      <div className="contenedor">

        <Header 
          titulo="Cotizador de Seguro de Auto"
        />

        <div className="contenedor-formulario">
          <Formulario 
            cotizarSeguro={this.cotizarSeguro}
          />
          <Resumen
            datos={this.state.datos}
          />
          <Resultado
              resultado={ this.state.resultado }
          />
        </div>

      </div>
    );
  }
}

export default App;
