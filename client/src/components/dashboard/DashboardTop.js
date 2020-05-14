/** @format */

import React from 'react';
import { Link } from 'react-router-dom';

const DashboardTop = ({ entries }) => {
  return (
    <div className='dashboard-top'>
      <div className='dashboard-stats'>
        <div className='dashboard-item'>
          <i className='fas fa-running'></i> Total runs: {entries.length}
        </div>
        <div className='dashboard-item'>
          <i className='fas fa-road'></i> Total distance:{' '}
          {entries.reduce((total, entry) => total + entry.distance, 0)}
          km
        </div>
      </div>
      <div className='dashboard-awards'>
        {entries.length >= 10 && (
          <div className='dashboard-item'>
            <i className='fas fa-medal'></i> 10 runs completed
          </div>
        )}
      </div>
      <div className='dashboard-entry'>
        <Link to='/add-entry' className='btn'>
          Add Entry
        </Link>
      </div>
    </div>
  );
};

export default DashboardTop;
