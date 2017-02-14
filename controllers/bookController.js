/**
 * Created by mmarinescu on 2/14/2017.
 */

const bookController = (Book) => {
    const post = (req, res) => {
        let book = new Book(req.body);
        if (!req.body.title) {
            res.status(400);
            res.send('Title is required')
        } else {
            book.save();
            res.status(201);
            res.send(book);
        }
    }

    const get = (req, res) => {
        // query is for routes like api/books?genre=Science%20Fiction, or api/books?author=Science%20Fiction
        let query = {};
        if (req.query.genre) {
            //avoiding random user input for the filtering
            query.genre = req.query.genre;
        }
        Book.find(query, (err, books) => {
            if (err)
                res.status(500).send(err);
            else {
                // ADDING HATEOS
                const returnBooks = [];
                books.forEach((element, index, array) => {
                    // adding links on the element, but not in the db
                    let newBook = element.toJSON();
                    newBook.links = {};
                    newBook.links.self = 'http://' + req.headers.host + '/api/books/' + newBook._id;
                    returnBooks.push(newBook);
                });
                res.json(returnBooks)
            }
        })
    }

    // Revealing module pattern
    return {
        post: post,
        get: get
    }
}

module.exports = bookController;
