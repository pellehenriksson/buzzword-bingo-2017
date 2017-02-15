/** @jsx React.DOM */
var React = require("react");

module.exports = GameItem = React.createClass({
    render: function(){
        return (<tr><td>{this.props.game.id}</td><td>{this.props.game.name}</td></tr>);
    }
});


