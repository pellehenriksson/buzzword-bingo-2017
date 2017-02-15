/** @jsx React.DOM */
var React = require("react");

module.exports = MyGameItem = React.createClass({
    render: function(){
        return (<tr>
                <td>{this.props.game.id}</td>
                <td>{this.props.game.name}</td>
                <td><a href={"/play/" + this.props.game.id}>Play now</a></td>
            </tr>);
    }
});


