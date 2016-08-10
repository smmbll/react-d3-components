import constants from './constants';

const Cell = (cell,j) => {
  let style = {};
  let i = cell.i;
  let bindX = !!cell.z ? i : null;
  let bindY = !!cell.z ? j : null;

  style.fill = cell.fill;
  style.fillOpacity = cell.opacity;

  return (
      <rect
        style={style}
        className="cell"
        x={j * constants.rowHeight}
        y="0"
        width={constants.cellSide}
        height={constants.cellSide}
        key={'cell-' + i + j}
        onMouseEnter={cell.onHover.bind(null,bindX,bindY)}
      >
      </rect>
  );
}

export default Cell;
