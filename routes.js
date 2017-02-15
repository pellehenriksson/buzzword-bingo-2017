var JSX = require("node-jsx").install();
var React = require("react");
var ReactDOM = require("react-dom/server");

var Games = React.createFactory(require("./components/Games.react"));

module.exports = {
    index: function(req, res){
        res.render("index");
    },

    games: function(req, res){

        var data = [
            { id: 1, name: "game 1" },
            { id: 2, name: "game 2" }
        ];    

        var markup = ReactDOM.renderToString(Games( {data: data }));
        res.render("games", { markup: markup, state: JSON.stringify(data) });
    }
};