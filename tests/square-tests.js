var Square = require("../models/square");

var should = require("should");

describe("Square", function(){
   
    describe("constructor", function(){

        var sut = new Square(1, 2, "fart");

        it("should set row", function(){
            sut.row.should.equal(1);
        });

        it("should set col", function(){
            sut.col.should.equal(2);
        });

        it("should set word", function(){
            sut.word.should.equal("fart");
        });

        it("should set marked to false", function(){
            sut.marked.should.equal(false);
        });
    });

    describe("mark()", function(){
        
        var sut = new Square(1, 2, "fart");
        
         it("should set marked to true", function(){
            sut.mark();
            sut.marked.should.equal(true);
        });
    });
});
