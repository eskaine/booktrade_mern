'use strict';

var request = require('request');
var shortid = require('shortid');
var Book = require('../models/books');

function BookHandler() {

  this.displayMyBooks = function(req, res) {
    Book.aggregate([
      {$match: {"owner_id": String(req.user._id)}},
      {$sort: {title: 1}},
      {$project: {title: 1, imageUrl: 1, request_from: 1, isApproved: 1}},
      {$group: {
        _id: 0,
        books: {$push: {id: "$_id", title: "$title", imageUrl: "$imageUrl", isRequested: {$cond: [{$ifNull: ["$request_from", false]}, true, false]}}},
        request_from_count: {
          $sum: {$cond: [{$ifNull: ["$request_from", false]}, 1, 0]}
        },
        isApproved_count: {
          $sum: {$cond: [{$ifNull: ["$isApproved", false]}, 1, 0]}
        },
      }}
    ]).exec(function(err, result) {
      if (err)
        throw err;

      if (result.length > 0) {
        req.session.userParams.approvals = result[0].request_from_count - result[0].isApproved_count;
        result = result[0].books;
      }

      res.send(result);
    });
  }

  this.displayAllBooks = function(req, res) {
    Book.aggregate([
      {$match: {
        $or: [{request_from: {$exists: false}}, {request_from: {$eq: [null]}}]
      }},
      {$project: {_id: 1, owner_id: 1, title: 1, imageUrl: 1}},
      {$sort: {title: 1}},
      {$project: {
        id: "$_id",
        title: 1,
        imageUrl: 1,
        isOwner: {
          $cond: [{$eq: ["$owner_id", String(req.user._id)]}, 1, 0]
        }
      }}
    ]).exec(function(err, result) {
      if (err)
        throw err;

      res.send(result);
    });
  }

  this.queryBook = function(req, res) {
    var googleUrl = "https://www.googleapis.com/books/v1/volumes?q=";
    var queryParams = "&maxResults=1&projection=lite&key=" + process.env.GOOGLE_BOOKS_API_KEY;
    var url = googleUrl + req.body.book + queryParams;

    request(url, function(error, respond, body) {
      if (error)
        throw error;

      if (body) {
        body = JSON.parse(body);

        var newBook = new Book();
        newBook._id = shortid.generate();
        newBook.title = body.items[0].volumeInfo.title;
        newBook.imageUrl = body.items[0].volumeInfo.imageLinks.smallThumbnail;
        newBook.owner_id = req.user._id;
        newBook.save(function(err, result) {
          if (err)
            return err;

          let book = {
            id: result._id,
            title: result.title,
            imageUrl: result.imageUrl
          };

          res.send(book);
        });
      }
    });
  }

  this.removeBook = function(req, res) {
    Book.remove({_id: req.body.id}).exec(function(err, result) {
      if (err)
        throw err;

      res.send();
    });
  }

}

module.exports = BookHandler;
