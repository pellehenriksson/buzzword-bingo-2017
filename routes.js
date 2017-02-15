var JSX = require("node-jsx").install();
var React = require("react");
var ReactDOM = require("react-dom/server");

var Games = React.createFactory(require("./components/Games.react"));

var data = [
    { id: 1, name: "game 1" },
    { id: 2, name: "game 2" }
];  

module.exports = {
    index: function(req, res){
        res.render("index");
    },

    games: function(req, res){

        var markup = ReactDOM.renderToString(Games( {data: data }));
        res.render("games", { markup: markup, state: JSON.stringify(data) });
    },

    gamesList: function(req, res){
        res.json(data);
    },

    newGame: function (req, res){
        data.push({id: 666, name: req.body.name });
        res.sendStatus(200);
    }
};