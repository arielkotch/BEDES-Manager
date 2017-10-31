// Routes index

const initalXmlImport = require('./initialXmlImport');
const terms = require('./terms');

const configureRoutes = (app) => {
  initalXmlImport(app);
  terms(app);
};

module.exports = configureRoutes;
