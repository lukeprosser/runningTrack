/** @format */

import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Routes from './components/routing/Routes';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Feedback from './components/utils/Feedback';

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
          <Feedback />
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route component={Routes} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
