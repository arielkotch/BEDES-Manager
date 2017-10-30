const fs = require('fs');
const xml2js = require('xml2js');
const path = require('path');

// Load up the term model
const Term = require('../models/term');

const initalXmlImport = (app) => {
  app.get('/initial-import', function(req, res) {
    // Parser for converting xml to json
    const parser = new xml2js.Parser();
    // Parse terms xml and convert to json
    fs.readFile(path.resolve(__dirname, '../../resources/bedes_online_dictionary_uuid-terms.xml'), function(err, data) {
      parser.parseString(data, function (err, result) {
        let termsList = result.nodes.node;
        // Save terms to DB
        termsList.forEach((term, index) => {
          let newTerm = new Term();
          // Set the term's keys and values
          newTerm['Content-UUID'] = term['Content-UUID'][0];
          newTerm['URL'] = term['URL'][0];
          newTerm['Term'] = term['Term'][0];
          newTerm['Updated-date'] = term['Updated-date'][0];
          newTerm['Category'] = term['Category'][0];
          // Check if Term-Definition exist in current term
          if (term['Term-Definition'][0]['p']) {
            // This is the simplest case when Term-Definition does not have an <a> or <span> nested inside of it.
            // Most of the Term-Definition do not have nested <a> or <span>
            if (typeof term['Term-Definition'][0]['p'][0] === 'string') {
              newTerm['Term-Definition'] = term['Term-Definition'][0]['p'][0];
            // Check if Term-Definition has nested <a> or <span> as a nested object
            } else if (typeof term['Term-Definition'][0]['p'][0] === 'object') {
              let termString = '';
              let termLink = '';
              // Check if Term-Definition has a nested <span>
              if (term['Term-Definition'][0]['p'][0]['span']) {
                termString = term['Term-Definition'][0]['p'][0]['span'][0]['_'];
              // Otherwise check if Term-Definition has a nested <a>
              } else if (term['Term-Definition'][0]['p'][0]['a']) {
                termString = term['Term-Definition'][0]['p'][0]['_'];
                termLink = term['Term-Definition'][0]['p'][0]['a'][0]['_'];
              }
              // Set Term-Definition to the term's string text concatenated to the term's link
              newTerm['Term-Definition'] = termString + termLink;
            }
          } else {
            // If there is no Term-Definition, set it to empty string
            newTerm['Term-Definition'] = '';
          }
          newTerm['Application'] = term['Application'][0];
          newTerm['Sector'] = term['Sector'][0];
          newTerm['Unit-of-Measure'] = term['Unit-of-Measure'][0];

          // Save the term
          newTerm.save(function(err) {
            if (err) {
              throw err;
            }
            // console.log('newTerm saved...');
          });
        });

        console.log('Done');
      });
    });

    // Parse options xml and convert to json
    fs.readFile(path.resolve(__dirname, '../../resources/bedes_online_dictionary_uuid-lo.xml'), function(err, data) {
      parser.parseString(data, function (err, result) {
        // console.dir(result);
        res.send(result.nodes.node[0]);
        let OptionList = result.nodes.node;
        // Save terms to DB
        OptionList.forEach((option, index) => {
          let newOption = {};
          // Set the option's keys and values
          newOption['Content-UUID'] = option['Content-UUID'][0];
          newOption['URL'] = option['URL'][0];
          newOption['Term'] = option['Term'][0];
          newOption['Updated-date'] = option['Updated-date'][0];
          newOption['Related-Term'] = option['Related-Term'][0];
          newOption['Related-Term-UUID'] = option['Related-Term-UUID'][0];
          newOption['Option-Definition'] = option['Option-Definition'][0];
          newOption['Application'] = option['Application'][0];
          newOption['Sector'] = option['Sector'][0];
          newOption['Unit-of-Measure'] = option['Unit-of-Measure'][0];

          // Find term associated with current option
          Term.findOne({ 'Content-UUID': option['Related-Term-UUID'][0] }, function (err, term) {
            if (err) {
              return handleError(err);
            }
            // Save the updated term
            if (term) {
              term['Options'].push(newOption);
              term.save(function(err) {
                if (err) {
                  throw err;
                }
                // console.log('Updated term saved...');
              });
            }
          })
        });
        console.log('Done');
      });
    });

  });

  return app;
}

module.exports = initalXmlImport
