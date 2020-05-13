/** @format */

import React, { Fragment } from 'react';
import Entry from './Entry';

import '../../style/Entries.scss';

const Entries = ({ entries }) => {
  return (
    <Fragment>
      <div className='entries-inner'>
        <div className='table'>
          <div className='table-header'>
            <div className='table-row'>
              <div className='table-column'>Date</div>
              <div className='table-column'>Distance</div>
              <div className='table-column'>Time</div>
              <div className='table-column'>Speed</div>
              <div className='table-column'> </div>
            </div>
          </div>
          <div className='table-body'>
            {entries.map((entry) => (
              <Entry key={entry._id} entry={entry} />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Entries;
