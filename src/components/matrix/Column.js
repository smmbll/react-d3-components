import constants from './constants';
import classes from '../../helpers/classes';

const Column = (props) => {
  let index = props.index;
  let height = props.height;
  let colTransform = `translate(${index * constants.rowHeight},0)rotate(-90)`;
  let labelTransform = `rotate(45)`;
  let colClasses = classes({ column: true, highlight: props.highlight });

  return (
    <g className={colClasses} transform={colTransform} key={'column-' + index}>
      <text
        className="label"
        textAnchor="start"
        x="6"
        y="1"
        transform={labelTransform}
      >
        {props.label}
      </text>
      <line x1={-height} />
    </g>
  )
}

export default Column;
