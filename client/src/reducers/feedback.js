/** @format */

import { TRIGGER_FEEDBACK, REMOVE_FEEDBACK } from '../actions/types';

const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case TRIGGER_FEEDBACK:
      return [...state, payload];
    case REMOVE_FEEDBACK:
      return state.filter((feedback) => feedback.id !== payload);
    default:
      return state;
  }
}
