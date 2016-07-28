import React from 'react';

const Bar = (props) => {
  let translate = `translate(${props.x}, ${props.y})`;
  let height = props.height;
  let text = height > 0 ? props.size : '';
  let y = 6;
  let fill = '#fff';

  if(height < 25) {
    y = -12;
    fill = '#000';
  }

  return (
    <g transform={translate} className="bar">
      <rect x="1" width={props.width} height={height}></rect>
      <text dy=".75em" y={y} x={props.labelPosition} textAnchor="middle" fill={fill}>{text}</text>
    </g>
  );
};

export default Bar;
