import React from 'react';
import * as d3 from 'd3';
import Row from './Row';
import Column from './Column';
import constants from './constants';

class Matrix extends React.Component {
  constructor() {
    super();

    this.state = {
      rows: [],
      innerDimension: 0,
      outerDimension: 0,
      highlight: []
    };

    this.colorScheme = d3.scaleOrdinal(d3.schemeCategory20c);
    this.renderRow = this.renderRow.bind(this);
    this.renderColumn = this.renderColumn.bind(this);
    this.onCellHover = this.onCellHover.bind(this);
  }
  componentWillMount() {
    var self = this;

    d3.json('src/components/matrix/data/data.json',function(rows) {
      if(rows && typeof rows === 'object' && rows.forEach) {
        let columns = [];
        let innerDimension = rows.length * constants.rowHeight;
        let outerDimension = innerDimension + constants.margin.left;

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
    row.highlight = this.state.highlight[0] === i;
    row.onHover = this.onCellHover;

    return <Row {...row} />;
  }
  renderColumn(row,j) {
    let column = {};
    column.name = row.name;
    column.length = row.length;
    column.key = j;
    column.highlight = this.state.highlight[1] === j;
    column.index = row.index;

    return <Column {...column} />;
  }
  onCellHover(i,j) {
    let highlight = this.state.highlight;
    let currentRow = highlight[0];
    let currentColumn = highlight[1];

    if(currentRow === i) {
      highlight[1] = j;
    } else if(currentColumn === j) {
      highlight[0] = i;
    } else if(currentRow !== i && currentColumn !== j) {
      highlight = [i,j];
    } else {
      highlight = [null,null];
    }

    this.setState({ highlight });
  }
  render() {
    let rows = this.state.rows;
    let translate = `translate(${constants.margin.left},${constants.margin.top})`

    return (
      <svg className="matrix" width={this.state.outerDimension} height={this.state.outerDimension}>
        <g transform={translate}>
          <rect className="background" fill="#eee" width={this.state.innerDimension} height={this.state.innerDimension}></rect>
          {rows.length ? rows.map(this.renderColumn) : null}
          {rows.length ? rows.map(this.renderRow) : null}
        </g>
      </svg>
    );
  }
};

export default Matrix;
