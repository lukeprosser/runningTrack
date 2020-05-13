/** @format */

import React, { Fragment } from 'react';

import '../../style/NotFound.scss';

const NotFound = () => {
  return (
    <Fragment>
      <div className='container'>
        <div className='notfound-inner'>
          <h2>
            <i className='fas fa-bomb'></i> Page Not Found
          </h2>
          <p>Oops! Sorry, that page doesn't exist!</p>
        </div>
      </div>
    </Fragment>
  );
};

export default NotFound;
