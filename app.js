// Modules
const dotenv = require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);

// MongoDB Set Up (URI @ mongodb://localhost:27017/maalka_bedes)
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.');
  process.exit();
});

// Controllers
const staticController = require('./controller/static');

// Express Server
const app = express();

// Logger
app.use(morgan('dev'));

// View Engine (For Handlebars)
const hbs = exphbs.create({
  defaultLayout: 'layouts.hbs',
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

// Routes for CSS, JS etc.
app.use(express.static(path.join(__dirname, '/public'), { redirect: false }));

// Express Config
app.use(bodyParser.urlencoded({ extended: true }));

// Static Pages
app.get('/', staticController.getHome);

// Local Machine Testing
app.listen(process.env.PORT || 8000);
console.log('Server listening on 8000');
