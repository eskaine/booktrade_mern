'use strict';

var User = require('../models/users.js');
var Book = require('../models/books');

function TradeHandler() {

  this.requestList = function (req, res) {
    var bookCursor = Book.find({request_from: String(req.user._id)}, {_id: 1, imageUrl: 1, isApproved: 1});
    bookCursor.sort({title: 1})
    .exec(function(err, result) {
      if (err)
        throw err;
      res.send(result);
    });
  }

  this.approvalList = function (req, res) {
    Book.aggregate([
      {$match: {owner_id: String(req.user._id), request_from: {$exists: true}}},
      {$sort: {title: 1}},
      {$project: {_id: 1, imageUrl: 1, isApproved: 1} },
      {$group: {_id: 0, books: {$push: {_id: "$_id", imageUrl: "$imageUrl", isApproved: "$isApproved"}}, isApproved_count: {
        $sum: {$cond: [{$ifNull: ["$isApproved", false]}, 1, 0]}
      },}}
    ])

    .exec(function (err, result) {
      if (err)
        throw err;

      var count = result[0].books.length - result[0].isApproved_count;
      req.session.renderParams.approvals = count;
      res.send({books: result[0].books, count: count});
    });
  }

  this.requestBook = function(req, res) {
    Book.findOne({_id: req.body.id}).exec(function(err, result) {
      if (err)
        throw err;
      //check if book is already requested for by another use
      if (!result.request_from) {
        //prepare param
        var param = {
          request_from: req.user._id
        };
        //update book
        bookUpdate(req.body.id, param, function(respond) {
          updateRequestsCount(req.user._id, 1)
          .then(function fulfilled(result) {
            req.session.userParams.requests = result.requestsCount;
            res.end();
          });
        });
      }
    });
  }

  this.deleteRequest = function(req, res) {
    var param = {$unset: {request_from: ""}};

    bookUpdate(req.body.id, param, function (respond) {
      updateRequestsCount(respond.request_from, -1)
      .then(function fulfilled(result) {
        var path = req.url.split('/');
        if(path[1] === 'delete') {
          req.session.renderParams.requests = result.requestsCount;
          res.send({count: result.requestsCount});
        } else {
          req.session.renderParams.approvals -= 1;
          res.send({count: req.session.renderParams.approvals});
        }
      });
    });
  }



//TODO: email form


  this.approveRequest = function(req, res) {
    var param = {isApproved: true};
    bookUpdate(req.body.id, param, function(respond) {
      updateRequestsCount(respond.request_from, -1)
      .then(function fulfilled(result) {
        req.session.renderParams.approvals -= 1;
        res.send({count: req.session.renderParams.approvals});
      });
    });
  }

  function bookUpdate(bookID, updateParam, callback) {
    Book.findOneAndUpdate({_id: bookID}, updateParam)
    .exec(function (err, result) {
      if (err)
        throw err;
        callback(result);
    });
  }

  function updateRequestsCount(userID, count) {
    return new Promise(function (resolve){
      User.findOneAndUpdate(
        {_id: userID},
        {$inc: {requestsCount: count}},
        {projection: {_id: 0, requestsCount: 1}, new: true}
      ).exec(function(err, result) {
        if (err)
          throw err;

          resolve(result);
      });
    });
  }

}

module.exports = TradeHandler;
