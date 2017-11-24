const auth = (app, passport) => {
  // verify that the user is authenticated
  app.get('/api/user/verify', (req, res, next) => {
    console.log(req.user);
  	if(req.isAuthenticated()) {
  		return res.status(200).json({
  			usertype: req.user.local.usertype,
  			authenticated: true
  		});
  	} else {
  		return res.status(200).json({
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
      // return error if user not found
      if (!user) {
        info['authenticated'] = false;
        return res.status(200).json(info);
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

//   app.post('/api/user/signup',
//   passport.authenticate('local-signup', {
//                                    failureFlash: true })
// );

  // process the login form
  app.post('/api/user/login', function(req, res, next) {
    passport.authenticate('local-login', function(err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        info['authenticated'] = false;
        return res.status(200).json(info);
      }
      req.logIn(user, function(err) {
        if (err) {
          return next(err);
        }

        req.session.save(function(err) {
          if (err) {
            return next(err);
          }
          return res.status(200).json({
      			authenticated: true
      		});
        });

      });
    })(req, res, next);
  });

  app.get('/api/user/logout', function(req, res) {
    req.logout();
    return res.status(200).send('Logged Out');
  });

  return app;
}

module.exports = auth
