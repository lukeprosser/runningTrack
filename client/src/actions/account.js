/** @format */

import axios from 'axios';
import { triggerFeedback } from './feedback';

import { GET_ACCOUNT, ACCOUNT_FAILURE } from './types';

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
