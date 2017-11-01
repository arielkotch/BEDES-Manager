// Load up the term model
const Term = require('../models/term');

const viewTerms = (app) => {
  // Get all terms
  app.get('/api/allterms', (req, res) => {
    Term.find({}, (err, terms) => {
      res.json(terms);
    });
  });

  // Delete term
  app.delete('/api/term/delete/:uuid', (req, res) => {
    const uuid = req.params.uuid;
    Term.findOneAndRemove({ 'Content-UUID': uuid }, (err, term) => {
      if (err) {
        res.send(null, 500);
      }
      else {
        // Check if term was found
        if (term) {
          res.send('Term with Conent-UUID: ' + uuid + ' successfully deleted');
        } else {
          res.send('Term not found. Nothing deleted.');
        }

      }
    });
  });

  // Get one term by UUID
  app.get('/api/term/:uuid', (req, res) => {
    const uuid = req.params.uuid;
    Term.findOne({ 'Content-UUID': uuid }, (err, term) => {
      if (err) {
        return handleError(err);
      }
      console.log(term);
      if (term) {
        res.send(term);
      } else {
        res.send(false);
      }
    })
  });



  return app;
}

module.exports = viewTerms
