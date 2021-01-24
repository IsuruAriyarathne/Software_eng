import React from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import * as actions from '../../store/actions/index';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
//   paper: {
//     padding: theme.spacing(2),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//   },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
  },
}));

function Request(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
         <form noValidate autoComplete="off" className={classes.form} >
         <Grid container spacing={3}>
            <Grid item xs={6}>
                <Typography variant="h6" gutterBottom>
                    StationID : {props.stationID}
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="h6" gutterBottom>
                    Date
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    id="standard-full-width"
                    label="Description"
                    style={{ margin: 8 }}
                    placeholder="Placeholder"
                    width= "50%"
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                    Weapons
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <TextField
                    label="Weapon Model"
                    id="weaponmodel"
                    defaultValue="Small"
                    variant="outlined"
                    size="small"
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    label="Ammount"
                    id="weaponammount"
                    defaultValue="Small"
                    variant="outlined"
                    size="small"
                />
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                    Ammunition
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <TextField
                    label="Ammunition Model"
                    id="ammunitionmdel"
                    defaultValue="Small"
                    variant="outlined"
                    size="small"
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    label="Ammount"
                    id="ammunitionammount"
                    defaultValue="Small"
                    variant="outlined"
                    size="small"
                />
            </Grid>
            </Grid>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                margin= "10px"
                className={classes.submit}
            >
                Submit
            </Button>
         </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
      error: state.auth.error,
      stationID:state.auth.stationID,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addAlert: alert => dispatch(actions.addAlert(alert)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Request);


  