const classes = (classList) => {
  let result = false;

  if(typeof classList === 'object') {
    let classString = '';

    for(var key in classList) {
      if(classList[key]) {
        classString += ' ' + key;
      }
    }

    result = classString.trim();
  } else {
    console.error('Classes must receive key/value pairing.');
  }

  return result;
}

export default classes;
