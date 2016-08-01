import React from 'react';
import { Link } from 'react-router';

const App = ({ children }) => {
  return (
    <div>
      <header>
        <h1><a href="/">React D3 Components</a></h1>
        <Link to="/histogram">Histogram</Link>
        <Link to="/matrix">Matrix</Link>
      </header>
      <section>
        {children || 'Sample components built using React and D3.'}
      </section>
    </div>
  );
}

App.propTypes = { children: React.PropTypes.object };

export default App;
