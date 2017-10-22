import {combineReducers} from 'redux';
import isAuthenticated from './auth';
import userDetails from './userDetails';
import {requestsCount, approvalsCount} from './counters';

const user = combineReducers({
  isAuthenticated,
  userDetails,
  requestsCount,
  approvalsCount
});

export default user;
