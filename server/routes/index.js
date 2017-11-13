// Routes index

const initalXmlImport = require('./initialXmlImport');
const terms = require('./terms');
const auth = require('./auth');

const configureRoutes = (app, passport) => {
  initalXmlImport(app);
  terms(app);
  auth(app, passport);
};

module.exports = configureRoutes;
