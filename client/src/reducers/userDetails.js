const userName = (state = "", action) => {
  switch (action.type) {
    case 'SET_NAME':
      return action.name;
    default:
      return state;
  }
};

const userCity = (state = "", action) => {
  switch (action.type) {
    case 'SET_CITY':
      return action.city;
    default:
      return state;
  }
};

const userState = (state = "", action) => {
  switch (action.type) {
    case 'SET_STATE':
      return action.state;
    default:
      return state;
  }
};

const userDetails = (state = {}, action) => {
  return {
    name: userName(state.name, action),
    city: userCity(state.city, action),
    state: userState(state.state, action)
  };
};

export default userDetails;
