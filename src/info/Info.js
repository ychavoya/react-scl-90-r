import React from "react";
import {
  Paper,
  Typography,
  withStyles,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Icon,
  IconButton,
  Button,
  Grid
} from "@material-ui/core";
import { Link } from "react-router-dom";
import dimensiones from "../data/dimensiones.json";
import globales from "../data/globales.json";

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
  }
});

function Info(props) {
  const { classes } = props;
  return (
    <React.Fragment>
      <Button size="small" component={Link} to="/">
        <Icon>keyboard_arrow_left</Icon> Volver
      </Button>
      <Paper className={`animated bounceInUp fast ${classes.body}`}>
        <Typography variant="h5" className={classes.title}>
          ¿Qué es SCL-90-R?
        </Typography>

        <Typography className={classes.p}>
          Este inventario ha sido desarrollado para evaluar patrones de síntomas
          presentes en individuos y puede ser utilizado tanto en tareas
          comunitarias como de diagnóstico clínico.
        </Typography>
        <Typography className={classes.p}>
          Cada uno de los 90 ítems que lo integran se responde sobre la base de
          una escala de cinco puntos. Se lo evalúa e interpreta en función de
          nueve dimensiones primarias y tres índices globales de malestar
          psicológico.
        </Typography>
      </Paper>

      <Paper className={`animated bounceInUp fast ${classes.bottom}`}>
        <Typography variant="h5" className={classes.title}>
          Dimensiones
        </Typography>
      </Paper>
      {dimensiones.map((dim, idx) => {
        return (
          <ExpansionPanel className="animated bounceInUp fast" key={dim.abbr}>
            <ExpansionPanelSummary
              expandIcon={<Icon>keyboard_arrow_down</Icon>}
            >
              <Typography className={classes.heading}>
                {idx + 1}. {dim.nombre}
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>{dim.desc}</Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        );
      })}

      <Paper className={`animated bounceInUp fast ${classes.bottom}`}>
        <Typography variant="h5" className={classes.title}>
          Índices globales
        </Typography>
      </Paper>
      {globales.map((dim, idx) => {
        return (
          <ExpansionPanel className="animated bounceInUp fast" key={dim.abbr}>
            <ExpansionPanelSummary
              expandIcon={<Icon>keyboard_arrow_down</Icon>}
            >
              <Typography className={classes.heading}>
                {idx + 1}. {dim.nombre}
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>{dim.desc}</Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        );
      })}

      <Paper className={`animated bounceInUp fast ${classes.bottom}`}>
        <Typography variant="h5" className={classes.title}>
          Fuentes
        </Typography>

        <Typography className={classes.p}>
          Casullo, M. (2008). El Inventario de Síntomas SCL-90-R de L.
          Derogatis. CONICET.
        </Typography>
        <Typography className={classes.p}>
          Derogatis, L. (1994). SCL-90-R. Symptom Checklist-90-R.
          Administration, Scoring and Procedures Manual. Minneapolis: National
          Computer System.
        </Typography>
      </Paper>

      <Grid
        className={classes.footer}
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Typography>Yael Chavoya, 2018</Typography>
        <IconButton
          href="https://github.com/Woomber"
          className={classes.button}
          size="small"
          aria-label="Delete"
        >
          <i className="fab fa-github" />
        </IconButton>
      </Grid>
    </React.Fragment>
  );
}

export default withStyles(styles)(Info);
