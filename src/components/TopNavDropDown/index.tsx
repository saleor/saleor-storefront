import * as React from "react";
import { Link } from "react-router-dom";

import {
  generateCategoryUrl,
  generateCollectionUrl,
  generatePageUrl
} from "../../core/utils";
import { SecondaryMenu_shop_navigation_secondary_items } from "../FooterNav/types/SecondaryMenu";
import { OverlayContext, OverlayTheme, OverlayType } from "../Overlay/context";
import { MainMenu_shop_navigation_main_items } from "../TopNav/types/MainMenu";
import { MainMenuSubItem } from "../TopNav/types/MainMenuSubItem";
import TopNavItem from "../TopNavItem/Index";

import "./scss/index.scss";

export const generateNavLink = (
  item:
    | MainMenu_shop_navigation_main_items
    | MainMenuSubItem
    | SecondaryMenu_shop_navigation_secondary_items,
  props?
) => {
  const { name, url, category, collection, page } = item;
  const link = (url: string) => (
    <Link to={url} {...props}>
      {name}
    </Link>
  );

  if (url) {
    return (
      <a href={url} {...props}>
        {name}
      </a>
    );
  } else if (category) {
    return link(generateCategoryUrl(category.id, category.name));
  } else if (collection) {
    return link(generateCollectionUrl(collection.id, collection.name));
  } else if (page) {
    return link(generatePageUrl(page.slug));
  }

  return <span {...props}>{name}</span>;
};

class TopNavDropDown extends React.PureComponent<
  MainMenu_shop_navigation_main_items,
  { active: boolean }
> {
  static contextType = OverlayContext;
  state = { active: false };

  get hasSubNavigation() {
    const { children } = this.props;
    return children && !!children.length;
  }

  mouseOverHandler = () => {
    if (this.hasSubNavigation) {
      this.setState({ active: true });
      this.context.show(OverlayType.topNav, OverlayTheme.modal);
    }
  };

  mouseLeaveHandler = () => {
    if (this.state.active) {
      this.context.hide();
      this.setState({ active: false });
    }
  };

  render() {
    const { children } = this.props;
    const { active } = this.state;
    const showDropDown = active && this.hasSubNavigation;

    return (
      <ul
        className={`top-nav-dropdown${
          showDropDown ? " top-nav-dropdown--active" : ""
        }`}
        onMouseOver={this.mouseOverHandler}
        onMouseLeave={this.mouseLeaveHandler}
      >
        <li>{generateNavLink(this.props)}</li>
        <li
          className={`top-nav-dropdown__body${
            showDropDown ? " top-nav-dropdown__body--visible" : ""
          }`}
        >
          <ul>
            {children.map((subItem, i) => (
              <TopNavItem key={i} {...subItem} />
            ))}
          </ul>
        </li>
      </ul>
    );
  }
}

export default TopNavDropDown;
