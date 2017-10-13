import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';
import usersReducer from './users_reducer';
import errors from './errors';

const rootReducer = combineReducers({
  form,
  errors,
  auth: authReducer,
  users: usersReducer
});

export default rootReducer;
