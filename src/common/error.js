'use strict';

module.exports = {

  createRespond: function() {
    return {
      type: '',
      message: ''
    };
  },

  TYPE: {
    EMAIL_TAKEN: "emailTaken",
    INVALID_EMAIL: "invalidEmail",
    INVALID_PASSWORD: "invalidPassword"
  },

  MESSAGE: {
    EMAIL_TAKEN: "Email taken. Please try another.",
    INVALID_EMAIL: "Email doesn't exist. Please try another.",
    INVALID_PASSWORD: "Password invalid. Please try again."
  }

}
