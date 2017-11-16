// Routes index

const initalXmlImport = require('./initialXmlImport');
const viewTerms = require('./terms');
const proposedTerms = require('./proposed_terms');
const auth = require('./auth');

const configureRoutes = (app, passport) => {
  initalXmlImport(app);
  proposedTerms(app);
  viewTerms(app);
  auth(app, passport);
};

module.exports = configureRoutes;
