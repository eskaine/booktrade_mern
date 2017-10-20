'use strict';

var LocalStrategy = require('passport-local').Strategy;
var PasswordHandler = require('./passwordHandler.js');
var User = require('../models/users');

module.exports = function(passport) {

  var passwordHandler = new PasswordHandler();

  var errorRes = {
    type: '',
    message: ''
  };

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, function(req, email, password, done) {
    User.findOne({
      email: email
    }, {__v: 0}).exec(function(err, user) {
      if (err) {
        return done(err);
      }

      if (!user) {
        errorRes.type = 'email';
        errorRes.message = 'Invalid email.';
        req.session.error = errorRes;
        return done(null, false);
      }

      passwordHandler.verify(user.password, password).then(function fulfilled() {
        return done(null, user);
      }, function rejected() {
        errorRes.type = 'password';
        errorRes.message = 'Invalid password.';
        req.session.error = errorRes;
        return done(null, false);
      });
    });
  }));

  passport.use('signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, function(req, email, password, done) {
    User.findOne({
      email: email
    }, {email: 1, _id: 0}).exec(function(err, user) {
      if (err)
        return done(err);

      if (!user) {
        var newUser = new User();
        newUser.name = req.body.name;
        newUser.email = email;
        newUser.requestsCount = 0;
        passwordHandler.hash(password).then(function fulfilled(hash) {
          newUser.password = hash;
          newUser.save(function(err) {
            if (err)
              return done(err);
            return done(null, newUser);
          });
        });
      } else {
        errorRes.type = 'email';
        errorRes.message = 'Email taken.';
        req.session.error = errorRes;
        return done(null, false);
      }
    });

  }));

}
