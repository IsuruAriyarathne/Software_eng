import React, { useState, useCallback, useEffect}  from 'react';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { checkValidity } from '../../shared/validate';
import { updateObject, formIsValid } from '../../shared/utility';
import { buildTextFields } from '../../helpers/uiHelpers';
import { auth } from '../../store/actions/index';
import { addAlert } from '../../store/actions/index';
import * as routez from '../../shared/routes';

const inputDefinitions = {
    username: {
        label: 'Username*',
        validations: {
            required: true,
            minLength: 0,
            maxLength: 40,
            validationErrStr: 'Use between 2 and 40 characters for your password'
        }
    },
    password: {
        label: 'Password*',
        type: 'password',
        validations: {
            required: true,
            minLength: 0,
            maxLength: 40,
            validationErrStr: 'Use between 6 and 40 characters for your password'
        }
    }
};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  loginInput: {
    width: '100%',
    marginTop: '20px'
  },
}));

function SignIn(props) {
    const classes = useStyles();
    let history = useHistory();

    const [inputIsValid, setInputIsValid] = useState({
        username: true,
        password: true
    });

    const [authObj, setAuthObj] = useState({
        username: '',
        password: ''
    });

    const inputProperties = {
        username: {
            styleClass: classes.loginInput
        },
        password: {
            styleClass: classes.loginInput
        }
    };

    const checkInputValidity = useCallback((inputId, newValue) => {
        let isValid = true;
        let validationConst = inputDefinitions[inputId].validations;
        isValid = checkValidity(validationConst, newValue ? newValue : authObj[inputId])

        return isValid;
    }, [authObj])

    const inputChangeHandler = useCallback((event, inputId) => {
        let validationConst = inputDefinitions[inputId].validations;
        let isValid = checkValidity(validationConst, event.target.value);
        setInputIsValid(updateObject(inputIsValid, { [inputId]: isValid }));
        setAuthObj(updateObject(authObj, { [inputId]: event.target.value }))
    }, [authObj, inputIsValid]);

    let inputFields = buildTextFields(inputDefinitions, inputProperties, inputChangeHandler, inputIsValid);

    const onSubmitHandler = useCallback((event) => {
        event.preventDefault()

        let localInputIsValid = { ...inputIsValid };
        localInputIsValid['username'] = checkInputValidity('username');
        localInputIsValid['password'] = checkInputValidity('password');
        setInputIsValid(localInputIsValid);

        if (localInputIsValid['username'] && localInputIsValid['password']) {
            console.log(authObj.username)
            console.log(authObj.password)
            props.onAuth(
                authObj.username,
                authObj.password
            );
        }
    }, [authObj, checkInputValidity, inputIsValid]);

    const authError = props.error;
    console.log(authError);
    const addAlert = props.addAlert;
    useEffect(() => {
        if (authError) {
            addAlert({
                severity: 'error',
                message: authError
            });
        }
    }, [authError, addAlert]);

    if (props.isAuthenticated){
        if(props.usertype==="Admin"){
            history.push(routez.USERS);
        }else if (props.usertype==="Officer"){
            history.push(routez.WEAPONS);
        } else {
            console.log("hiiii");
            history.push(routez.COMPANIES);
        }
    }

  return (
    <React.Fragment>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <form noValidate autoComplete="off" className={classes.form} onSubmit={onSubmitHandler}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography variant="h5">
                        Sign In
                    </Typography>
                    {inputFields}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={!formIsValid(inputIsValid)}
                    >
                        Sign In
                    </Button>
                </form>
            </div>
        </Container>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
    return {
        error: state.auth.error,
        loading: state.auth.loading,
        isAuthenticated: state.auth.token != null,
        authRedirectPath: state.auth.authRedirectPath,
        usertype:state.auth.usertype,
        stationID:state.auth.stationID,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (username, password) => dispatch(auth(username, password)),
        addAlert: (alert) => dispatch(addAlert(alert))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);