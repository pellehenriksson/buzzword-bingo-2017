/** @jsx React.DOM */
var React = require("react");
var axios = require("axios");

var GameItem = require("./MyGameItem.react");
var NewGame = require("./MyNewGame.react");

module.exports = MyGames = React.createClass({
        render: function(){
            return (<div>
                <h4>My Games</h4>
                <table className="u-full-width">
                    <tbody>
                        {this.state.data.map(function(game, index){
                            return <MyGameItem key={index} game={game} />;
                        }, this)}
                    </tbody>
                </table>
                <MyNewGame name={this.state.newGame} onChange={this.handleNewGameChanged} onClick={this.handleNewGameClick} />
            </div>);
    },

    getInitialState: function(props){
        props = props || this.props;
        return {
            data: props.data,
            newGame: ""
        };
    },

    componentWillReceiveProps: function(newProps, oldProps){
        this.setState(this.getInitialState(newProps));
    },

    handleNewGameChanged: function(e){
        var name = e.target.value;
        this.setState({ newGame: name });
    },

    handleNewGameClick: function(){

        var model = {
            name : this.state.newGame
        };

        var self = this;

        axios.post("/games", model)
            .then(function(response){
                axios.get("games/list")
                    .then(function(response){
                        self.setState({ data: response.data });
                        self.setState({ newGame: "" });
                    });              

            }).catch(function(error){
                console.error(error);
            });
    }
});