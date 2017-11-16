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

  // Add term
  app.post('/api/term/add', (req, res) => {
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

      const term = new Term({
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
        term.save()
        .then(term => {
          console.log('Term with Content-UUID: ' + uuid + ' added successfully.');
        })
        .catch(err => {
          console.log('Failed to save to db.')
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

  // Search terms by category
  app.get('/api/term/search/category/:category', (req, res) => {
    const category = req.params.category;
    // create regex with category
    const categoryRe = new RegExp('^' + category + '$');
    // search for matching categories without caring about case
    Term.find({ Category: { $regex: categoryRe, $options: 'i' }}, (err, terms) => {
      if (err) {
        return handleError(err);
      }
      if (terms) {
        res.send(terms);
      } else {
        res.send(false);
      }
    });
  });

  // Search terms by keyword match with Term, Term-Definition or with Content-UUID
  app.get('/api/term/search/:query', (req, res) => {
    const query = req.params.query;
    // regexObj for uuid
    const uuidRe = new RegExp('^\\w{8}-\\w{4}-\\w{4}-\\w{4}-\\w{12}$');
    // check if query is a Content-UUID
    // eg: b3982f93-0868-4959-a6aa-bca5f6956947
    if (uuidRe.test(query)) {
      console.log("uuid...");
      Term.findOne({ 'Content-UUID': query }, (err, term) => {
        if (err) {
          return handleError(err);
        }
        if (term) {
          res.send(term);
        } else {
          res.send(false);
        }
      })
    } else {
      console.log("keyword...");
      const queryRe = new RegExp(query);
      // Find query match in Term or Term-Definition
      Term.find({ $or: [ { 'Term': { $regex: queryRe, $options: 'i' } }, { 'Term-Definition': { $regex: queryRe, $options: 'i' } } ] }, (err, terms) => {
        if (err) {
          return handleError(err);
        }
        else if (terms.length > 0) {
        // Check that terms exists
          res.send(terms);
        } else {
        // Sent message if no terms were found
          res.send(false);
        }
      });
    }
  });

  // Search terms by keyword match
  app.get('/api/term/keyword/:keyword', (req, res) => {
    const keyword = req.params.keyword;
    const keywordRe = new RegExp(keyword);
    Term.find({ 'Term': { $regex: keywordRe, $options: 'i' } }, (err, terms) => {
      if (err) {
        return handleError(err);
      }
      else if (terms.length > 0) {
      // Check that terms exists
        res.send(terms);
      } else {
      // Sent message if no terms were found
        res.send('No matching term found by keyword');
      }
    });
  });

  // Get one term by UUID
  app.get('/api/term/uuid/:uuid', (req, res) => {
    const uuid = req.params.uuid;
    Term.findOne({ 'Content-UUID': uuid }, (err, term) => {
      if (err) {
        return handleError(err);
      }
      console.log(term);
      if (term) {
        res.send(term);
      } else {
        res.send('No matching term found by uuid');
      }
    })
  });

  // Export terms to XML
  app.get('/api/export-terms', (req, res) => {
    // Find all terms and exclude _id and __v
    // lean() is used tell Mongoose to return a plan javascript version of returned doc
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
