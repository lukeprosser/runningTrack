/** @format */

import axios from 'axios';
import { triggerFeedback } from './feedback';

import {
  GET_ACCOUNT,
  UPDATE_ACCOUNT,
  ACCOUNT_FAILURE,
  CLEAR_ACCOUNT,
  DELETE_ACCOUNT,
  CLEAR_ENTRIES,
} from './types';

// Get user account
export const getUserAccount = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/account/me');

    dispatch({
      type: GET_ACCOUNT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ CLEAR_ACCOUNT });

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

// Delete user account
export const deleteUserAccount = () => async (dispatch) => {
  if (
    window.confirm(
      'Are you sure you want to delete your account? This cannot be undone.'
    )
  ) {
    try {
      await axios.delete('/api/account');

      dispatch({ type: CLEAR_ENTRIES });
      dispatch({ type: CLEAR_ACCOUNT });
      dispatch({ type: DELETE_ACCOUNT });

      dispatch(triggerFeedback('Your account has been deleted', 'success'));
    } catch (err) {
      dispatch({
        type: ACCOUNT_FAILURE,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
