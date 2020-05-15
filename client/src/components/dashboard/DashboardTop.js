/** @format */

import React from 'react';
import { Link } from 'react-router-dom';

const DashboardTop = ({ entries, user, topSpeed }) => {
  const topSpeedStr = topSpeed.toFixed(2);

  return (
    <div className='dashboard-top'>
      <p className='lead'>Keep it up{user && ' ' + user.firstName}!</p>
      <div className='dashboard-categories'>
        <div className='dashboard-stats'>
          <h3>Stats</h3>
          <div className='dashboard-items'>
            <div className='dashboard-item'>
              <i className='fas fa-running'></i> Total runs: {entries.length}
            </div>
            <div className='dashboard-item'>
              <i className='fas fa-road'></i> Total distance:{' '}
              {entries.reduce((total, entry) => total + entry.distance, 0)}
              km
            </div>
            <div className='dashboard-item'>
              <i className='fas fa-tachometer-alt'></i> Fastest speed:{' '}
              {topSpeedStr}
              km/hr
            </div>
          </div>
        </div>
        <div className='dashboard-awards'>
          <h3>Awards</h3>
          <div className='dashboard-items'>
            {entries.length >= 10 ? (
              <div className='dashboard-item'>
                <i className='fas fa-medal'></i> 10 runs completed
              </div>
            ) : (
              <p>Log sessions to gain awards</p>
            )}
          </div>
        </div>
        <div className='dashboard-entry'>
          <p>Log a new session:</p>
          <Link to='/add-entry' className='btn'>
            Add Entry
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardTop;
