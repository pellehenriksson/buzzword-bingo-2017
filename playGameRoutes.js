var JSX = require("node-jsx").install();
var React = require("react");
var ReactDOM = require("react-dom/server");
var gameRegistry = require("./models/gameRegistry");
var PlayGame = React.createFactory(require("./components/PlayGame.react"));

// push io in here

module.exports = {
    index : function(req, res){
        var game = gameRegistry.get(req.params.id);
        var board = game.getPlayerBoard(req.cookies.buzzwordbingo) || game.buildBoard(req.cookies.buzzwordbingo);
        
        var model = board.toModel();

        model.gameName = game.name;

        var opponents = game.getOpponentBoards(req.cookies.buzzwordbingo);
        var x = opponents.map(function(b){
            return b.toModel();
        });

        model.opponents = x;
        
        console.log(model);

        var markup = ReactDOM.renderToString(PlayGame({ data: model }));
        res.render("playgame", { markup: markup, state: JSON.stringify(model) });
    },

    changePlayerName: function(req, res){
        var game = gameRegistry.get(req.params.id);
        var board = game.getPlayerBoard(req.cookies.buzzwordbingo);

        board.setPlayerName(req.body.name);

        res.sendStatus(200);
    },

    markSquare: function(req, res){
        var game = gameRegistry.get(req.params.id);
        var board = game.getPlayerBoard(req.cookies.buzzwordbingo);

        board.markSquare(req.body.squareId);

        res.sendStatus(200);
    }
};