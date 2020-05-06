/** @format */

import { v4 as uuid } from 'uuid';
import { TRIGGER_FEEDBACK, REMOVE_FEEDBACK } from './types';

export const triggerFeedback = (msg, feedbackType, time = 4000) => (
  dispatch
) => {
  const id = uuid();

  dispatch({
    type: TRIGGER_FEEDBACK,
    payload: { msg, feedbackType, id },
  });

  setTimeout(() => dispatch({ type: REMOVE_FEEDBACK, payload: id }), time);
};
