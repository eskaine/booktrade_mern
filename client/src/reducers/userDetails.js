const userDetails = (state = {}, action) => {
  switch (action.type) {
    case 'SET_NAME':
      return {
        name: action.name
      }
    case 'SET_CITY':
      return {
        city: action.city
      }
    case 'SET_STATE':
      return {
        state: action.state
      }
    default:
      return state
  }
};

export default userDetails;
