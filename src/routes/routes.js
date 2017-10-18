'use strict';

module.exports = function(app, passport) {

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
        books: [],
        requests: req.user.requestsCount,
        approvals: 0
      }
    }
  }

  app.route('/signup').post(passport.authenticate('signup'), function(req, res) {
    createUserParams(req);
    let response = req.session.userParams;

    if(req.session.emailError) {
      response =  {isAuthenticated: false, message: ERROR_MSG.SIGNUP};
    }

    res.send(response);
  });

  app.route('/login').post(passport.authenticate('login'), function (req, res) {
    let response = {
      isAuthenticated: false
    };

    if(req.session.emailError) {
      response.message = ERROR_MSG.LOGIN_EMAIL;
    } else if(req.session.passwordError) {
      response.message = ERROR_MSG.LOGIN_PASS;
    } else {
      createUserParams(req);
      response = req.session.userParams;
    }

    res.send(response);
  });

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
