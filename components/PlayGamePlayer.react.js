/** @jsx React.DOM */
var React = require("react");
var axios = require("axios");

module.exports = PlayGamePlayer = React.createClass({

    getInitialState: function() {
        return { name: this.props.name };
    },

    render: function() {
        return <div>
                   <input type="text" value={this.state.name} onChange={this.handleChange}/>
                   <input type="button" className={this.state
                    .name
                    ? 'button-primary'
                    : 'button'} value="OK" onClick={this.handleClick} disabled={!this.state.name}/>
               </div>;
    },

    handleChange: function(e) {
        var name = e.target.value;
        this.setState({ name: name });
    },

    handleClick: function(e) {
        var model = { name: this.state.name };

        axios.post("/play/" + this.props.gameId + "/changeplayername", model)
            .then(function(response) {})
            .catch(function(error) {
                console.error(error);
            });
    },

    propTypes: {
        gameId: React.PropTypes.string.isRequired,
        boardId: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired
    }
});