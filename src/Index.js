import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory, Redirect } from 'react-router';
import App from './components/App';
import HGraph from './components/histogram/HGraph';
import Visualizer from './components/visualizer/Visualizer';

window.React = React;

render(
  (<Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="histogram" component={HGraph} />
      <Route path="visualizer" component={Visualizer} />
    </Route>
    <Redirect from="/" to="histogram" />
  </Router>), document.getElementById('view')
);
