function findInArray(arr) {
  let result = [];
  let queries = [...arguments].slice(1);

  for(var i=0;i < arr.length;i++) {
    let item = arr[i];

    for(var j=0;j < queries.length;j++) {
      let matchedQuery = true;
      let query = queries[j];

      for(var param in query) {
        if(item[param] !== query[param]) {
          matchedQuery = false;
          break;
        }
      }

      if(matchedQuery) {
        result.push(item);
        break;
      }
    }
  }

  // If no elements are found, return null
  if (result.length === 0) {
    result = null;
    // If only one element is found, return it rather than an array
  } else if (result.length === 1) {
    result = result[0];
  }

  return result;
}

export default findInArray;
