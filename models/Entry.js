/** @format */

const mongoose = require('mongoose');

const EntrySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  avatar: {
    type: String,
  },
  entryDate: {
    type: Date,
    required: true,
  },
  distance: {
    type: Number,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Entry = mongoose.model('entry', EntrySchema);
