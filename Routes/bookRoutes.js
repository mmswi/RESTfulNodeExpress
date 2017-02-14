/**
 * Created by mmarinescu on 2/13/2017.
 */
const express = require('express')

const routes = (Book) => {
    const bookRouter = express.Router();

    // using controllers
    const bookController = require('../controllers/bookController')(Book)

    //url will be api/books/
    bookRouter.route('/')
        .get(bookController.get)
        .post(bookController.post)

//    Creating a middleware to filter the books by ids
    bookRouter.use('/:bookId', (req, res, next) => {
        Book.findById(req.params.bookId, (err, book) => {
            if (err)
                res.status(500).send(err);
            else if (book) {
                // we're adding the book to the request
                req.book = book;
                next();
            } else {
                res.status(404).send('no book found');
            }
        })
    })
// getting a single item by its id
    bookRouter.route('/:bookId')
        .get((req, res) => {
            // adding links here for HATEOS
            const returnBook = req.book.toJSON();
            returnBook.links = {};
            let newLink = 'http://' + req.headers.host + '/api/books/?genre=' + returnBook.genre
            returnBook.links.FilterByThisGenre = newLink.replace(' ', '%20');
            // by using the middleware, we just do a res.json and send the book back
            // res.json(req.book);
            res.json(returnBook);
        })
        // updating items - all fields
        .put((req, res) => {
            req.book.title = req.body.title;
            req.book.author = req.body.author;
            req.book.genre = req.body.genre;
            req.book.read = req.body.read;
            req.book.save()
            req.book.save((err) => {
                if (err)
                    res.status(500).send(err);
                else {
                    res.json(req.book)
                }
            })
        })
        .patch((req, res) => {
            if(req.body._id)
                delete req.body._id;
            for (let p in req.body) {
                req.book[p] = req.body[p];
            }
            req.book.save((err) => {
                if (err)
                    res.status(500).send(err);
                else {
                    res.json(req.book)
                }
            })
        })
        .delete((req, res) => {
            req.book.remove((err) => {
                if (err)
                    res.status(500).send(err);
                else {
                    res.status(204).send('Removed');
                }
            })
        });

    return bookRouter;
}

module.exports = routes;
