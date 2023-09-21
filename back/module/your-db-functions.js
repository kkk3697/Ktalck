const User = require('../models/User/User');

async function findUserByIdAndPassword(email, password) {
    const user = await User.findOne({ where: { email, password } });
    return user;
  }

module.exports = {
  findUserByIdAndPassword
};
