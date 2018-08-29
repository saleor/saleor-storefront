import * as React from "react";
import ReactSVG from "react-svg";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";

import { GET_MAIN_MENU } from "./queries";
import { OverlayContext, OverlayType } from "../App/context";

import "./scss/index.scss";

const MainMenu: React.SFC = () => (
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
            <li className="main-menu__icon">
              <ReactSVG path="../../images/cart.svg" />
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

export default MainMenu;
