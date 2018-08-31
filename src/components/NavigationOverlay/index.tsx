import * as React from "react";
import { Query } from "react-apollo";
import ReactSVG from "react-svg";

import { Overlay } from "..";
import { OverlayContext, OverlayType } from "../App/context";
import { GET_CATEGORIES } from "./queries";

import "./scss/index.scss";

const NavigationOverlay: React.SFC = () => (
  <OverlayContext.Consumer>
    {overlayContext => {
      if (overlayContext.type === OverlayType.navigation) {
        return (
          <Overlay onClose={overlayContext.hide}>
            <div className="side-nav" onClick={e => e.stopPropagation()}>
              <ul>
                <li>
                  <a href="/">Home</a>
                </li>
                <Query query={GET_CATEGORIES}>
                  {({ loading, error, data }) => {
                    if (loading) {
                      return "Loading";
                    }
                    if (error) {
                      return `Error!: ${error}`;
                    }
                    return data.categories.edges.map(item => (
                      <li key={item.node.id}>
                        <a href={item.node.url}>{item.node.name}</a>
                      </li>
                    ));
                  }}
                </Query>
                <li className="side-nav__icon-item">
                  <a href="/">
                    <ReactSVG path="../../images/user.svg" />
                    My account
                  </a>
                </li>
              </ul>
            </div>
          </Overlay>
        );
      }
    }}
  </OverlayContext.Consumer>
);

export default NavigationOverlay;
