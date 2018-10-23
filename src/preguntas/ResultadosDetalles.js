import React, { Component } from "react";
import { Consumer } from "../context";
import { Link } from "react-router-dom";
import {
  Paper,
  Typography,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Icon,
  withStyles,
  Modal,
  Button,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Grid
} from "@material-ui/core";
import dimensiones from "../data/dimensiones.json";

const colores = {
  ok: "#004a00",
  warn: "#a89300",
  danger: "#6f0000"
};

const styles = theme => ({
  title: {
    fontWeight: "bold",
    textAlign: "center"
  },
  body: {
    padding: theme.spacing.unit * 2
    // marginBottom: theme.spacing.unit * 2
  },
  bottom: {
    padding: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  p: {
    marginTop: theme.spacing.unit
  },
  footer: {
    marginTop: theme.spacing.unit
  },
  paper: {
    position: "absolute",
    width: "80%",
    maxWidth: theme.spacing.unit * 30,
    // backgroundColor: theme.palette.background.paper,
    // boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)"
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  },
  smCell: {
    width: theme.spacing.unit * 5
  }
});

class ResultadosDetalles extends Component {
  state = {
    modal: {
      open: false,
      title: "Lorem",
      text: "ispum"
    }
  };

  getColor(ptsT) {
    if (ptsT <= 60) return { color: colores.ok, text: "OK" };
    if (ptsT < 65) return { color: colores.warn, text: "Alerta" };
    return { color: colores.danger, text: "Peligro" };
  }

  onOpenModal = (idx, e) => {
    this.setState({
      modal: {
        open: true,
        title: dimensiones[idx].nombre,
        text: dimensiones[idx].desc
      }
    });
  };

  onCloseModal = e => {
    this.setState({
      modal: {
        open: false
      }
    });
  };

  render() {
    const { classes, history } = this.props;

    return (
      <Consumer>
        {({ t, avg, total }) => {
          const { modal } = this.state;

          if (!t) {
            history.push("/");
            return;
          }
          return (
            <React.Fragment>
              <Button size="small" component={Link} to="/resultados">
                <Icon>keyboard_arrow_left</Icon> Volver
              </Button>
              <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={modal.open}
                onClick={this.onCloseModal}
                onClose={this.onCloseModal}
              >
                <Paper className={classes.paper}>
                  <Typography variant="h6" id="modal-title">
                    {modal.title}
                  </Typography>
                  <Typography variant="subtitle1" id="simple-modal-description">
                    {modal.text}
                  </Typography>
                </Paper>
              </Modal>

              <Paper
                style={{ overflowX: "auto" }}
                className={`animated bounceInUp fast ${classes.bottom}`}
              >
                <Typography variant="h5" className={classes.title}>
                  Resultados
                </Typography>
              </Paper>

              {t.dim.map((item, idx) => {
                const { color, text } = this.getColor(item);
                return (
                  <ExpansionPanel
                    className="animated bounceInUp fast"
                    key={idx}
                  >
                    <ExpansionPanelSummary
                      expandIcon={<Icon>keyboard_arrow_down</Icon>}
                    >
                      <Typography style={{ color }} className={classes.heading}>
                        {dimensiones[idx].nombre}
                      </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <Grid container direction="column">
                        <Grid item>
                          <Table>
                            <TableBody>
                              <TableRow>
                                <TableCell>Puntos T</TableCell>
                                <TableCell>{item}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Promedio</TableCell>
                                <TableCell>
                                  {parseFloat(avg.dim[idx]).toFixed(2)}
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Total</TableCell>
                                <TableCell>{total.dim[idx]}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Resultado</TableCell>
                                <TableCell style={{ color }}>{text}</TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </Grid>
                        <Grid item>
                          <Button
                            fullWidth
                            style={{ marginTop: 8 }}
                            variant="extendedFab"
                            onClick={this.onOpenModal.bind(this, idx)}
                          >
                            <Icon>info</Icon> ¿Qué es esto?
                          </Button>
                        </Grid>
                      </Grid>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                );
              })}
            </React.Fragment>
          );
        }}
      </Consumer>
    );
  }
}

export default withStyles(styles)(ResultadosDetalles);
