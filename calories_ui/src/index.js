import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {Route} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';

import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Welcome from './components/welcome';
import UserPage from './components/user_page';
import Header from './components/header';
import RequireAuth from './components/auth/require_auth';
import UserFormPage from './components/user_form_page';
import reducers from './reducers';
import {isAuthenticated} from './actions'

import './css/style.css';

const history = createHistory();
const router = routerMiddleware(history);
const store = createStore(reducers, {}, applyMiddleware(thunk, router));

const token = localStorage.getItem('token');
// If we have a token, consider the user to be signed in
if (token) {
  // we need to update application state
  store.dispatch(isAuthenticated(token));
}

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
      <Header />
      <Route exact path="/" component={Welcome}/>
      <Route path="/signin" component={Signin} />
      <Route exact path="/signout" component={Signout} />
      <Route path="/new/:id" component={UserFormPage} />
      <Route path="/feature" component={RequireAuth(UserPage)} />
      </div>
    </ConnectedRouter>
  </Provider>
  , document.querySelector('.container'));
