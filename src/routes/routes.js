'use strict';

const BookHandler = require('../handlers/bookHandler.js');
const TradeHandler = require('../handlers/tradeHandler.js');
const ProfileHandler = require('../handlers/profileHandler.js')

module.exports = function(app, passport) {

  var bookHandler = new BookHandler();
  var tradeHandler = new TradeHandler();
  var profileHandler = new ProfileHandler();

  const ERROR_MSG = {
    SIGNUP: "Email already taken. Try another.",
    LOGIN_EMAIL: "Email incorrect. Please try again.",
    LOGIN_PASS: "Password incorrect. Please try again."

  };

  function createUserParams(req) {
    if(!req.session.userParams) {
      req.session.userParams = {
        isAuthenticated: req.isAuthenticated(),
        name: req.user.name,
        city: req.user.address.city,
        state: req.user.address.state,
        books: [],
        requests: req.user.requestsCount,
        approvals: 0
      }
    }
  }

  app.route('/signup').post(passport.authenticate('signup', {
    successRedirect: '/success',
    failureRedirect: '/error'
  }));

  app.route('/login').post(passport.authenticate('login', {
    successRedirect: '/success',
    failureRedirect: '/error'
  }));

  app.route('/error').get(function (req, res) {
    res.status(202).send({error: req.session.error});
  });

  app.route('/success').get(function (req, res) {
    createUserParams(req);
    res.send(req.session.userParams);
  });

  app.route('/profile').post(profileHandler.updateProfile);

  app.route('/user').get(function (req, res) {
    console.log(' get user');
    res.send('/signup');
  });

  app.route('/logout').get(function(req, res) {
    delete req.session.userParams;
    req.logout();
    res.end();
  });

  app.route('*').get(function(req, res) {
    console.log(req.url);
  });

}
