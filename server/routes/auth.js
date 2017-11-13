const auth = (app, passport) => {
  // verify that the user is authenticated
  app.get('/api/user/verify', (req, res, next) => {
  	if(req.user) {
  		return res.status(200).json({
  			user: req.user,
  			authenticated: true
  		});
  	} else {
  		return res.status(401).json({
  			error: 'User is not authenticated',
  			authenticated: false
  		});
  	}
  });

  // process the signup form
  app.post('/api/user/signup', function(req, res, next) {
    passport.authenticate('local-signup', function(err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        info['authenticated'] = false;
        return res.status(500).json(info);
      }
      req.logIn(user, function(err) {
        if (err) {
          return next(err);
        }
        return res.status(200).json({
    			authenticated: true
    		});
      });
    })(req, res, next);
  });

  // process the login form
  app.post('/api/user/login', passport.authenticate('local-login', {
    successRedirect: '/home', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  app.get('/api/user/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  return app;
}

module.exports = auth
