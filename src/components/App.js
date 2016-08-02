import React from 'react';
import { Link } from 'react-router';
import NavItem from './NavItem';

const App = ({ children }) => {
  let navigation = (
    <nav className="navigation">
      <NavItem to="/histogram" img="src/images/histogram.jpg">Histogram</NavItem>
      <NavItem to="/matrix" img="src/images/matrix.jpg">Matrix</NavItem>
    </nav>
  );
  let backButton = children ? <Link to="/" className="back">&#8592; Back</Link> : null;
  let year = new Date().getFullYear();

  return (
    <div>
      <header className="header">
        <h1><a href="/"><span>React</span> <span>+</span> <span>D3</span></a></h1>
        <span className="author">{year} / <a href="mailto:lion@smmbll.com">lion summerbell</a></span>
        {backButton}
      </header>
      <section className="content">
        {children || navigation}
      </section>
    </div>
  );
}

App.propTypes = { children: React.PropTypes.object };

export default App;
