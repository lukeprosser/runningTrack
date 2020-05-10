/** @format */

import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserEntries } from '../../actions/entries';
import Spinner from '../layout/Spinner';

const Dashboard = ({ getUserEntries, auth, entries: { entries, loading } }) => {
  useEffect(() => {
    getUserEntries();
  }, [getUserEntries]);

  return loading && entries.length === 0 ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='container'>
        <div className='dashboard-inner'>
          <h2>Dashboard</h2>
          <div className='table'>
            <div className='table-header'>
              <div className='table-row'>
                <div className='table-column'>Date</div>
                <div className='table-column'>Distance</div>
                <div className='table-column'>Time</div>
                <div className='table-column'>Speed (km/hr)</div>
                <div className='table-column'></div>
              </div>
            </div>
            <div className='table-body'>
              {entries.map((entry) => (
                <div className='table-row' key={entry._id}>
                  <div className='table-column'>{entry.entryDate}</div>
                  <div className='table-column'>{entry.distance}</div>
                  <div className='table-column'>{entry.time}</div>
                  <div className='table-column'>
                    {((entry.distance / entry.time) * 60).toFixed(2)}
                  </div>
                  <div className='table-column'>Edit</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Dashboard.propTypes = {
  getUserEntries: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  entries: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  entries: state.entries,
});

export default connect(mapStateToProps, { getUserEntries })(Dashboard);
