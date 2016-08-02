import React from 'react';
import Remarkable from 'remarkable';

class MarkdownReader extends React.Component {
  constructor() {
    super();

    this.state = {
      md: ''
    };

    this.rawMarkup = this.rawMarkup.bind(this);
  }
  rawMarkup(md) {
      var mdParser = new Remarkable();
      var rawMarkup = mdParser.render(md);
      return { __html: rawMarkup };
  }
  render() {
    let renderedMarkup = this.rawMarkup(this.props.md);

    return (
      <div className="md-display">
        <span dangerouslySetInnerHTML={renderedMarkup}></span>
      </div>
    );
  }
}

MarkdownReader.defaultProps = {
  md: ''
};

MarkdownReader.propTypes = {
  md: React.PropTypes.string
};

export default MarkdownReader;
