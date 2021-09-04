
var express = require('express');
var app = express();
var port = process.env.PORT || 5000;
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(bodyParser());

app.use(express.static(__dirname + '/public'));

var engines = require('consolidate');
app.engine('html', engines.mustache);
app.set('views', __dirname + '/html');
app.set('view engine', 'html');

app.use(session({secret:'AlgoWar by Maurice W2'}));
app.use(flash());

require('./routes.js')(app);

app.listen(port);
console.log('Application running on port:' + port);
