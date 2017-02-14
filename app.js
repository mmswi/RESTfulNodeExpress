/**
 * Created by mmarinescu on 2/13/2017.
 */

const express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

//bookAPI is the db we're connecting to
let db;
if(process.env.ENV == 'Test') {
    // mongoose will create the db, when it doesn't exist
    db = mongoose.connect('mongodb://localhost/bookAPI_test');
} else {
    db = mongoose.connect('mongodb://localhost/bookAPI');
}
const Book = require('./models/bookModel');
const Author = require('./models/authorModel');
// injecting the Book into bookrouter
const bookRouter = require('./Routes/bookRoutes')(Book);
const authorsRouter = require('./Routes/authorRoutes')(Author)
const app = express();

// bodyParser is a module used for the post requests, in order to understand the data it receives from req
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json()); //if the req has any json in the body, it will add it to req.body

let port = process.env.PORT || 3000;

// the actual routes
app.use('/api/books', bookRouter);
app.use('/api/authors', authorsRouter);
app.get('/', (req, res) => {
    res.send('welcome to my API')
})

app.listen(port, () => {
    console.log('Running on the port ' + port)
})

module.exports = app;