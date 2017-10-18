import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import Requests from '../../controllers/requests';
import {setAuth} from '../../actions';

class NavBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      titles: ["Sign Up", "Login"],
      paths: ["/signup", "/login"],
      defaultTitles: ["Sign Up", "Login"],
      defaultPaths: ["/signup", "/login"],
      loggedTitles: ["All Books", "My Books", "", "Logout"],
      loggedPaths: ["/allbooks", "/mybooks", "/profile", "/logout"]
    }
  }

  prepareProps = () => {
    let names, paths;
    let store = this.context.store;

    if(store.getState().isAuthenticated) {
      names = this.state.loggedTitles;
      paths = this.state.loggedPaths;
    } else {
      names = this.state.defaultTitles;
      paths = this.state.defaultPaths;
    }
    return {names, paths};
  }

  handleLogout = () => {
    let store = this.context.store;
    Requests.logout(function () {
      store.dispatch(setAuth(false));
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
    let {names, paths} = this.prepareProps();
    var links = paths.map((path, i) => {
      let name = names[i];

      if(path === '/logout') {
        return (<NavLink className="nav-link" to="/logout" onClick={this.handleLogout}>{name}</NavLink>)
      }

      return (
        <NavLink className="nav-link" exact to={path}>{name}</NavLink>
      )
    });

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
              {links}
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
