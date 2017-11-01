import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import user from './reducers';

import {LoadState, SaveState} from './common/localStorage';

import './css/styles.scss';

const persistedState = LoadState();
const store = createStore(user, persistedState);

store.subscribe(() => {
  SaveState(store.getState());
});

var newApp = (
  <Provider store={store}>
    <BrowserRouter >
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(newApp, document.getElementById('root'));
