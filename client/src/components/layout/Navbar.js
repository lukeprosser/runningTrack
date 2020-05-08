/** @format */

import React from 'react';
import { Link } from 'react-router-dom';

import '../../style/Navbar.scss';

export const Navbar = () => {
  return (
    <nav className='navbar'>
      <div className='container'>
        <h1>
          <Link to='/'>
            <i className='fas fa-running'></i> RunningTrack
          </Link>
        </h1>
        <ul>
          <li>
            <Link to='/signup'>Sign Up</Link>
          </li>
          <li>
            <Link to='login'>Login</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
