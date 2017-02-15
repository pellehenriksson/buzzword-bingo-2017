var Game = require("../models/game");
var uuid = require("node-uuid");

var should = require("should");
var _ = require("lodash");

describe("Game", function(){
    
    describe("constructor", function(){

        var playerId = uuid.v1();
        var sut = new Game("game of life", playerId);

        it("should set random id", function(){
            // sut.id.should.exist();
            // console.log(sut.toString());
        });

        it("should set name", function(){
            sut.name.should.equal("game of life");
        });

        it("should set playerId", function(){
            sut.playerId.should.equal(playerId);
        });

        it("should set empty boards array", function(){
            sut.boards.length.should.equal(0);
        });
    });

    describe("buildBoard()", function(){

        var playerId = uuid.v1();
        var sut = new Game("game of life", playerId);

        var board = sut.buildBoard(playerId);

        it("should build board for playerId", function(){
            board.playerId.should.equal(playerId);
        });

        it("should add board to boards array", function(){
        
            var index = _.findIndex(sut.boards, function(item){
                    return item.id === board.id;
            });

            index.should.equal(0);
        });
    });
});

