const path = require('path');

const home = (app) => {
  app.get('/', function(req, res) {
    // res.send('welcome');
    res.sendFile(path.join(__dirname+'../../../frontend/views/layouts/home.html'));
  });

  return app;
}

module.exports = home
