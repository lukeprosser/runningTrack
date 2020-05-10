/** @format */

import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import '../../style/Landing.scss';

export const Landing = ({ isAuthenticated }) => {
  // Redirect authenticated user to dashboard
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <section className='landing'>
      <div className='bg-image'></div>
      <div className='landing-inner'>
        <h1>RunningTrack</h1>
        <p className='lead'>Record your runs and track your progress</p>
        <div className='cta'>
          <Link to='/signup' className='btn btn-primary'>
            Sign Up
          </Link>
          <Link to='/login' className='btn btn-light'>
            Login
          </Link>
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
