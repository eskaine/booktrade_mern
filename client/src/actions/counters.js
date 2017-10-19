const setApprovals = value => {
  return {
    type: 'SET_COUNTER',
    value
  }
}

const incApprovals = () => {
  return {
    type: 'INCREMENT',
  }
}

const decApprovals = () => {
  return {
    type: 'DECREMENT'
  }
}

const setRequests = value => {
  return {
    type: 'SET_COUNTER',
    value
  }
}

const incRequests = () => {
  return {
    type: 'INCREMENT',
  }
}

const decRequests = () => {
  return {
    type: 'DECREMENT'
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
