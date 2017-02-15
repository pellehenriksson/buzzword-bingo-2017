var _ = require("lodash");

var Game = require("./Game");

function gameRegistry(){

    var _games = [];

    function add(name, playerId){
        var game = new Game(name, playerId);
        game.buildBoard(playerId);
        _games.push(game);
    }

    function get(id){
        var result = _.find(_games, function(g){ return g.id === id; });
        return result;
    }

    function getPlayerGames(playerId){
        var result = _.filter(_games, function(g){ return g.playerId === playerId; });
        return result || [];
    }

    return {
        games: _games,
        add : add,
        get: get,
        getPlayerGames: getPlayerGames
    };
}

module.exports = gameRegistry();