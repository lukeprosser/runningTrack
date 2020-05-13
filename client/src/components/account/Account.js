/** @format */

import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserAccount, deleteUserAccount } from '../../actions/account';
import Spinner from '../utils/Spinner';
import Moment from 'react-moment';

import '../../style/Account.scss';

const Account = ({
  getUserAccount,
  deleteUserAccount,
  auth,
  account: { account, loading },
}) => {
  useEffect(() => {
    getUserAccount();
  }, [getUserAccount]);

  return account === null || loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='container'>
        <div className='account-inner'>
          <h2 className='page-header'>Your Account</h2>
          <div className='user-banner'>
            <img src={account.user.avatar} alt='' className='user-avatar' />
            <div className='user-info'>
              <p className='user-name'>
                {account.user.firstName} {account.user.lastName}
              </p>
              <p className='user-email'>{account.user.email}</p>
            </div>
          </div>
          <div className='user-details'>
            <div className='user-details-section'>
              <h3>Personal Info</h3>
              <div className='user-details-section-items'>
                <div className='user-details-item'>
                  <h4>DOB</h4>
                  <p>
                    <Moment format='DD/MM/YYYY'>{account.dob}</Moment>
                  </p>
                </div>
                <div className='user-details-item'>
                  <h4>Location</h4>
                  <p>{account.location}</p>
                </div>
              </div>
            </div>
            <div className='user-details-section'>
              <h3>Stats</h3>
              <div className='user-details-section-items'>
                <div className='user-details-item'>
                  <h4>Height</h4>
                  <p>{account.height}cm</p>
                </div>
                <div className='user-details-item'>
                  <h4>Weight</h4>
                  <p>{account.weight}kg</p>
                </div>
              </div>
            </div>
          </div>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === account.user._id && (
              <Fragment>
                <Link to='/update-account' className='btn'>
                  Edit Account
                </Link>
                <button
                  className='btn btn-warning'
                  onClick={() => deleteUserAccount()}
                >
                  Delete Account
                </button>
              </Fragment>
            )}
        </div>
      </div>
    </Fragment>
  );
};

Account.propTypes = {
  getUserAccount: PropTypes.func.isRequired,
  deleteUserAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  account: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  account: state.account,
});

export default connect(mapStateToProps, { getUserAccount, deleteUserAccount })(
  Account
);
