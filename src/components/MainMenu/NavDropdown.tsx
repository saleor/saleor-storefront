import classNames from "classnames";
import * as React from "react";

import {
  NavLink,
  OverlayContextInterface,
  OverlayTheme,
  OverlayType
} from "..";
import NavItem from "./NavItem";
import { MainMenu_shop_navigation_main_items } from "./types/MainMenu";

import "./scss/index.scss";

class NavDropdown extends React.PureComponent<
  MainMenu_shop_navigation_main_items & { overlay: OverlayContextInterface },
  { active: boolean }
> {
  state = { active: false };

  get hasSubNavigation() {
    const { children } = this.props;
    return children && !!children.length;
  }

  showOverlayHandler = () => {
    if (this.hasSubNavigation) {
      this.setState({ active: true });
      this.props.overlay.show(OverlayType.mainMenuNav, OverlayTheme.modal);
    }
  };

  hideOverlayHandler = () => {
    if (this.state.active) {
      this.props.overlay.hide();
      this.setState({ active: false });
    }
  };

  render() {
    const { children } = this.props;
    const { active } = this.state;
    const showDropDown = active && this.hasSubNavigation;

    return (
      <ul
        className={classNames({
          "main-menu__nav-dropdown": true,
          "main-menu__nav-dropdown--active": showDropDown,
        })}
        onMouseOver={this.showOverlayHandler}
        onMouseLeave={this.hideOverlayHandler}
      >
        <li>
          <NavLink item={this.props} onClick={this.hideOverlayHandler} />
        </li>
        <li
          className={classNames({
            "main-menu__nav-dropdown__body": true,
            "main-menu__nav-dropdown__body--visible": showDropDown,
          })}
        >
          <ul>
            {children.map((subItem, i) => (
              <NavItem
                key={i}
                hideOverlay={this.hideOverlayHandler}
                {...subItem}
              />
            ))}
            {children.length < 4 &&
              <li><img src="http://saleor-storitalia.herokuapp.com/static/images/liguori_DSC_0062.jpg" /></li>
            }
          </ul>
        </li>
      </ul>
    );
  }
}

export default NavDropdown;
