// Routes index

const initalXmlImport = require('./initialXmlImport');
const terms = require('./terms');
const signup = require('./signup');

const configureRoutes = (app, passport) => {
  initalXmlImport(app);
  terms(app);
  signup(app, passport);
};

module.exports = configureRoutes;
