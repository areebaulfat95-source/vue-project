const mongoose = require('mongoose');

const historySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    gesture: { type: String, required: true },
    translation: { type: String, required: true },
    confidence: { type: String, default: '' }, // frontend sends this as a string like "99%"
    date: { type: String, default: 'Just now' } // frontend sends a display string, not a real Date
  },
  { timestamps: true }
);

// Shape expected by src/components/HistoryTable.vue (item.id, item.gesture, item.translation, item.confidence, item.date)
historySchema.methods.toPublicJSON = function () {
  return {
    id: this._id,
    gesture: this.gesture,
    translation: this.translation,
    confidence: this.confidence,
    date: this.date
  };
};

module.exports = mongoose.model('History', historySchema);
