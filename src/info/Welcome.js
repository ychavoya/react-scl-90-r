import React, { Component } from "react";
import { Consumer } from "../context";
import {
  Card,
  Button,
  CardContent,
  Typography,
  withStyles,
  CardActions,
  Icon,
  Grid,
  TextField,
  MenuItem
} from "@material-ui/core";

import { Link } from "react-router-dom";
import "../styles/animate.css";

const styles = theme => ({
  title: {
    fontWeight: "bold",
    textAlign: "center"
  },
  actions: {
    justifyContent: "space-between"
  },
  icon: {
    marginRight: 4
  },
  button: {
    margin: theme.spacing.unit,
    padding: theme.spacing.unit
  },
  p: {
    marginTop: theme.spacing.unit
  },
  gridData: {
    marginTop: theme.spacing.unit * 2,
    padding: theme.spacing.unit
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  right: {
    [theme.breakpoints.down("sm")]: {
      textAlign: "left"
    },
    [theme.breakpoints.up("sm")]: {
      textAlign: "right"
    }
  }
});

const sexoOpt = [
  { key: "M", value: "Masculino" },
  { key: "F", value: "Femenino" }
];

class Welcome extends Component {
  state = {
    edad: 13,
    sexo: "M"
  };

  onChangeEdad = e => {
    if (e.target.value < 0 || e.target.value > 65) {
      return;
    }
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onChangeSexo = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = (dispatch, e) => {
    e.preventDefault();

    dispatch({
      type: "START",
      edad: this.state.edad,
      sexo: this.state.sexo
    });

    this.props.history.push("/preguntas");
  };

  render() {
    const { classes } = this.props;

    return (
      <Consumer>
        {({ dispatch }) => {
          return (
            <form onSubmit={this.onSubmit.bind(this, dispatch)}>
              <Card className="animated bounceInUp fast">
                <CardContent>
                  <Typography
                    className={classes.title}
                    variant="h5"
                    component="h2"
                  >
                    ¡Hola!
                  </Typography>

                  <Typography className={classes.p} align="justify">
                    A continuación le presentamos una lista de problemas que
                    tiene la gente.
                  </Typography>
                  <Typography className={classes.p} align="justify">
                    Lea cada uno de ellos y marque su respuesta con una cruz en
                    la casilla correspondiente, pensando en cómo se sintió, en
                    qué medida ese problema le ha preocupado o molestado durante
                    la última semana (7 días).
                  </Typography>
                  <Typography className={classes.p} align="justify">
                    Para comenzar, necesitamos conocer unos datos personales:
                  </Typography>

                  {/* Edad, sexo, educación, estado civil */}

                  <Grid
                    className={classes.gridData}
                    container
                    direction="row"
                    justify="center"
                    alignItems="flex-start"
                  >
                    <Grid item xs={12} sm={6} className={classes.right}>
                      <TextField
                        margin="normal"
                        name="edad"
                        label="Edad"
                        type="number"
                        className={classes.textField}
                        value={this.state.edad}
                        onChange={this.onChangeEdad}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        select
                        name="sexo"
                        label="Sexo"
                        margin="normal"
                        value={this.state.sexo}
                        className={classes.textField}
                        onChange={this.onChangeSexo}
                        SelectProps={{}}
                      >
                        {sexoOpt.map(opt => (
                          <MenuItem key={opt.key} value={opt.key}>
                            {opt.value}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions
                  className={classes.actions}
                  justify="space-between"
                >
                  <Button
                    component={Link}
                    to="/info"
                    size="small"
                    color="primary"
                    variant="text"
                  >
                    <Icon className={classes.icon}>info</Icon> Más Info
                  </Button>
                  <Button
                    className={classes.button}
                    type="submit"
                    size="medium"
                    color="primary"
                    variant="contained"
                  >
                    Empezar
                  </Button>
                </CardActions>
              </Card>
            </form>
          );
        }}
      </Consumer>
    );
  }
}

export default withStyles(styles)(Welcome);
