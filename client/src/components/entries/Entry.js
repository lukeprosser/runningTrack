/** @format */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteEntry } from '../../actions/entries';
import Moment from 'react-moment';

const Entry = ({ entry: { _id, entryDate, distance, time }, deleteEntry }) => {
  return (
    <Fragment>
      <div className='table-row'>
        <div className='table-column'>
          <Moment format='DD/MM/YY'>{entryDate}</Moment>
        </div>
        <div className='table-column'>{distance} km</div>
        <div className='table-column'>{time} mins</div>
        <div className='table-column'>
          {((distance / time) * 60).toFixed(2)} km/hr
        </div>
        <div className='table-column'>
          <div className='delete' onClick={() => deleteEntry(_id)}>
            &times;
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Entry.propTypes = {
  entry: PropTypes.object.isRequired,
  deleteEntry: PropTypes.func.isRequired,
};

export default connect(null, { deleteEntry })(Entry);
