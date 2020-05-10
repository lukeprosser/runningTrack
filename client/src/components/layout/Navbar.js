/** @format */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signout } from '../../actions/auth';

import '../../style/Navbar.scss';

export const Navbar = ({ auth: { isAuthenticated, loading }, signout }) => {
  const memberLinks = (
    <ul>
      <li>
        <Link to='/dashboard'>Dashboard</Link>
      </li>
      <li>
        <a href='#!' onClick={signout}>
          Sign Out
        </a>
      </li>
    </ul>
  );

  const nonMemberLinks = (
    <ul>
      <li>
        <Link to='/signup'>Sign Up</Link>
      </li>
      <li>
        <Link to='login'>Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className='navbar'>
      <div className='navbar-inner'>
        <h1>
          <Link to='/'>
            <i className='fas fa-running'></i> RunningTrack
          </Link>
        </h1>
        {!loading && (
          <Fragment>{isAuthenticated ? memberLinks : nonMemberLinks}</Fragment>
        )}
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  signout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { signout })(Navbar);
