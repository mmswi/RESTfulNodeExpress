/**
 * Created by mmarinescu on 2/14/2017.
 */

// Integration tests

const should = require('should'),
    request = require('supertest'),
    app = require('../app.js'),
    mongoose = require('mongoose'),
    Book = mongoose.model('Book'),
    agent = request.agent(app);

describe('Book Crud Test ', () => {
    it('Should allow a book to be posted and return a read and _id', (done) => {
        const bookPost = {title: 'test book', author: 'test author', genre: 'testgenre'}

        agent.post('/api/books')
            .send(bookPost)
            .expect(200)
            .end((err, res)=>{
                res.body.read.should.equal(false);
                res.body.should.have.property('_id');
                done();
            })
    })

    afterEach((done) => {
        Book.remove().exec();
        done();
    })
})
