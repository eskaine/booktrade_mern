import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import Requests from '../../controllers/requests';
import Actions from '../../actions';

class NavBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      defaultTitles: ["Sign Up", "Login"],
      defaultPaths: ["/signup", "/login"],
      loggedTitles: ["All Books", "My Books", "", "Logout"],
      loggedPaths: ["/allbooks", "/mybooks", "/profile", "/logout"]
    }
  }

  generateLinks = () => {
    let store = this.context.store.getState();
    let names = this.state.defaultTitles;
    let paths = this.state.defaultPaths;

    if(store.isAuthenticated) {
      names = this.state.loggedTitles;
      paths = this.state.loggedPaths;
    }

    return paths.map((path, i) => {
      let name = names[i];

      if(path === '/logout') {
        return (<NavLink className="nav-link" to="/logout" onClick={this.handleLogout}>{name}</NavLink>);
      }

      return (<NavLink className="nav-link" exact to={path}>{name}</NavLink>);
    });
  }

  handleLogout = () => {
    let store = this.context.store;
    Requests.logout(function () {
      store.dispatch(Actions.setAuth(false));
    });
  }

  componentWillReceiveProps() {
    let store = this.context.store.getState();
    if(store.isAuthenticated) {
      let titles = this.state.loggedTitles;
      titles[2] = store.userDetails.name;
      this.setState({
        loggedTitles: titles
      });
    }
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <NavLink className="navbar-brand" to="/">bookTrade</NavLink>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-menu" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbar-menu">
            <ul className="navbar-nav mr-auto">
              <NavLink className="nav-link" exact to="/">Home</NavLink>
            </ul>
            <ul className="navbar-nav justify-content-end">
              {this.generateLinks()}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

NavBar.contextTypes = {
  store: PropTypes.object
}

export default NavBar;
