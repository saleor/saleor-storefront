import * as React from "react";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import ReactSVG from "react-svg";

import { OverlayContext, OverlayType } from "../App/context";
import { CartContext } from "../Cart/context";
import { GET_MAIN_MENU } from "./queries";

import "./scss/index.scss";

interface MainMenuState {
  search: boolean;
}

class MainMenu extends React.Component<{}, MainMenuState> {
  constructor(props) {
    super(props);
    this.state = { search: false };
  }

  showSearch = () => {
    this.setState({ search: true });
  };

  hideSearch = () => {
    this.setState({ search: false });
  };

  showSearchResults = (value, overlayContext) => {
    if (value) {
      overlayContext.show(OverlayType.search);
    }
  };

  render() {
    return (
      <OverlayContext.Consumer>
        {overlayContext => (
          <nav className="main-menu">
            <div className="main-menu__left">
              <ul>
                <li
                  className="main-menu__hamburger"
                  onClick={() => overlayContext.show(OverlayType.navigation)}
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
                <Query query={GET_MAIN_MENU}>
                  {({ loading, error, data }) => {
                    if (loading) {
                      return "Loading";
                    }
                    if (error) {
                      return `Error!: ${error}`;
                    }
                    return data.shop.navigation.main.items.edges.map(item => (
                      <li className="main-menu__item" key={item.node.id}>
                        <a href={item.node.url}>{item.node.name}</a>
                      </li>
                    ));
                  }}
                </Query>
              </ul>
            </div>
            <div className="main-menu__center">
              <Link to="/">
                <ReactSVG path="../../images/logo.svg" />
              </Link>
            </div>
            <div className="main-menu__right">
              <ul>
                <li className="main-menu__icon">
                  <ReactSVG path="../../images/user.svg" />
                </li>
                <li
                  className="main-menu__icon"
                  onClick={() => overlayContext.show(OverlayType.cart)}
                >
                  <ReactSVG path="../../images/cart.svg" />
                  <CartContext.Consumer>
                    {cart => <span>{cart.getQuantity()}</span>}
                  </CartContext.Consumer>
                </li>
                <li
                  className="main-menu__search"
                  onClick={() => overlayContext.show(OverlayType.search)}
                >
                  <span>Search</span>
                  <ReactSVG path="../../images/search.svg" />
                </li>
              </ul>
            </div>
            <div className="main-menu__center">
              <Link to="/">
                <ReactSVG path="../../images/logo.svg" />
              </Link>
            </div>
            <div className="main-menu__right">
              <ul>
                <li className="main-menu__icon">
                  <ReactSVG path="../../images/user.svg" />
                </li>
                <li
                  className="main-menu__icon"
                  onClick={() => overlayContext.show(OverlayType.cart)}
                >
                  <ReactSVG path="../../images/cart.svg" />
                  <CartContext.Consumer>
                    {cart => <span>{cart.getQuantity()}</span>}
                  </CartContext.Consumer>
                </li>
                <li className="main-menu__search">
                  <span>Search</span>
                  <ReactSVG path="../../images/search.svg" />
                </li>
              </ul>
            </div>
            <ul />
          </nav>
        )}
      </OverlayContext.Consumer>
    );
  }
}

export default MainMenu;
