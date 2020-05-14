/** @format */

const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Entry = require('../../models/Entry');
const User = require('../../models/User');

// @route   POST api/entries
// @desc    Create an entry
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('entryDate', 'Entry date is required').not().isEmpty(),
      check('distance', 'Distance is required').not().isEmpty(),
      check('time', 'Time is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const { entryDate, distance, time } = req.body;
      const { firstName, lastName, avatar } = user;

      const newEntry = new Entry({
        entryDate: entryDate,
        distance: distance,
        time: time,
        firstName: firstName,
        lastName: lastName,
        avatar: avatar,
        user: req.user.id,
      });

      const entry = await newEntry.save();

      res.json(entry);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   GET api/entries/me
// @desc    Get current user entries
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const entries = await Entry.find({ user: req.user.id }).sort({
      entryDate: -1,
    });
    res.json(entries);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/entries/me/:id
// @desc    Get entry (for current user) by ID
// @access  Private
router.get('/me/:id', auth, async (req, res) => {
  try {
    const entry = await Entry.findById(req.params.id);

    if (!entry) {
      return res.status(404).json({ msg: 'Entry not found' });
    }

    res.json(entry);
  } catch (err) {
    console.log(err.message);

    if (err.name == 'CastError') {
      // Changed from 'kind'->'ObjectId' to 'name'->'CastError'
      return res.status(404).json({ msg: 'Entry not found' });
    }

    res.status(500).send('Server error');
  }
});

// @route   DELETE api/entries/me/:id
// @desc    Delete entry (for current user) by ID
// @access  Private
router.delete('/me/:id', auth, async (req, res) => {
  try {
    const entry = await Entry.findById(req.params.id);

    // Check entry exists
    if (!entry) {
      return res.status(404).json({ msg: 'Entry not found' });
    }

    // Check user is authenticated
    if (entry.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User is not authorised' });
    }

    await entry.remove();

    res.json({ msg: 'Entry removed successfully' });
  } catch (err) {
    console.log(err.message);

    if (err.name == 'CastError') {
      // Changed from 'kind'->'ObjectId' to 'name'->'CastError'
      return res.status(404).json({ msg: 'Entry not found' });
    }

    res.status(500).send('Server error');
  }
});

module.exports = router;
