/** @format */

const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route   GET api/profile/me
// @desc    Get current user profile
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'This user has no profile' });
    }

    res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/profile
// @desc    Create/update user profile
// @access  Private
router.post(
  '/',
  [auth, [check('dob', 'Date of birth is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { dob, height, weight } = req.body;

    // Build profile object
    const profileFields = {};

    profileFields.user = req.user.id;

    if (dob) profileFields.dob = dob;
    if (height) profileFields.height = height;
    if (weight) profileFields.weight = weight;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        // Update profile if already exists
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      // Create profile
      profile = new Profile(profileFields);

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   DELETE api/profile
// @desc    Delete profile, user and entries
// @access  Private
router.delete('/', auth, async (req, res) => {
  try {
    // TODO: Remove user entries

    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'User has been deleted successfully' });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
