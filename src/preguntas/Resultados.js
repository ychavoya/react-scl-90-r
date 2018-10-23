import React, { Component } from "react";
import { Consumer } from "../context";
import { Link } from "react-router-dom";
import {
  Paper,
  Typography,
  withStyles,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@material-ui/core";
import dimensiones from "../data/dimensiones.json";
import globales from "../data/globales.json";

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
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    },
    height: 32
  },
  smCell: {
    width: theme.spacing.unit * 5
  }
});

class Resultados extends Component {
  getColor(ptsT) {
    if (ptsT <= 60) return { color: colores.ok, text: "OK" };
    if (ptsT < 65) return { color: colores.warn, text: "Alerta" };
    return { color: colores.danger, text: "Peligro" };
  }

  render() {
    const { classes, history } = this.props;

    return (
      <Consumer>
        {({ t, avg, total, edad, sexo }) => {
          if (!t) {
            history.push("/");
            return;
          }
          return (
            <React.Fragment>
              <Paper
                style={{ overflowX: "auto" }}
                className={`animated bounceInUp fast ${classes.bottom}`}
              >
                <Typography variant="h5" className={classes.title}>
                  Resultados
                </Typography>
                <Typography className={classes.title}>
                  {edad} {sexo} - {new Date().toLocaleDateString()}
                </Typography>

                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Nombre</TableCell>
                      <TableCell>Pts T</TableCell>
                      <TableCell>Stat</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {t.dim.map((item, idx) => {
                      const { color, text } = this.getColor(item);

                      return (
                        <TableRow key={idx} className={classes.row}>
                          <TableCell style={{ color }}>
                            {dimensiones[idx].abbr}
                          </TableCell>
                          <TableCell style={{ color }}>{item}</TableCell>
                          <TableCell style={{ color }}>{text}</TableCell>
                        </TableRow>
                      );
                    })}

                    <TableRow className={classes.row}>
                      <TableCell
                        style={{ color: this.getColor(t.idx.igs).color }}
                      >
                        {globales[0].abbr}
                      </TableCell>
                      <TableCell
                        style={{ color: this.getColor(t.idx.igs).color }}
                      >
                        {t.idx.igs}
                      </TableCell>
                      <TableCell
                        style={{ color: this.getColor(t.idx.igs).color }}
                      >
                        {this.getColor(t.idx.igs).text}
                      </TableCell>
                    </TableRow>
                    <TableRow className={classes.row}>
                      <TableCell
                        style={{ color: this.getColor(t.idx.tsp).color }}
                      >
                        {globales[1].abbr}
                      </TableCell>
                      <TableCell
                        style={{ color: this.getColor(t.idx.tsp).color }}
                      >
                        {t.idx.tsp}
                      </TableCell>
                      <TableCell
                        style={{ color: this.getColor(t.idx.tsp).color }}
                      >
                        {this.getColor(t.idx.tsp).text}
                      </TableCell>
                    </TableRow>
                    <TableRow className={classes.row}>
                      <TableCell
                        style={{ color: this.getColor(t.idx.imsp).color }}
                      >
                        {globales[2].abbr}
                      </TableCell>
                      <TableCell
                        style={{ color: this.getColor(t.idx.imsp).color }}
                      >
                        {t.idx.imsp}
                      </TableCell>
                      <TableCell
                        style={{ color: this.getColor(t.idx.imsp).color }}
                      >
                        {this.getColor(t.idx.imsp).text}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Paper>

              <Button
                className="animated bounceInUp fast"
                fullWidth
                style={{ marginTop: 8 }}
                size="large"
                variant="contained"
                component={Link}
                to="/resultados/more"
              >
                Más detalles
              </Button>

              <Button
                className="animated bounceInUp fast"
                fullWidth
                style={{ marginTop: 8 }}
                size="large"
                variant="contained"
                component={Link}
                to="/"
              >
                Finalizar
              </Button>
            </React.Fragment>
          );
        }}
      </Consumer>
    );
  }
}

export default withStyles(styles)(Resultados);
