const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  faunaAdminKey: process.env.FAUNA_ADMIN,
  faunaServerKey: process.env.FAUNA_SERVER,
  faunaUserKey: process.env.FAUNA_USER_KEY,
};