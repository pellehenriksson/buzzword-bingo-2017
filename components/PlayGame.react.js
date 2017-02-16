/** @jsx React.DOM */
var React = require("react");
var axios = require("axios");

var PlayGamePlayer = require("./PlayGamePlayer.react");
var PlayGameBoard = require("./PlayGameBoard.react");
var PlayGameOpponents = require("./PlayGameOpponents.react");

module.exports = PlayGame = React.createClass({
    
    render: function(){
        return (
            <div>
                <div>
                    <strong>{this.props.data.gameName}</strong>
                    <PlayGamePlayer gameId={this.props.data.gameId} boardId={this.props.data.board.id} name={this.props.data.board.playerName}/>
                    <PlayGameBoard gameId={this.props.data.gameId} board={this.props.data.board} />
                    <p></p>
                    <div>
                        <PlayGameOpponents opponents={this.state.data.opponents}/>
                    </div>
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
    },

    componentDidMount: function(){
        this.socket = io();
        this.socket.emit("join", this.props.data.gameId);
        
        this.socket.on("gameEvent", this.handleGameEvent);
    },

    componentWillUnmount: function(){
        if (this.socket){
            this.socket.emit("leave", this.props.data.gameId);
        }
    },

    handleGameEvent: function(data){

        console.log(data);

        if (data.board.id === this.state.data.board.id) {
            console.log("This player caused the change, do nothing");
            return;
        }

        var opponents = this.state.data.opponents;

        var index = opponents.findIndex(function (item) {
            return item.board.id === data.board.id;
        });

        if (index > -1) {
            opponents[index] = data;
        } else {
            opponents.push(data);
        }

        this.setState({ opponents: opponents });
    }
});