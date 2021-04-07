import classNames from "classnames";
import * as React from "react";
import ReactSVG from "react-svg";

import { MenuItem } from "@graphql/gqlTypes/MenuItem";

import subcategoriesImg from "../../images/subcategories.svg";
import { NavLink } from "..";

export interface INavItem extends MenuItem {
  children?: MenuItem[];
}

interface NavItemProps extends INavItem {
  hideOverlay(): void;
  showSubItems(item: INavItem): void;
}

const NavItem: React.FC<NavItemProps> = ({
  hideOverlay,
  showSubItems,
  ...item
}) => {
  const hasSubNavigation = item.children && !!item.children.length;

  return (
    <li
      className={classNames({
        "side-nav__menu-item": true,
        "side-nav__menu-item--has-subnavigation": hasSubNavigation,
      })}
    >
      <NavLink
        item={item}
        className="side-nav__menu-item-link"
        onClick={hideOverlay}
      />
      {hasSubNavigation && (
        <ReactSVG
          path={subcategoriesImg}
          className="side-nav__menu-item-more"
          onClick={() => showSubItems(item)}
        />
      )}
    </li>
  );
};

export default NavItem;
