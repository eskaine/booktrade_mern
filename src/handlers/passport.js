'use strict';

var LocalStrategy = require('passport-local').Strategy;
var PasswordHandler = require('./passwordHandler.js');
var User = require('../models/users');
var ERROR = require('../common/error');

module.exports = function(passport) {

  var passwordHandler = new PasswordHandler();
  var errorRes = ERROR.createRespond();

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
        errorRes.type = ERROR.TYPE.INVALID_EMAIL;
        errorRes.message = ERROR.MESSAGE.INVALID_EMAIL;
        req.session.error = errorRes;
        return done(null, false);
      }

      passwordHandler.verify(user.password, password).then(function fulfilled() {
        return done(null, user);
      }, function rejected() {
        errorRes.type = ERROR.TYPE.INVALID_PASSWORD;
        errorRes.message = ERROR.MESSAGE.INVALID_PASSWORD;
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
        errorRes.type = ERROR.TYPE.EMAIL_TAKEN;
        errorRes.message = ERROR.MESSAGE.EMAIL_TAKEN;
        req.session.error = errorRes;
        return done(null, false);
      }
    });

  }));

}
