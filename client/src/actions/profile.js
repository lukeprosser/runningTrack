/** @format */

import axios from 'axios';
import { triggerFeedback } from './feedback';

import { GET_PROFILE, PROFILE_FAILURE } from './types';

// Get user profile
export const getUserProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile/me');

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_FAILURE,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
