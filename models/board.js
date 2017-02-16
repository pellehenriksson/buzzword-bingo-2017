var _ = require("lodash");
var uuid = require("node-uuid");

function Board(gameId, playerId, squares){
    this.id = uuid.v4();
    this.playerId = playerId;
    this.gameId = gameId;
    this.playerName = "a nameless ghoul";
    this.squares = squares;
}

Board.prototype.setPlayerName = function(name){
    this.playerName = name;
};

Board.prototype.markSquare = function(id){
    var index = _.findIndex(this.squares, function(item){
        return item.id == id;
    }, this);

    this.squares[index].mark();
};

Board.prototype.gotBingo = function(){
    // one row bingo only at this point
    var rows = _.uniqBy(this.squares, "row");
};

Board.prototype.toModel = function(){

    return {
        gameId: this.gameId,
        gameName: "", // set later
        playerId: this.playerId,
        board: {
            id: this.id,
            playerName: this.playerName,
            squares: this.squares.map(function(s){ return s.toModel(); })
        },
        opponents: [] // set later
    };
};

Board.prototype.toString = function(){
    return JSON.stringify(this);
};

module.exports = Board;