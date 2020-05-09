/** @format */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import '../../style/Feedback.scss';

const Feedback = ({ feedback }) =>
  feedback !== null &&
  feedback.length > 0 &&
  feedback.map((fb) => (
    <div className='feedback-inner'>
      <div key={fb.id} className={`feedback-${fb.feedbackType}`}>
        {fb.msg}
      </div>
    </div>
  ));

Feedback.propTypes = {
  feedback: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  feedback: state.feedback,
});

export default connect(mapStateToProps)(Feedback);
