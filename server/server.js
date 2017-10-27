const dotenv = require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);

const configureServer = (app) => {
  // MongoDB Set Up (URI @ mongodb://localhost:27017/maalka_bedes)
  mongoose.Promise = global.Promise;
  mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);
  mongoose.connection.on('error', (err) => {
    console.error(err);
    console.log('%s MongoDB connection error. Please make sure MongoDB is running.');
    process.exit();
  });

  // Logger
  app.use(morgan('dev'));

  // View Engine (For Handlebars)
  const hbs = exphbs.create({
    defaultLayout: 'layouts.hbs',
  });
  app.engine('hbs', hbs.engine);
  app.set('view engine', 'hbs');
  app.set('views', path.resolve(__dirname, '../frontend/views/layouts')); // change default view directory

  // Routes for CSS, JS etc.
  app.use(express.static(path.resolve(__dirname, '../frontend/controllers'), { redirect: false }));

  // Express Config
  app.use(bodyParser.urlencoded({ extended: true }));
}

module.exports = configureServer;
