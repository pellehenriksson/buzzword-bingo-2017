/** @jsx React.DOM */
var React = require("react");

module.exports = MyNewGame = React.createClass({
    render : function(){
        return (<div>
            <h4>Start a new game</h4>
            <form>
                <input type="text" className="u-full-width" onChange={this.props.onChange} value={this.props.name} />
                <input type="button" className="button-primary" value="Create" onClick={this.props.onClick} disabled={!this.props.name}/>
            </form>
        </div>);
    }
});