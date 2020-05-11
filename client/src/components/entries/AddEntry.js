/** @format */

import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addEntry } from '../../actions/entries';

const AddEntry = ({ addEntry, history }) => {
  const [formFields, setFormFields] = useState({
    entryDate: '',
    distance: '',
    time: '',
  });

  const { entryDate, distance, time } = formFields;

  const onChange = (e) => {
    setFormFields({
      ...formFields,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    addEntry(formFields, history);
  };

  return (
    <Fragment>
      <div className='container'>
        <div className='signup-inner'>
          <h2 className='page-header'>Add Entry</h2>
          <p className='lead'>Log the details of your latest session:</p>
          <form className='form' onSubmit={(e) => onSubmit(e)}>
            <div className='form-group'>
              <label htmlFor='entryDate'>Exercise date</label>
              <input
                type='date'
                name='entryDate'
                value={entryDate}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='entryDate'>Distance run (km)</label>
              <input
                type='number'
                name='distance'
                value={distance}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='entryDate'>Time taken (minutes)</label>
              <input
                type='number'
                name='time'
                value={time}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            <input type='submit' className='btn' value='Confirm' />
          </form>
          <hr />
          <Link to='/dashboard' className='btn'>
            Back
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

AddEntry.propTypes = {
  addEntry: PropTypes.func.isRequired,
};

export default connect(null, { addEntry })(withRouter(AddEntry)); // withRouter enables history
