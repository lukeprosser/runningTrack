/** @format */

import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signin } from '../../actions/auth';

import '../../style/Login.scss';

const Login = ({ signin, isAuthenticated }) => {
  const [formFields, setFormFields] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formFields;

  const onChange = (e) =>
    setFormFields({ ...formFields, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    signin(email, password);
  };

  // Redirect on sign in
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <div className='container'>
        <div className='login-inner'>
          <h2 className='page-header'>Login</h2>
          <p className='lead'>
            Welcome back! Let's keep that progress going...
          </p>
          <form className='form' onSubmit={(e) => onSubmit(e)}>
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
            <input type='submit' className='btn' value='Login' />
          </form>
          <hr />
          <p className='my-1'>
            Not been here before?{' '}
            <Link to='/login' className='btn'>
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </Fragment>
  );
};

Login.propTypes = {
  signin: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { signin })(Login);
