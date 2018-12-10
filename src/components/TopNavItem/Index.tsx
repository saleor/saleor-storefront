import * as React from "react";

import { MainMenuSubItem } from "../TopNav/types/MainMenuSubItem";
import { generateNavLink } from "../TopNavDropDown";

interface TopNavNestedItemProps extends MainMenuSubItem {
  children?: TopNavNestedItemProps[];
}

const TopNavItem: React.SFC<TopNavNestedItemProps> = props => {
  const { children } = props;
  const content =
    children && children.length ? (
      <ul>
        {children.map((subItem, i) => (
          <TopNavItem key={i} {...subItem} />
        ))}
      </ul>
    ) : null;

  return (
    <li>
      {generateNavLink(props)}
      {content}
    </li>
  );
};

export default TopNavItem;
