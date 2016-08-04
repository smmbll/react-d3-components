const isArray = (arg) => {
  if (!Array.isArray) {
    Array.isArray = function(arg) {
      return Object.prototype.toString.call(arg) === '[object Array]';
    };
  } else {
    return Array.isArray(arg);
  }
}

export default isArray;
