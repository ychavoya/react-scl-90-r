import React, { Component } from "react";
import { Consumer } from "../context";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  ListItemText,
  ListItem,
  List,
  Icon,
  Button
} from "@material-ui/core";
import preguntas from "../data/preguntas.json";

let pregs = Object.keys(preguntas).map(k => preguntas[k]);

const opciones = [
  { key: 0, value: "Nada" },
  { key: 1, value: "Muy poco" },
  { key: 2, value: "Poco" },
  { key: 3, value: "Bastante" },
  { key: 4, value: "Mucho" }
];

export default class Preguntas extends Component {
  state = {
    respuestas: {},
    curr: 1
  };

  onFinish = (dispatch, e) => {
    dispatch({
      type: "RESULTS",
      respuestas: this.state.respuestas
    });
    this.props.history.push("/resultados");
  };

  onClick = (opc, e) => {
    const { curr, respuestas } = this.state;
    this.setState({
      curr: curr + 1,
      respuestas: { ...respuestas, [curr]: opc }
    });
  };

  onPrevious = e => {
    this.setState({
      curr: this.state.curr - 1
    });
  };

  render() {
    const { history } = this.props;
    const { curr } = this.state;
    return (
      <Consumer>
        {({ dispatch, edad }) => {
          if (edad === 0) {
            history.push("/");
            return;
          }

          return (
            <React.Fragment>
              <Card>
                <CardContent>
                  <Grid direction="column" container>
                    <Grid item>
                      <Typography variant="h6" align="center">
                        {curr === 91
                          ? "Continuar"
                          : `${curr}. ${pregs[curr - 1]}`}
                      </Typography>
                    </Grid>
                    <Grid item>
                      {curr === 91 ? (
                        <Button
                          variant="extendedFab"
                          fullWidth
                          style={{ marginTop: 8 }}
                          size="large"
                          onClick={this.onFinish.bind(this, dispatch)}
                        >
                          Ver resultados
                        </Button>
                      ) : (
                        <List>
                          {opciones.map(opc => (
                            <ListItem
                              button
                              key={opc.key}
                              onClick={this.onClick.bind(this, opc.key)}
                            >
                              <ListItemText>{opc.value}</ListItemText>
                            </ListItem>
                          ))}
                        </List>
                      )}
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
              {curr > 1 ? (
                <Button
                  onClick={this.onPrevious}
                  size="small"
                  style={{ marginTop: 8 }}
                >
                  <Icon>keyboard_arrow_left</Icon> Pregunta anterior
                </Button>
              ) : null}
            </React.Fragment>
          );
        }}
      </Consumer>
    );
  }
}
