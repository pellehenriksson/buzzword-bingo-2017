/** @jsx React.DOM */
var React = require("react");

var PlayGameOpponentSquare = require("./PlayGameOpponentSquare.react");

var PlayGameOpponentBoard = React.createClass({
        render: function() {
            return <div className="opponents">
                    <strong>{this.props.board.playerName}</strong>
                    <div className="opponent-board">
                    {this.props.board.squares.map(function (s) {
                    return <PlayGameOpponentSquare key={s.id} square={s} />;
                    })}
                    </div>
                </div>;
        },

      propTypes: {
        board: React.PropTypes.object.isRequired
    }
});

module.exports = PlayGameOpponentBoard;
