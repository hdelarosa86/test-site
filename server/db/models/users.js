const { STRING, INTEGER, UUID, UUIDV4, BOOLEAN } = require('sequelize');
const { db } = require('../database');

const User = db.define('user', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4,
  },
  firstName: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  lastName: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true,
    },
  },
  username: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  password: {
    type: STRING,
    unique: true,
    allowNull: false,
  },
  admin: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  imageUrl: {
    type: STRING,
    defaultValue:
      'https://cdn.dribbble.com/users/405145/screenshots/4093229/08_plant_1_4x3.jpg',
    validate: {
      isUrl: true,
    },
  },
});

module.exports = User;
