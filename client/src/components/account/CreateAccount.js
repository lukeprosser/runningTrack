/** @format */

import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateUserAccount } from '../../actions/account';

import '../../style/CreateAccount.scss';

const CreateAccount = ({ updateUserAccount, history }) => {
  const [formFields, setFormFields] = useState({
    dob: '',
    location: '',
    height: '',
    weight: '',
  });

  const { dob, location, height, weight } = formFields;

  const onChange = (e) =>
    setFormFields({ ...formFields, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    updateUserAccount(formFields, history);
  };

  return (
    <Fragment>
      <div className='container'>
        <div className='create-account-inner'>
          <h2 className='page-header'>Create Your Account</h2>
          <p className='lead'>
            To get started recording your runs, please complete your account
            details:
          </p>
          <form className='form' onSubmit={(e) => onSubmit(e)}>
            <div className='form-group'>
              <label htmlFor='dob'>Date of birth (required)</label>
              <input
                type='date'
                name='dob'
                value={dob}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='location'>Location</label>
              <input
                type='text'
                placeholder='Town/City'
                name='location'
                value={location}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='location'>Height (cm)</label>
              <input
                type='number'
                placeholder='Enter your height in centimetres'
                name='height'
                value={height}
                min='50'
                max='250'
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='weight'>Weight (kg)</label>
              <input
                type='number'
                placeholder='Enter your weight in kilograms'
                name='weight'
                value={weight}
                min='40'
                max='200'
                onChange={(e) => onChange(e)}
              />
            </div>
            <input type='submit' className='btn' value='Create' />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

CreateAccount.propTypes = {
  updateUserAccount: PropTypes.func.isRequired,
};

export default connect(null, { updateUserAccount })(withRouter(CreateAccount));
