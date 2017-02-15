var buzzwords = require("../models/buzzwords");

var should = require("should");

describe("buzzwords", function(){
    
    it("should have 256 items", function(){
        buzzwords.length.should.equal(256);
    });
});