import classNames from "classnames";
import * as React from "react";
import ReactSVG from "react-svg";

import { generateNavLink } from "../MainMenu/NavDropdown";
import { MainMenuSubItem } from "../MainMenu/types/MainMenuSubItem";

interface NavItem extends MainMenuSubItem {
  children?: NavItem[];
}

interface NavItemProps extends NavItem {
  hideOverlay(): void;
  showSubItems(NavItem): void;
}

const NavItem: React.SFC<NavItemProps> = ({
  hideOverlay,
  showSubItems,
  ...item
}) => {
  const hasSubNavigation = item.children && !!item.children.length;

  return (
    <li
      className={classNames({
        "side-nav__menu-item": true,
        "side-nav__menu-item--has-subnavigation": hasSubNavigation
      })}
    >
      {generateNavLink(item, {
        className: "side-nav__menu-item-link",
        onClick: hideOverlay
      })}
      {hasSubNavigation && (
        <ReactSVG
          path={require(`../../images/subcategories.svg`)}
          className="side-nav__menu-item-more"
          onClick={() => showSubItems(item)}
        />
      )}
    </li>
  );
};

export default NavItem;
