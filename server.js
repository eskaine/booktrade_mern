'use strict';

const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const routes = require('./src/routes/routes.js');
const passport = require('passport');
const bodyParser = require('body-parser');

const app = express();

require('dotenv').load();
require('./src/handlers/passport')(passport);

app.use(session({
  secret: process.env.SESSION,
  resave: false,
  saveUninitialized: true
}));

//allowed cors
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, Content-Length, X-Requested-With');
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

app.use('/public', express.static(process.cwd() + '/client/public'));

mongoose.connect(process.env.MONGO_URI, {useMongoClient: true});
mongoose.Promise = global.Promise;

routes(app, passport);

var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log('Server initialize. Listening on port ' + port + ' ...');
});




