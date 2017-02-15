var Board = require("./board");
var buildBoard = require("./board-builder");

var uuid = require("node-uuid");
var _ = require("lodash");

function Game(name, playerId){
    this.id = uuid.v1();
    this.name = name;
    this.playerId = playerId;
    this.boards = [];
}

Game.prototype.buildBoard = function(playerId){
    var board = buildBoard(this.id, playerId);
    this.boards.push(board);
    return board;
};

Game.prototype.getPlayerBoard = function(playerId){
    var result = _.find(this.boards, function(b){
        return b.playerId === playerId;
    });
    return result;
};

Game.prototype.toString = function(){
    return JSON.stringify(this);
};

module.exports = Game;