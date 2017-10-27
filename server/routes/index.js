// Routes index

const home = require('./home');

const configureRoutes = (app) => {
  home(app);
};

module.exports = configureRoutes;
