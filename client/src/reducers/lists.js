export const myBooksList = (state = [], action) => {
  switch (action.type) {
    case 'SET_MYBOOKS_LIST':
      return action.list;
    default:
      return state;
  }
};

export const allBooksList = (state = [], action) => {
  switch (action.type) {
    case 'SET_ALLBOOKS_LIST':
      return action.list;
    default:
      return state;
  }
};

export const requestsList = (state = [], action) => {
  switch (action.type) {
    case 'SET_REQUESTS_LIST':
      return action.list;
    default:
      return state;
  }
};

export const approvalsList = (state = [], action) => {
  switch (action.type) {
    case 'SET_APPROVALS_LIST':
      return action.list;
    default:
      return state;
  }
};
