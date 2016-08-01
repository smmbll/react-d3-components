import constants from './constants';

const Column = (column) => {
  let index = column.index;
  let transform = `translate(${index * 11.5},0)rotate(-90)`;

  return (
    <g className="column" transform={transform} key={'column-' + index}>
      <line x1={-column.length} />
      <text
        className="caption top"
        textAnchor="start"
        x="6"
        y="9"
      >
        {column.name}
      </text>
    </g>
  )
}

export default Column;
