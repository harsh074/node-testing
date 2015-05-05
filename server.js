'use strict';

// Module dependencies.
var express = require('express');
var app = express();
var path = require('path');
var passport = require('passport');
var flash		= require('connect-flash');
var bcrypt   = require('bcrypt-nodejs');

var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var fs = require("fs");
var file = "./db/sqlite.db";
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/sqlite.db');

//  Create Database ===================================================================
if(!fs.existsSync(file)) {
	require('./db/create_db.js')(db);
}

// Express Configuration =============================================================
app.set('port', process.argv[2] || 3000);

app.set('views', path.join(__dirname, './app/views'));
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'app')));

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// required for passport ============================================================
app.use(session({ secret: 'loginauth', resave: false, saveUninitialized: true })); // session secret

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// Routes ============================================================================
require('./routes/routes')(app,db,passport,bcrypt);
require('./config/passport')(passport,db,bcrypt);
// Start server ======================================================================
var port = process.env.PORT || 3000;
app.listen(port, function () {
	console.log('Express server listening on port %d in %s mode', port, app.get('env'));
});