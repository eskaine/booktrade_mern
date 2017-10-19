export const setAuth = isAuthenticated => {
  return {
    type: 'SET_AUTHENTICATION',
    isAuthenticated
  }
}
