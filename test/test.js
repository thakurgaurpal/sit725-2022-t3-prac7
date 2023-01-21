let express = require("express");
let app = express();
const { url } = require("inspector");
var expect = require("chai").expect;
var request = require("request");

describe("Add Two Numbers", function(){
    var url = 'http://localhost:8080/addTwoNumbers/3/5';

    //first it function
    it("returns status 200 to checkif api works", function(){
        request(url, function(error, response){
            expect(response.statusCode).to.equal(200);
            done();
        });
    });
    //second it function
    it("return statusCode key in body to check if api ives right result should be 200", function(done){
        request(url, function(error, response, body){
            body = JSON.parse(body)
            expect(body.statusCode).to.equal(200);
            done()
        });
    });

    //third it fn
    it("returns the result as number", function(done) {
        request(url, function(error, response, body) {
            body = JSON.parse(body)
            expect(body.result).to.be.a('number');
            done()
          });
    });

    //fourth it fn
    it("returns the result equal to 8", function(done) {
        request(url, function(error, response, body) {
            body = JSON.parse(body)
            expect(body.result).to.equal(8);
            done()
          });
  });
  //fifth it fn
    it("returns the result not equal to 15", function(done) {
        request(url, function(error, response, body) {
            body = JSON.parse(body)
            expect(body.result).to.not.equal(15);
            done()
      });
    })

});