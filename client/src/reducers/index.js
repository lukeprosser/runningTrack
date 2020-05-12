/** @format */

import { combineReducers } from 'redux';
import feedback from './feedback';
import auth from './auth';
import entries from './entries';
import account from './account';

export default combineReducers({
  feedback,
  auth,
  account,
  entries,
});
