/** @format */

const express = require('express');
const router = express.Router();

// @route   GET api/entries
// @desc    Test route
// @access  Public
router.get('/', (req, res) => res.send('Entry route'));

module.exports = router;
