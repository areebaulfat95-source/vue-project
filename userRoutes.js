const express = require('express');
const { updateProfile, updateSettings } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.put('/profile', protect, updateProfile);
router.put('/settings', protect, updateSettings);

module.exports = router;
