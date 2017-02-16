/** @jsx React.DOM */
var React = require("react");
var axios = require("axios");

module.exports = PlayGame = React.createClass({
    render: function(){
        return (
            <div>
                <div>
                    <strong>{this.props.data.gameName}</strong>
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