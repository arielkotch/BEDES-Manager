const js2xmlparser = require("js2xmlparser");

// Load up the term model
const Term = require('../models/term');

const viewTerms = (app) => {
  // Check if server is running
  app.get('/api', (req, res) => {
    res.set('Content-Type', 'application/json');
    res.send('Server is running');
  });

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

  // Export terms to XML
  app.get('/api/export-terms', (req, res) => {
    Term.find({}, { '_id': 0, '__v': 0, 'Options': 0 }).lean().exec((err, terms) => {
      // Set 'node' xml tag for each object in terms array
      let obj = { node: terms };
      let xmlParsed = js2xmlparser.parse("nodes", obj);
      // Set headers so browser knows response is a file
      res.setHeader('Content-type', "application/octet-stream");
      res.setHeader('Content-disposition', 'attachment; filename=terms.xml');
      // Sent xml back to frontend and trigger file download (since the headers were set correctly)
      res.send(xmlParsed);
    });
  });



  return app;
}

module.exports = viewTerms
