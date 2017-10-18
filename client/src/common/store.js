import {actions}from '../actions';

var storeFunctions = {

  setStates: function (store, data) {
    store.dispatch(actions.setAuth(data.isAuthenticated));
    store.dispatch(actions.setName(data.name));
  }

}

export default storeFunctions;
