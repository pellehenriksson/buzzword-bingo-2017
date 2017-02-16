/** @jsx React.DOM */
var React = require("react");
var axios = require("axios");

module.exports = PlayGameBoardSquare = React.createClass({

    render: function(){
         return <div className={this.props.square.marked ? 'square-marked' : 'square'} onClick={this.handleClick }>{this.props.square.word}</div>;
    },

    handleClick: function (e) {

        if (this.props.square.Marked === true) {
            console.log("Square: '" + this.props.square.Word + "' already marked, do nothing.");
            return;
        }

        // use index to find square in board
        this.props.onSquareMarked(this.props.square, this.props.index);
    },

    propTypes: {
        index: React.PropTypes.number.isRequired,
        square: React.PropTypes.object.isRequired,
        onSquareMarked: React.PropTypes.func.isRequired
    }
});