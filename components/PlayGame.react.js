/** @jsx React.DOM */
var React = require("react");
var axios = require("axios");

var PlayGamePlayer = require("./PlayGamePlayer.react");

module.exports = PlayGame = React.createClass({
    
    render: function(){
        return (
            <div>
                <div>
                    <strong>{this.props.data.gameName}</strong>
                    <PlayGamePlayer gameId={this.props.data.gameId} boardId={this.props.data.board.id} name={this.props.data.board.playerName}/>
                </div>
            </div>);
    },
    
    getInitialState: function(props){
        props = props || this.props;
        
        return {
            data: props.data,
        };
    },

     componentWillReceiveProps: function(newProps, oldProps){
        this.setState(this.getInitialState(newProps));
    }
});