var React = require('react');

var Menu = React.createClass({
    nextClickHandler: function() {
        this.props.next();
    },

    solveClickHandler: function() {
        this.props.solve();
    },

    render: function() {
        return (
            <div id="menu">
                <button disabled={this.props.isSolved} onClick={this.solveClickHandler}>Resolução</button>
                <button onClick={this.nextClickHandler}>Próximo Puzzle</button>
            </div>
        );
    }
});

module.exports = Menu;