'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Book = new Schema({
  _id: String,
  title: String,
  imageUrl: String,
  owner_id: String,
  request_from: String,
  isApproved: Boolean
});

module.exports = mongoose.model('Book', Book);
