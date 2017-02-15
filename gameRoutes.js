var JSX = require("node-jsx").install();
var React = require("react");
var ReactDOM = require("react-dom/server");

var gameRegistry = require("./models/gameRegistry");

var Games = React.createFactory(require("./components/Games.react"));

module.exports = {
    index: function(req, res){
        res.render("index");
    },

    games: function(req, res){
        var markup = ReactDOM.renderToString(Games( {data: gameRegistry.games }));
        res.render("games", { markup: markup, state: JSON.stringify(gameRegistry.games) });
    },

    gamesList: function(req, res){
        res.json(gameRegistry.games);
    },

    newGame: function (req, res){
        gameRegistry.add(req.body.name, req.cookies.buzzwordbingo);
        res.sendStatus(200);
    }
};