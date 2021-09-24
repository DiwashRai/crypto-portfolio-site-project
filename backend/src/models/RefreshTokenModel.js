const mongoose = require('mongoose');

const RefreshTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
  },
  createdAt: {
    type: Date,
    expires: 60 * 60,
    default: Date.now,
  },
});

const RefreshTokenModel = mongoose.model('RefreshToken', RefreshTokenSchema);

module.exports = RefreshTokenModel;
