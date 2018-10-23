import React, { Component } from "react";
import { AppBar, Typography, withStyles, Grid } from "@material-ui/core";
import { withRouter } from "react-router-dom";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  bar: {
    padding: 2 * theme.spacing.unit,
    flexDirection: "row"
  },
  grow: {
    flexGrow: 1,
    textAlign: "center",
    margin: "auto"
  },
  icon: {
    fontWeight: "bold",
    color: "white"
  },
  float: {
    float: "left"
  }
});

class Navbar extends Component {
  showBack() {
    //   const { history, classes } = this.props;

    //   if (history.location.pathname !== "/") {
    //     return (
    //       <Grid item className={classes.float}>
    //         <Link to="/">
    //           <Typography className={classes.icon}>
    //             <Icon>keyboard_arrow_left</Icon>
    //             Inicio
    //           </Typography>
    //         </Link>
    //       </Grid>
    //     );
    //   }
    return null;
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.bar}>
          <Grid container alignItems="center" justify="center">
            {this.showBack()}
            <Grid item>
              <Typography variant="h5" color="inherit" className={classes.grow}>
                SCL 90 R
              </Typography>
            </Grid>
          </Grid>
        </AppBar>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(Navbar));
