import React from 'react';
// import d3 from 'd3';
import Bar from './Bar';
const d3 = require('d3');


class Histogram extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bins: []
    };

    // Pass props through to update on mount
    // Might be unnecessary; need to check lifecycle
    // methods
    this.update = this.update.bind(this);
    this.drawBars = this.drawBars.bind(this);
  }
  componentWillMount() {
    this.update(this.props);
  }
  componentWillReceiveProps(props) {
    this.update(props);
  }
  update(props) {
    this.x = d3.scaleLinear()
      .rangeRound([0,props.width.inner]);

    const bins = d3.histogram()
      .domain(this.x.domain())
      .thresholds(this.x.ticks(20))
      (props.data);

    this.y = d3.scaleLinear()
      .domain([0, d3.max(bins.map(d => d.length))])
      .range([props.height.inner,0]);

    this.setState({ bins });
  }
  drawBars(bar) {
    var bins = this.state.bins;
    var barWidth = this.x(bins[0].x1) - this.x(bins[0].x0);
    var dataPoints = bar.length;

    const props = {
      x: this.x(bar.x0),
      y: this.y(dataPoints),
      width: barWidth - 1,
      height: this.props.height.inner - this.y(dataPoints),
      labelPosition: barWidth / 2,
      size: dataPoints,
      key: `bin-${bar.x0}-${bar.x1}`
    };

    return (<Bar {...props} />);
  }
  render() {
    let graphTranslate = `translate(${this.props.margin.left}, ${this.props.margin.top})`;
    let xAxisTranslate = `translate(0, ${this.props.height.inner})`;
    let yAxisTranslate = `translate(0,0)`;
    let drawAxis = (axis,method) => {
      d3.select(axis)
        .call(method);
    };

    return (
      <g className="histogram" transform={graphTranslate}>
        {this.state.bins.map(this.drawBars)}
        <g className="axis x-axis" transform={xAxisTranslate} ref={(axis) => drawAxis(axis,d3.axisBottom(this.x))}></g>
        <g className="axis y-axis" transform={yAxisTranslate} ref={(axis) => drawAxis(axis,d3.axisLeft(this.y))}></g>
      </g>
    );
  }
}

Histogram.propTypes = {
  data: React.PropTypes.array.isRequired
};

export default Histogram;
