var React = require('react');

var App = React.createClass({
  render: function() {
    return (
      <div className="container app-container">
        <div className="well">
          App container
        </div>
        <div className="btn btn-primary">Button</div>
      </div>
    );
  }
});

module.exports = App;
