const d3 = require('d3');
import React from 'react';
import Histogram from './Histogram';
import MarkdownReader from '../markdown/MarkdownReader';

// import d3 from 'd3';

// import Histogram from './Histogram';

class HistogramGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: d3.range(1000).map(d3.randomBates(10))
    };
  }
  render() {
    const params = {
      height: {
        outer: 500
      },
      width: {
        outer: 960
      },
      margin: {
        top: 10,
        right: 30,
        bottom: 30,
        left: 30
      }
    };

    params.height.inner = params.height.outer - params.margin.top - params.margin.bottom;
    params.width.inner = params.width.outer - params.margin.left - params.margin.right;

    let nodes = (
      <div className="hgraph">
        <svg width={params.width.outer} height={params.height.outer}>
          <Histogram {...params} data={this.state.data} />
        </svg>
        <MarkdownReader url={'src/components/histogram/docs/histogram.md'} />
      </div>
    );

    if (!this.state.data.length) {
      /* Ultimately this timer will have to add and remove
        the show class from the dots in the loading message.

      setInterval(function () {

      }, 100);
      */

      nodes = (
        <div className="warning">
          <h3 className="loading-msg">Loading
            <span className="dot">.</span>
            <span className="dot">.</span>
            <span className="dot">.</span>
          </h3>
        </div>
      );
    }

    return nodes;
  }
}

export default HistogramGraph;
