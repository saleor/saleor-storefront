import * as React from "react";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";

import { generateCategoryUrl } from "../../core/utils";
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
                  <a href="/">Home</a>
                </li>
                <Query
                  query={GET_CATEGORIES}
                  fetchPolicy="cache-and-network"
                  errorPolicy="all"
                >
                  {({ loading, error, data }) => {
                    if (loading) {
                      return null;
                    }
                    return data.categories.edges.map(({ node: category }) => (
                      <li key={category.id}>
                        <Link
                          to={generateCategoryUrl(category.id, category.name)}
                        >
                          {category.name}
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
