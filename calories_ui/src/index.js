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
import Signup from './components/auth/signup';
import Feature from './components/feature';
import Header from './components/header';
import RequireAuth from './components/auth/require_auth';
import Welcome from './components/welcome';
import reducers from './reducers';
import { AUTH_USER } from './actions/types';

const history = createHistory();
const router = routerMiddleware(history);
const store = createStore(reducers, {}, applyMiddleware(thunk, router));

const token = localStorage.getItem('token');
// If we have a token, consider the user to be signed in
if (token) {
  // we need to update application state
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
      <Header />
      <Route exact path="/" component={Welcome}/>
      <Route path="/signin" component={Signin} />
      <Route exact path="/signout" component={Signout} />
      <Route path="/signup" component={Signup} />
      <Route path="/feature" component={RequireAuth(Feature)} />
      </div>
    </ConnectedRouter>
  </Provider>
  , document.querySelector('.container'));
