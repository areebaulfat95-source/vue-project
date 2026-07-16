const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema(
  {
    theme: { type: String, default: 'Light' },
    language: { type: String, default: 'English' },
    resolution: { type: String, default: '720p' },
    notifications: { type: Boolean, default: true },
    voice: { type: Boolean, default: true },
    autoSaveHistory: { type: Boolean, default: true },
    confidence: { type: Number, default: 90 }
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: { type: String, required: true },

    // Profile fields used by src/views/ProfileInfo.vue
    phone: { type: String, default: '' },
    university: { type: String, default: '' },
    department: { type: String, default: '' },
    semester: { type: String, default: '' },
    roll: { type: String, default: '' },
    photo: { type: String, default: '' }, // data URL from the photo uploader

    settings: { type: settingsSchema, default: () => ({}) }
  },
  { timestamps: true }
);

// Shape returned to the frontend — never send the password hash back
userSchema.methods.toPublicJSON = function () {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    phone: this.phone,
    university: this.university,
    department: this.department,
    semester: this.semester,
    roll: this.roll,
    photo: this.photo
  };
};

module.exports = mongoose.model('User', userSchema);
