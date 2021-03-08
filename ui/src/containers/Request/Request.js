import React,{useCallback} from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
import {saveRequest } from "../../api/Request"
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import * as actions from '../../store/actions/index';
let newDate = new Date()

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

  const onSubmitHandler = useCallback((event) => {
    event.preventDefault()

    let data={
        "date": "2021-01-12",
        "comments": "\"Need urgently\"",
        "state": "Pending",
        "stationID": 1,
        "AmmunitionRequests": [
            {
                "amount": 100,
                "ammoModelID": 1
            }
        ],
        "WeaponRequests": [
            {
                "amount": 20,
                "weaponModelID": 1
    
            }
        ]
    }

    saveRequest(data)
        .then((response) => {
            if (!response.error) {
                alert("Request successfully added")
              // (response.data).forEach(user => setUsers(user));
              console.log(response)
            }
         })

  }, []);

  return (
    <div className={classes.root}>
         <form noValidate autoComplete="off" className={classes.form} onSubmit={onSubmitHandler}>
         <Grid container spacing={3}>
            <Grid item xs={6}>
                <Typography variant="h6" gutterBottom>
                    StationID : {props.stationID}
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="h6" gutterBottom>
                    Date : {newDate.getFullYear()}/{newDate.getMonth() + 1}/{newDate.getDate()}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    id="standard-full-width"
                    label="Description"
                    style={{ margin: 8 }}
                    placeholder="Placeholder"
                    fullWidth
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
            <Grid item xs={4}>
                <TextField
                    label="Weapon Model"
                    id="weaponmodel1"
                    variant="outlined"
                    size="small"
                />
            </Grid>
            <Grid item xs={4}>
                <TextField
                    label="Company Name"
                    id="companynameweapon1"
                    variant="outlined"
                    size="small"
                />
            </Grid>
            <Grid item xs={4}>
                <TextField
                    label="Ammount"
                    id="weaponammount1"
                    variant="outlined"
                    size="small"
                />
            </Grid>
            <Grid item xs={4}>
                <TextField
                    label="Weapon Model"
                    id="weaponmodel2"
                    variant="outlined"
                    size="small"
                />
            </Grid>
            <Grid item xs={4}>
                <TextField
                    label="Company Name"
                    id="companynameweapon2"
                    variant="outlined"
                    size="small"
                />
            </Grid>
            <Grid item xs={4}>
                <TextField
                    label="Ammount"
                    id="weaponammount2"
                    variant="outlined"
                    size="small"
                />
            </Grid>
            <Grid item xs={4}>
                <TextField
                    label="Weapon Model"
                    id="weaponmodel3"
                    variant="outlined"
                    size="small"
                />
            </Grid>
            <Grid item xs={4}>
                <TextField
                    label="Company Name"
                    id="companynameweapon3"
                    variant="outlined"
                    size="small"
                />
            </Grid>
            <Grid item xs={4}>
                <TextField
                    label="Ammount"
                    id="weaponammount3"
                    variant="outlined"
                    size="small"
                />
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                    Ammunition
                </Typography>
            </Grid>
            <Grid item xs={4}>
                <TextField
                    label="Ammunition Model"
                    id="ammunitionmdel1"
                    variant="outlined"
                    size="small"
                />
            </Grid>
            <Grid item xs={4}>
                <TextField
                    label="Company Name"
                    id="company name1"
                    variant="outlined"
                    size="small"
                />
            </Grid>
            <Grid item xs={4}>
                <TextField
                    label="Ammount"
                    id="ammunitionammount1"
                    variant="outlined"
                    size="small"
                />
            </Grid>
            <Grid item xs={4}>
                <TextField
                    label="Ammunition Model"
                    id="ammunitionmdel2"
                    variant="outlined"
                    size="small"
                />
            </Grid>
            <Grid item xs={4}>
                <TextField
                    label="Company Name"
                    id="company name2"
                    variant="outlined"
                    size="small"
                />
            </Grid>
            <Grid item xs={4}>
                <TextField
                    label="Ammount"
                    id="ammunitionammount2"
                    variant="outlined"
                    size="small"
                />
            </Grid>
            <Grid item xs={4}>
                <TextField
                    label="Ammunition Model"
                    id="ammunitionmdel3"
                    variant="outlined"
                    size="small"
                />
            </Grid>
            <Grid item xs={4}>
                <TextField
                    label="Company Name"
                    id="company name3"
                    variant="outlined"
                    size="small"
                />
            </Grid>
            <Grid item xs={4}>
                <TextField
                    label="Ammount"
                    id="ammunitionammount3"
                    variant="outlined"
                    size="small"
                />
            </Grid>
            </Grid>
            <br></br>
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


  