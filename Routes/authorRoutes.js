/**
 * Created by mmarinescu on 2/14/2017.
 */
const express = require('express')

const routes = (Author) => {
    const authorRouter = express.Router();

    //url will be api/books/
    authorRouter.route('/')
        .get((req, res) => {
            // query is for routes like api/books?genre=Science%20Fiction, or api/books?author=Science%20Fiction
            let query = {};
            if (req.query.genre) {
                //avoiding random user input for the filtering
                query.genre = req.query.genre;
            }
            Author.find(query, (err, authors) => {
                if (err)
                    res.status(500).send(err);
                else
                    res.json(authors)
            })
        })
        .post((req, res) => {
            let author = new Author(req.body);
            author.save();
            res.status(201).send(author);
        })

// getting a single item by its id
    authorRouter.route('/:authorId')
        .get((req, res) => {
            Author.findById(req.params.authorId, (err, author) => {
                if (err)
                    res.status(500).send(err);
                else
                    res.json(author)
            })
        });

    return authorRouter;
}

module.exports = routes
