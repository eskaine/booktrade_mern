import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';

//Taken from https://github.com/ReactTraining/react-router/issues/4105
const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return (
    React.createElement(component, finalProps)
  );
}

export const BaseRoute = ({ component, ...rest }, {store}) => {
  return (
    <Route {...rest} render={routeProps => {
      if(store.getState().isAuthenticated) {
        return (<Redirect to="/mybooks" />);
      }
      return renderMergedProps(component, routeProps, rest);
    }}/>
  );
}

export const PrivateRoute = ({ component, ...rest }, {store}) => {
  return (
    <Route {...rest} render={routeProps => {
      if(!store.getState().isAuthenticated) {
        return (<Redirect to="/login" />);
      }
      return renderMergedProps(component, routeProps, rest);
    }}/>
  );
}

BaseRoute.contextTypes = {
  store: PropTypes.object
};

PrivateRoute.contextTypes = {
  store: PropTypes.object
};
