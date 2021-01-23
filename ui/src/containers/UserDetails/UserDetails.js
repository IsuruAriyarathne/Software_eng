import { useEffect, useState ,useCallback} from 'react';
import { connect } from 'react-redux';

import { useParams } from "react-router-dom";
import { Paper } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
// import Spinner from "../../components/UI/Spinner/Spinner";
import { getUser } from '../../api/UsersAPI';
import Button from '@material-ui/core/Button';
import { updateObject, formIsValid } from '../../shared/utility';
import { checkValidity } from '../../shared/validate';
import { buildTextFields } from '../../helpers/uiHelpers';
// import { changePassword } from "../../api/UsersAPI";
import * as actions from '../../store/actions/index';
// import { SNACKBAR } from "../../components/UI/FHSnackBar/FHSnackBar";

const tableOptions = {
    pageSize: 10,
    pageSizeOptions: [10, 30, 50]
};

const inputDefinitions = {
    newPassword: {
        label: 'New Password*',
        // type: 'password',
        validations: {
            required: true,
            minLength: 6,
            maxLength: 40,
            validationErrStr: 'Use between 6 and 40 characters for your password'
        }
    },
    confirmPassword: {
        label: 'Confirm Password*',
        // type: 'password',
        validations: {
            required: true,
            minLength: 6,
            maxLength: 40,
            validationErrStr: 'Use between 6 and 40 characters for your password'
        }
    }
};

const useStyles = makeStyles((theme) => ({
    submitbtn: {
        margin: '20px'
    },
    changePassword: {
        margin: '20px'
    },
}));

const UsersDetail = props => {
    const { addAlert } = props;
    const classes = useStyles();
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState([]);

    useEffect(() => {
        getUser(id)
            .then(response => {
                if (!response.error) {
                    console.log(response.data);
                    setUser(response.data);
                }
            }).finally(() => setIsLoading(false))
    }, [setIsLoading, setUser, id]);

    console.log(user);
    const [inputIsValid, setInputIsValid] = useState({
        newPassword: true,
        confirmPassword: true
    });
    const [password, setPassword] = useState({
        newPassword: '',
        confirmPassword: ''
    });

    const inputProperties = {
        newPassword: {
            styleClass: classes.changePassword
        },
        confirmPassword: {
            styleClass: classes.changePassword
        }
    };

    const inputChangeHandler = useCallback((event, inputId) => {
        let validationConst = inputDefinitions[inputId].validations;
        let isValid = checkValidity(validationConst, event.target.value);
        setInputIsValid(updateObject(inputIsValid, { [inputId]: isValid }));
        setPassword(updateObject(password, { [inputId]: event.target.value }))
    }, [password, inputIsValid]);

    const checkInputValidity = useCallback((inputId, newValue) => {
        let isValid = true;

        let validationConst = inputDefinitions[inputId].validations;
        isValid = checkValidity(validationConst, newValue ? newValue : password[inputId])

        return isValid;
    }, [password])

    const onSubmitHandler = useCallback((event) => {
        event.preventDefault()

        let localInputIsValid = { ...inputIsValid };
        localInputIsValid['newPassword'] = checkInputValidity('newPassword');
        localInputIsValid['confirmPassword'] = checkInputValidity('confirmPassword');
        setInputIsValid(localInputIsValid);

        if (localInputIsValid['newPassword'] && localInputIsValid['confirmPassword']) {
            let passworddata={
                newPassword : password.newPassword,
                confirmNewPassword : password.confirmPassword
            };
            // changePassword(passworddata)
            //     .then((response) => {
            //         if (!response.error) {
            //             addAlert({
            //                 message: "Password Reset Successful!",
            //                 type: SNACKBAR
            //             });
            //         }
            //     });
        }
    }, [password, checkInputValidity, inputIsValid, addAlert]);

    let inputFields = buildTextFields(inputDefinitions, inputProperties, inputChangeHandler, inputIsValid);

    if (false) {
        // return <Spinner />
    } else {
        return (
            <div>
                <Paper>
                    <h4>Name : {user.name}</h4>
                    <h4>Email : {user.email}</h4>
                    <h4>Role : {user.role}</h4>
                    <h4>Station ID : {user.stationID}</h4>
                    <form noValidate autoComplete="off" onSubmit={onSubmitHandler}>
                        {inputFields}
                        <Button variant="contained" color="primary" className={classes.submitbtn} disabled={!formIsValid(inputIsValid)} type='submit'>
                            Change Password
                        </Button>
                    </form>
                </Paper>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      addAlert: alert => dispatch(actions.addAlert(alert))
    };
}

export default connect(null, mapDispatchToProps)(UsersDetail);