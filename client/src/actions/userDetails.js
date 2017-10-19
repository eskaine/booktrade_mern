export const setName = name => {
  console.log('setting name');
  console.log(name);
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
