import axios from 'axios';
import {push} from 'react-router-redux';
import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    FETCH_USERS,
    IS_AUTHENTICATED,
    IS_NOT_AUTHENTICATED
} from './types';

const ROOT_URL = 'http://localhost:8090';

export function signinUser({email, password}) {
    return function (dispatch) {
        // Submit email/password to the server
        axios.post(`${ROOT_URL}/login`, {username: email, password: password})
            .then(response => {
                // If request is good...
                // - Update state to indicate user is authenticated
                dispatch({type: AUTH_USER, payload: response.data});
                // - Save the JWT token
                localStorage.setItem('token', response.data.token);
                // - redirect to the route '/feature'
                dispatch(push('/feature'));
            })
            .catch(() => {
                // If request is bad...
                // - Show an error to the user
                dispatch(authError('Bad Login Info'));
            });
    }
}

export function signupUser({email, password, role}) {
    return function (dispatch) {
        axios.post(`${ROOT_URL}/users/sign-up`, {username: email, password: password, role: role})
            .then(response => {
                dispatch({type: AUTH_USER, payload: response.data});
                localStorage.setItem('token', response.data.token);
                dispatch(push('/feature'));
            })
            .catch(response => dispatch(authError(response.data.error)));
    }
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    };
}

export function signoutUser() {
    localStorage.removeItem('token');

    return {type: UNAUTH_USER};
}

export function fetchUsers() {
    return function (dispatch) {
        axios.get(`${ROOT_URL}/api/appUsers`, {
            headers: {authorization: localStorage.getItem('token')}
        })
            .then(userCollection => {
                return userCollection;
            }, error => {
                if (error.status.code === 403) {
                    dispatch({type: "ERROR_RESPONSE", payload: error})
                    throw error;
                }
            }).then(userCollection => {
            dispatch({type: FETCH_USERS, payload: userCollection.data._embedded.appUsers});
        }).catch((err) => {
            dispatch({type: "ERROR_RESPONSE", payload: err})
        })
    }
}

    export function isAuthenticated() {
        return function (dispatch) {
            axios.get(`${ROOT_URL}/users/user`, {
                headers: {authorization: localStorage.getItem('token')}
            })
                .then((response) => {
                    dispatch({type: IS_AUTHENTICATED, payload: response.data})
                })
                .catch((err) => {
                    dispatch({type: IS_NOT_AUTHENTICATED, payload: ''})
                })
        }
    }

