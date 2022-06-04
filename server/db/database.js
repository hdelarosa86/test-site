const { Sequelize } = require('sequelize');
const pkg = require('../../package.json');
const colors = require('colors');
const dbName = process.env.NODE_ENV === 'test' ? `${pkg.name}-test` : pkg.name;

const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`,
  {
    logging: false,
    database: 'DB',
    username: 'root',
    password: 'pass',
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true, // This will help you. But you will see nwe error
        rejectUnauthorized: false, // This line will fix new error
      },
    },
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
