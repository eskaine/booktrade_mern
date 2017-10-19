import Actions from '../actions';

export const SetProfile = (store, name, city, state) => {
  store.dispatch(Actions.setName(name));
  store.dispatch(Actions.setCity(city));
  store.dispatch(Actions.setState(state));
}

export const SetStates = (store, data) => {
  SetProfile(store, data.name, data.city, data.state);
  store.dispatch(Actions.setAuth(data.isAuthenticated));
  store.dispatch(Actions.setApprovals(data.approvals));
  store.dispatch(Actions.setRequests(data.requests));
}

const StoreFunctions = {

  setProfile: SetProfile,
  setStates: SetStates

}

export default StoreFunctions;
