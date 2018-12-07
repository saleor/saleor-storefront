import * as React from "react";

import { Link } from "react-router-dom";
import { generateCategoryUrl } from "../../core/utils";
import { OverlayContext, OverlayTheme, OverlayType } from "../Overlay/context";
import { TopMenu_shop_navigation_main_items } from "../TopNav/types/TopMenu";
import TopNavItem from "../TopNavItem/Index";

import "./scss/index.scss";

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
    const { name, children, url, category } = this.props;
    const { active } = this.state;
    const showDropDown = active && this.hasSubNavigation;
    const href =
      (category ? generateCategoryUrl(category.id, category.name) : url) || "#";

    return (
      <ul
        className={`top-nav-dropdown${
          showDropDown ? " top-nav-dropdown--active" : ""
        }`}
        onMouseOver={this.mouseOverHandler}
        onMouseLeave={this.mouseLeaveHandler}
      >
        <li>
          {url ? (
            <a href={href}>{name}</a>
          ) : (
            <Link to={href}>{name}</Link>
          )}
        </li>
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
    const { children } = this.props;

    if (this.hasSubNavigation) {
      this.setState({ active: true });
      this.context.show(OverlayType.topNavigation, OverlayTheme.modal);
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
