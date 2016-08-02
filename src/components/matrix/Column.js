import constants from './constants';

const Column = (column) => {
  let index = column.index;
  let length = column.length;
  let colTransform = `translate(${index * 11.5},0)rotate(-90)`;
  let selTransform = `translate(${-length},0)`;
  let classes = 'column';

  classes += column.highlight ? ' highlight' : '';

  return (
    <g className={classes} transform={colTransform} key={'column-' + index}>
      <text
        className="label"
        textAnchor="start"
        x="6"
        y="9"
      >
        {column.name}
      </text>
      <line x1={-length} />
    </g>
  )
}

export default Column;
