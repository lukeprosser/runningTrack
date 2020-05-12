/** @format */

import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserEntries } from '../../actions/entries';
import Spinner from '../utils/Spinner';
import Entries from '../entries/Entries';

import '../../style/Dashboard.scss';

const Dashboard = ({
  getUserEntries,
  auth: { user },
  entries: { entries, loading },
}) => {
  useEffect(() => {
    getUserEntries();
  }, [getUserEntries]);

  return loading && entries.length === 0 ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='container'>
        <div className='dashboard-inner'>
          <h2 className='page-header'>Dashboard</h2>
          {entries.length > 0 ? (
            <Fragment>
              <p className='lead'>
                Keep it going{user && ' ' + user.firstName}!
              </p>
              <Link to='/add-entry' className='btn'>
                Add Entry
              </Link>
              <Entries entries={entries} />
            </Fragment>
          ) : (
            <Fragment>
              <p>You haven't logged any runs yet, let's get started:</p>
              <Link to='/add-entry' className='btn'>
                Add Entry
              </Link>
            </Fragment>
          )}
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
