// Routes index

const home = require('./home');
const initalXmlImport = require('./initialXmlImport');

const configureRoutes = (app) => {
  home(app);
  initalXmlImport(app);
};

module.exports = configureRoutes;
