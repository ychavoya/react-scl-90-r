import React, { Component } from "react";
import "./App.css";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { Provider } from "./context";
import Navbar from "./layout/Navbar";
import Welcome from "./info/Welcome";
import Info from "./info/Info";
import Preguntas from "./preguntas/Preguntas";
import Resultados from "./preguntas/Resultados";
import ResultadosDetalles from "./preguntas/ResultadosDetalles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#00695c"
    },
    secondary: {
      main: "#ff6f00"
    }
  },
  typography: {
    useNextVariants: true
  },
  spacing: {
    unit: 8
  }
});

class App extends Component {
  render() {
    return (
      <Provider>
        <MuiThemeProvider theme={theme}>
          <Router>
            <React.Fragment>
              <Navbar />

              <div className="container">
                <Switch>
                  <Route exact path="/" component={Welcome} />
                  <Route exact path="/info" component={Info} />
                  <Route exact path="/preguntas" component={Preguntas} />
                  <Route exact path="/resultados" component={Resultados} />
                  <Route
                    exact
                    path="/resultados/more"
                    component={ResultadosDetalles}
                  />
                </Switch>
              </div>
            </React.Fragment>
          </Router>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
