/** @format */

import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Feedback from './components/utils/Feedback';
import Dashboard from './components/dashboard/Dashboard';
import Account from './components/account/Account';
import CreateAccount from './components/account/CreateAccount';
import UpdateAccount from './components/account/UpdateAccount';
import AddEntry from './components/entries/AddEntry';
import PrivateRoute from './components/routing/PrivateRoute';

// Redux
import { Provider } from 'react-redux';
import store from './store';

// User authentication
import { userAuth } from './actions/auth';
import setTokenHeader from './utils/setTokenHeader';

import './style/App.scss';

// Check local storage for user token throughout application
if (localStorage.token) {
  setTokenHeader(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(userAuth());
  }, []); // Empty [] added so that useEffect() only runs once on mount (prevents continuous looping)

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <Feedback />
          <Switch>
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/login' component={Login} />
            <PrivateRoute exact path='/dashboard' component={Dashboard} />
            <PrivateRoute exact path='/account' component={Account} />
            <PrivateRoute
              exact
              path='/create-account'
              component={CreateAccount}
            />
            <PrivateRoute
              exact
              path='/update-account'
              component={UpdateAccount}
            />
            <PrivateRoute exact path='/add-entry' component={AddEntry} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
