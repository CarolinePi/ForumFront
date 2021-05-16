import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './Routes';
import * as serviceWorker from './serviceWorker';
import { Provider } from "react-redux"
import './index.css'
import store from './store/index'
import setAuthorizationToken  from './authorization/authorization';
import { LOGIN_SUCCESS } from './store/modules/auth/authTypes';

if (localStorage.token){
  setAuthorizationToken(localStorage.token) 
  let userData = {
    user: localStorage.getItem('user_data') == null
        ? null
        : JSON.parse(localStorage.getItem('user_data'))
  }
  store.dispatch({ type: LOGIN_SUCCESS, payload: userData})

}

ReactDOM.render(
    <Provider store={store}>
      <Routes />
    </Provider>,
    document.getElementById('root')
);
serviceWorker.unregister();
