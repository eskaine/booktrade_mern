import React from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import Requests from '../../controllers/requests';
import {SetStates} from '../../common/storeFunctions';
import Input from '../modules/input';
import InputParams from '../../common/inputParams';

class Auth extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      inputName: "",
      inputEmail: "",
      inputPassword: ""
    };
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

    let params = {
      email: this.state.inputEmail,
      password: this.state.inputPassword
    };

    if(path === "/signup") {
      params.name = this.state.inputName;
    }

    store.subscribe(() => {
      this.props.history.push('/mybooks');
    });

    Requests.submit(path, params, function success(res) {
      if(res.isAuthenticated) {
        SetStates(store, res);
      }
    }, function invalid() {

    });

  }

  setButtons = (path) => {
    let param;
    if(path === "/signup") {
      param = this.buttonParams("Sign Up", "Create Account", "btn btn-success", "Log In", "/login");
    } else {
      param = this.buttonParams("Log In", "Log In", "btn btn-primary", "Sign Up", "/signup");
    }
    return param;
  }

  buttonParams = (title, name, className, altName, altPath) => {
    return {
      title: title,
      submitBtnName: name,
      submitBtnClass: className,
      altBtnName: altName,
      altBtnPath: altPath
    }
  }

  renderName = (path) => {
    if(path === "/signup") {
      let params = InputParams("Name", "text");
      return(
        <Input params={params} callback={this.setInputName} />
      );
    }
  }

  render() {
    let path = this.props.match.url;
    let params = this.setButtons(path);
    let emailParams = InputParams("Email", "email");
    let passwordParams = InputParams("Password", "password");

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <br />
            <h2>{params.title}</h2>
            <br />
            <form novalidate>
              {this.renderName(path)}
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
