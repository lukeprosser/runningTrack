/** @format */

import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { triggerFeedback } from '../../actions/feedback';
import { signup } from '../../actions/auth';

import '../../style/Signup.scss';

const Signup = ({ triggerFeedback, signup, isAuthenticated }) => {
  const [formFields, setFormFields] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const { firstName, lastName, email, password, passwordConfirm } = formFields;

  const onChange = (e) =>
    setFormFields({ ...formFields, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      triggerFeedback(
        "Oops...those passwords don't match - please try again",
        'warning'
      );
    } else {
      signup({
        firstName,
        lastName,
        email,
        password,
      });
    }
  };

  // Redirect on sign up to enter account details
  if (isAuthenticated) {
    return <Redirect to='/create-account' />;
  }

  return (
    <Fragment>
      <div className='container'>
        <div className='signup-inner'>
          <h2 className='page-header'>Sign Up</h2>
          <p className='lead'>Just another step towards your goal...</p>
          <form className='form' onSubmit={(e) => onSubmit(e)}>
            <div className='form-group'>
              <input
                type='text'
                placeholder='First Name'
                name='firstName'
                value={firstName}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Last Name'
                name='lastName'
                value={lastName}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            <div className='form-group'>
              <input
                type='email'
                placeholder='Email Address'
                name='email'
                value={email}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            <div className='form-group'>
              <input
                type='password'
                placeholder='Password'
                name='password'
                value={password}
                onChange={(e) => onChange(e)}
                minLength='6'
              />
            </div>
            <div className='form-group'>
              <input
                type='password'
                placeholder='Confirm Password'
                name='passwordConfirm'
                value={passwordConfirm}
                onChange={(e) => onChange(e)}
                minLength='6'
              />
            </div>
            <input type='submit' className='btn' value='Register' />
          </form>
          <hr />
          <p>
            Been here before?{' '}
            <Link to='/login' className='btn'>
              Login
            </Link>
          </p>
        </div>
      </div>
    </Fragment>
  );
};

Signup.propTypes = {
  triggerFeedback: PropTypes.func.isRequired,
  signup: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { triggerFeedback, signup })(Signup);
