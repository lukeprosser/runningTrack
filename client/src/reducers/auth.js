/** @format */

import { SIGNUP_SUCCESS, SIGNUP_FAILURE } from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SIGNUP_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        payload,
        isAuthenticated: true,
        loading: false,
      };
    case SIGNUP_FAILURE:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
}
