const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../../src/models/user');

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: 'Luke',
  email: 'luke@testing.com',
  password: 'usetheforce',
  tokens: [
    {
      token: jwt.sign({ _id: userOneId.toString() }, process.env.JWT_SECRET, {
        expiresIn: '24h',
      }),
    },
  ],
};

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
  _id: userTwoId,
  name: 'HanSolo',
  email: 'han@testing.com',
  password: 'handyhan',
  tokens: [
    {
      token: jwt.sign({ _id: userOneId.toString() }, process.env.JWT_SECRET, {
        expiresIn: '24h',
      }),
    },
  ],
};

const setupDatabase = async () => {
  await User.deleteMany();
  await new User(userOne).save();
  await new User(userTwo).save();
};

module.exports = {
  userOneId,
  userOne,
  userTwo,
  userTwoId,
  setupDatabase,
};
