// Routes index

const home = require('./home');
const initalXmlImport = require('./initialXmlImport');
const viewTerms = require('./viewTerms');

const configureRoutes = (app) => {
  home(app);
  initalXmlImport(app);
  viewTerms(app);
};

module.exports = configureRoutes;
