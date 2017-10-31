// Routes index

const initalXmlImport = require('./initialXmlImport');
const viewTerms = require('./viewTerms');

const configureRoutes = (app) => {
  initalXmlImport(app);
  viewTerms(app);
};

module.exports = configureRoutes;
