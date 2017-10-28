const fs = require('fs');
const xml2js = require('xml2js');
const path = require('path');

// Load up the term model
const Term = require('../models/term');

const initalXmlImport = (app) => {
  app.get('/intial-import', function(req, res) {
    const parser = new xml2js.Parser();
    // console.log(path.resolve(__dirname, '../resources/bedes_online_dictionary_uuid-terms.xml'));
    fs.readFile(path.resolve(__dirname, '../../resources/bedes_online_dictionary_uuid-terms.xml'), function(err, data) {
      console.log(data);
      parser.parseString(data, function (err, result) {
        // console.dir(result);
        console.log(result.nodes.node[0]['Term-Definition'][0]['p'][0]);
        console.log('Done');
        res.send(result.nodes.node);
        let termsList = result.nodes.node;
        termsList.forEach((term, index) => {
          console.log(index);
          console.log(term['Term-Definition']);
          let newTerm = new Term();
          // Set the term's keys and values
          newTerm['Content-UUID'] = term['Content-UUID'][0];
          newTerm['URL'] = term['URL'][0];
          newTerm['Term'] = term['Term'][0];
          newTerm['Updated-date'] = term['Updated-date'][0];
          newTerm['Category'] = term['Category'][0];
          // Check if Term-Definition exist in current term
          if (newTerm['Term-Definition']) {
            newTerm['Term-Definition'] = term['Term-Definition'][0]['p'][0];
          } else {
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
            console.log('newTerm saved...');
          });
        });


      });
    });
  });

  return app;
}

module.exports = initalXmlImport
