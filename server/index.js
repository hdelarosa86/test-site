const express = require('express');
const path = require('path');
const { db } = require('./db');
const colors = require('colors');
const cookieParser = require('cookie-parser');

//initialize express
const app = express();
const PORT = process.env.PORT || 3000;

//cookie parser
app.use(cookieParser());

//body parsing middleware
app.use(express.json());

//adding this middleware just to keep track of api calls as our app gets larger
app.use((req, res, next) => {
  console.log(colors.cyan(`${req.method} ${req.path}`));
  next();
});

// static middleware
app.use(express.static(path.join(__dirname, '../static')));

//cookie
//app.use(require('./cookies'));

// api routes
//app.use('/api', require('./api'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../static/index.html'));
}); // Send index.html for any other requests

const startServer = () =>
  new Promise((res) => {
    app.listen(PORT, () => {
      console.log(colors.bgYellow("I'm running on", PORT));
      res(true);
    });
  });

if (process.env.NODE_ENV === 'production') {
  db.sync()
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
