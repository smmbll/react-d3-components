import React from 'react';
import * as d3 from 'd3';
import Row from './Row';
import Column from './Column';
import NodeList from '../nodelist/NodeList';
import findInArray from '../../helpers/findInArray';
import isArray from '../../helpers/isArray';
import constants from './constants';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Matrix extends React.Component {
  constructor() {
    super();

    this.state = {
      nodes: [],
      links: [],
      highlight: [],
      innerDimension: 0,
      outerDimension: 0
    };

    this.colorScheme = d3.scaleOrdinal(d3.schemeCategory20b);
    this.renderRow = this.renderRow.bind(this);
    this.renderColumn = this.renderColumn.bind(this);
    this.onCellHover = this.onCellHover.bind(this);
    this.sortMatrix = this.sortMatrix.bind(this);
  }
  componentWillMount() {
    var self = this;

    d3.json('src/components/matrix/data/data.json',(chapters) => {
      if(chapters && isArray(chapters)) {
        let list = NodeList(chapters,true);
        let nodes = list.nodes;
        let links = list.links;
        let innerDimension = nodes.length * constants.rowHeight;
        let outerDimension = innerDimension + constants.margin.left + constants.margin.right;

        self.setState({ nodes, links, innerDimension, outerDimension }, () => {
          // Sort alphabetically initially
          self.sortMatrix('id');
        });
      }
    });
  }
  renderRow(node,i) {
    let props = {};
    let nodeId = node.id;
    let nodeGroup = node.group;
    let nodeLinks = findInArray(this.state.links,{ source: nodeId },{ target: nodeId });
    let cells = this.state.nodes.map((rowNode,j) => {
      let rowNodeId = rowNode.id;
      let rowNodeGroup = rowNode.group;
      let cell = {};

      if(nodeId !== rowNodeId) {
        let mutualLink = findInArray(nodeLinks,{ source: rowNodeId },{ target: rowNodeId });

        cell.z = 0;
        cell.group = null;
        if(mutualLink.length) {
          cell.z = mutualLink[0].strength;
          cell.group = rowNodeGroup === nodeGroup? rowNodeGroup : null;
        }
      } else {
        cell.z = nodeLinks.length;
        cell.group = nodeGroup;
      }

      return cell;
    });

    props.key = i;
    props.index = i;
    props.highlight = this.state.highlight[0] === i;
    props.onHover = this.onCellHover;
    props.cells = cells;
    props.width = this.state.innerDimension;
    props.label = nodeId;
    props.colorScheme = this.colorScheme;

    return <Row {...props} />;
  }
  renderColumn(node,j) {
    let props = {};
    props.label = node.id;
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

    this.setState({ highlight: [i,j] });
  }
  sortMatrix(key) {
    let nodes = this.state.nodes;

    nodes.sort((a,b) => {
      if(a[key] !== 'undefined' && b[key] !== 'undefined') {
        return a[key] < b[key] ? -1 : 1;
      } else {
        return 0;
      }
    });

    this.setState({nodes});
  }
  render() {
    let nodes = this.state.nodes;
    let translate = `translate(${constants.margin.left},${constants.margin.top})`

    return (
      <div className="matrix-container">
        <div className="filter btn-group">
          <button type="button" className="btn btn-secondary active" onClick={this.sortMatrix.bind(null,'id')}>Alphabetical</button>
          <button type="button" className="btn btn-secondary" onClick={this.sortMatrix.bind(null,'group')}>Group</button>
        </div>
        <svg className="matrix" width={this.state.outerDimension} height={this.state.outerDimension}>
          <g transform={translate}>
            <rect className="background" fill="#eee" width={this.state.innerDimension} height={this.state.innerDimension}></rect>
            {nodes.length ? nodes.map(this.renderColumn) : null}
            {nodes.length ? nodes.map(this.renderRow) : null}
          </g>
        </svg>
      </div>
    );
  }
};

export default Matrix;
