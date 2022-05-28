const { Sequelize } = require('sequelize');
const pkg = require('../../package.json');
const colors = require('colors');

const dbName = process.env.NODE_ENV === 'test' ? `${pkg.name}-test` : pkg.name;
const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`,
  {
    logging: false,
  }
);

const authenticateDB = async () => {
  try {
    await db.authenticate();
    console.log(
      colors.bgYellow('Connection has been established successfully.\n')
    );
  } catch (error) {
    console.error(
      colors.bgRed(`Unable to connect to the database: ${error}\n`)
    );
  }
};

module.exports = { db, authenticateDB };
