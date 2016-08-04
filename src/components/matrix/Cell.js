import constants from './constants';

const Cell = (cell,j) => {
  let style = {};
  let i = cell.i;
  let cellClass = 'cell';

  if(cell.fill) {
    style.fill = cell.fill;
    cellClass += ' filled';
    style.fillOpacity = cell.opacity;
  } else {
    style.fillOpacity = 0;
  }

  return (
      <rect
        style={style}
        className={cellClass}
        x={j * constants.rowHeight}
        y="0"
        width={constants.cellSide}
        height={constants.cellSide}
        key={'cell-' + i + j}
        onMouseEnter={cell.color ? cell.onHover.bind(null,i,j) : null}
      >
      </rect>
  );
}

export default Cell;
