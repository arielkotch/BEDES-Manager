const js2xmlparser = require("js2xmlparser");

// Load up the composite term model
const CompositeTerm = require('../models/compositeTerm');

const compositeTerm = (app, passport) => {
  // save a new composite term into dB
  app.post('/api/compositeterm/new/:data', (req, res) => {
    console.log(req.body);
    const {
      transformName,
      implementationField,
      implementationValue,
      implementationUnits,
      bedesTerm,
      valueMapping,
      bedesUnit,
      unitConversion,
      bedesCompositeFieldName
    } = req.body;

    const newCompositeTerm = new CompositeTerm({
      'Transform-Name': transformName,
      'Implementation-Field': implementationField,
      'Implementation-Value': implementationValue,
      'Implementation-Units': implementationUnits,
      'BEDES-Term': bedesTerm,
      'Value-Mapping': valueMapping,
      'BEDES-Unit': bedesUnit,
      'Unit-Conversion': unitConversion,
      'BEDES-Composite Field-Name': bedesCompositeFieldName
    });

    newCompositeTerm.save()
    .then((savedCompositeTerm) => {
      console.log(savedCompositeTerm);
      console.log('New composite term saved successfully.');
    })
    .catch((err) => {
      console.log(err);
      console.log('Failed to save new composite term to DB.')
    });

  });

  return app;
}

module.exports = compositeTerm
