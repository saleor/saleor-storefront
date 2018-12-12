import * as React from "react";

import { generateNavLink } from "./NavDropdown";
import { MainMenuSubItem } from "./types/MainMenuSubItem";

interface NavNestedItemProps extends MainMenuSubItem {
  children?: NavNestedItemProps[];
  hideOverlay?(): void;
}

const NavItem: React.SFC<NavNestedItemProps> = ({
  hideOverlay,
  children,
  ...item
}) => {
  const content =
    children && children.length ? (
      <ul>
        {children.map((subItem, i) => (
          <NavItem key={i} {...subItem} />
        ))}
      </ul>
    ) : null;

  return (
    <li>
      {generateNavLink(item, { onClick: hideOverlay })}
      {content}
    </li>
  );
};

export default NavItem;
