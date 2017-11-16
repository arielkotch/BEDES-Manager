const Proposed_Term = require('../models/proposed_term');

const proposedTerms = (app) => {

// Get all proposed terms
app.get('/api/term/proposed/all', (req, res) => {
  Proposed_Term.find({}, (err, proposed_terms) => {
      res.json(proposed_terms);
  });
});

// Add proposed terms
app.post('/api/term/proposed/add', (req, res) => {
  console.log(req.body);
    const uuid = req.body.uuid;
    const url = req.body.url;
    const _term = req.body.term;
    const date = req.body.date;
    const category = req.body.category;
    const definition = req.body.definition;
    const application = req.body.application;
    const sector = req.body.sector;
    const measure = req.body.measure;

    const proposed_terms = new Proposed_Term({
        'Content-UUID': uuid,
        'URL': url,
        'Term': _term,
        'Updated-date': date,
        'Category': category,
        'Term-Definition': definition,
        'Application': application,
        'Sector': sector,
        'Unit-of-Measure': measure
    });
      proposed_terms.save()
      .then(p_terms => {
        console.log('Term with Content-UUID: ' + uuid + ' added successfully.');
      })
      .catch(err => {
        console.log(err);
        console.log('Failed to save to db.')
      });
  });

  return app;
}

module.exports = proposedTerms;
