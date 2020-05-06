/** @format */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Feedback = ({ feedback }) =>
  feedback !== null &&
  feedback.length > 0 &&
  feedback.map((fb) => (
    <div key={fb.id} className={`feedback feedback-${fb.feedbackType}`}>
      {fb.msg}
    </div>
  ));

Feedback.propTypes = {
  feedback: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  feedback: state.feedback,
});

export default connect(mapStateToProps)(Feedback);
