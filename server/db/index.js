//DATABASE && MODELS
const { db, authenticateDB } = require('./database.js');
const Item = require('./items.js');
const User = require('./users.js');
//Associations
module.exports = {
  db,
  authenticateDB,
  Item,
  User,
};