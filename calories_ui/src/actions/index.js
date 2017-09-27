import axios from 'axios';
import { push } from 'react-router-redux';
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_USERS
} from './types';

const ROOT_URL = 'http://localhost:8090';

export function signinUser({ email, password }) {
  return function(dispatch) {
    // Submit email/password to the server
    axios.post(`${ROOT_URL}/login`, { username : email, password: password })
      .then(response => {
        // If request is good...
        // - Update state to indicate user is authenticated
        dispatch({ type: AUTH_USER });
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

export function signupUser({ email, password }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/users/sign-up`, { username : email, password: password })
      .then(response => {
        dispatch({ type: AUTH_USER });
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

  return { type: UNAUTH_USER };
}

export function fetchUsers() {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/api/appUsers`, {
      headers: { authorization: localStorage.getItem('token') }
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
