/** @jsx React.DOM */
var React = require("react");
var axios = require("axios");

var GameItem = require("./GameItem.react");
var NewGame = require("./NewGame.react");

module.exports = Games = React.createClass({
        render: function(){
        return (<div>
            <h4>My Games</h4>
            <table className="u-full-width">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.data.map(function(game, index){
                        return <GameItem key={index} game={game} />;
                    }, this)}
                </tbody>
            </table>
            <NewGame name={this.state.newGame} onChange={this.handleNewGameChanged} onClick={this.handleNewGameClick} />
        </div>);
        },

        getInitialState: function(props){
            props = props || this.props;
            return {
                data: props.data,
                newGame: "some new game"
            };
    },

    componentWillReceiveProps: function(newProps, oldProps){
        this.setState(this.getInitialState(newProps));
    },

    handleNewGameChanged: function(e){
        var name = e.target.value.trim();
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
                        console.log(response);
                        self.setState({data: response.data});
                    });              

                self.setState({newGame: ""});
            }).catch(function(error){
                console.error(error);
            });
    }
});