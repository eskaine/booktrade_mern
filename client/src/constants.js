module.exports = {
  SIGNUP_FORM: {
    TITLE: "Sign Up",
    OTHER_PATH: "/login",
    BUTTON_CLASS: "btn btn-success",
    FIELD: [
      {
        label_name: "Name",
        name: "input-name",
        type: "text",
        placeholder: "Your Name"
      }
    ]
  },
  LOGIN_FORM: {
      TITLE: "Log In",
      OTHER_PATH: "/signup",
      BUTTON_CLASS: "btn btn-primary",
  },
  COMMON_FORM_FIELDS: [
    {
      label_name: "Email",
      name: "input-email",
      type: "email",
      placeholder: "Your Email"
    },
    {
      label_name: "Password",
      name: "input-password",
      type: "password",
      placeholder: "Your Password"
    }
  ]
}
