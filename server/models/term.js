const mongoose = require('mongoose');

// Define child options schema
const optionSchema = mongoose.Schema({
  'Content-UUID': String,
  'URL': String,
  'Term': String,
  'Updated-date': Date,
  'Related-Term': String,
  'Related-Term-UUID': String,
  'Option-Definition': String,
  'Application': String,
  'Sector': String,
  'Unit-of-Measure': String
});

// Define the schema for our model
const termSchema = mongoose.Schema({
  'Content-UUID': String,
  'URL': String,
  'Term': String,
  'Updated-date': String, //Date (need react to take date input only)
  'Category': String,
  'Term-Definition':  String,
  'Application': String,
  'Sector': String,
  'Unit-of-Measure': String,
  'Options': [optionSchema]
});

// Create the model and expose it to our app
module.exports = mongoose.model('Term', termSchema);
