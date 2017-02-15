var Game = require("./Game");

function gameRegistry(){

    var games = [];

    games.push(new Game("a", "hej"));
    games.push(new Game("b", "då"));

    function add(name, playerId){
        var game = new Game(name, playerId);
        games.push(game);
    }

    return{
        games: games,
        add : add
    };
}

module.exports = gameRegistry();