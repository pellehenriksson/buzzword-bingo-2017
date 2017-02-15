var uuid = require("node-uuid");

function Square(row, col, word){
    this.id = uuid.v1();
    this.col = col;
    this.row = row;
    this.word = word;
    this.marked = false;
}

Square.prototype.mark = function(){
    this.marked = true;
};

Square.prototype.toString = function(){
    return JSON.stringify(this);
};

module.exports = Square;