import React from 'react';
import Matrix from './Matrix';
import MarkdownReader from '../markdown/MarkdownReader';
import constants from './constants';

class MatrixExample extends React.Component {
  constructor() {
    super();

    this.state = {
      readme: ''
    };
  }
  componentWillMount() {
    fetch(constants.readme)
      .then((res) => {
        if(res.ok) {
          res.text().then((readme) => {
            this.setState({readme: readme});
          });
        } else {
          console.log('Response not okay.');
        }
      })
      .catch((err) => {
        console.log('Fetch unsuccessful with error ' + err.message);
      });
  }
  render() {
    let readme = this.state.readme;

    return (
      <div className="matrix-example">
        <Matrix />
        <MarkdownReader md={readme} />
      </div>
    );
  }
}

export default MatrixExample;
