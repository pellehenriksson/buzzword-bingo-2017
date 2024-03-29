/** @jsx React.DOM */
var React = require("react");

var PlayGameOpponentSquare = React.createClass({
    render: function () {
        return <div className={this.props.square.marked ? 'opponent-square-marked' : 'opponent-square' }></div>;
    },
    propTypes: {
        square: React.PropTypes.object.isRequired
    }
});

module.exports = PlayGameOpponentSquare;