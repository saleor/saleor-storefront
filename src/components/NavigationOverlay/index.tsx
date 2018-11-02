import * as React from "react";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import ReactSVG from "react-svg";

import { generateCategoryUrl } from "../../core/utils";
import Loader from "../Loader";
import { Overlay } from "../Overlay";
import { OverlayContext, OverlayType } from "../Overlay/context";
import { GET_CATEGORIES } from "./queries";

import "./scss/index.scss";

const NavigationOverlay: React.SFC = () => (
  <OverlayContext.Consumer>
    {overlayContext => {
      if (overlayContext.type === OverlayType.navigation) {
        return (
          <Overlay context={overlayContext}>
            <div className="side-nav" onClick={e => e.stopPropagation()}>
              <ul>
                {window.location.pathname === "/" ? (
                  <li className="side-nav__menu-item side-nav__menu-item--parent">
                    <span />
                    <span
                      className="side-nav__menu-item-close side-nav__menu-item-close--noback"
                      onClick={overlayContext.hide}
                    >
                      <span />
                    </span>
                  </li>
                ) : (
                  <li className="side-nav__menu-item side-nav__menu-item--parent">
                    <Link to="/">
                      <span className="side-nav__menu-item-label">
                        <ReactSVG
                          className="side-nav__menu-item-back"
                          path={require("../../images/arrow-back.svg")}
                        />{" "}
                        Home
                      </span>
                    </Link>
                    <span
                      className="side-nav__menu-item-close"
                      onClick={overlayContext.hide}
                    >
                      <span />
                    </span>
                  </li>
                )}
                <Query
                  query={GET_CATEGORIES}
                  fetchPolicy="cache-and-network"
                  errorPolicy="all"
                >
                  {({ loading, data }) => {
                    if (loading) {
                      return <Loader full />;
                    }
                    return data.categories.edges.map(({ node: category }) => (
                      <li className="side-nav__menu-item" key={category.id}>
                        <Link
                          to={generateCategoryUrl(category.id, category.name)}
                          onClick={overlayContext.hide}
                        >
                          <span className="side-nav__menu-item-label">
                            {category.name}
                          </span>
                        </Link>
                      </li>
                    ));
                  }}
                </Query>
              </ul>
            </div>
          </Overlay>
        );
      }
    }}
  </OverlayContext.Consumer>
);

export default NavigationOverlay;
