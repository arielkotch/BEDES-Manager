const home = (app) => {
  app.get('/', function(req, res) {
    res.send('welcome');
  });

  return app;
}

module.exports = home
