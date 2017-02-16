/** @jsx React.DOM */
var React = require("react");
var ReactDOM = require("react-dom");

var PlayGame = require("./components/PlayGame.react");

var initialState = JSON.parse(document.getElementById("initial-state").innerHTML);

ReactDOM.render(<PlayGame data={initialState}/>, document.getElementById("react-app"));