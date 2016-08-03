function findInArray(arr,query) {
  let result = null;

  for(var i=0;i < arr.length;i++) {
    let item = arr[i];
    let found = true;

    for(var param in query) {
      if(item[param] !== query[param]) {
        found = false;
        break;
      }
    }

    if(found) {
      result = item;
      break;
    }
  }

  return result;
}

export default findInArray;
