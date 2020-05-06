/** @format */

import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';

import './App.css';

const App = () => {
  return (
    <Router>
      <Fragment>
        <Navbar />
        <Route exact path='/' component={Landing} />
        <Switch>
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/login' component={Login} />
        </Switch>
      </Fragment>
    </Router>
  );
};

export default App;
