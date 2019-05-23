import React from "react";
import { Link } from "react-router-dom";

export interface ITabTitle {
  element: string;
  active: string;
}

const TabTitle: React.FC<ITabTitle> = ({ element, active }) => (
  <div className="user-account-navigation__link_container">
    <Link to={element} className="user-account-navigation__link">
      {element.replace("-", " ").toUpperCase()}
    </Link>
    {active === element ? (
      <div className="user-account-navigation__underline" />
    ) : (
      ""
    )}
  </div>
);

export default TabTitle;
