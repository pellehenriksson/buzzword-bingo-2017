var uuid = require("node-uuid");

function Square(row, col, word){
    this.id = uuid.v4();
    this.col = col;
    this.row = row;
    this.word = word;
    this.marked = false;
}

Square.prototype.mark = function(){
    this.marked = true;
};

Square.prototype.toModel = function(){
    return {
        id: this.id,
        word: this.word,
        marked: this.marked
    };
};

Square.prototype.toString = function(){
    return JSON.stringify(this);
};

module.exports = Square;