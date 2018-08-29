import * as React from "react";
import { Query } from "react-apollo";
import ReactSVG from "react-svg";

import { GET_CATEGORIES } from "./queries";
import { OverlayContext } from "../App/context";
import { Overlay } from "..";

import "./scss/index.scss";

const NavigationOverlay: React.SFC = () => (
  <OverlayContext.Consumer>
    {overlayContext => {
      if (overlayContext.type === "navigation") {
        return (
          <Query query={GET_CATEGORIES}>
            {({ loading, error, data }) => {
              if (loading) {
                return "Loading";
              }
              if (error) {
                return `Error!: ${error}`;
              }
              return (
                <Overlay onClose={overlayContext.closeOverlay}>
                  <div className="side-nav" onClick={e => e.stopPropagation()}>
                    <ul>
                      <li>
                        <a href="/">Home</a>
                      </li>
                      {data.categories.edges.map(item => (
                        <li key={item.node.id}>
                          <a href={item.node.url}>{item.node.name}</a>
                        </li>
                      ))}
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
            }}
          </Query>
        );
      }
    }}
  </OverlayContext.Consumer>
);

export default NavigationOverlay;
