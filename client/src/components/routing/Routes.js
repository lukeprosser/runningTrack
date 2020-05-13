/** @format */

import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Utilities
import PrivateRoute from '../routing/PrivateRoute';
import NotFound from '../layout/NotFound';
// Authorisation
import Signup from '../auth/Signup';
import Login from '../auth/Login';
// Dashboard
import Dashboard from '../dashboard/Dashboard';
// Account
import Account from '../account/Account';
import CreateAccount from '../account/CreateAccount';
import UpdateAccount from '../account/UpdateAccount';
// Entries
import AddEntry from '../entries/AddEntry';

const Routes = () => {
  return (
    <Switch>
      <Route exact path='/signup' component={Signup} />
      <Route exact path='/login' component={Login} />
      <PrivateRoute exact path='/dashboard' component={Dashboard} />
      <PrivateRoute exact path='/account' component={Account} />
      <PrivateRoute exact path='/create-account' component={CreateAccount} />
      <PrivateRoute exact path='/update-account' component={UpdateAccount} />
      <PrivateRoute exact path='/add-entry' component={AddEntry} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
