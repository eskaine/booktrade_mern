import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import user from './reducers';

import './css/styles.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

let store = createStore(user);

var newApp = (
  <Provider store={store}>
    <BrowserRouter >
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(newApp, document.getElementById('root'));
