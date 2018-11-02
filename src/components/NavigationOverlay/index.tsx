import * as React from "react";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";

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
                <li>
                  <Link to="/">
                    <span className="side-nav__menu-item-label">Home</span>
                  </Link>
                </li>
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
                      <li key={category.id}>
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
