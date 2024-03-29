var Board = require("../models/board");
var Square = require("../models/square");
var buildBoard = require("../models/board-builder");

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

    describe("toModel()", function(){

        var gameId = uuid.v1();
        var playerId = uuid.v1();
        var sut = buildBoard(gameId, playerId);

        it("should return a model", function(){

            var result = sut.toModel();

            result.gameId.should.equal(sut.gameId);
            result.playerId.should.equal(sut.playerId);
            result.board.id.should.equal(sut.id);
            result.board.playerName.should.equal("a nameless ghoul");
            result.board.squares.length.should.equal(9);
        });
    });

    describe("gotBingo()", function(){

        describe("no complete row or column", function(){

            var gameId = uuid.v1();
            var playerId = uuid.v1();
            var sut = buildBoard(gameId, playerId);

            it("should be false", function(){
                
                var result = sut.gotBingo();
                result.should.equal(false);

            });
        });

        describe("one complete row", function(){
            
            var gameId = uuid.v1();
            var playerId = uuid.v1();
            var sut = buildBoard(gameId, playerId);

            sut.markSquare(sut.squares[0].id);
            sut.markSquare(sut.squares[1].id);   
            sut.markSquare(sut.squares[2].id);

            it("should be true", function(){
                
                var result = sut.gotBingo();
                result.should.equal(true);
            });
        });

         describe("one complete column", function(){
            
            var gameId = uuid.v1();
            var playerId = uuid.v1();
            var sut = buildBoard(gameId, playerId);

            sut.markSquare(sut.squares[0].id);
            sut.markSquare(sut.squares[3].id);   
            sut.markSquare(sut.squares[6].id);

            it("should be true", function(){

                var result = sut.gotBingo();
                result.should.equal(true);
            });
        });
    });
});
