const mongoose = require('mongoose');

// Define the schema for our model
const compositeTermSchema = mongoose.Schema({
  'Transform-Name': String,
  'Implementation-Field': String,
  'Implementation-Value': Number,
  'Implementation-Units': String,
  'BEDES-Term': String,
  'Value-Mapping': String,
  'BEDES-Unit': String,
  'Unit-Conversion': Number,
  'BEDES-Composite Field-Name': String
});

// Create the model and expose it to our app
module.exports = mongoose.model('CompositeTerm', compositeTermSchema);
