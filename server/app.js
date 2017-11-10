// This file is entry point and bootstraps express application
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const configureServer = require('./server');
const configureRoutes = require('./routes');

// Express Server
const app = express();

configureServer(app);
configureRoutes(app);

// Middleware to post data to server
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

// Local Machine Testing
app.listen(process.env.PORT || 5000);
console.log('Server listening on 5000');
