import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  IS_AUTHENTICATED,
  IS_NOT_AUTHENTICATED,
  AUTH_USER_DATA
} from '../actions/types';

const initialState = {
    authenticated: false,
    error: '',
    userData: null,
    isAdmin:false,
    isManager:false
};

export default function(state = initialState, action) {
  switch(action.type) {
    case AUTH_USER:
      return { ...state, error: '', authenticated: true, userData:action.payload, isAdmin: action.payload.permissions.includes("ROLE_ADMIN")};
    case UNAUTH_USER:
      return { ...state, authenticated: false };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    case IS_AUTHENTICATED:
      return { ...state, authenticated: true};
      case AUTH_USER_DATA:
          return { ...state, userData:action.payload, isAdmin: action.payload.permissions.includes("ROLE_ADMIN")};
    case IS_NOT_AUTHENTICATED:
      return { ...state, authenticated: false, userData: null };
  }

  return state;
}
