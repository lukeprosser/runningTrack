/** @format */

import React, { Fragment } from 'react';
import Moment from 'react-moment';

const Entry = ({ entry: { entryDate, distance, time } }) => {
  return (
    <Fragment>
      <div className='table-row'>
        <div className='table-column'>
          <Moment format='DD/MM/YY'>{entryDate}</Moment>
        </div>
        <div className='table-column'>{distance}</div>
        <div className='table-column'>{time}</div>
        <div className='table-column'>
          {((distance / time) * 60).toFixed(2)}
        </div>
        <div className='table-column'>
          <i className='far fa-edit'></i>
        </div>
      </div>
    </Fragment>
  );
};

export default Entry;
