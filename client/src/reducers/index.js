import {combineReducers} from 'redux';
import isAuthenticated from './auth';
import userDetails from './userDetails';
import {approvalCounter, requestCounter} from './counters';

const user = combineReducers({
  isAuthenticated,
  userDetails,
  requestCounter,
  approvalCounter
});

export default user;
