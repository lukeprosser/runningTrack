/** @format */

import axios from 'axios';
import { triggerFeedback } from './feedback';
import { SIGNUP_SUCCESS, SIGNUP_FAILURE } from './types';

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
