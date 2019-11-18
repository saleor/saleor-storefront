import "./scss/index.scss";

import * as React from "react";
import { Link } from "react-router-dom";
import ReactSVG from "react-svg";

import { baseUrl } from "../../routes";
import NavItem, { INavItem } from "./NavItem";

import backImg from "../../images/arrow-back.svg";
import logoImg from "../../images/logo.svg";

import { SocialMediaIcon } from "..";
import { SOCIAL_MEDIA } from "../../core/config";

interface NavListProps {
  items: INavItem[];
  hideOverlay(): void;
}

interface NavListState {
  parent: INavItem | null;
  displayedItems: INavItem[];
}

class NavList extends React.PureComponent<NavListProps, NavListState> {
  state: NavListState = {
    displayedItems: this.props.items,
    parent: null,
  };

  handleShowSubItems = (item: INavItem) => {
    this.setState({ parent: item, displayedItems: item.children });
  };

  handleGoBack = () => {
    const grandparent = this.state.parent.parent;

    if (!grandparent) {
      this.setState({ parent: null, displayedItems: this.props.items });
    } else {
      const newParent = this.findItemById(grandparent.id);
      this.setState({
        displayedItems: newParent.children,
        parent: newParent,
      });
    }
  };

  findItemById(id: string): INavItem {
    let match = null;
    function find(item) {
      if (item.id === id) {
        match = item;
        return true;
      }
      return item.children && item.children.some(find);
    }
    this.props.items.some(find);
    return match;
  }

  render() {
    const { hideOverlay } = this.props;
    const { displayedItems, parent } = this.state;

    return (
      <ul>
        {parent ? (
          <li className="side-nav__menu-item side-nav__menu-item-back">
            <span onClick={this.handleGoBack}>
              <ReactSVG path={backImg} /> {parent.name}
            </span>
          </li>
        ) : (
          <>
            <li className="side-nav__menu-item side-nav__menu-item--parent">
              <Link
                to={baseUrl}
                className="side-nav__menu-item-logo"
                onClick={hideOverlay}
              >
                <ReactSVG path={logoImg} />
              </Link>
              <span className="side-nav__menu-item-close" onClick={hideOverlay}>
                <span />
              </span>
            </li>
          </>
        )}

        {displayedItems.map(item => (
          <NavItem
            key={item.id}
            hideOverlay={hideOverlay}
            showSubItems={this.handleShowSubItems}
            {...item}
          />
        ))}
        <li className="side-nav__menu-item side-nav__menu-item--parent">
          <Link
            to="/page/about-us/"
            className="side-nav__menu-item-logo"
            onClick={hideOverlay}
          >
            <h3>ABOUT US</h3>
          </Link>
        </li>
        <li className="side-nav__menu-item side-nav__menu-item--parent">
          <Link
            to="/page/showrooms/"
            className="side-nav__menu-item-logo"
            onClick={hideOverlay}
          >
            <h3>SHOWROOMS</h3>
          </Link>
        </li>
        <li className="side-nav__menu-item side-nav__menu-item--parent">
          <Link
            to="/page/shipping-returns/"
            className="side-nav__menu-item-logo"
            onClick={hideOverlay}
          >
            <h3>SHIPPING & RETURNS</h3>
          </Link>
        </li>
        <div className="side-nav__footer__favicons">
          {SOCIAL_MEDIA.map(medium => (
            <SocialMediaIcon medium={medium} key={medium.ariaLabel} />
          ))}
        </div>
        <div className="side-nav__footer__line">
          <h6>storitalia© | all rights reserved</h6>
        </div>
      </ul>
    );
  }
}

export default NavList;
