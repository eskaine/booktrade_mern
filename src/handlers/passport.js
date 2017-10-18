'use strict';

var LocalStrategy = require('passport-local').Strategy;
var PasswordHandler = require('./passwordHandler.js');
var User = require('../models/users');

module.exports = function(passport) {

  var passwordHandler = new PasswordHandler();
  var defaultProjection = {
    email: 1,
    name: 1,
    password: 1
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
    }, defaultProjection).exec(function(err, user) {
      if (err) {
        console.log('log error');
        console.log(err);
        return done(err);
      }

      if (!user) {
        req.session.emailError = true;
        return done(null, false);
      }

      passwordHandler.verify(user.password, password).then(function fulfilled() {
        return done(null, user);
      }, function rejected() {
        req.session.passwordError = true;
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
    }, defaultProjection).exec(function(err, user) {
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
        req.session.emailError = true;
        return done(null, user);
      }
    });

  }));

}
