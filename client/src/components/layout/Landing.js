/** @format */

import React from 'react';
import { Link } from 'react-router-dom';

export const Landing = () => {
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

export default Landing;
