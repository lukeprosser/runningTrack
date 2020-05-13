/** @format */

import {
  GET_ENTRIES,
  ENTRIES_FAILURE,
  CLEAR_ENTRIES,
  ADD_ENTRY,
} from '../actions/types';

const initialState = {
  entries: [],
  loading: true,
  errors: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ENTRIES:
      return {
        ...state,
        entries: payload,
        loading: false,
      };
    case ENTRIES_FAILURE:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case ADD_ENTRY:
      return {
        ...state,
        entries: [payload, ...state.entries],
        loading: false,
      };
    case CLEAR_ENTRIES:
      return {
        ...state,
        entries: [],
        loading: false,
      };
    default:
      return state;
  }
}