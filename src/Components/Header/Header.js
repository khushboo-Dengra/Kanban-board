import React from "react";
import "./header.scss";

const Header = (props) => {
  return (
    <div className="header">
      <div className="title">{props.title}</div>
      <div className="header-children">{props.children}</div>
    </div>
  );
};
export default Header;
