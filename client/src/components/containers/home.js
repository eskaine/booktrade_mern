import React from 'react';
import {NavLink} from 'react-router-dom';
import Card from '../modules/card';

class Home extends React.Component {

  render() {
    return (
      <div>
        <div className="jumbotron">
          <div className="container">
            <h1 className="display-3">bookTrade</h1>
            <p>Unwanted books? Trade them away!</p>
            <p><NavLink className="btn btn-success btn-lg" to="/signup">Sign up now!</NavLink></p>
          </div>
        </div>

        <div className="container">
          <div className="row">
            {Array.apply(null, Array(3)).map((item, i) => {
              return (<Card key={"item" + i} />);
            })}
          </div>
        </div>
      </div>
    );
  }

}

export default Home;
