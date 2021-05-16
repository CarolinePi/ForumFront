import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import CreateThread from './components/threads/CreateThread';
import Dashboard from './components/Dashboard';
import { history } from './history'
import Profile from './components/users/Profile';
import ForgotPassword from './components/users/ForgotPassword.js';
import ResetPassword from './components/users/ResetPassword';
import ThreadDetails from './components/threads/ThreadDetails'
import TopicDetails from './components/topics/TopicDetails'
import CreateTopic from "./components/topics/CreateTopic";



const Routes  = () => {
    return (
      <Router history={history}>
        <div className="App">
          <Switch>
            <Route exact path='/' component={ Dashboard } />
            <Route path='/login' component={Login} />
            <Route path='/registration' component={Register} />
            <Route path='/createthread/:id' component={CreateThread} />
            <Route path='/createtopic' component={CreateTopic} />
            <Route path='/profile/:id' component={Profile} />
            <Route path='/forgotpassword' component={ForgotPassword} />
            <Route path='/resetpassword/:token' component={ResetPassword} />
            <Route path='/threads/:id' component={ThreadDetails} />
            <Route path='/topic/:id' component={TopicDetails} />
          </Switch>
        </div>
      </Router>
      
    );
}

export default Routes;

