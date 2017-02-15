var buildBoard = require("../models/board-builder");
var uuid = require("node-uuid");

var should = require("should");

describe("boardBuilder", function(){
    
    describe("build()", function(){

        var gameId = uuid.v1();
        var playerId = uuid.v1();
        var board = buildBoard(gameId, playerId);

        it("should build board", function(){
            should.exist(board);
        });

        it("should set gameId on board", function(){
            board.gameId.should.equal(gameId);
        });
        
        it("should set playerId on board", function(){
            board.playerId.should.equal(playerId);
        });

        it("should have 9 squares", function(){
            board.squares.length.should.equal(9);
        });
    });
});
