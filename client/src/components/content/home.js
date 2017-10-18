import React from 'react';
import {NavLink} from 'react-router-dom';

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
            {Array.apply(null, Array(3)).map(() => {
              return (
                <div className="col-md-4">
                  <h2>Heading</h2>
                  <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
                  <p><button className="btn btn-secondary">View details &raquo;</button></p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

}

export default Home;
