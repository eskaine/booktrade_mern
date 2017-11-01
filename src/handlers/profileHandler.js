'use strict';

var User = require('../models/users.js');
var PasswordHandler = require('./passwordHandler.js');
var ERROR = require('../common/error');

function ProfileHandler() {
  var passwordHandler = new PasswordHandler();
  var errorRes = ERROR.createRespond();

  this.getProfile = function(req, res) {

    if (req.user.address.city) {
      req.session.renderParams.city = req.user.address.city;
    }

    if (req.user.address.state) {
      req.session.renderParams.state = req.user.address.state;
    }

    req.session.renderParams.active = req.url;
    res.render('profile.pug', req.session.renderParams);
  }

  this.updateProfile = function(req, res) {
    var profile = {
      name: req.body.name,
      address: {
        city: req.body.city,
        state: req.body.state
      }
    };

    User.findOneAndUpdate({
      email: req.user.email
    }, profile).exec(function(err, result) {
      if (err)
        throw err;

      res.end();
    });
  }

  this.updatePassword = function(req, res) {
    var oldPass = req.body['oldPass'];
    var newPass = req.body['newPass'];

    passwordHandler.update(req.user.password, oldPass, newPass, function(hash, error) {
      if(error) {
        errorRes.type = ERROR.TYPE.INVALID_PASSWORD;
        errorRes.message = ERROR.MESSAGE.INVALID_PASSWORD;
        req.session.error = errorRes;
        res.redirect('/error');
      }

      if(hash) {
        User.findOneAndUpdate({
          email: req.user.email
        }, {password: hash}).exec(function(err, result) {
          if (err)
            throw err;

          res.end();
        });
      }


    });
  }

}

module.exports = ProfileHandler;
