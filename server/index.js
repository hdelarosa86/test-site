const express = require('express');
const path = require('path');
const { db } = require('./db');
const colors = require('colors');
const cookieParser = require('cookie-parser');
const seed = require('../seed');
const { User, authenticateDB } = require('./db');

//initialize express
const app = express();
const PORT = process.env.PORT || 3000;

//cookie parser

//body parsing middleware
app.use(express.json());

//adding this middleware just to keep track of api calls as our app gets larger
app.use((req, res, next) => {
  console.log(colors.cyan(`${req.method} ${req.path}`));
  next();
});

// static middleware
app.use(express.static(path.join(__dirname, '../static')));

app.get('/api/users', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).send(users);
  } catch (err) {
    console.error(`${err}: Could not find users.`);
  }
});
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../static/index.html'));
}); // Send index.html for any other requests

const startServer = () =>
  new Promise((res) => {
    app.listen(PORT, () => {
      console.log(colors.bgYellow(`Listening on: http://localhost:${PORT}/\n`));
      res(true);
    });
  });

if (process.env.NODE_ENV === 'production') {
  db.sync()
    .then(authenticateDB)
    .then(seed)
    .then(startServer)
    .then(() => {
      console.log(
        colors.green('Application successfully started in production')
      );
    })
    .catch((e) => {
      console.log(colors.red('Application failed to start in production'));
      console.error(e);
      process.exit(1);
    });
} else {
  db.sync()
    .then(authenticateDB)
    .then(seed)
    .then(startServer)
    .then(() => {
      console.log(
        colors.bgGreen('Application successfully started in development')
      );
    })
    .catch((e) => {
      console.log(colors.bgRed('Application failed to start in development'));
      console.error(e);
      process.exit(1);
    });
}
