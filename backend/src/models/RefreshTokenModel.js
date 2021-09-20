const mongoose = require('mongoose');

const RefreshTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
  },
  expiryDate: {
    type: Date,
  },
});
