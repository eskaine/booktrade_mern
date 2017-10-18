'use strict';

var bcrypt = require('bcrypt');
var salt = Number(process.env.SALT_ROUNDS);

function PasswordHandler() {

  this.hash = function(password) {
    return new Promise(function(resolve, reject) {
      bcrypt.hash(password, salt).then(function(hash) {
        return resolve(hash);
      });
    });
  }

  this.verify = function(hash, password) {
    return new Promise(function(resolve, reject) {
      bcrypt.compare(password, hash).then(function(res) {
        if (!res)
          return reject();
        else
          return resolve();
        }
      );
    });
  }

  this.update = function(oldHash, oldPass, newPass, callback) {
    var hashFn = this.hash;
    this.verify(oldHash, oldPass)
    .then(function (){
      return hashFn(newPass);
    })
    .then(function (newHash){
      callback(newHash);
    });
  }

}

module.exports = PasswordHandler;
