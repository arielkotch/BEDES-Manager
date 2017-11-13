const dotenv = require('dotenv').config();
const express = require('express');
const helmet = require('helmet'); // sets some http header for security
const path = require('path');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose'); // MongoDB object modeling tool designed to work in an asynchronous environment
const cors = require('cors');

const configureServer = (app, passport) => {
  // MongoDB Set Up (URI @ mongodb://localhost:27017/maalka_bedes)
  mongoose.Promise = global.Promise;
  mongoose.connect(process.env.MONGODB_URI);
  mongoose.connection.on('error', (err) => {
    console.error(err);
    console.log('%s MongoDB connection error. Please make sure MongoDB is running.');
    process.exit();
  });

  // pass passport for configuration
  require('./config/passport')(passport);

  app.use(morgan('dev')); // log every request to the console
  app.use(helmet());
  app.use(cookieParser()); // read cookies (needed for auth)
  app.use(cors());

  // handle json data
  app.use(bodyParser.json());
  // handle URL-encoded data
  app.use(bodyParser.urlencoded({ extended: true }));

  // required for passport
  app.use(session({
    secret: 'kjfdk1231lkdfsa0DGdkCa23k2',
    resave: false,
    saveUninitialized: false
  }));

  app.use(passport.initialize());
  app.use(passport.session()); // persistent login sessions
  app.use(flash()); // use connect-flash for flash messages stored in session
}

module.exports = configureServer;
