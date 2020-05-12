/** @format */

const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Account = require('../../models/Account');
const User = require('../../models/User');

// @route   GET api/account/me
// @desc    Get current user account
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const account = await Account.findOne({
      user: req.user.id,
    }).populate('user', ['firstName', 'lastName', 'email', 'avatar']);

    if (!account) {
      return res.status(400).json({ msg: 'This user has no account' });
    }

    res.json(account);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/account
// @desc    Create/update user account
// @access  Private
router.post(
  '/',
  [auth, [check('dob', 'Date of birth is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { dob, location, height, weight } = req.body;

    // Build account object
    const accountFields = {};

    accountFields.user = req.user.id;

    if (dob) accountFields.dob = dob;
    if (location) accountFields.location = location;
    if (height) accountFields.height = height;
    if (weight) accountFields.weight = weight;

    try {
      let account = await Account.findOne({ user: req.user.id });

      if (account) {
        // Update account if already exists
        account = await Account.findOneAndUpdate(
          { user: req.user.id },
          { $set: accountFields },
          { new: true }
        );

        return res.json(account);
      }

      // Create account
      account = new Account(accountFields);

      await account.save();
      res.json(account);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   DELETE api/account
// @desc    Delete account, user and entries
// @access  Private
router.delete('/', auth, async (req, res) => {
  try {
    // TODO: Remove user entries

    // Remove account
    await Account.findOneAndRemove({ user: req.user.id });
    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'User has been deleted successfully' });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
