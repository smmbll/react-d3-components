import constants from './constants';
import Cell from './Cell';

const Row = (row) => {
  let cells = row.cells;
  let index = row.index;
  let length = row.length;
  let cooccurrences = row.cooccurrences;
  let rowTransform = `translate(0,${index * constants.rowHeight})`;
  let classes = 'row';

  classes += row.highlight ? ' highlight' : '';

  cells.forEach(function(cell) {
    cell.row = index;
    cell.onHover = row.onHover;

    cooccurrences.forEach(function(cooccurrence) {
      if(cell.name === cooccurrence.name) {
        cell.color = row.colorScheme(cooccurrence.frequency);
      }
    });
  });

  return (
    <g key = {'row-' + index} className={classes} transform={rowTransform}>
      <line x2={length}></line>
      <text className="label" transform="translate(-5,8)" textAnchor="end">{row.name}</text>
      {cells.length ? cells.map(Cell) : null}
    </g>
  )
}

export default Row;
