//Reference: https://egghead.io/lessons/javascript-redux-persisting-the-state-to-the-local-storage

export const LoadState = () => {
  try {
    const serializedState = localStorage.getItem('bookTrade');
    if(serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
}

export const SaveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('bookTrade', serializedState);
  } catch (err) {
    console.log(err);
  }
}

export const DeleteState = () => {
  try {
    localStorage.removeItem('bookTrade');
  } catch (err) {
    console.log(err);
  }
}
