// Bedes ? Schema here
const mongoose = require('mongoose');

// Define the schema for our model
const listOptionSchema = mongoose.Schema({
  Content-UUID: String,
  URL: String,
  Term: String,
  Updated-date: Date,
  Related-Term: String,
  Related-Term-UUID: String,
  Option-Definition: String,
  Application: String,
  Sector: String,
  Unit-of-Measure: String
});

// Create the model and expose it to our app
module.exports = mongoose.model('ListOption', listOptionSchema);