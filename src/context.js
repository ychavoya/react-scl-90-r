import React, { Component } from "react";
import calcular from "./services/calculator";

const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "START":
      return {
        ...state,
        edad: action.edad,
        sexo: action.sexo
      };
    case "RESULTS":
      let res = calcular(action.respuestas, state.edad, state.sexo);
      return {
        ...state,
        respuestas: action.respuestas,
        ...res
      };
    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    edad: 0,
    sexo: "",
    respuestas: {},
    dispatch: action => {
      this.setState(state => reducer(state, action));
    }
  };

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
