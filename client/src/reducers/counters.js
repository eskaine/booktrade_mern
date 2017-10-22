export const approvalsCount = (state = 0, action) => {
  switch (action.type) {
    case 'SET_APPROVALS_COUNTER':
      return action.value;
    case 'APPROVALS_INCREMENT':
      return state + 1;
    case 'APPROVALS_DECREMENT':
      return state - 1;
    default:
      return state
  }
};

export const requestsCount = (state = 0, action) => {
  switch (action.type) {
    case 'SET_REQUESTS_COUNTER':
      return action.value;
    case 'REQUESTS_INCREMENT':
      return state + 1;
    case 'REQUESTS_DECREMENT':
      return state - 1;
    default:
      return state
  }
};
