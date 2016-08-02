import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory, Redirect } from 'react-router';
import App from './components/App';
import HGraph from './components/histogram/HGraph';
import MatrixExample from './components/matrix/MatrixExample';

window.React = React;

render(
  (<Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="histogram" component={HGraph} />
      <Route path="matrix" component={MatrixExample} />
    </Route>
    <Redirect from="/" to="histogram" />
  </Router>), document.getElementById('app')
);
