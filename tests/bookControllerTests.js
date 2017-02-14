/**
 * Created by mmarinescu on 2/14/2017.
 * UNIT TESTS
 */
// npm i gulp-mocha should sinon --save

const should = require('should'),
    sinon = require('sinon');

describe('Book Controller Tests: ', ()=> {
    describe('Post Test ', () => {
        /* We're testing to see if we send a request without the title
        * we get a 400 status*/
        it('should not allow an empty title on post', () => {
            // creating a mock book with a save method which will be called
            //NOTE!! If you declare Book as an arrow function, we get -> TypeError: Book is not a constructor
            // you can declare as a classic function
            const Book = function (book) {
                this.save = () => {}
            }
            // or a class
            //
            // class Book {
            //     constructor() {
            //         this.save = ()=> {}
            //     }
            // }

            // mocking the request, sending a req without a title
            const req = {
                body: {
                    author: 'Mihai M'
                }
            }
            // mocking the response
            // sinon creates a spy, which keeps track of what is called and what it's called with
            const res = {
                status: sinon.spy(),
                send: sinon.spy()
            }

            // calling the controller with our mock book
            const bookController = require('../controllers/bookController')(Book);
            // and our mock req and res
            bookController.post(req, res);
            // calling with a bad status
            res.status.calledWith(400).should.equal(true, 'Bad Status ' + res.status.args[0][0])
            res.send.calledWith('Title is required').should.equal(true);
        })
    })
})