import React from 'react';
import { Link } from 'react-router';

const NavItem = (props) => {
  return (
    <div className="nav-item">
      <Link to={props.to}>
        <img className="preview" src={props.img} alt="nav-image" />
        <span className="title">{props.children}</span>
      </Link>
    </div>
  )
}

export default NavItem;
