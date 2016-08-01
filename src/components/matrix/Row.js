import constants from './constants';
import Cell from './Cell';

const Row = (row) => {
  let cells = row.cells;
  let index = row.index;
  let cooccurences = row.cooccurences;
  let transform = `translate(0,${index * constants.rowHeight})`;

  cells.forEach(function(cell) {
    cell.row = index;

    cooccurences.forEach(function(cooccurence) {
      if(cell.name === cooccurence.name) {
        cell.color = row.colorScheme(cooccurence.frequency);
      }
    });
  });

  return (
    <g key = {'row-' + index} className="row" transform={transform}>
      <line x2={row.length}></line>
      <text className="caption left" transform="translate(-5,8)" textAnchor="end">{row.name}</text>
      {cells.length ? cells.map(Cell) : null}
    </g>
  )
}

export default Row;
