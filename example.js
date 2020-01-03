const expect = require('chai').expect;
const request = require('supertest');
const {describe ,it} = require('mocha');
const app = require('./server.js');

describe('Search Movie Shows',(done) => {
    it('=======Done=======',function(){
        request(app).post('/search')
        .send({genre:'Drama',time:'20:00'})
        .then((res) => {
            const data = res.body.status;
            expect(data).to.equal(1);
        });
    });
});