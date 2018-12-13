import classNames from "classnames";
import * as React from "react";
import ReactSVG from "react-svg";

import { NavLink } from "..";
import { MainMenuSubItem } from "../MainMenu/types/MainMenuSubItem";

const subcategoriesIcon = require("../../images/subcategories.svg");

interface NavItem extends MainMenuSubItem {
  children?: NavItem[];
}

interface NavItemProps extends NavItem {
  hideOverlay(): void;
  showSubItems(item: NavItem): void;
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
      <NavLink
        item={item}
        className={"side-nav__menu-item-link"}
        onClick={hideOverlay}
      />
      {hasSubNavigation && (
        <ReactSVG
          path={subcategoriesIcon}
          className="side-nav__menu-item-more"
          onClick={() => showSubItems(item)}
        />
      )}
    </li>
  );
};

export default NavItem;
