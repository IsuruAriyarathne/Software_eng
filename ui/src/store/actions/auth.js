import axios from '../../axios-SE';
import * as actionTypes from './actionTypes';
import { loginRoute, authRequestTimeoutSec } from '../../shared/consts';

let authRequestInterceptor;

const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

const authSuccess = (token, type) => {
    authRequestInterceptor = axios.interceptors.request.use(request => {
        request.headers.Authorization = `Bearer ${token}`;
        return request;
    });

    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        usertype: type
    };
};

const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const authLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usertype');
    localStorage.removeItem('expirationDate');
    axios.interceptors.request.eject(authRequestInterceptor);
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

const checkAuthTimeout = (expirationTime) => (dispatch) => {
    setTimeout(() => {
        dispatch(authLogout());
    }, expirationTime * 1000)
};

export const auth = (email, password) => (dispatch) => {
    dispatch(authStart());
    let authData = {
        officerID: email,
        password: password,
    }
    let url = loginRoute;
    console.log(authData);

    axios.post(url,
        authData)
        .then((response) => {
            if (response.data) {
                const expirationDate = new Date(new Date().getTime() + authRequestTimeoutSec * 1000);
                console.log(response.data.type);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('usertype', response.data.type);
                localStorage.setItem('expirationDate', expirationDate);
                dispatch(authSuccess(response.data.token, response.data.type));
                dispatch(checkAuthTimeout(authRequestTimeoutSec));
            } else {
                dispatch(authFail('User must be an admin'));
            }
        });
}

export const authCheckState = () => (dispatch) => {
    const token = localStorage.getItem('token');
    if (!token) {
        dispatch(authLogout());
    } else {
        const expirationDate = new Date(localStorage.getItem('expirationDate'));
        if (expirationDate <= new Date()) {
            dispatch(authLogout());
        } else {
            const usertype = localStorage.getItem('type');
            dispatch(authSuccess(token, usertype));
            dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
        }
    }
}
