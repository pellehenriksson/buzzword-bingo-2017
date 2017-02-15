var Board = require("../models/board");
var Square = require("../models/square");
var uuid = require("node-uuid");

var should = require("should");

describe("Board", function(){
    
    describe("constructor", function(){

        var gameId = uuid.v1();
        var playerId = uuid.v1();
        var sut = new Board(gameId, playerId, []);

        it("should set random id", function(){
            // sut.id.should.exist();
            // console.log(sut.toString());
        });

        it("should set gameId", function(){
            sut.gameId.should.equal(gameId);
        });

        it("should set playerId", function(){
            sut.playerId.should.equal(playerId);
        });

        it("should set squares", function(){
            sut.squares.length.should.equal(0);
        });

        it("should set a default playerName", function(){
            sut.playerName.should.equal("a nameless ghoul");
        });
    });

    describe("setPlayerName()", function(){
                
        var gameId = uuid.v1();
        var playerId = uuid.v1();
        var sut = new Board(gameId, playerId, []);

        sut.setPlayerName("ulla-bella");

        it("should set new player name", function(){
            sut.playerName.should.equal("ulla-bella");
        });
    });

    describe("markSquare()", function(){
        
        var gameId = uuid.v1();
        var playerId = uuid.v1();

        var squares = [];
        var square = new Square(1, 1, "hej");
        squares.push(square);

        var sut = new Board(gameId, playerId, squares);

        it("should set marked on square to true", function(){

            sut.markSquare(square.id);
            square.marked.should.equal(true);
        });
    });
});
