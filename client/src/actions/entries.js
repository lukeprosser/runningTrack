/** @format */

import axios from 'axios';
import { triggerFeedback } from './feedback';

import { GET_ENTRIES, ENTRIES_FAILURE } from './types';

// Get all entries for current user
export const getUserEntries = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/entries/me');

    dispatch({
      type: GET_ENTRIES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ENTRIES_FAILURE,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
