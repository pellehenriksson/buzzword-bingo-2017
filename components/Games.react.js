/** @jsx React.DOM */
var React = require("react");
var GameItem = require("./GameItem.react");

module.exports = Games = React.createClass({
    render: function(){
       return (<div>
        <table>
            <thead>
                <tr><th>Id</th></tr>
                <tr><th>Name</th></tr>
            </thead>
            <tbody>
                {this.state.data.map(function(game, index){
                    return <GameItem key={index} game={game} />;
                }, this)}
            </tbody>
        </table>
       </div>);
    },

    getInitialState: function(props){
        
        props = props || this.props;

        return {
            data: props.data
        };
  },

  componentWillReceiveProps: function(newProps, oldProps){
        this.setState(this.getInitialState(newProps));
  },
});