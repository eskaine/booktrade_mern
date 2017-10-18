'use strict';

var request = require('request');
var shortid = require('shortid');
var Book = require('../models/books');

function BookHandler() {

  this.displayMyBooks = function(req, res) {
    Book.aggregate([
      {$match: {"owner_id": String(req.user._id)}},
      {$sort: {title: 1}},
      {$project: {imageUrl: 1, request_from: 1, isApproved: 1}},
      {$group: {
        _id: 0,
        books: {$push: {id: "$_id", imageUrl: "$imageUrl", isRequested: {$cond: [{$ifNull: ["$request_from", false]}, true, false]}}},
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
        req.session.renderParams.books = result[0].books;
        req.session.renderParams.approvals = result[0].request_from_count - result[0].isApproved_count;
      }
      req.session.renderParams.active = req.url;
      res.render('mybooks.pug', req.session.renderParams);
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
        _id: 1,
        imageUrl: 1,
        isOwner: {
          $cond: [{$eq: ["$owner_id", String(req.user._id)]}, 1, 0]
        }
      }}
    ]).exec(function(err, result) {
      if (err)
        throw err;
      req.session.renderParams.books = result;
      req.session.renderParams.active = req.url;
      res.render('allbooks.pug', req.session.renderParams);
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
        newBook.save(function(err) {
          if (err)
            return err;

          res.redirect('/mybooks');
        });
      }
    });
  }

  this.removeBook = function(req, res) {
    Book.remove({_id: req.params.bookID}).exec(function(err, result) {
      if (err)
        throw err;

      res.send(true);
    });
  }

}

module.exports = BookHandler;
