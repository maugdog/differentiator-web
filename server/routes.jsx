var React = require('react');
var Route = require('react-router').Route;

module.exports = [
  <Route path="/" handler={require('../src/js/components/App')}>
    {/* More routes */}
  </Route>
];
