require("babel-register");
var express = require('express');
var app = express();
var path = require('path');
var config = require('./config');
var React = require('react');
var Router = require('react-router').Router;
var match = require('react-router').match;
var RoutingContext = require('react-router').RoutingContext;
var ReactDOMServer = require('react-dom/server');

// Use handlebars as the view engine
var expressHbs = require('express-handlebars');
app.engine('hbs', expressHbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Statis route for js, css, fonts, etc.
app.use('/assets', express.static('dist'));

// Load the routes
var routes = require('./routes');

// Use react-router to handle the routing and render the correct component.
/*import { renderToString } from 'react-dom/server'
import { match, RoutingContext } from 'react-router'
import routes from './routes'*/

app.use(function(req, res, next) {
  match({routes, req.url}, function(error, redirectLocation, renderProps) {
    if(error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if(renderProps) {
      res.status(200);//.send(renderToString(<RoutingContext {...renderProps} />))
      var reactOutput = ReactDOMServer.renderToString(React.createElement('RoutingContext', renderProps));
      res.render('index', { react: reactOutput });
    } else {
      res.status(404).send('Not found')
    }
  })
})

// Use react-router to handle the routing and render the correct component.
/*app.use(function(req, res, next) {
  var reactOutput = ReactDOMServer.renderToString(React.createElement('Router', {routes: routes}));
  res.render('index', { react: reactOutput });
});*/

// If we get this far, time to send the 404 page
app.use(function(req, res) {
  res.send('This is not the route you\'re looking for!');
});

// Launch the server
var server = app.listen(config.server.httpPort, function () {
    console.log('Server listening at http://%s:%s', server.address().address, server.address().port);
});
