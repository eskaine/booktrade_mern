const setApprovals = value => {
  return {
    type: 'SET_APPROVALS_COUNTER',
    value
  }
}

const incApprovals = () => {
  return {
    type: 'APPROVALS_INCREMENT',
  }
}

const decApprovals = () => {
  return {
    type: 'APPROVALS_DECREMENT'
  }
}

const setRequests = value => {
  return {
    type: 'SET_REQUESTS_COUNTER',
    value
  }
}

const incRequests = () => {
  return {
    type: 'REQUESTS_INCREMENT',
  }
}

const decRequests = () => {
  return {
    type: 'REQUESTS_DECREMENT'
  }
}

const counters = {
  setApprovals: setApprovals,
  incApprovals: incApprovals,
  decApprovals: decApprovals,
  setRequests: setRequests,
  incRequests: incRequests,
  decRequests: decRequests,
}

export default counters;
