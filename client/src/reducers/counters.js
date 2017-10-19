export const approvalCounter = (state = 0, action) => {
  switch (action.type) {
    case 'SET_COUNTER':
      return action.value;
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state
  }
};

export const requestCounter = (state = 0, action) => {
  switch (action.type) {
    case 'SET_COUNTER':
      return action.value;
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state
  }
};
