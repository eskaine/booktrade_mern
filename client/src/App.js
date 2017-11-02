import React from 'react';
import {Switch, Redirect} from 'react-router-dom';
//Presentational components
import Footer from './components/modules/footer';
//Container components
import Home from './components/containers/home';
import NavBar from './components/containers/navbar';
import Auth from './components/containers/auth';
import MyBooks from './components/containers/mybooks';
import AllBooks from './components/containers/allbooks';
import Profile from './components/containers/profile';
import Trade from './components/containers/trade';
//Route filtering
import {BaseRoute, PrivateRoute} from './components/routing/routeFilters';

class App extends React.Component {
  render() {

   return (
      <div className="App">

        <NavBar />

        <Switch >
          <BaseRoute path="/" exact component={Home} />
          <BaseRoute path="/signup" exact component={Auth} />
          <BaseRoute path="/login" exact component={Auth} />
          <PrivateRoute path="/mybooks" exact component={Trade} childComponent={MyBooks} />
          <PrivateRoute path="/allbooks" exact component={Trade} childComponent={AllBooks} />
          <PrivateRoute path="/profile" exact component={Profile} />
          <Redirect from="/*" to="/" />
        </Switch>

        <Footer externalURL="https://github.com/eskaine/booktrade_mern" linkName="Github" />

      </div>
    );
  }
}

export default App;
