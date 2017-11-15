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
  // mongoose.connect(process.env.MONGODB_URI);
  mongoose.connect('mongodb://localhost:27017/maalka_bedes');
  mongoose.connection.on('error', (err) => {
    console.error(err);
    console.log('%s MongoDB connection error. Please make sure MongoDB is running.');
    process.exit();
  });

  // pass passport for configuration
  require('./config/passport')(passport);

  app.use(morgan('dev')); // log every request to the console
  app.use(helmet());
  app.use(cookieParser('FNek1fdswoofjkdlvnc32Ca23k2')); // read cookies (needed for auth)
  app.use(cors());

  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    if ('OPTIONS' == req.method) {
      res.send(200);
    } else {
      next();
    }
  });

  // handle json data
  app.use(bodyParser.json());
  // handle URL-encoded data
  app.use(bodyParser.urlencoded({ extended: true }));

  // required for passport
  app.use(session({
    secret: 'FNek1fdswoofjkdlvnc32Ca23k2',
    resave: false,
    saveUninitialized: false
  }));

  app.use(passport.initialize());
  app.use(passport.session()); // persistent login sessions
  app.use(flash()); // use connect-flash for flash messages stored in session
}

module.exports = configureServer;
