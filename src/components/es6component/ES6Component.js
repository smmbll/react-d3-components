import React from 'react';

class ES6Component extends React.Component {
  _init(context) {
    //  Autobind 'this' context to class methods
    for(var key in context) {
      console.log(context[key],typeof context[key]);
      if(typeof context[key] === 'function') {
        context[key] = context[key].bind(context);
      }
    }
  }
};

export default ES6Component;
