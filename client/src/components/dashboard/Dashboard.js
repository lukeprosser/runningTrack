/** @format */

import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserEntries } from '../../actions/entries';
import Spinner from '../utils/Spinner';
import DashboardTop from './DashboardTop';
import Entries from '../entries/Entries';
import Pagination from '../layout/Pagination';

import '../../style/Dashboard.scss';

const Dashboard = ({
  getUserEntries,
  auth: { user },
  entries: { entries, loading },
}) => {
  useEffect(() => {
    getUserEntries();
  }, [getUserEntries]);

  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage] = useState(10);

  // Get latest entries
  const lastEntryIndex = currentPage * entriesPerPage;
  const firstEntryIndex = lastEntryIndex - entriesPerPage;
  const latestEntries = entries.slice(firstEntryIndex, lastEntryIndex);

  // Change page
  const changePage = (pageNumber) => setCurrentPage(pageNumber);

  return loading && entries.length === 0 ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='container'>
        <div className='dashboard-inner'>
          <h2 className='page-header'>Dashboard</h2>
          {entries.length > 0 ? (
            <Fragment>
              <DashboardTop entries={entries} user={user} />
              <Entries entries={latestEntries} />
              {entries.length > 10 && (
                <Pagination
                  entriesPerPage={entriesPerPage}
                  totalEntries={entries.length}
                  currentPage={currentPage}
                  changePage={changePage}
                />
              )}
            </Fragment>
          ) : (
            <Fragment>
              <p>
                You haven't logged any runs yet, let's get started:
                <Link to='/add-entry' className='btn'>
                  Add Entry
                </Link>
              </p>
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
