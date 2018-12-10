import * as React from "react";
import { Link } from "react-router-dom";

import {
  generateCategoryUrl,
  generateCollectionUrl,
  generatePageUrl
} from "../../core/utils";
import {
  BottomMenuSubItem_category,
  BottomMenuSubItem_collection,
  BottomMenuSubItem_page
} from "../BottomNav/types/BottomMenuSubItem";
import { OverlayContext, OverlayTheme, OverlayType } from "../Overlay/context";
import { TopMenu_shop_navigation_main_items } from "../TopNav/types/TopMenu";
import {
  TopMenuSubItem_category,
  TopMenuSubItem_collection,
  TopMenuSubItem_page
} from "../TopNav/types/TopMenuSubItem";
import TopNavItem from "../TopNavItem/Index";

import "./scss/index.scss";

export const generateNavLink = (
  name: string,
  url: string | null,
  category: TopMenuSubItem_category | BottomMenuSubItem_category | null,
  collection?: TopMenuSubItem_collection | BottomMenuSubItem_collection | null,
  page?: TopMenuSubItem_page | BottomMenuSubItem_page | null,
  props?
) => {
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
  TopMenu_shop_navigation_main_items,
  { active: boolean }
> {
  static contextType = OverlayContext;
  state = { active: false };

  get hasSubNavigation() {
    const { children } = this.props;
    return children && !!children.length;
  }

  render() {
    const { name, children, url, category, collection, page } = this.props;
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
        <li>{generateNavLink(name, url, category, collection, page)}</li>
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

  private mouseOverHandler = () => {
    if (this.hasSubNavigation) {
      this.setState({ active: true });
      this.context.show(OverlayType.topNav, OverlayTheme.modal);
    }
  };

  private mouseLeaveHandler = () => {
    if (this.state.active) {
      this.context.hide();
      this.setState({ active: false });
    }
  };
}

export default TopNavDropDown;
