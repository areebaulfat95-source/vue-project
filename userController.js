const User = require('../models/User');

// PUT /api/users/profile
// Frontend: updateProfile(changes) in src/services/api.js
// Matches fields edited in src/views/ProfileInfo.vue: name, email, phone,
// university, department, semester, roll, photo
const updateProfile = async (req, res, next) => {
  try {
    const allowedFields = [
      'name',
      'email',
      'phone',
      'university',
      'department',
      'semester',
      'roll',
      'photo'
    ];

    const updates = {};
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    const user = await User.findByIdAndUpdate(req.user._id, updates, {
      new: true,
      runValidators: true
    });

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    res.status(200).json({ user: user.toPublicJSON() });
  } catch (error) {
    next(error);
  }
};

// PUT /api/users/settings
// Frontend: updateSettings(settings) in src/services/api.js
// Matches src/composables/useSettings.js defaultSettings shape
const updateSettings = async (req, res, next) => {
  try {
    const allowedFields = [
      'theme',
      'language',
      'resolution',
      'notifications',
      'voice',
      'autoSaveHistory',
      'confidence'
    ];

    const updates = {};
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[`settings.${field}`] = req.body[field];
      }
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    res.status(200).json({ settings: user.settings });
  } catch (error) {
    next(error);
  }
};

module.exports = { updateProfile, updateSettings };
