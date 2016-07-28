import React from 'react';
import { Link } from 'react-router';
// import { version } from '../../package.json'

const App = ({ children }) => (
  <div>
    <header>
      <h1><a href="/">React D3 Components</a></h1>
      <Link to="/histogram">Histogram</Link>
      <Link to="/visualizer">Visualizer</Link>
    </header>
    <section>
      {children}
    </section>
  </div>
);

App.propTypes = { children: React.PropTypes.object };

export default App;
