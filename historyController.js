const History = require('../models/History');

// GET /api/history
// Frontend: getHistory(email) in src/services/api.js — expects a plain array
// (see: "if (Array.isArray(backendHistory))" in src/composables/useHistory.js)
const getHistory = async (req, res, next) => {
  try {
    const items = await History.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(items.map((item) => item.toPublicJSON()));
  } catch (error) {
    next(error);
  }
};

// POST /api/history
// Frontend: saveHistoryItem(email, item) in src/services/api.js
// item shape sent from src/views/Translate.vue: { id, gesture, translation, confidence, date }
// The client-generated "id" is only used locally by Vue's :key — Mongo assigns its own _id.
const createHistoryItem = async (req, res, next) => {
  try {
    const { gesture, translation, confidence, date } = req.body;

    if (!gesture || !translation) {
      res.status(400);
      throw new Error('Both gesture and translation are required');
    }

    const item = await History.create({
      user: req.user._id,
      gesture,
      translation,
      confidence,
      date
    });

    res.status(201).json(item.toPublicJSON());
  } catch (error) {
    next(error);
  }
};

// DELETE /api/history/:id
// Frontend: deleteHistoryItem(id) in src/services/api.js
const deleteHistoryItem = async (req, res, next) => {
  try {
    const item = await History.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!item) {
      res.status(404);
      throw new Error('History item not found');
    }

    res.status(200).json({ message: 'History item deleted', id: req.params.id });
  } catch (error) {
    next(error);
  }
};

module.exports = { getHistory, createHistoryItem, deleteHistoryItem };
