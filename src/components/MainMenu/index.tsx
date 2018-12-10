import * as React from "react";
import { Query } from "react-apollo";
import Media from "react-media";
import { Link } from "react-router-dom";
import ReactSVG from "react-svg";

import { MenuDropdown } from "..";
import { baseUrl } from "../App/routes";
import { CartContext } from "../CartProvider/context";
import { OverlayContext, OverlayTheme, OverlayType } from "../Overlay/context";
import { UserContext } from "../User/context";

import { mediumScreen, smallScreen } from "../App/scss/variables.scss";
import Offline from "../Offline";
import Online from "../Online";
import TopNav from "../TopNav";

import "./scss/index.scss";

const Svg = (fileName, props?) => (
  <ReactSVG path={require(`../../images/${fileName}.svg`)} {...props} />
);

const MainMenu: React.SFC = () => (
  <OverlayContext.Consumer>
    {overlayContext => (
      <nav className="main-menu" id="header">
        <div className="main-menu__left">
          <ul>
            <li
              className="main-menu__hamburger"
              onClick={() =>
                overlayContext.show(OverlayType.sideNav, OverlayTheme.left)
              }
            >
              {Svg("hamburger", { className: "main-menu__hamburger--icon" })}
              {Svg("hamburger-hover", {
                className: "main-menu__hamburger--hover"
              })}
            </li>
            <TopNav />
          </ul>
        </div>

        <div className="main-menu__center">
          <Link to={baseUrl}>{Svg("logo")}</Link>
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
                              {Svg("user")}
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
                          {Svg('user')}
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
                    {Svg("cart")}
                    {cart.getQuantity() ? (
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
              {Svg("search")}
            </li>
          </ul>
        </div>
        <ul />
      </nav>
    )}
  </OverlayContext.Consumer>
);

export default MainMenu;
