import constants from './constants';

const Column = (props) => {
  let index = props.index;
  let height = props.height;
  let colTransform = `translate(${index * 11.5},0)rotate(-90)`;
  let selTransform = `translate(${-height},0)`;
  let classes = 'column';

  classes += props.highlight ? ' highlight' : '';

  return (
    <g className={classes} transform={colTransform} key={'column-' + index}>
      <text
        className="label"
        textAnchor="start"
        x="6"
        y="9"
      >
        {props.label}
      </text>
      <line x1={-height} />
    </g>
  )
}

export default Column;
