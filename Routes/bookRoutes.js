/**
 * Created by mmarinescu on 2/13/2017.
 */
const express = require('express')

const routes = (Book) => {
    const bookRouter = express.Router();

    //url will be api/books/
    bookRouter.route('/')
        .get((req, res) => {
            // query is for routes like api/books?genre=Science%20Fiction, or api/books?author=Science%20Fiction
            let query = {};
            if (req.query.genre) {
                //avoiding random user input for the filtering
                query.genre = req.query.genre;
            }
            Book.find(query, (err, books) => {
                if (err)
                    res.status(500).send(err);
                else
                    res.json(books)
            })
        })
        .post((req, res) => {
            let book = new Book(req.body);

            book.save();
            res.status(201).send(book);
        })

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
            // by using the middleware, we just do a res.json and send the book back
            res.json(req.book);
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
