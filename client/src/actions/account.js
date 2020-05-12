/** @format */

import axios from 'axios';
import { triggerFeedback } from './feedback';

import { GET_ACCOUNT, UPDATE_ACCOUNT, ACCOUNT_FAILURE } from './types';

// Get user account
export const getUserAccount = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/account/me');

    dispatch({
      type: GET_ACCOUNT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ACCOUNT_FAILURE,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Edit user account
export const updateUserAccount = (formFields, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/api/account', formFields, config);

    dispatch({
      type: UPDATE_ACCOUNT,
      payload: res.data,
    });

    dispatch(
      triggerFeedback(
        edit ? 'Account updated successfully' : 'Account created successfully',
        'success'
      )
    );

    if (!edit) {
      history.push('/dashboard');
    } else {
      history.push('/account');
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) =>
        dispatch(triggerFeedback(error.msg, 'warning'))
      );
    }

    dispatch({
      type: ACCOUNT_FAILURE,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
