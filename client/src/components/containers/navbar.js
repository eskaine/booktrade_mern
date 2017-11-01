import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import Requests from '../../common/requests';
import Actions from '../../actions';
import {DeleteState} from '../../common/localStorage';

class NavBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      defaultLabels: ["Sign Up", "Login"],
      defaultPaths: ["/signup", "/login"],
      labels: ["All Books", "My Books", "", "Logout"],
      loggedPaths: ["/allbooks", "/mybooks", "/profile", "/logout"]
    }
  }

  generateLinks() {
    let store = this.context.store.getState();
    let names = this.state.defaultLabels;
    let paths = this.state.defaultPaths;
    if(store.isAuthenticated) {
      names = this.state.labels;
      paths = this.state.loggedPaths;
    }

    return paths.map((path, i) => {
      let name = names[i];
      if(path === '/logout') {
        return (<NavLink key="/logout" className="nav-link" to="/logout" onClick={this.handleLogout}>{name}</NavLink>);
      }
      return (<NavLink key={path} className="nav-link" exact to={path}>{name}</NavLink>);
    });
  }

  handleLogout = () => {
    let store = this.context.store;
    let history = this.props.history;
    store.dispatch(Actions.setAuth(false));
    DeleteState();
    Requests.logout(function(res) {
      history.push('/');
    });
  }

  setLabels(name) {
    let titles = this.state.labels;
    titles[2] = name;
    this.setState({
      labels: titles
    });
  }

  componentWillMount() {
    let store = this.context.store;
    store.subscribe(() => {
      let state = store.getState();
      if(state.isAuthenticated) {
        this.setLabels(state.userDetails.name);
      }
    });
  }

  componentDidMount() {
    let store = this.context.store;
    let state = store.getState();
    if(state.isAuthenticated) {
      store.dispatch(Actions.setAuth(state.isAuthenticated));
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

export default withRouter(NavBar);
