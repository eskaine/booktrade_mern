const auth = (state = false, action) => {

  switch (action.type) {
    case 'SET_AUTHENTICATION':
      return action.isAuthenticated;
    default:
      return state;
  }

}

export default auth;
