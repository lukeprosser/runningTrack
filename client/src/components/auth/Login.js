/** @format */

import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

import '../../style/Login.scss';

const Login = () => {
  const [formFields, setFormFields] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formFields;

  const onChange = (e) =>
    setFormFields({ ...formFields, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    console.log('Success');
  };

  return (
    <Fragment>
      <h1 className='page-header'>Login</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Log in to your account
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
        <input type='submit' className='btn btn-primary' value='Login' />
      </form>
      <p className='my-1'>
        Don't have an account? <Link to='/login'>Login</Link>
      </p>
    </Fragment>
  );
};

export default Login;
