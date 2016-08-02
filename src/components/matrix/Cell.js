import constants from './constants';

const Cell = (cell,j) => {
  let cellColor = {};
  let row = cell.row;
  let cellClass = 'cell';

  if(cell.color) {
    cellColor.fill = cell.color;
    cellClass += ' filled';
  } else {
    cellColor['fillOpacity'] = 0;
  }

  return (
      <rect
        style={cellColor}
        className={cellClass}
        x={j * constants.rowHeight}
        y="0"
        width={constants.cellSide}
        height={constants.cellSide}
        key={'cell-' + row + j}
        onMouseEnter={cell.color ? cell.onHover.bind(null,row,j) : null}
      >
      </rect>
  );
}

export default Cell;
