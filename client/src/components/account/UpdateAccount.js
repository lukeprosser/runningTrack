/** @format */

import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateUserAccount, getUserAccount } from '../../actions/account';

import '../../style/UpdateAccount.scss';

const UpdateAccount = ({
  account: { account, loading },
  updateUserAccount,
  getUserAccount,
  history,
}) => {
  const [formFields, setFormFields] = useState({
    dob: '',
    location: '',
    height: '',
    weight: '',
  });

  useEffect(() => {
    getUserAccount();

    setFormFields({
      dob: loading || !account.dob ? '' : account.dob,
      location: loading || !account.location ? '' : account.location,
      height: loading || !account.height ? '' : account.height,
      weight: loading || !account.weight ? '' : account.weight,
    });
  }, [loading, getUserAccount]);

  const { dob, location, height, weight } = formFields;

  const onChange = (e) =>
    setFormFields({ ...formFields, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    updateUserAccount(formFields, history, true);
  };

  return (
    <Fragment>
      <div className='container'>
        <div className='update-account-inner'>
          <h2 className='page-header'>Update Your Account</h2>
        </div>
      </div>
    </Fragment>
  );
};

UpdateAccount.propTypes = {
  updateUserAccount: PropTypes.func.isRequired,
  getUserAccount: PropTypes.func.isRequired,
  account: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  account: state.account,
});

export default connect(mapStateToProps, { updateUserAccount, getUserAccount })(
  withRouter(UpdateAccount)
);
