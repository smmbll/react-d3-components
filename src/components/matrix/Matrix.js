import React from 'react';
import * as d3 from 'd3';
import Row from './Row';
import Column from './Column';
import NodeList from '../nodelist/NodeList';
import findInArray from '../../helpers/findInArray';
import isArray from '../../helpers/isArray';
import constants from './constants';

class Matrix extends React.Component {
  constructor() {
    super();

    this.state = {
      list: {},
      matrix: [],
      highlight: [],
      innerDimension: 0,
      outerDimension: 0
    };

    this.colorScheme = d3.scaleOrdinal(d3.schemeCategory20c);
    this.renderRow = this.renderRow.bind(this);
    this.renderColumn = this.renderColumn.bind(this);
    this.onCellHover = this.onCellHover.bind(this);
  }
  componentWillMount() {
    var self = this;

    d3.json('src/components/matrix/data/data.json',(chapters) => {
      if(chapters && isArray(chapters)) {
        let list = NodeList(chapters);
        let nodes = list.nodes;
        let links = list.links;
        let listLength = nodes.length;
        let matrix = [];

        for(var i=0;i < listLength;i++) {
          matrix.push([]);
          for(var j=0;j < listLength;j++) {
            matrix[i].push({ z: 0, group: 0 });
          }
        }

        let innerDimension = nodes.length * constants.rowHeight;
        let outerDimension = innerDimension + constants.margin.left;

        self.setState({ list, matrix, innerDimension, outerDimension });
      }
    });
  }
  renderRow(cells,i) {
    let props = {};
    let list = this.state.list;
    let nodes = list.nodes;
    let rowNode = nodes[i];
    let nodeId = rowNode.id;
    let matches = findInArray(list.links,{ source: nodeId },{ target: nodeId });

    // Wrap it in an array in case we only get one result
    matches = !isArray(matches) ? [matches] : matches;

    cells.forEach((cell,j) => {
      let currentNode = nodes[j];

      if(rowNode !== currentNode) {
        let match = findInArray(matches,{ source: currentNode.id },{ target: currentNode.id });

        if(match) {
          cell.z = match.strength;
          cell.group = currentNode.group;
        }
      } else {
        cell.z = matches.length;
        cell.group = rowNode.group;
      }
    });

    props.key = i;
    props.index = i;
    props.highlight = this.state.highlight[0] === i;
    props.onHover = this.onCellHover;
    props.cells = cells;
    props.width = this.state.innerDimension;
    props.label = nodes[i].id;

    return <Row {...props} />;
  }
  renderColumn(cell,j) {
    let props = {};
    props.label = this.state.list.nodes[j].id;
    props.height = this.state.innerDimension;
    props.key = j;
    props.highlight = this.state.highlight[1] === j;
    props.index = j;

    return <Column {...props} />;
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
    let matrix = this.state.matrix;
    let translate = `translate(${constants.margin.left},${constants.margin.top})`

    return (
      <svg className="matrix" width={this.state.outerDimension} height={this.state.outerDimension}>
        <g transform={translate}>
          <rect className="background" fill="#eee" width={this.state.innerDimension} height={this.state.innerDimension}></rect>
          {matrix.length ? matrix[0].map(this.renderColumn) : null}
          {matrix.length ? matrix.map(this.renderRow) : null}
        </g>
      </svg>
    );
  }
};

export default Matrix;
