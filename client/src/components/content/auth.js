import React from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import Requests from '../../controllers/requests';
import {actions}from '../../actions';

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

  handleSubmit = (path, e) => {
    e.preventDefault();
    let store = this.context.store;

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

    Requests.submit(path, params, function (res) {
      if(res.isAuthenticated) {
        store.dispatch(actions.setAuth(res.isAuthenticated));
        store.dispatch(actions.setName(res.name));
      }
    });

  }

  setButtons = (path) => {
    let title, submitBtnName, submitBtnClass, altBtnName, altBtnPath;
    if(path === "/signup") {
      title = "Sign Up";
      submitBtnName = "Create Account";
      submitBtnClass = "btn btn-success";
      altBtnName = "Log In";
      altBtnPath = "/login";
    } else {
      title = "Log In";
      submitBtnName = "Log In";
      submitBtnClass = "btn btn-primary";
      altBtnName = "Sign Up";
      altBtnPath = "/signup";
    }
    return {title, submitBtnName, submitBtnClass, altBtnName, altBtnPath};
  }

  renderName = (path) => {
    if(path === "/signup") {
      return(
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input className="form-control" id="name" type="text" placeholder="Your Name" onChange={this.setInputName} required />
          <div className="invalid-feedback">
            Invalid name!
          </div>
        </div>
      );
    }
  }

  render() {
    let path = this.props.path;
    let {title, submitBtnName, submitBtnClass, altBtnName, altBtnPath} = this.setButtons(path);

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <br />
            <h1>{title}</h1>
            <br />
            <form validate>
              {this.renderName(path)}
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input className="form-control" id="email" type="email" placeholder="Your Email" onChange={this.setInputEmail} required />
                <div className="invalid-feedback">
                  Invalid email!
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input className="form-control" id="password" type="password" placeholder="Your Password" onChange={this.setInputPassword} required />
                <div className="invalid-feedback">
                  Invalid password!
                </div>
              </div>
              <br />
              <button className={submitBtnClass} type="submit" onClick={(e) => this.handleSubmit(path, e)}>{submitBtnName}</button>
              <NavLink className="btn btn-dark btn-margin" exact to={altBtnPath}>{altBtnName}</NavLink>
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
