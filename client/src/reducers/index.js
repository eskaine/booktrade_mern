import {combineReducers} from 'redux';
import isAuthenticated from './auth';
import userDetails from './userDetails';
import {myBooksList, allBooksList, requestsList, approvalsList} from './lists';
import {requestsCount, approvalsCount} from './counters';

const user = combineReducers({
  isAuthenticated,
  userDetails,
  requestsCount,
  approvalsCount,
  myBooksList,
  allBooksList,
  requestsList,
  approvalsList
});

export default user;
