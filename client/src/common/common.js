export const SortList = (book, list) => {
  let newList = [].concat(list);
  newList.push(book);
  return newList.sort(function(a, b) {
    let titleA = a.title.toUpperCase();
    let titleB = b.title.toUpperCase();
    return titleA.localeCompare(titleB);
  });
}

export const UpdateList = (bookID, list) => {
  return new Promise(function(resolve) {
    let newList = [].concat(list);
    for(let book in newList) {
      if(newList[book]._id === bookID) {
        let removedBook = newList.splice(book, 1);

        resolve({removedBook: removedBook[0], newList: newList});
      }
    }
  });
}

export const SetCountString = (count) => {
  if(count > 0)
    count = " (" + count + ")";
  else
    count = "";
  return count;
}
