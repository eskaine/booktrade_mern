import React from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import Actions from '../../actions';
import Requests from '../../common/requests';
import InputParams from '../../common/inputParams';
import Input from '../modules/input';

class Auth extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      inputName: "",
      inputEmail: "",
      inputPassword: ""
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
      let params = InputParams("Name", "text");
      return(
        <Input params={params} callback={this.setInputName} />
      );
    }
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

  handleSubmit = (e) => {
    e.preventDefault();
    let store = this.context.store;
    let path = this.props.match.url;
    let history = this.props.history;
    let params = {
      email: this.state.inputEmail.toLowerCase(),
      password: this.state.inputPassword
    };

    if(path === "/signup") {
      params.name = this.state.inputName;
    }

    Requests.post(path, params, function success(res) {
      if(res.isAuthenticated) {
        store.dispatch(Actions.setAuth(res.isAuthenticated));
        store.dispatch(Actions.setName(res.name));
        store.dispatch(Actions.setCity(res.city));
        store.dispatch(Actions.setState(res.state));
        store.dispatch(Actions.counters.setRequests(res.requests));
        history.push('/mybooks');
      }
    }, function invalid() {

    });
  }

  render() {
    let nameField = this.renderName();
    let params = this.setButtons();
    let emailParams = InputParams("Email", "email");
    let passwordParams = InputParams("Password", "password");

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <br />
            <h2>{params.title}</h2>
            <br />
            <form noValidate>
              {nameField}
              <Input params={emailParams} callback={this.setInputEmail} />
              <Input params={passwordParams} callback={this.setInputPassword} />
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
