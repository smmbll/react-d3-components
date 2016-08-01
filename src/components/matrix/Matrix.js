import React from 'react';
import Row from './Row';
import Column from './Column';
import constants from './constants';
const d3 = require('d3');

class Matrix extends React.Component {
  constructor() {
    super();

    this.state = {
      rows: [],
      innerDimension: 0,
      outerDimension: 0
    };

    this.colorScheme = d3.scaleOrdinal(d3.schemeCategory20);
    this.renderRow = this.renderRow.bind(this);
    this.renderColumn = this.renderColumn.bind(this);
  }
  componentWillMount() {
    var self = this;

    d3.json('src/components/matrix/data/data.json',function(rows) {
      if(rows && typeof rows === 'object' && rows.forEach) {
        let columns = [];
        let innerDimension = rows.length * constants.rowHeight;
        let outerDimension = innerDimension + constants.labelMargin;

        rows.forEach(function(row,i) {
          row.colorScheme = self.colorScheme;
          row.length = innerDimension;
          row.index = i;
        });

        self.setState({ rows, innerDimension, outerDimension });
      }
    });
  }
  renderRow(row,i) {
    // Add column heading data
    row.cells = this.state.rows.map(row => ({ name: row.name }));
    row.key = i;

    return <Row {...row} />;
  }
  renderColumn(row,i) {
    let column = {};
    column.name = row.name;
    column.length = row.length;
    column.key = i;
    column.index = row.index;

    return <Column {...column} />;
  }
  render() {
    let rows = this.state.rows;

    return (
      <svg className="matrix" width={this.state.outerDimension} height={this.state.outerDimension}>
        <g transform="translate(145,100)">
          <rect className="background" fill="#eee" width={this.state.innerDimension} height={this.state.innerDimension}></rect>
          {rows.length ? rows.map(this.renderColumn) : null}
          {rows.length ? rows.map(this.renderRow) : null}
        </g>
      </svg>
    );
  }
};

export default Matrix;
