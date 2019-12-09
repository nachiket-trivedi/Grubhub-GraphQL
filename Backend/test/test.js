var chai = require('chai'), chaiHttp = require('chai-http');

chai.use(chaiHttp);

var expect = chai.expect;

it("Should check credentials for login and return status code", function(done){
    chai.request('http://localhost:3001')
    .post('/login')
    .send({ "username": "nc@nc.com", "password" : "nc", "role":{ "value": "Customer", "label": "Customer"}})
    .end(function (err, res) {
        // console.log('res',res)
        expect(res).to.have.status(200);
        done();
    });
})

it("Should check credentials for signup and return status code", function(done){
    chai.request('http://localhost:3001')
    .post('/signup')
    .send({  "username": "j1@j1.com",
    "password": 'j1',
    "role": { "value": 'Restaurant', "label": 'Restaurant' },
    "name": 'Julius Cafe',
    "phone": '132',
    "zipcode": '234' })
    .end(function (err, res) {
        // console.log('res',res)
        expect(res).to.have.status(200);
        done();
    });
})


it("Should check get menu and return status code", function(done){
    chai.request('http://localhost:3001')
    .post('/getMenu')
    .send({ "email": "hc@hc.com"})
    .end(function (err, res) {
        // console.log('res',res)
        done();
    });
})

it("Should check get menu by customer and return status code", function(done){
    chai.request('http://localhost:3001')
    .post('/getMenuByCust')
    .send({ "email": "nc@nc.com"})
    .end(function (err, res) {
        // console.log('res',res)
        done();
    });
})


it("Should check credentials for login and return status code", function(done){
    chai.request('http://localhost:3001')
    .post('/login')
    .send({ "username": "nc@n1c.com", "password" : "nc", "role":{ "value": "Customer", "label": "Customer"}})
    .end(function (err, res) {
        // console.log('res',res)
        expect(res).to.have.status(200);
        done();
    });
})

it("Should check show cust profile and return status code", function(done){
    chai.request('http://localhost:3001')
    .post('/showCustProfile')
    .send({ "email": "nc@nc1.com"})
    .end(function (err, res) {
        // console.log('res',res)
        done();
    });
})

