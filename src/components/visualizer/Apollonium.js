import React from 'react';
const d3 = require('d3');

var rectWidth = window.outerWidth;
var rectHeight = window.outerHeight;

class Apollonium extends React.Component {
  constructor() {
    super()

    this.state = {
      circles: []
    };

    this.color = d3.scaleOrdinal(d3.schemeCategory10);

    this.calculateCircles.bind(this);
    this.renderCircle.bind(this);
  }
  componentWillMount() {
    this.calculateCircles();
  }
  calculateCircles() {
    var radii = d3.range(500).map(d3.randomUniform(5,40));

    radii.forEach(function() {
      var x = d3.range([0,rectWidth]);
    });

    this.setState({circles});
  }
  renderCircle(circle) {
    return (
      <g transform={`translate(${circle.x},${circle.y})`}>
        <circle r={circle.r} fill={this.color()}></circle>
      </g>
    );
  }
  render() {
    return (
      <div className="visualizer">
        <svg width={rectWidth} height={rectHeight}>
          {this.state.circles.map(this.renderCircle)}
        </svg>
      </div>
    );
  }
}

export default Apollonium;
