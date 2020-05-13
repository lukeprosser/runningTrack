/** @format */

import axios from 'axios';
import { triggerFeedback } from './feedback';
import {
  AUTH_SUCCESS,
  AUTH_FAILURE,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
  SIGNOUT,
  CLEAR_ENTRIES,
  CLEAR_ACCOUNT,
} from './types';
import setTokenHeader from '../utils/setTokenHeader';

// Check user authentication
export const userAuth = () => async (dispatch) => {
  if (localStorage.token) {
    setTokenHeader(localStorage.token);
  }

  try {
    const res = await axios.get('/api/auth');

    dispatch({
      type: AUTH_SUCCESS,
      payload: res.data, // User data
    });
  } catch (err) {
    dispatch({
      type: AUTH_FAILURE,
    });
  }
};

// Sign up user
export const signup = ({ firstName, lastName, email, password }) => async (
  dispatch
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ firstName, lastName, email, password });

  try {
    const res = await axios.post('/api/users', body, config);

    dispatch({
      type: SIGNUP_SUCCESS,
      payload: res.data,
    });

    // Load user info after successful sign up
    dispatch(userAuth());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) =>
        dispatch(triggerFeedback(error.msg, 'warning'))
      );
    }

    dispatch({
      type: SIGNUP_FAILURE,
    });
  }
};

// Sign in user
export const signin = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/auth', body, config);

    dispatch({
      type: SIGNIN_SUCCESS,
      payload: res.data,
    });

    // Load user info after successful sign in
    dispatch(userAuth());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) =>
        dispatch(triggerFeedback(error.msg, 'warning'))
      );
    }

    dispatch({
      type: SIGNIN_FAILURE,
    });
  }
};

// Sign out user
export const signout = () => (dispatch) => {
  dispatch({ type: CLEAR_ENTRIES });

  dispatch({ type: CLEAR_ACCOUNT });

  dispatch({ type: SIGNOUT });
};
