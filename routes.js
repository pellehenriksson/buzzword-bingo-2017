var JSX = require("node-jsx").install();
var React = require("react");
var ReactDOM = require("react-dom/server");

var Games = React.createFactory(require("./components/Games.react"));

module.exports = {
    index: function(req, res){
        res.render("index");
    },

    games: function(req, res){
        var markup = ReactDOM.renderToString(Games());
        res.render("games", { markup: markup });
    }
};