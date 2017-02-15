/** @jsx React.DOM */
var React = require("react");
var ReactDOM = require("react-dom");
var Games = require("./components/Games.react");

var initialState = JSON.parse(document.getElementById("initial-state").innerHTML);

ReactDOM.render(<Games data={initialState} />, document.getElementById("react-app"));