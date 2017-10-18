import React, { Component } from 'react';
import {Switch} from 'react-router-dom';

//Layout components
import NavBar from './components/layout/navbar';
import Footer from './components/layout/footer';

//Content components
import Home from './components/content/home';
import Auth from './components/content/auth';
import Books from './components/content/books';

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
        </Switch>

        <Footer />
      </div>
    );
  }
}

export default App;
