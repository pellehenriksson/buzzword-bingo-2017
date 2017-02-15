var JSX = require("node-jsx").install();
var React = require("react");
var ReactDOM = require("react-dom/server");

var gameRegistry = require("./models/gameRegistry");

var MyGames = React.createFactory(require("./components/MyGames.react"));

module.exports = {
    index: function(req, res){
        res.render("index");
    },

    games: function(req, res){
        var games = gameRegistry.getPlayerGames(req.cookies.buzzwordbingo);
        var markup = ReactDOM.renderToString(MyGames( { data: games }));
        res.render("mygames", { markup: markup, state: JSON.stringify(games) });
    },

    gamesList: function(req, res){
        var games = gameRegistry.getPlayerGames(req.cookies.buzzwordbingo);
        res.json(games);
    },

    newGame: function (req, res){
        gameRegistry.add(req.body.name, req.cookies.buzzwordbingo);
        res.sendStatus(200);
    }
};