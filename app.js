/** @jsx React.DOM */
var React = require("react");
var ReactDOM = require("react-dom");

var MyGames = require("./components/MyGames.react");

var initialState = JSON.parse(document.getElementById("initial-state").innerHTML);

ReactDOM.render(<MyGames data={initialState} />, document.getElementById("react-app"));