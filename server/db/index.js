//DATABASE && MODELS
const { db, authenticateDB } = require('./database.js');
const Item = require('./models/items.js');
const User = require('./models/users.js');
//Associations
module.exports = {
  db,
  authenticateDB,
  Item,
  User,
};
