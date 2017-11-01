import React from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import Actions from '../../actions';
import Requests from '../../common/requests';
import Input from '../modules/input';

class Auth extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      inputName: "",
      inputEmail: "",
      inputPassword: "",
      nameClass: "form-control",
      emailClass: "form-control",
      passwordClass: "form-control",
      nameError: "Please provide a name!",
      emailError: "Please provide a valid email!",
      passwordError: "Please provide a password!"
    };
  }

  setButtons() {
    let param;
    if(this.props.match.url === "/signup") {
      param = this.buttonParams("Sign Up", "Create Account", "btn btn-success", "Log In", "/login");
    } else {
      param = this.buttonParams("Log In", "Log In", "btn btn-primary", "Sign Up", "/signup");
    }
    return param;
  }

  buttonParams(title, name, className, altName, altPath) {
    return {
      title: title,
      submitBtnName: name,
      submitBtnClass: className,
      altBtnName: altName,
      altBtnPath: altPath
    }
  }

  renderName() {
    if(this.props.match.url === "/signup") {
      return(
        <Input value={this.state.inputName} className={this.state.nameClass} fieldName="Name" type="text" error={this.state.nameError} callback={this.setInputName} />
      );
    }
  }

  checkFormValidity(e, path) {
    let classes = 'form-control is-invalid';
    let noOfNonInputElements = 3 + 1;
    let form = e.target.parentNode;
    let endOfInputChild = form.childNodes.length - noOfNonInputElements;
    let isNameValid;

    let isEmailValid = form.childNodes[endOfInputChild - 1].childNodes[1].checkValidity();
    let isPasswordValid = form.childNodes[endOfInputChild].childNodes[1].checkValidity();

    if(path === "/signup") {
      isNameValid = form.childNodes[0].childNodes[1].checkValidity();

      if(!isNameValid) {
        this.setNameClass(classes);
      }
    }

    if(!isEmailValid) {
      this.setEmailClass(classes);
    }

    if(!isPasswordValid) {
      this.setPasswordClass(classes);
    }

    if(path === "/signup" && isNameValid && isEmailValid && isPasswordValid) {
      return true;
    }

    if(path === "/login" && isEmailValid && isPasswordValid) {
      return true;
    }

    return false;
  }

  serverFormValidity = (error) => {
    let classes = 'form-control is-invalid';
    switch(error.type) {
      case 'invalidEmail':
        this.setEmailClass(classes);
        this.setEmailError(error.message);
        break;
      case 'emailTaken':
        this.setEmailClass(classes);
        this.setEmailError(error.message);
        break;
      case 'invalidPassword':
        this.setPasswordClass(classes);
        this.setPasswordError(error.message);
        break;
      default:
        return null;
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let store = this.context.store;
    let history = this.props.history;
    let serverFormValidity = this.serverFormValidity;
    let path = this.props.match.url;

    this.resetClass();
    let isFormValid = this.checkFormValidity(e, path);

    if(isFormValid) {
      let params = {
        email: this.state.inputEmail.toLowerCase(),
        password: this.state.inputPassword
      };

      if(path === "/signup") {
        params.name = this.state.inputName;
      }

      Requests.post(path, params, function(res) {
        if(res.isAuthenticated) {
          store.dispatch(Actions.setAuth(res.isAuthenticated));
          store.dispatch(Actions.setName(res.name));
          store.dispatch(Actions.setCity(res.city));
          store.dispatch(Actions.setState(res.state));
          store.dispatch(Actions.counters.setRequests(res.requests));
          history.push('/mybooks');
        }
      }, function(error) {
        serverFormValidity(error);
      });
    }
  }

  resetClass = () => {
    let defaultClass = 'form-control';
    this.setState({
      nameClass: defaultClass,
      emailClass: defaultClass,
      passwordClass: defaultClass
    });
  }

  resetForm = () => {
    this.setState({
      inputName: "",
      inputEmail: "",
      inputPassword: "",
      nameError: "Please provide a name!",
      emailError: "Please provide a valid email!",
      passwordError: "Please provide a password!"
    });
    this.resetClass();
  }

  setInputName = (e) => {
    this.setState({
      inputName: e.target.value
    });
  }

  setInputEmail = (e) => {
    this.setState({
      inputEmail: e.target.value
    });
  }

  setInputPassword = (e) => {
    this.setState({
      inputPassword: e.target.value
    });
  }

  setNameClass = (newClass) => {
    this.setState({
      nameClass: newClass
    });
  }

  setEmailClass = (newClass) => {
    this.setState({
      emailClass: newClass
    });
  }

  setPasswordClass = (newClass) => {
    this.setState({
      passwordClass: newClass
    });
  }

  setEmailError = (errorMsg) => {
    this.setState({
      emailError: errorMsg
    });
  }

  setPasswordError = (errorMsg) => {
    this.setState({
      passwordError: errorMsg
    });
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.match.url !== this.props.match.url) {
      this.resetForm();
    }
  }

  render() {
    let nameField = this.renderName();
    let params = this.setButtons();

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <br />
            <h2>{params.title}</h2>
            <br />
            <form noValidate>
              {nameField}
              <Input value={this.state.inputEmail} className={this.state.emailClass} fieldName="Email" type="email" error={this.state.emailError} callback={this.setInputEmail} />
              <Input value={this.state.inputPassword} className={this.state.passwordClass} fieldName="Password" type="password" error={this.state.passwordError} callback={this.setInputPassword} />
              <br />
              <button className={params.submitBtnClass} type="submit" onClick={this.handleSubmit}>{params.submitBtnName}</button>
              <NavLink className="btn btn-dark btn-margin" exact to={params.altBtnPath}>{params.altBtnName}</NavLink>
            </form>
          </div>
        </div>
      </div>
    );
  }

}

Auth.contextTypes = {
  store: PropTypes.object
};

export default Auth;
