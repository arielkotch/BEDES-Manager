const home = (app, isLoggedIn) => {
  app.get('/', function(req, res) {
    res.send('welcome');
  });

  return app;
}

module.exports = home
