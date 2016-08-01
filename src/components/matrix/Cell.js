import constants from './constants';

const Cell = (cell,j) => {
  let cellColor = {};

  if(cell.color) {
    cellColor.fill = cell.color;
  } else {
    cellColor['fillOpacity'] = 0;
  }

  return (
      <rect
        style={cellColor}
        className="cell"
        x={j * constants.rowHeight}
        y="0"
        width={constants.cellSide}
        height={constants.cellSide}
        key={'cell-' + cell.row + j}
      >
      </rect>
  );
}

export default Cell;
