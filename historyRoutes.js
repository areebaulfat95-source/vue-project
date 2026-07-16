const express = require('express');
const {
  getHistory,
  createHistoryItem,
  deleteHistoryItem
} = require('../controllers/historyController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').get(protect, getHistory).post(protect, createHistoryItem);
router.delete('/:id', protect, deleteHistoryItem);

module.exports = router;
