/** @jsx React.DOM */
var React = require("react");
var axios = require("axios");

var PlayGameBoardSquare = require("./PlayGameBoardSquare.react");

module.exports = PlayGameBoard = React.createClass({

    getInitialState: function(){
        return { board: this.props.board };
    },

    render: function(){
        return (
            <div className="board">
            {this.state.board.squares.map(function(s, index) {
                return <PlayGameBoardSquare key={index} index={index} square={s} onSquareMarked={this.handleSquareMarked} />;
            }, this)}
            </div>
        );
    },

    handleSquareMarked: function(square, index) {

        // get to this in the callback
        var self = this;

        var model = { boardId: this.state.board.id, squareId: square.id };

        axios.post("/play/" + this.props.gameId + "/marksquare", model)
            .then(function(response) {

                // pull board out of state
                var board = self.state.board;

                // update the square
                board.squares[index].marked = true;

                // update the state
                self.setState({ board: board });

            })
            .catch(function(error) {
                console.error(error);
            });
    },

    propTypes: {
        gameId: React.PropTypes.string.isRequired,
        board: React.PropTypes.object.isRequired
    }

});