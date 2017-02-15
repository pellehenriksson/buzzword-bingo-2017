var JSX = require("node-jsx").install();
var React = require("react");
var ReactDOM = require("react-dom/server");

var gameRegistry = require("./models/gameRegistry");

module.exports = {
    index : function(req, res){
        res.render("play");
    }
};