'use strict';

var User = require('../models/users.js');
var Book = require('../models/books');
var Respond = require('../common/respond.js');

function TradeHandler() {

  this.requestsList = function (req, res) {
    let bookCursor = Book.find({request_from: String(req.user._id)}, {_id: 1, title: 1, imageUrl: 1, isApproved: 1});
    bookCursor.sort({title: 1})
    .exec(function(err, result) {
      if (err)
        throw err;

      let respond = Respond.generate();
      respond.list = result;
      respond.requestsCount = req.user.requestsCount;

      res.send(respond);
    });
  }

  this.approvalsList = function (req, res) {
    Book.aggregate([
      {$match: {owner_id: String(req.user._id), request_from: {$exists: true}}},
      {$sort: {title: 1}},
      {$project: {_id: 1, title: 1, imageUrl: 1, isApproved: 1} },
      {$group: {_id: 0, books: {$push: {_id: "$_id", imageUrl: "$imageUrl", isApproved: "$isApproved"}}, isApproved_count: {
        $sum: {$cond: [{$ifNull: ["$isApproved", false]}, 1, 0]}
      },}}
    ])

    .exec(function (err, result) {
      if (err)
        throw err;

        let respond = Respond.generate();
        respond.approvalsCount = 0;

        if (result.length > 0) {
          respond.list =  result[0].books;
          respond.approvalsCount = result[0].books.length - result[0].isApproved_count;
        }

        res.send(respond);
    });
  }

  this.requestBook = function(req, res) {
    Book.find({_id: req.body.id}, {_id: 1, request_from: 1}).limit(1)
    .exec(function(err, result) {
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
            res.end();
          });
        });
      }
    });
  }

  this.deleteRequest = function(req, res) {
    let param = {$unset: {request_from: ""}};

    Book.find({_id: req.body.id}, {_id: 1, isApproved: 1}).limit(1)
    .exec(function(err, result) {
      //check the book is already approved
      if(!result[0].isApproved) {
        bookUpdate(req.body.id, param, function (respond) {
          updateRequestsCount(respond.request_from, -1)
          .then(function fulfilled(result) {
            res.send({result: false});
          });
        });
      } else {
        res.end({result: true});
      }
    });
  }

  this.approveRequest = function(req, res) {
    let param = {isApproved: true};
    bookUpdate(req.body.id, param, function(respond) {
      updateRequestsCount(respond.request_from, -1)
      .then(function fulfilled(result) {
        res.end();
      });
    });
  }

  this.rejectRequest = function(req, res) {
    let param = {$unset: {request_from: ""}};
    bookUpdate(req.body.id, param, function (respond) {
      updateRequestsCount(respond.request_from, -1)
      .then(function fulfilled(result) {
        res.end();
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
