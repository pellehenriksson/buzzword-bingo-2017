/** @jsx React.DOM */
var React = require("react");

var PlayGameBingo = React.createClass({

    render: function () {
            if (this.props.playerName){
                return <div>
                    <h1>{this.props.playerName} won this game ;)</h1>
                    <img src="/img/loket-olsson.png" />
                </div>;
            }

            return <span></span>;
    },
    propTypes: {
        playerName: React.PropTypes.string.isRequired
    }
});

module.exports = PlayGameBingo;