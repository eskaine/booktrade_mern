import {combineReducers} from 'redux';
import isAuthenticated from './auth';
import userDetails from './userDetails';
//import requestCounter from './requestCounter';
//import approvalCounter from './approvalCounter';

const user = combineReducers({
  isAuthenticated,
  userDetails
  //requestCounter,
  //approvalCounter
});

export default user;
