// Load up the term model
const Term = require('../models/term');

const viewTerms = (app) => {
  app.get('/api/allterms', function(req, res) {
    Term.find({}, (err, terms) => {
      res.json(terms);
    });
  });

  return app;
}

module.exports = viewTerms
