const mongoose = require('mongoose');

// Schema for Proposed Terms
const proposedSchema = mongoose.Schema({
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

module.exports = mongoose.model('Proposed_Term', proposedSchema);