/** @format */

import axios from 'axios';
import { triggerFeedback } from './feedback';

import { GET_ENTRIES, ENTRIES_FAILURE, ADD_ENTRY, DELETE_ENTRY } from './types';

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

// Add/update entry
export const addEntry = (formFields, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/api/entries', formFields, config);

    dispatch({
      type: ADD_ENTRY,
      payload: res.data,
    });

    dispatch(
      triggerFeedback(
        edit ? 'Entry updated successfully' : 'Entry added successfully',
        'success'
      )
    );

    if (!edit) {
      history.push('/dashboard');
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) =>
        dispatch(triggerFeedback(error.msg, 'warning'))
      );
    }

    dispatch({
      type: ENTRIES_FAILURE,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Remove entry
export const deleteEntry = (entryId) => async (dispatch) => {
  if (
    window.confirm(
      'Are you sure you want to delete this entry? This cannot be undone.'
    )
  ) {
    try {
      await axios.delete(`/api/entries/me/${entryId}`);

      dispatch({
        type: DELETE_ENTRY,
        payload: entryId,
      });

      dispatch(triggerFeedback('Entry deleted successfully', 'success'));
    } catch (err) {
      dispatch({
        type: ENTRIES_FAILURE,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
