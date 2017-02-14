const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Setting up the schema of the db
const authorModel = new Schema({
    name: {
        type: String
    },
    genre: {type: String},
    books: [{type: String}]
});

module.exports = mongoose.model('Author', authorModel)