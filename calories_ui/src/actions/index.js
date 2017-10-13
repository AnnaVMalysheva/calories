import axios from 'axios';
import decode from 'jwt-decode';
import {push} from 'react-router-redux';
import {
    AUTH_USER,
    UNAUTH_USER,
    CREATE_ERROR,
    FETCH_USERS,
    IS_AUTHENTICATED,
    IS_NOT_AUTHENTICATED,
    CLEAR_ERROR,
    AUTH_USER_DATA
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
            .catch(err => {
                // If request is bad...
                // - Show an error to the user
                dispatch(error(err.message));
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
            .catch(err => dispatch(error(err.message)));
    }
}

export function error(error) {
    return {
        type: CREATE_ERROR,
        payload: error
    };
}

export function signoutUser() {
    localStorage.removeItem('token');

    return {type: UNAUTH_USER};
}

export function fetchUsers(page, limit, sort, order) {
    return function (dispatch) {
        axios.get(`${ROOT_URL}/api/appUsers?page=${page - 1}&size=${limit}&sort=${sort},${order}`, {
            headers: {authorization: localStorage.getItem('token')}
        })
            .then(userCollection => {
                dispatch({type: FETCH_USERS,
                    payload: {
                        data: userCollection.data._embedded.appUsers,
                        page,
                        limit,
                        count: userCollection.data.page.totalElements,
                        sort,
                        order
                    }});
                dispatch(push(`/feature/?page=${page}&limit=${limit}&sort=${sort}&order=${order}`));
            }, error => {
                if (error.status.code === 403) {
                    throw error;
                }
            }).catch((err) => {
            dispatch(error(err.message));
        })
    }
}

    export function isAuthenticated(token) {
        const decodedToken = decode(token);
        const date = new Date(0);
        date.setUTCSeconds(decodedToken.exp);
        return function (dispatch) {
            if (date < new Date()) {
                dispatch({type: IS_NOT_AUTHENTICATED, payload: ''});
            } else {
                dispatch({type: IS_AUTHENTICATED});
                axios.get(`${ROOT_URL}/users/user`, {
                    headers: {authorization: localStorage.getItem('token')}
                     })
                    .then((response) => {
                    dispatch({type: AUTH_USER_DATA, payload: response.data})
                })
            }

            // axios.get(`${ROOT_URL}/users/user`, {
            //     headers: {authorization: localStorage.getItem('token')}
            // })
            //     .then((response) => {
            //         dispatch({type: IS_AUTHENTICATED, payload: response.data})
            //     })
            //     .catch((err) => {
            //         dispatch(error(err.message));
            //         dispatch({type: IS_NOT_AUTHENTICATED, payload: ''});
            //     })
        }
    }

    export const clearErrors = () => dispatch =>
        dispatch({
            type: CLEAR_ERROR
        });

    export function removeUser(id, shouldRemoveFromState, callback){
        console.log(id);
    }

