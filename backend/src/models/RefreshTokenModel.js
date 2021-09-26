const jwt = require('jsonwebtoken');
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
    expires: 60 * 60 * 7,
    default: Date.now,
  },
});

RefreshTokenSchema.statics.createRefreshToken =
  async function createRefreshToken(user) {
    const token = jwt.sign(
      user._id.toString(),
      process.env.REFRESH_TOKEN_SECRET
    );
    const refreshToken = new RefreshTokenModel({
      token,
      user: user._id,
    });
    await refreshToken.save();

    return token;
  };

const RefreshTokenModel = mongoose.model('RefreshToken', RefreshTokenSchema);

module.exports = RefreshTokenModel;
