var Board = require("./board");
var Square = require("./square");
var buzzwords = require("./buzzwords");

function buildBoard(gameId, playerId){
   
    var numberOfSquares = 9;
    var words = buzzwords.slice(0, 9); // get random words
    var row = 1;
    var col = 1;

    var squares = [];

    for(var index = 0; index < words.length; index++){
        if (index !== 0 && index % 3 === 0){
            row++; // new row
            col = 1; // reset col
        } else if (index !== 0){
            col++; // next col in current row
        }

        squares.push(new Square(row, col, words[index]));
    }

    var board = new Board(gameId, playerId, squares);
    return board;
}

module.exports = buildBoard;