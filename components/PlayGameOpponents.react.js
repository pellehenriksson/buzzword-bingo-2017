/** @jsx React.DOM */
var React = require("react");

var PlayGameOpponentBoard= require("./PlayGameOpponentBoard.react");

var PlayGameOpponents = React.createClass({
    render: function() {
        return <div>
                   {this.props.opponents.map(function (o) {
                    return <PlayGameOpponentBoard key={o.board.id} board={o.board} />;
                   })}
            </div>;
    },

    propTypes: {
        opponents: React.PropTypes.array.isRequired
    }
});

module.exports = PlayGameOpponents;