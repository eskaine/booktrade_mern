import React, { Component } from 'react';
import {Switch} from 'react-router-dom';

//Presentational components
import Footer from './components/modules/footer';

//Container components
import Home from './components/content/home';
import NavBar from './components/containers/navbar';
import Auth from './components/containers/auth';
import Books from './components/content/books';
import Profile from './components/containers/profile';

//Route filtering
import {BaseRoute, PrivateRoute} from './components/routing/routeFilters';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />

        <Switch >
          <BaseRoute path="/" exact component={Home} />
          <BaseRoute path="/signup" exact component={Auth} />
          <BaseRoute path="/login" exact component={Auth} />
          <PrivateRoute path="/mybooks" exact component={Books} />
          <PrivateRoute path="/allbooks" exact component={Books} />
          <PrivateRoute path="/profile" exact component={Profile} />
        </Switch>

        <Footer externalURL="https://github.com/eskaine/booktrade" linkName="Github" />
      </div>
    );
  }
}

export default App;
