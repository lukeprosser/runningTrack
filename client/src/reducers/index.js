/** @format */

import { combineReducers } from 'redux';
import feedback from './feedback';
import auth from './auth';
import entries from './entries';
// import profile from './profile';

export default combineReducers({
  feedback,
  auth,
  entries,
});
