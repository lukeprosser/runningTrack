/** @format */

import { GET_ACCOUNT, UPDATE_ACCOUNT, ACCOUNT_FAILURE } from '../actions/types';

const initialState = {
  account: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ACCOUNT:
    case UPDATE_ACCOUNT:
      return {
        ...state,
        account: payload,
        loading: false,
      };
    case ACCOUNT_FAILURE:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}