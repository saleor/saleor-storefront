import * as React from "react";

import { Overlay } from "../Overlay";
import { OverlayContext, OverlayType } from "../Overlay/context";
import NavItem from "./NavItem";
import NavList from "./NavList";

import "./scss/index.scss";

const NavOverlay: React.SFC = () => (
  <OverlayContext.Consumer>
    {overlayContext => {
      if (overlayContext.type === OverlayType.sideNav) {
        const items: NavItem[] =
          overlayContext.context.data;

        return (
          <Overlay context={overlayContext}>
            <div className="side-nav" onClick={evt => evt.stopPropagation()}>
              <NavList items={items} hideOverlay={overlayContext.hide} />
            </div>
          </Overlay>
        );
      }
    }}
  </OverlayContext.Consumer>
);

export default NavOverlay;
