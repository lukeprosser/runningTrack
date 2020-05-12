/** @format */

const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  dob: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
  },
  height: {
    type: Number,
  },
  weight: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Account = mongoose.model('account', AccountSchema);
