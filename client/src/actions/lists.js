const setMyBooks = list => {
  return {
    type: 'SET_MYBOOKS_LIST',
    list
  }
}

const setAllBooks = list => {
  return {
    type: 'SET_ALLBOOKS_LIST',
    list
  }
}

const setRequests = list => {
  return {
    type: 'SET_REQUESTS_LIST',
    list
  }
}

const setApprovals = list => {
  return {
    type: 'SET_APPROVALS_LIST',
    list
  }
}

const lists = {
  setMyBooks: setMyBooks,
  setAllBooks: setAllBooks,
  setRequests: setRequests,
  setApprovals: setApprovals
}

export default lists;
