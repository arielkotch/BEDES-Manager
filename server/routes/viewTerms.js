// Load up the term model
const Term = require('../models/term');

const viewTerms = (app) => {
  app.get('/api/allterms', function(req, res) {
    Term.find({}, (err, terms) => {
      res.json(terms);
    });
  });

  app.get('/api/term/:uuid', function(req, res) {
    const uuid = req.params.uuid;
    Term.findOne({ 'Content-UUID': uuid }, function (err, term) {
      if (err) {
        return handleError(err);
      }
      // console.log(term);
      if (term) {
        res.send(term);
      } else {
        res.send('Term not found.');
      }
    })
  });

  return app;
}

module.exports = viewTerms
