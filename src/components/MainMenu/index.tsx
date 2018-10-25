import * as React from "react";
import { Query } from "react-apollo";
import Media from "react-media";
import { Link } from "react-router-dom";
import ReactSVG from "react-svg";

import { MenuDropdown } from "..";
import { getDBIdFromGraphqlId, slugify } from "../../core/utils";
import { CartContext } from "../CartProvider/context";
import { OverlayContext, OverlayTheme, OverlayType } from "../Overlay/context";
import { UserContext } from "../User/context";
import { GET_MAIN_MENU } from "./queries";

import { mediumScreen, smallScreen } from "../App/scss/variables.scss";
import "./scss/index.scss";

const MainMenu: React.SFC = () => (
  <OverlayContext.Consumer>
    {overlayContext => (
      <nav className="main-menu" id="header">
        <div className="main-menu__left">
          <ul>
            <li
              className="main-menu__hamburger"
              onClick={() =>
                overlayContext.show(OverlayType.navigation, OverlayTheme.left)
              }
            >
              <ReactSVG
                className="main-menu__hamburger--icon"
                path="../../images/hamburger.svg"
              />
              <ReactSVG
                className="main-menu__hamburger--hover"
                path="../../images/hamburger-hover.svg"
              />
            </li>
            <Media
              query={{ minWidth: mediumScreen }}
              render={() => (
                <Query query={GET_MAIN_MENU}>
                  {({ loading, error, data }) => {
                    if (loading) {
                      return "Loading";
                    }
                    if (error) {
                      return `Error!: ${error}`;
                    }
                    return data.shop.navigation.main.items.map(category => (
                      <li className="main-menu__item" key={category.id}>
                        <Link
                          to={`/category/${slugify(
                            category.name
                          )}/${getDBIdFromGraphqlId(category.id, "MenuItem")}/`}
                        >
                          {category.name}
                        </Link>
                      </li>
                    ));
                  }}
                </Query>
              )}
            />
          </ul>
        </div>
        <div className="main-menu__center">
          <Link to="/">
            <ReactSVG path="../../images/logo.svg" />
          </Link>
        </div>
        <div className="main-menu__right">
          <ul>
            <Media
              query={{ minWidth: smallScreen }}
              render={() => (
                <UserContext.Consumer>
                  {({ logout, user }) =>
                    user ? (
                      <MenuDropdown
                        head={
                          <li className="main-menu__icon main-menu__user--active">
                            <ReactSVG path="../../images/user.svg" />
                          </li>
                        }
                        content={
                          <ul className="main-menu__dropdown">
                            <li onClick={() => logout()}>Log Out</li>
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
                        <ReactSVG path="../../images/user.svg" />
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
                  <ReactSVG path="../../images/cart.svg" />
                  {cart.getQuantity() > 0 ? (
                    <span className="main-menu__cart__quantity">
                      {cart.getQuantity()}
                    </span>
                  ) : null}
                </li>
              )}
            </CartContext.Consumer>
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
              <ReactSVG path="../../images/search.svg" />
            </li>
          </ul>
        </div>
        <ul />
      </nav>
    )}
  </OverlayContext.Consumer>
);

export default MainMenu;
