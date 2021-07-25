const mongoose = require('mongoose');
const User = require('../../src/models/user');

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: 'Luke',
  email: 'luke@testing.com',
  password: 'usetheforce',
};

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
  _id: userTwoId,
  name: 'HanSolo',
  email: 'han@testing.com',
  password: 'handyhan',
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
