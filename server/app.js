// This file is entry point and bootstraps express application
const express = require('express');

const configureServer = require('./server');
const configureRoutes = require('./routes');

// Express Server
const app = express();

configureServer(app);
configureRoutes(app);

// Local Machine Testing
app.listen(process.env.PORT || 8000);
console.log('Server listening on 8000');
