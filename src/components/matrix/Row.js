import * as d3 from 'd3';
import constants from './constants';
import Cell from './Cell';

const Row = (props) => {
  let cells = props.cells;
  let index = props.index;
  let width = props.width;
  let rowTransform = `translate(0,${index * constants.rowHeight})`;
  let classes = 'row';

  classes += props.highlight ? ' highlight' : '';

  cells.forEach(function(cell) {
    let z = cell.z;
    let opacity = 0;

    if(z === 0) {
      opacity = 0;
    } else if(z > 0 && z < 3) {
      opacity = 0.4;
    } else if(z >= 3 && z < 5) {
      opacity = 0.7;
    } else {
      opacity = 1;
    }

    cell.i = index;
    cell.onHover = props.onHover;
    cell.fill = d3.scaleOrdinal(d3.schemeCategory20b)(cell.group);
    cell.opacity = opacity;
  });

  return (
    <g key = {'row-' + index} className={classes} transform={rowTransform}>
      <line x2={width}></line>
      <text className="label" transform="translate(-5,8)" textAnchor="end">{props.label}</text>
      {cells.length ? cells.map(Cell) : null}
    </g>
  )
}

export default Row;
