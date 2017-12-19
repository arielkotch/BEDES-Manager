const mongoose = require('mongoose');

// Schema for Proposed Terms
const proposedSchema = mongoose.Schema({
    'URL': String,
    'Term': String,
    'Updated-date': {
        type: Date,
        default: Date.now
    },
    'Category': String,
    'Term-Definition': String,
    'Application': String,
    'Sector': String,
    'Unit-of-Measure': String,
});

module.exports = mongoose.model('Proposed_Term', proposedSchema);
