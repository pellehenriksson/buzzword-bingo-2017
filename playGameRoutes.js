var JSX = require("node-jsx").install();
var React = require("react");
var ReactDOM = require("react-dom/server");

var gameRegistry = require("./models/gameRegistry");

var PlayGame = React.createFactory(require("./components/PlayGame.react"));

module.exports = {
    index : function(req, res){

        var game = gameRegistry.get(req.params.id);
        var board = game.getPlayerBoard(req.cookies.buzzwordbingo) || game.buildBoard(req.cookies.buzzwordbingo);

        console.log(board);

        var markup = ReactDOM.renderToString(PlayGame());
        res.render("play", { markup: markup });
    }
};