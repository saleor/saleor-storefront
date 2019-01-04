import { mediumScreen, smallScreen } from "../App/scss/variables.scss";
import "./scss/index.scss";

import * as React from "react";
import Media from "react-media";
import { Link } from "react-router-dom";
import ReactSVG from "react-svg";

import { MenuDropdown } from "..";
import { maybe } from "../../core/utils";
import { baseUrl } from "../App/routes";
import { CartContext } from "../CartProvider/context";
import Offline from "../Offline";
import Online from "../Online";
import { OverlayContext, OverlayTheme, OverlayType } from "../Overlay/context";
import { UserContext } from "../User/context";
import NavDropdown from "./NavDropdown";
import { TypedMainMenuQuery } from "./queries";

const cartIcon = require("../../images/cart.svg");
const hamburgerHoverIcon = require("../../images/hamburger-hover.svg");
const hamburgerIcon = require("../../images/hamburger.svg");
const logoIcon = require("../../images/logo.svg");
const searchIcon = require("../../images/search.svg");
const userIcon = require("../../images/user.svg");

const MainMenu: React.SFC = () => (
  <OverlayContext.Consumer>
    {overlayContext => (
      <nav className="main-menu" id="header">
        <div className="main-menu__left">
          <TypedMainMenuQuery renderOnError displayLoader={false}>
            {({ data }) => {
              const items = maybe(() => data.shop.navigation.main.items, []);

              return (
                <ul>
                  <Media
                    query={{ maxWidth: mediumScreen }}
                    render={() => (
                      <li
                        className="main-menu__hamburger"
                        onClick={() =>
                          overlayContext.show(
                            OverlayType.sideNav,
                            OverlayTheme.left,
                            { data: items }
                          )
                        }
                      >
                        <ReactSVG
                          path={hamburgerIcon}
                          className={"main-menu__hamburger--icon"}
                        />
                        <ReactSVG
                          path={hamburgerHoverIcon}
                          className={"main-menu__hamburger--hover"}
                        />
                      </li>
                    )}
                  />
                  <Media
                    query={{ minWidth: mediumScreen }}
                    render={() =>
                      items.map(item => (
                        <li className="main-menu__item" key={item.id}>
                          <NavDropdown {...item} />
                        </li>
                      ))
                    }
                  />
                </ul>
              );
            }}
          </TypedMainMenuQuery>
        </div>

        <div className="main-menu__center">
          <Link to={baseUrl}>
            <ReactSVG path={logoIcon} />
          </Link>
        </div>

        <div className="main-menu__right">
          <ul>
            <Online>
              <Media
                query={{ minWidth: smallScreen }}
                render={() => (
                  <UserContext.Consumer>
                    {({ logout, user }) =>
                      user ? (
                        <MenuDropdown
                          head={
                            <li className="main-menu__icon main-menu__user--active">
                              <ReactSVG path={userIcon} />
                            </li>
                          }
                          content={
                            <ul className="main-menu__dropdown">
                              <li onClick={logout}>Log Out</li>
                            </ul>
                          }
                        />
                      ) : (
                        <li
                          className="main-menu__icon"
                          onClick={() =>
                            overlayContext.show(
                              OverlayType.login,
                              OverlayTheme.right
                            )
                          }
                        >
                          <ReactSVG path={userIcon} />
                        </li>
                      )
                    }
                  </UserContext.Consumer>
                )}
              />
              <CartContext.Consumer>
                {cart => (
                  <li
                    className="main-menu__icon main-menu__cart"
                    onClick={() => {
                      cart.fetch();
                      overlayContext.show(OverlayType.cart, OverlayTheme.right);
                    }}
                  >
                    <ReactSVG path={cartIcon} />
                    {cart.getQuantity() > 0 ? (
                      <span className="main-menu__cart__quantity">
                        {cart.getQuantity()}
                      </span>
                    ) : null}
                  </li>
                )}
              </CartContext.Consumer>
            </Online>
            <Offline>
              <li className="main-menu__offline">
                <Media
                  query={{ minWidth: mediumScreen }}
                  render={() => <span>Offline</span>}
                />
              </li>
            </Offline>
            <li
              className="main-menu__search"
              onClick={() =>
                overlayContext.show(OverlayType.search, OverlayTheme.right)
              }
            >
              <Media
                query={{ minWidth: mediumScreen }}
                render={() => <span>Search</span>}
              />
              <ReactSVG path={searchIcon} />
            </li>
          </ul>
        </div>
        <ul />
      </nav>
    )}
  </OverlayContext.Consumer>
);

export default MainMenu;
