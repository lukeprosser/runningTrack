/** @format */

import React, { Fragment } from 'react';
import Spinner from '../../img/spinner.gif';

import '../../style/Spinner.scss';

export default () => (
  <Fragment>
    <img src={Spinner} alt='Loading' className='spinner' />
  </Fragment>
);
