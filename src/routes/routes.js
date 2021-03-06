'use strict';

const BookHandler = require('../handlers/bookHandler.js');
const TradeHandler = require('../handlers/tradeHandler.js');
const ProfileHandler = require('../handlers/profileHandler.js');

module.exports = function(app, passport) {

  var bookHandler = new BookHandler();
  var tradeHandler = new TradeHandler();
  var profileHandler = new ProfileHandler();

  function createUserParams(req) {
    if(!req.session.userParams) {
      req.session.userParams = {
        isAuthenticated: req.isAuthenticated(),
        name: req.user.name,
        city: req.user.address.city,
        state: req.user.address.state,
        books: [],
        requests: req.user.requestsCount
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

  app.route('/mybooks').get(bookHandler.displayMyBooks);
  app.route('/allbooks').get(bookHandler.displayAllBooks);
  app.route('/requestsList').get(tradeHandler.requestsList);
  app.route('/approvalsList').get(tradeHandler.approvalsList);
  app.route('/addbook').post(bookHandler.queryBook);
  app.route('/removebook').post(bookHandler.removeBook);
  app.route('/deleteRequest').post(tradeHandler.deleteRequest);
  app.route('/approveRequest').post(tradeHandler.approveRequest);
  app.route('/rejectRequest').post(tradeHandler.rejectRequest);
  app.route('/requestbook').post(tradeHandler.requestBook);
  app.route('/profile').post(profileHandler.updateProfile);
  app.route('/updatePassword').post(profileHandler.updatePassword);

  app.route('/error').get(function (req, res) {
    res.status(202).send(req.session.error);
  });

  app.route('/success').get(function (req, res) {
    createUserParams(req);
    res.send(req.session.userParams);
  });

  app.route('/logout').get(function(req, res) {
    delete req.session.userParams;
    req.logout();
    res.end();
  });

}


