export const setAuth = isAuthenticated => {
  return {
    type: 'SET_AUTHENTICATION',
    isAuthenticated
  }
}

export const setName = name => {
  return {
    type: 'SET_NAME',
    name
  }
}

export const setCity = city => {
  return {
    type: 'SET_CITY',
    city
  }
}

export const setState = state => {
  return {
    type: 'SET_STATE',
    state
  }
}

export const actions = {
    setAuth: setAuth,
    setName: setName,
    setCity: setCity,
    setState: setState
}
